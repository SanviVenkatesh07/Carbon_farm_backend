# Smart Farm Carbon — Fresh Integrated Version

## Features
- First-screen language selection
- Sign in / create account
- Multilingual interface labels for English, Kannada, Hindi, Tamil and Telugu
- Farm profiles
- Demo market prices
- Crop guidance
- Carbon-credit readiness indicator
- Farm records
- Expense tracking
- Built-in farming chatbot
- FastAPI + SQLite backend
- Vanilla HTML/CSS/JavaScript frontend served by the same FastAPI app

## Run on Windows

Open the project folder in VS Code, open Terminal and run:

```powershell
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Then open:

http://127.0.0.1:8000/

Do NOT open `/app.js` directly. The frontend is loaded from `/`.

## Project structure

carbon_farm_fresh/
├── app/
│   ├── main.py
│   ├── database.py
│   ├── models.py
│   ├── schemas.py
│   └── routers/
└── frontend/
    ├── index.html
    ├── app.js
    └── style.css
