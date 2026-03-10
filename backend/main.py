from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse
from pydantic import BaseModel
import os
from dotenv import load_dotenv

import gmail_client
import outlook_client
from ai_engine import process_email, daily_summary

load_dotenv()

app = FastAPI(title="AI Email Manager API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory session store (use Redis in production)
sessions: dict = {}


# ── Auth Routes ──────────────────────────────────────────────────────────────

@app.get("/auth/gmail")
def gmail_login():
    return {"url": gmail_client.get_auth_url()}


@app.get("/auth/gmail/callback")
def gmail_callback(code: str = Query(...), session_id: str = Query(default="default")):
    try:
        credentials = gmail_client.exchange_code(code)
        sessions[session_id] = {"provider": "gmail", "credentials": credentials}
    except Exception as e:
        if session_id not in sessions:
            raise HTTPException(status_code=500, detail=str(e))
    frontend = os.getenv("FRONTEND_URL", "http://localhost:5173")
    return RedirectResponse(f"{frontend}/inbox?session={session_id}&provider=gmail")


@app.get("/auth/outlook")
def outlook_login():
    return {"url": outlook_client.get_auth_url()}


@app.get("/auth/outlook/callback")
def outlook_callback(code: str = Query(...), session_id: str = Query(default="default")):
    credentials = outlook_client.exchange_code(code)
    sessions[session_id] = {"provider": "outlook", "credentials": credentials}
    frontend = os.getenv("FRONTEND_URL", "http://localhost:5173")
    return RedirectResponse(f"{frontend}/inbox?session={session_id}&provider=outlook")


# ── Email Routes ─────────────────────────────────────────────────────────────

@app.get("/emails")
def get_emails(session_id: str = Query(default="default"), limit: int = 10):
    session = sessions.get(session_id)
    if not session:
        raise HTTPException(status_code=401, detail="Not authenticated")

    provider = session["provider"]
    creds = session["credentials"]

    if provider == "gmail":
        emails = gmail_client.fetch_emails(creds, max_results=limit)
    else:
        emails = outlook_client.fetch_emails(creds, max_results=limit)

    processed = [process_email(e) for e in emails]
    return {"emails": processed}


@app.get("/emails/summary")
def get_summary(session_id: str = Query(default="default")):
    session = sessions.get(session_id)
    if not session:
        raise HTTPException(status_code=401, detail="Not authenticated")

    provider = session["provider"]
    creds = session["credentials"]

    if provider == "gmail":
        emails = gmail_client.fetch_emails(creds, max_results=20)
    else:
        emails = outlook_client.fetch_emails(creds, max_results=20)

    for e in emails:
        e["category"] = process_email(e)["category"]

    summary = daily_summary(emails)
    return {"summary": summary}


@app.get("/health")
def health():
    return {"status": "ok"}
