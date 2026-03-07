import os
import base64
import requests as http_requests
from google_auth_oauthlib.flow import Flow
from googleapiclient.discovery import build
from google.oauth2.credentials import Credentials
from dotenv import load_dotenv

load_dotenv()

SCOPES = ["https://www.googleapis.com/auth/gmail.readonly"]

CLIENT_CONFIG = {
    "web": {
        "client_id": os.getenv("GMAIL_CLIENT_ID"),
        "client_secret": os.getenv("GMAIL_CLIENT_SECRET"),
        "redirect_uris": [os.getenv("GMAIL_REDIRECT_URI")],
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
    }
}


def get_auth_url() -> str:
    flow = Flow.from_client_config(CLIENT_CONFIG, scopes=SCOPES)
    flow.redirect_uri = os.getenv("GMAIL_REDIRECT_URI")
    auth_url, _ = flow.authorization_url(prompt="consent", access_type="offline")
    return auth_url


def exchange_code(code: str) -> dict:
    redirect_uri = os.getenv("GMAIL_REDIRECT_URI", "").strip()
    client_id = os.getenv("GMAIL_CLIENT_ID", "")
    client_secret = os.getenv("GMAIL_CLIENT_SECRET", "")
    print(f"[EXCHANGE] redirect_uri={redirect_uri!r}", flush=True)
    print(f"[EXCHANGE] client_id={client_id!r}", flush=True)
    print(f"[EXCHANGE] client_secret_len={len(client_secret)}", flush=True)
    print(f"[EXCHANGE] code_len={len(code)} code_prefix={code[:30]!r}", flush=True)
    response = http_requests.post(
        "https://oauth2.googleapis.com/token",
        data={
            "grant_type": "authorization_code",
            "code": code,
            "redirect_uri": redirect_uri,
            "client_id": client_id,
            "client_secret": client_secret,
        },
    )
    print(f"[EXCHANGE] response_status={response.status_code} response_body={response.text}", flush=True)
    data = response.json()
    if "error" in data:
        raise ValueError(f"Token exchange failed: {data.get('error')}: {data.get('error_description', '')} full={data}")
    return {
        "token": data["access_token"],
        "refresh_token": data.get("refresh_token"),
        "token_uri": "https://oauth2.googleapis.com/token",
        "client_id": os.getenv("GMAIL_CLIENT_ID"),
        "client_secret": os.getenv("GMAIL_CLIENT_SECRET"),
        "scopes": ["https://www.googleapis.com/auth/gmail.readonly"],
    }


def fetch_emails(credentials: dict, max_results: int = 20) -> list[dict]:
    creds = Credentials(
        token=credentials["token"],
        refresh_token=credentials.get("refresh_token"),
        token_uri=credentials["token_uri"],
        client_id=credentials["client_id"],
        client_secret=credentials["client_secret"],
        scopes=credentials["scopes"],
    )
    service = build("gmail", "v1", credentials=creds)
    results = service.users().messages().list(userId="me", maxResults=max_results, labelIds=["INBOX"]).execute()
    messages = results.get("messages", [])

    emails = []
    for msg in messages:
        raw = service.users().messages().get(userId="me", id=msg["id"], format="full").execute()
        headers = {h["name"]: h["value"] for h in raw["payload"]["headers"]}
        body = _extract_body(raw["payload"])
        emails.append({
            "id": msg["id"],
            "sender": headers.get("From", ""),
            "subject": headers.get("Subject", "(No Subject)"),
            "date": headers.get("Date", ""),
            "body": body,
            "provider": "gmail",
        })
    return emails


def _extract_body(payload: dict) -> str:
    if "parts" in payload:
        for part in payload["parts"]:
            if part["mimeType"] == "text/plain":
                data = part["body"].get("data", "")
                return base64.urlsafe_b64decode(data).decode("utf-8", errors="ignore")
    data = payload.get("body", {}).get("data", "")
    if data:
        return base64.urlsafe_b64decode(data).decode("utf-8", errors="ignore")
    return ""
