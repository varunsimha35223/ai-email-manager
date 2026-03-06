import os
import msal
import httpx
from dotenv import load_dotenv

load_dotenv()

CLIENT_ID = os.getenv("OUTLOOK_CLIENT_ID")
CLIENT_SECRET = os.getenv("OUTLOOK_CLIENT_SECRET")
REDIRECT_URI = os.getenv("OUTLOOK_REDIRECT_URI")
AUTHORITY = "https://login.microsoftonline.com/common"
SCOPES = ["Mail.Read", "User.Read"]
GRAPH_URL = "https://graph.microsoft.com/v1.0"


def get_auth_url() -> str:
    app = msal.ConfidentialClientApplication(CLIENT_ID, CLIENT_SECRET, authority=AUTHORITY)
    return app.get_authorization_request_url(SCOPES, redirect_uri=REDIRECT_URI)


def exchange_code(code: str) -> dict:
    app = msal.ConfidentialClientApplication(CLIENT_ID, CLIENT_SECRET, authority=AUTHORITY)
    result = app.acquire_token_by_authorization_code(code, scopes=SCOPES, redirect_uri=REDIRECT_URI)
    if "access_token" not in result:
        raise ValueError(f"Token error: {result.get('error_description')}")
    return {"access_token": result["access_token"]}


def fetch_emails(credentials: dict, max_results: int = 20) -> list[dict]:
    token = credentials["access_token"]
    headers = {"Authorization": f"Bearer {token}"}

    with httpx.Client() as client:
        resp = client.get(
            f"{GRAPH_URL}/me/mailFolders/inbox/messages",
            headers=headers,
            params={"$top": max_results, "$select": "id,subject,from,receivedDateTime,body"},
        )
        resp.raise_for_status()
        messages = resp.json().get("value", [])

    emails = []
    for msg in messages:
        emails.append({
            "id": msg["id"],
            "sender": msg.get("from", {}).get("emailAddress", {}).get("address", ""),
            "subject": msg.get("subject", "(No Subject)"),
            "date": msg.get("receivedDateTime", ""),
            "body": msg.get("body", {}).get("content", "")[:1000],
            "provider": "outlook",
        })
    return emails
