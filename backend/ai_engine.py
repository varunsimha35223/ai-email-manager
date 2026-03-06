from groq import Groq
import os
from dotenv import load_dotenv

load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))
MODEL = "llama-3.3-70b-versatile"

CATEGORIES = ["Urgent", "Work", "Newsletter", "Personal", "Spam", "Finance", "Social"]


def _chat(prompt: str) -> str:
    response = client.chat.completions.create(
        model=MODEL,
        messages=[{"role": "user", "content": prompt}],
        temperature=0.3,
    )
    return response.choices[0].message.content.strip()


def categorize_email(subject: str, sender: str, body: str) -> str:
    prompt = f"""You are an email classifier. Classify the email below into exactly one of these categories:
{', '.join(CATEGORIES)}

Email:
From: {sender}
Subject: {subject}
Body: {body[:500]}

Reply with only the category name, nothing else."""
    result = _chat(prompt)
    for cat in CATEGORIES:
        if cat.lower() in result.lower():
            return cat
    return "Work"


def is_urgent(subject: str, body: str) -> bool:
    prompt = f"""Is this email urgent and requires immediate attention? Reply with only YES or NO.

Subject: {subject}
Body: {body[:400]}"""
    result = _chat(prompt)
    return "yes" in result.lower()


def draft_reply(subject: str, sender: str, body: str) -> str:
    prompt = f"""You are a professional email assistant. Write a concise, professional reply to the email below.
Keep it friendly, clear, and under 150 words. Do not add a subject line.

From: {sender}
Subject: {subject}
Body: {body[:600]}

Write only the reply body:"""
    return _chat(prompt)


def daily_summary(emails: list[dict]) -> str:
    if not emails:
        return "No new emails today."

    email_list = "\n".join(
        [f"- From: {e['sender']} | Subject: {e['subject']} | Category: {e.get('category', 'Unknown')}"
         for e in emails[:20]]
    )

    prompt = f"""You are an executive assistant. Summarize the following emails into a clean daily digest.
Group by category, highlight urgent ones, and end with a recommended action list.

Emails:
{email_list}

Write a clear, structured summary:"""
    return _chat(prompt)


def process_email(email: dict) -> dict:
    subject = email.get("subject", "")
    sender = email.get("sender", "")
    body = email.get("body", "")

    prompt = f"""Analyze this email and respond in exactly this format:
CATEGORY: <one of: Urgent, Work, Newsletter, Personal, Spam, Finance, Social>
URGENT: <YES or NO>
REPLY: <a concise professional reply under 100 words>

Email:
From: {sender}
Subject: {subject}
Body: {body[:500]}"""

    result = _chat(prompt)

    category = "Work"
    urgent = False
    draft = ""

    for line in result.splitlines():
        if line.startswith("CATEGORY:"):
            val = line.replace("CATEGORY:", "").strip()
            for cat in CATEGORIES:
                if cat.lower() in val.lower():
                    category = cat
                    break
        elif line.startswith("URGENT:"):
            urgent = "yes" in line.lower()
        elif line.startswith("REPLY:"):
            draft = line.replace("REPLY:", "").strip()

    email["category"] = category
    email["urgent"] = urgent
    email["draft_reply"] = draft
    return email
