from fastapi import FastAPI, HTTPException, Header
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel
import sqlite3
import hashlib
import secrets
import os


# =========================================================
# GREENHARVEST BACKEND
# =========================================================

app = FastAPI(
    title="GreenHarvest",
    version="2.0.0",
    description="Smart farming and carbon-credit readiness platform"
)


# =========================================================
# CORS
# =========================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# =========================================================
# PATHS
# =========================================================

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FRONTEND_DIR = os.path.join(BASE_DIR, "frontend")
DATABASE_PATH = os.path.join(BASE_DIR, "greenharvest.db")


# =========================================================
# 27 LANGUAGES
# =========================================================

LANGUAGES = {
    "en": "English",
    "hi": "हिन्दी",
    "kn": "ಕನ್ನಡ",
    "ta": "தமிழ்",
    "te": "తెలుగు",
    "ml": "മലയാളം",
    "mr": "मराठी",
    "bn": "বাংলা",
    "gu": "ગુજરાતી",
    "pa": "ਪੰਜਾਬੀ",
    "as": "অসমীয়া",
    "or": "ଓଡ଼ିଆ",
    "ur": "اردو",
    "sa": "संस्कृतम्",
    "ne": "नेपाली",
    "kok": "कोंकणी",
    "mai": "मैथिली",
    "ks": "कश्मीरी",
    "sd": "सिंधी",
    "doi": "डोगरी",
    "mni": "মণিপুরী",
    "brx": "बोडो",
    "sat": "संथाली",
    "bho": "भोजपुरी",
    "raj": "राजस्थानी",
    "tcy": "ತುಳು",
    "awa": "अवधी"
}


# =========================================================
# TRANSLATIONS
# =========================================================

TRANSLATIONS = {

    "en": {
        "welcome": "Welcome, Farmer",
        "smart": "SMART FARMING ASSISTANT",
        "hero_title": "Grow smarter. Farm sustainably.",
        "hero_text": "Get practical guidance for crops, irrigation, fertilizers, pests and carbon-credit readiness.",
        "help": "What do you need help with?",
        "choose": "Choose an option to get started.",
        "crop": "Crop Guidance",
        "crop_desc": "Get advice for your crops",
        "irrigation": "Irrigation",
        "irrigation_desc": "Plan efficient watering",
        "fertilizer": "Fertilizers",
        "fertilizer_desc": "Improve nutrient management",
        "pests": "Pest Management",
        "pests_desc": "Identify and manage crop pests",
        "market": "Market Prices",
        "market_desc": "Check raw-material prices",
        "carbon": "Carbon Credits",
        "carbon_desc": "Check your carbon-credit readiness",
        "assistant": "Ask GreenHarvest",
        "assistant_desc": "Type your question or use the voice assistant for help.",
        "ask": "Ask Assistant",
        "change_language": "Change Language",
        "logout": "Logout"
    },

    "hi": {
        "welcome": "किसान, आपका स्वागत है",
        "smart": "स्मार्ट खेती सहायक",
        "hero_title": "समझदारी से उगाएं। टिकाऊ खेती करें।",
        "hero_text": "फसल, सिंचाई, उर्वरक, कीट और कार्बन क्रेडिट की जानकारी प्राप्त करें।",
        "help": "आपको किस मदद की आवश्यकता है?",
        "choose": "शुरू करने के लिए एक विकल्प चुनें।",
        "crop": "फसल मार्गदर्शन",
        "crop_desc": "अपनी फसल के लिए सलाह प्राप्त करें",
        "irrigation": "सिंचाई",
        "irrigation_desc": "कुशल सिंचाई की योजना बनाएं",
        "fertilizer": "उर्वरक",
        "fertilizer_desc": "पोषक तत्व प्रबंधन सुधारें",
        "pests": "कीट प्रबंधन",
        "pests_desc": "फसल के कीटों की पहचान करें",
        "market": "बाजार भाव",
        "market_desc": "कच्चे माल की कीमत देखें",
        "carbon": "कार्बन क्रेडिट",
        "carbon_desc": "कार्बन क्रेडिट की तैयारी जांचें",
        "assistant": "GreenHarvest से पूछें",
        "assistant_desc": "अपना प्रश्न लिखें या वॉइस असिस्टेंट का उपयोग करें।",
        "ask": "सहायक से पूछें",
        "change_language": "भाषा बदलें",
        "logout": "लॉग आउट"
    },

    "kn": {
        "welcome": "ರೈತರಿಗೆ ಸ್ವಾಗತ",
        "smart": "ಸ್ಮಾರ್ಟ್ ಕೃಷಿ ಸಹಾಯಕ",
        "hero_title": "ಚಾಣಾಕ್ಷವಾಗಿ ಬೆಳೆಸಿ. ಸುಸ್ಥಿರವಾಗಿ ಕೃಷಿ ಮಾಡಿ.",
        "hero_text": "ಬೆಳೆಗಳು, ನೀರಾವರಿ, ಗೊಬ್ಬರ, ಕೀಟಗಳು ಮತ್ತು ಕಾರ್ಬನ್ ಕ್ರೆಡಿಟ್ ಕುರಿತು ಮಾರ್ಗದರ್ಶನ ಪಡೆಯಿರಿ.",
        "help": "ನಿಮಗೆ ಯಾವ ಸಹಾಯ ಬೇಕು?",
        "choose": "ಪ್ರಾರಂಭಿಸಲು ಒಂದು ಆಯ್ಕೆಯನ್ನು ಆರಿಸಿ.",
        "crop": "ಬೆಳೆ ಮಾರ್ಗದರ್ಶನ",
        "crop_desc": "ನಿಮ್ಮ ಬೆಳೆಗಳಿಗೆ ಸಲಹೆ ಪಡೆಯಿರಿ",
        "irrigation": "ನೀರಾವರಿ",
        "irrigation_desc": "ಪರಿಣಾಮಕಾರಿ ನೀರಾವರಿ ಯೋಜಿಸಿ",
        "fertilizer": "ಗೊಬ್ಬರ",
        "fertilizer_desc": "ಪೋಷಕಾಂಶ ನಿರ್ವಹಣೆ ಸುಧಾರಿಸಿ",
        "pests": "ಕೀಟ ನಿರ್ವಹಣೆ",
        "pests_desc": "ಬೆಳೆ ಕೀಟಗಳನ್ನು ಗುರುತಿಸಿ",
        "market": "ಮಾರುಕಟ್ಟೆ ಬೆಲೆಗಳು",
        "market_desc": "ಕಚ್ಚಾ ವಸ್ತುಗಳ ಬೆಲೆ ಪರಿಶೀಲಿಸಿ",
        "carbon": "ಕಾರ್ಬನ್ ಕ್ರೆಡಿಟ್",
        "carbon_desc": "ಕಾರ್ಬನ್ ಕ್ರೆಡಿಟ್ ಸಿದ್ಧತೆಯನ್ನು ಪರಿಶೀಲಿಸಿ",
        "assistant": "GreenHarvest ಅನ್ನು ಕೇಳಿ",
        "assistant_desc": "ನಿಮ್ಮ ಪ್ರಶ್ನೆಯನ್ನು ಟೈಪ್ ಮಾಡಿ ಅಥವಾ ಧ್ವನಿ ಸಹಾಯಕ ಬಳಸಿ.",
        "ask": "ಸಹಾಯಕರನ್ನು ಕೇಳಿ",
        "change_language": "ಭಾಷೆ ಬದಲಿಸಿ",
        "logout": "ಲಾಗ್ ಔಟ್"
    },

    "ta": {
        "welcome": "விவசாயிக்கு வரவேற்பு",
        "smart": "ஸ்மார்ட் விவசாய உதவியாளர்",
        "hero_title": "சிறப்பாக வளருங்கள். நிலையான விவசாயம் செய்யுங்கள்.",
        "hero_text": "பயிர்கள், நீர்ப்பாசனம், உரங்கள், பூச்சிகள் மற்றும் கார்பன் கிரெடிட் பற்றிய வழிகாட்டுதலைப் பெறுங்கள்.",
        "help": "உங்களுக்கு என்ன உதவி தேவை?",
        "choose": "தொடங்க ஒரு விருப்பத்தைத் தேர்ந்தெடுக்கவும்.",
        "crop": "பயிர் வழிகாட்டுதல்",
        "crop_desc": "உங்கள் பயிர்களுக்கு ஆலோசனை பெறுங்கள்",
        "irrigation": "நீர்ப்பாசனம்",
        "irrigation_desc": "திறமையான நீர்ப்பாசனத்தைத் திட்டமிடுங்கள்",
        "fertilizer": "உரங்கள்",
        "fertilizer_desc": "ஊட்டச்சத்து மேலாண்மையை மேம்படுத்துங்கள்",
        "pests": "பூச்சி மேலாண்மை",
        "pests_desc": "பயிர் பூச்சிகளை அடையாளம் காணுங்கள்",
        "market": "சந்தை விலைகள்",
        "market_desc": "மூலப்பொருட்களின் விலைகளைப் பாருங்கள்",
        "carbon": "கார்பன் கிரெடிட்",
        "carbon_desc": "கார்பன் கிரெடிட் தயார்நிலையைச் சரிபார்க்கவும்",
        "assistant": "GreenHarvest-ஐ கேளுங்கள்",
        "assistant_desc": "உங்கள் கேள்வியைத் தட்டச்சு செய்யவும் அல்லது குரல் உதவியாளரைப் பயன்படுத்தவும்.",
        "ask": "உதவியாளரைக் கேளுங்கள்",
        "change_language": "மொழியை மாற்றவும்",
        "logout": "வெளியேறு"
    }
}


# =========================================================
# DATABASE
# =========================================================

def get_db():
    connection = sqlite3.connect(DATABASE_PATH)
    connection.row_factory = sqlite3.Row
    return connection


def initialize_database():
    db = get_db()

    db.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            language TEXT DEFAULT 'en'
        )
    """)

    db.commit()
    db.close()


initialize_database()


# =========================================================
# PASSWORD SECURITY
# =========================================================

def hash_password(password: str) -> str:
    salt = secrets.token_hex(16)

    hashed = hashlib.pbkdf2_hmac(
        "sha256",
        password.encode("utf-8"),
        salt.encode("utf-8"),
        100000
    )

    return f"{salt}${hashed.hex()}"


def verify_password(password: str, stored_password: str) -> bool:
    try:
        salt, stored_hash = stored_password.split("$")

        hashed = hashlib.pbkdf2_hmac(
            "sha256",
            password.encode("utf-8"),
            salt.encode("utf-8"),
            100000
        )

        return secrets.compare_digest(
            hashed.hex(),
            stored_hash
        )

    except Exception:
        return False


# =========================================================
# TEMPORARY LOGIN SESSIONS
# =========================================================

sessions = {}


# =========================================================
# REQUEST MODELS
# =========================================================

class SignupRequest(BaseModel):
    name: str
    email: str
    password: str
    language: str = "en"


class LoginRequest(BaseModel):
    email: str
    password: str


class LanguageRequest(BaseModel):
    language: str


class ChatRequest(BaseModel):
    message: str


# =========================================================
# HEALTH
# =========================================================

@app.get("/api/health")
def health():
    return {
        "status": "ok",
        "message": "GreenHarvest backend is running"
    }


# =========================================================
# LANGUAGES
# =========================================================

@app.get("/api/languages")
def get_languages():
    return {
        "languages": [
            {
                "code": code,
                "name": name
            }
            for code, name in LANGUAGES.items()
        ]
    }


@app.get("/api/translations/{language}")
def get_translations(language: str):

    language = language.lower()

    if language in TRANSLATIONS:
        return {
            "language": language,
            "translations": TRANSLATIONS[language]
        }

    # For the remaining languages, return English
    # until their full translation dictionary is added.
    return {
        "language": language,
        "translations": TRANSLATIONS["en"]
    }


# =========================================================
# SIGN UP
# =========================================================

@app.post("/api/auth/signup")
def signup(data: SignupRequest):

    name = data.name.strip()
    email = data.email.strip().lower()
    password = data.password.strip()

    if not name:
        raise HTTPException(
            status_code=400,
            detail="Please enter your name."
        )

    if not email:
        raise HTTPException(
            status_code=400,
            detail="Please enter your email."
        )

    if len(password) < 6:
        raise HTTPException(
            status_code=400,
            detail="Password must contain at least 6 characters."
        )

    if data.language not in LANGUAGES:
        data.language = "en"

    db = get_db()

    existing_user = db.execute(
        "SELECT id FROM users WHERE email = ?",
        (email,)
    ).fetchone()

    if existing_user:
        db.close()

        raise HTTPException(
            status_code=400,
            detail="An account with this email already exists."
        )

    password_hash = hash_password(password)

    cursor = db.execute(
        """
        INSERT INTO users (name, email, password, language)
        VALUES (?, ?, ?, ?)
        """,
        (
            name,
            email,
            password_hash,
            data.language
        )
    )

    user_id = cursor.lastrowid

    db.commit()
    db.close()

    token = secrets.token_urlsafe(32)

    sessions[token] = user_id

    return {
        "success": True,
        "message": "Account created successfully.",
        "token": token,
        "user": {
            "id": user_id,
            "name": name,
            "email": email,
            "language": data.language
        }
    }


# =========================================================
# LOGIN
# =========================================================

@app.post("/api/auth/login")
def login(data: LoginRequest):

    email = data.email.strip().lower()

    db = get_db()

    user = db.execute(
        """
        SELECT id, name, email, password, language
        FROM users
        WHERE email = ?
        """,
        (email,)
    ).fetchone()

    db.close()

    if not user:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password."
        )

    if not verify_password(
        data.password,
        user["password"]
    ):
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password."
        )

    token = secrets.token_urlsafe(32)

    sessions[token] = user["id"]

    return {
        "success": True,
        "message": "Login successful.",
        "token": token,
        "user": {
            "id": user["id"],
            "name": user["name"],
            "email": user["email"],
            "language": user["language"]
        }
    }


# =========================================================
# AUTHENTICATION HELPER
# =========================================================

def get_current_user(authorization: str | None):

    if not authorization:
        raise HTTPException(
            status_code=401,
            detail="Please sign in first."
        )

    if not authorization.startswith("Bearer "):
        raise HTTPException(
            status_code=401,
            detail="Invalid authentication token."
        )

    token = authorization.replace(
        "Bearer ",
        "",
        1
    ).strip()

    user_id = sessions.get(token)

    if not user_id:
        raise HTTPException(
            status_code=401,
            detail="Your session has expired. Please sign in again."
        )

    db = get_db()

    user = db.execute(
        """
        SELECT id, name, email, language
        FROM users
        WHERE id = ?
        """,
        (user_id,)
    ).fetchone()

    db.close()

    if not user:
        raise HTTPException(
            status_code=401,
            detail="User account not found."
        )

    return user


# =========================================================
# CURRENT USER
# =========================================================

@app.get("/api/auth/me")
def current_user(
    authorization: str | None = Header(default=None)
):

    user = get_current_user(authorization)

    return {
        "success": True,
        "user": {
            "id": user["id"],
            "name": user["name"],
            "email": user["email"],
            "language": user["language"]
        }
    }


# =========================================================
# CHANGE LANGUAGE
# =========================================================

@app.put("/api/auth/language")
def change_language(
    data: LanguageRequest,
    authorization: str | None = Header(default=None)
):

    user = get_current_user(authorization)

    if data.language not in LANGUAGES:
        raise HTTPException(
            status_code=400,
            detail="Invalid language."
        )

    db = get_db()

    db.execute(
        """
        UPDATE users
        SET language = ?
        WHERE id = ?
        """,
        (
            data.language,
            user["id"]
        )
    )

    db.commit()
    db.close()

    return {
        "success": True,
        "language": data.language
    }


# =========================================================
# LOGOUT
# =========================================================

@app.post("/api/auth/logout")
def logout(
    authorization: str | None = Header(default=None)
):

    if authorization and authorization.startswith("Bearer "):

        token = authorization.replace(
            "Bearer ",
            "",
            1
        ).strip()

        sessions.pop(token, None)

    return {
        "success": True,
        "message": "Logged out successfully."
    }


# =========================================================
# FEATURE DATA
# =========================================================

FEATURES = {

    "crop": {
        "title": "Crop Guidance",
        "icon": "🌾",
        "description": "Get practical guidance for selecting crops, crop care and sustainable farming."
    },

    "irrigation": {
        "title": "Irrigation",
        "icon": "💧",
        "description": "Plan efficient watering based on crop needs, soil conditions and weather."
    },

    "fertilizer": {
        "title": "Fertilizers",
        "icon": "🌱",
        "description": "Improve nutrient management and reduce unnecessary fertilizer use."
    },

    "pests": {
        "title": "Pest Management",
        "icon": "🐛",
        "description": "Learn about common crop pests and sustainable management practices."
    },

    "market": {
        "title": "Market Prices",
        "icon": "📈",
        "description": "Check raw-material and agricultural market information."
    },

    "carbon": {
        "title": "Carbon Credits",
        "icon": "♻️",
        "description": "Understand carbon-credit readiness and sustainable farming practices."
    }
}


@app.get("/api/features")
def get_features(
    authorization: str | None = Header(default=None)
):

    get_current_user(authorization)

    return {
        "features": FEATURES
    }


@app.get("/api/features/{feature_name}")
def get_feature(
    feature_name: str,
    authorization: str | None = Header(default=None)
):

    get_current_user(authorization)

    if feature_name not in FEATURES:
        raise HTTPException(
            status_code=404,
            detail="Feature not found."
        )

    return {
        "success": True,
        "feature": FEATURES[feature_name]
    }


# =========================================================
# CHAT ASSISTANT
# =========================================================

@app.post("/api/chat")
def chat(
    data: ChatRequest,
    authorization: str | None = Header(default=None)
):

    get_current_user(authorization)

    message = data.message.lower().strip()

    if not message:
        return {
            "reply": "Please type a question so I can help you."
        }

    if "irrigation" in message or "water" in message:
        reply = (
            "For efficient irrigation, consider your crop type, "
            "soil condition, weather and current moisture level. "
            "Avoid unnecessary watering."
        )

    elif "fertilizer" in message or "fertiliser" in message:
        reply = (
            "Fertilizer decisions should be based on crop needs "
            "and soil nutrient conditions. Avoid applying more "
            "than the crop requires."
        )

    elif "pest" in message or "insect" in message:
        reply = (
            "For pest management, first identify the pest and "
            "check the affected area. Integrated pest management "
            "can help reduce unnecessary chemical use."
        )

    elif "carbon" in message:
        reply = (
            "Carbon-credit readiness can involve sustainable "
            "farming practices, soil health, reduced emissions "
            "and keeping reliable farm records."
        )

    elif "crop" in message:
        reply = (
            "I can help you think about crop selection, crop care, "
            "irrigation, nutrients and pest management."
        )

    else:
        reply = (
            "I can help with crops, irrigation, fertilizers, "
            "pests, market prices and carbon-credit readiness."
        )

    return {
        "reply": reply
    }


# =========================================================
# FRONTEND
# =========================================================

if os.path.exists(FRONTEND_DIR):

    app.mount(
        "/static",
        StaticFiles(directory=FRONTEND_DIR),
        name="static"
    )


@app.get("/")
def serve_frontend():

    index_file = os.path.join(
        FRONTEND_DIR,
        "index.html"
    )

    if os.path.exists(index_file):
        return FileResponse(index_file)

    return {
        "message": "GreenHarvest backend is running, but frontend/index.html was not found."
    }