# AI Email Manager

An intelligent email manager that connects to Gmail and Outlook, then uses Groq + Llama 3 to:
- **Categorize** emails automatically (Urgent, Work, Personal, Newsletter, etc.)
- **Flag** urgent emails that need immediate attention
- **Draft** smart replies for each email
- **Summarize** your inbox into a daily digest

## Tech Stack

- **Frontend:** React + Tailwind CSS → Vercel
- **Backend:** FastAPI (Python) → Render
- **LLM:** Groq API (free) — Llama 3 70B
- **Email:** Gmail API + Microsoft Graph (Outlook)

---

## Setup

### 1. Get Your API Keys

| Service | Where to get it | Cost |
|---------|----------------|------|
| Groq API | [console.groq.com](https://console.groq.com) | Free |
| Gmail API | [console.cloud.google.com](https://console.cloud.google.com) | Free |
| Outlook API | [portal.azure.com](https://portal.azure.com) | Free |

### 2. Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt

cp .env.example .env
# Fill in your API keys in .env

uvicorn main:app --reload
```

Backend runs at `http://localhost:8000`

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at `http://localhost:5173`

---

## Deployment

### Deploy Backend → Render (Free)

1. Push this repo to GitHub
2. Go to [render.com](https://render.com) → New Web Service
3. Connect your GitHub repo → select the `backend/` folder
4. Set environment: `Python`, Build: `pip install -r requirements.txt`, Start: `uvicorn main:app --host 0.0.0.0 --port $PORT`
5. Add all `.env` variables in the Render dashboard

### Deploy Frontend → Vercel (Free)

1. Go to [vercel.com](https://vercel.com) → New Project
2. Connect your GitHub repo → set Root Directory to `frontend/`
3. Add environment variable: `VITE_API_URL=https://your-render-backend-url.com`
4. Deploy

---

## Project Structure

```
ai-email-manager/
├── backend/
│   ├── main.py           # FastAPI routes
│   ├── ai_engine.py      # Groq LLM — categorize, reply, summarize
│   ├── gmail_client.py   # Gmail OAuth + email fetching
│   ├── outlook_client.py # Outlook OAuth + email fetching
│   └── requirements.txt
└── frontend/
    └── src/
        ├── pages/
        │   ├── Home.jsx      # Connect Gmail/Outlook
        │   ├── Inbox.jsx     # Email list with filters
        │   ├── EmailView.jsx # Email detail + AI draft reply
        │   └── Summary.jsx   # Daily summary
        └── components/
            ├── EmailCard.jsx
            └── CategoryBadge.jsx
```
