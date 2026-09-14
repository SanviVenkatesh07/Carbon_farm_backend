/* =========================================================
   GREENHARVEST - MAIN FRONTEND JAVASCRIPT
   ========================================================= */

const API_BASE = "/api";

let selectedLanguage = "English";
let currentUser = null;
let currentFeature = null;

/* =========================================================
   27 LANGUAGES
   ========================================================= */

const languages = [
    { code: "en", name: "English" },
    { code: "kn", name: "ಕನ್ನಡ" },
    { code: "hi", name: "हिन्दी" },
    { code: "ta", name: "தமிழ்" },
    { code: "te", name: "తెలుగు" },
    { code: "ml", name: "മലയാളം" },
    { code: "mr", name: "मराठी" },
    { code: "gu", name: "ગુજરાતી" },
    { code: "bn", name: "বাংলা" },
    { code: "pa", name: "ਪੰਜਾਬੀ" },
    { code: "or", name: "ଓଡ଼ିଆ" },
    { code: "as", name: "অসমীয়া" },
    { code: "ur", name: "اردو" },
    { code: "ne", name: "नेपाली" },
    { code: "si", name: "සිංහල" },
    { code: "ar", name: "العربية" },
    { code: "fr", name: "Français" },
    { code: "es", name: "Español" },
    { code: "de", name: "Deutsch" },
    { code: "it", name: "Italiano" },
    { code: "pt", name: "Português" },
    { code: "ru", name: "Русский" },
    { code: "ja", name: "日本語" },
    { code: "ko", name: "한국어" },
    { code: "zh", name: "中文" },
    { code: "th", name: "ไทย" },
    { code: "id", name: "Bahasa Indonesia" }
];


/* =========================================================
   TRANSLATIONS
   ========================================================= */

const translations = {

    English: {
        chooseLanguage: "Choose your language",
        languageText: "Select your preferred language to continue.",
        continue: "Continue",
        signIn: "Sign In",
        createAccount: "Create Account",
        email: "Email",
        password: "Password",
        name: "Full Name",
        confirmPassword: "Confirm Password",
        noAccount: "Don't have an account?",
        haveAccount: "Already have an account?",
        welcome: "Welcome, Farmer",
        changeLanguage: "Change Language",
        logout: "Logout",
        smartFarming: "SMART FARMING ASSISTANT",
        growSmarter: "Grow smarter.<br>Farm sustainably.",
        heroText:
            "Get practical guidance for crops, irrigation, fertilizers, pests and carbon-credit readiness.",
        help: "What do you need help with?",
        chooseOption: "Choose an option to get started.",
        crop: "Crop Guidance",
        cropSmall: "Get advice for your crops",
        irrigation: "Irrigation",
        irrigationSmall: "Plan efficient watering",
        fertilizer: "Fertilizers",
        fertilizerSmall: "Improve nutrient management",
        pests: "Pest Management",
        pestsSmall: "Identify and manage crop pests",
        market: "Market Prices",
        marketSmall: "Check raw-material prices",
        carbon: "Carbon Credits",
        carbonSmall: "Check your carbon-credit readiness",
        assistant: "FARMER ASSISTANT",
        askGreenHarvest: "Ask GreenHarvest",
        assistantText:
            "You can type your question or use the voice assistant for help.",
        askAssistant: "Ask Assistant",
        send: "Send",
        typeQuestion: "Type your question...",
        hello:
            "Hello! I can help with crops, irrigation, fertilizers, pests, market prices and carbon-credit readiness.",
        back: "Back",
        close: "Close",
        loginSuccess: "Login successful!",
        accountSuccess: "Account created successfully!",
        passwordsMismatch: "Passwords do not match.",
        fillAll: "Please fill in all required fields.",
        invalidLogin: "Invalid email or password.",
        somethingWrong: "Something went wrong. Please try again."
    },

    Kannada: {
        chooseLanguage: "ನಿಮ್ಮ ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ",
        languageText: "ಮುಂದುವರಿಯಲು ನಿಮ್ಮ ಇಷ್ಟದ ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ.",
        continue: "ಮುಂದುವರಿಸಿ",
        signIn: "ಸೈನ್ ಇನ್",
        createAccount: "ಖಾತೆ ರಚಿಸಿ",
        email: "ಇಮೇಲ್",
        password: "ಪಾಸ್‌ವರ್ಡ್",
        name: "ಪೂರ್ಣ ಹೆಸರು",
        confirmPassword: "ಪಾಸ್‌ವರ್ಡ್ ದೃಢೀಕರಿಸಿ",
        noAccount: "ಖಾತೆ ಇಲ್ಲವೇ?",
        haveAccount: "ಈಗಾಗಲೇ ಖಾತೆ ಇದೆಯೇ?",
        welcome: "ಸ್ವಾಗತ, ರೈತ",
        changeLanguage: "ಭಾಷೆ ಬದಲಾಯಿಸಿ",
        logout: "ಲಾಗ್ ಔಟ್",
        smartFarming: "ಸ್ಮಾರ್ಟ್ ಕೃಷಿ ಸಹಾಯಕ",
        growSmarter: "ಚುರುಕಾಗಿ ಬೆಳೆಸಿ.<br>ಸುಸ್ಥಿರವಾಗಿ ಕೃಷಿ ಮಾಡಿ.",
        heroText:
            "ಬೆಳೆಗಳು, ನೀರಾವರಿ, ರಸಗೊಬ್ಬರ, ಕೀಟಗಳು ಮತ್ತು ಕಾರ್ಬನ್ ಕ್ರೆಡಿಟ್ ಕುರಿತು ಮಾರ್ಗದರ್ಶನ ಪಡೆಯಿರಿ.",
        help: "ನಿಮಗೆ ಯಾವುದರಲ್ಲಿ ಸಹಾಯ ಬೇಕು?",
        chooseOption: "ಪ್ರಾರಂಭಿಸಲು ಒಂದು ಆಯ್ಕೆಯನ್ನು ಆರಿಸಿ.",
        crop: "ಬೆಳೆ ಮಾರ್ಗದರ್ಶನ",
        cropSmall: "ನಿಮ್ಮ ಬೆಳೆಗಳಿಗೆ ಸಲಹೆ ಪಡೆಯಿರಿ",
        irrigation: "ನೀರಾವರಿ",
        irrigationSmall: "ಸಮರ್ಥ ನೀರಾವರಿ ಯೋಜಿಸಿ",
        fertilizer: "ರಸಗೊಬ್ಬರ",
        fertilizerSmall: "ಪೋಷಕಾಂಶ ನಿರ್ವಹಣೆ ಸುಧಾರಿಸಿ",
        pests: "ಕೀಟ ನಿರ್ವಹಣೆ",
        pestsSmall: "ಬೆಳೆ ಕೀಟಗಳನ್ನು ಗುರುತಿಸಿ ಮತ್ತು ನಿರ್ವಹಿಸಿ",
        market: "ಮಾರುಕಟ್ಟೆ ಬೆಲೆಗಳು",
        marketSmall: "ಕಚ್ಚಾ ವಸ್ತುಗಳ ಬೆಲೆ ಪರಿಶೀಲಿಸಿ",
        carbon: "ಕಾರ್ಬನ್ ಕ್ರೆಡಿಟ್",
        carbonSmall: "ಕಾರ್ಬನ್ ಕ್ರೆಡಿಟ್ ಸಿದ್ಧತೆ ಪರಿಶೀಲಿಸಿ",
        assistant: "ರೈತ ಸಹಾಯಕ",
        askGreenHarvest: "GreenHarvest ಗೆ ಕೇಳಿ",
        assistantText: "ನಿಮ್ಮ ಪ್ರಶ್ನೆಯನ್ನು ಟೈಪ್ ಮಾಡಿ ಅಥವಾ ಧ್ವನಿ ಸಹಾಯಕ ಬಳಸಿ.",
        askAssistant: "ಸಹಾಯಕನನ್ನು ಕೇಳಿ",
        send: "ಕಳುಹಿಸಿ",
        typeQuestion: "ನಿಮ್ಮ ಪ್ರಶ್ನೆಯನ್ನು ಟೈಪ್ ಮಾಡಿ...",
        hello:
            "ನಮಸ್ಕಾರ! ಬೆಳೆಗಳು, ನೀರಾವರಿ, ರಸಗೊಬ್ಬರ, ಕೀಟಗಳು, ಮಾರುಕಟ್ಟೆ ಬೆಲೆಗಳು ಮತ್ತು ಕಾರ್ಬನ್ ಕ್ರೆಡಿಟ್ ಕುರಿತು ನಾನು ಸಹಾಯ ಮಾಡಬಹುದು.",
        back: "ಹಿಂದೆ",
        close: "ಮುಚ್ಚಿ",
        loginSuccess: "ಲಾಗಿನ್ ಯಶಸ್ವಿಯಾಗಿದೆ!",
        accountSuccess: "ಖಾತೆ ಯಶಸ್ವಿಯಾಗಿ ರಚಿಸಲಾಗಿದೆ!",
        passwordsMismatch: "ಪಾಸ್‌ವರ್ಡ್‌ಗಳು ಹೊಂದಿಕೆಯಾಗುತ್ತಿಲ್ಲ.",
        fillAll: "ದಯವಿಟ್ಟು ಅಗತ್ಯವಿರುವ ಎಲ್ಲಾ ಮಾಹಿತಿಯನ್ನು ನಮೂದಿಸಿ.",
        invalidLogin: "ಇಮೇಲ್ ಅಥವಾ ಪಾಸ್‌ವರ್ಡ್ ತಪ್ಪಾಗಿದೆ.",
        somethingWrong: "ಏನೋ ತಪ್ಪಾಗಿದೆ. ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ."
    },

    Hindi: {
        chooseLanguage: "अपनी भाषा चुनें",
        languageText: "जारी रखने के लिए अपनी पसंदीदा भाषा चुनें।",
        continue: "जारी रखें",
        signIn: "साइन इन",
        createAccount: "खाता बनाएं",
        email: "ईमेल",
        password: "पासवर्ड",
        name: "पूरा नाम",
        confirmPassword: "पासवर्ड की पुष्टि करें",
        noAccount: "खाता नहीं है?",
        haveAccount: "पहले से खाता है?",
        welcome: "स्वागत है, किसान",
        changeLanguage: "भाषा बदलें",
        logout: "लॉग आउट",
        smartFarming: "स्मार्ट फार्मिंग सहायक",
        growSmarter: "समझदारी से उगाएं।<br>सतत खेती करें।",
        heroText:
            "फसलों, सिंचाई, उर्वरक, कीट और कार्बन क्रेडिट की जानकारी प्राप्त करें।",
        help: "आपको किस चीज़ में मदद चाहिए?",
        chooseOption: "शुरू करने के लिए एक विकल्प चुनें।",
        crop: "फसल मार्गदर्शन",
        cropSmall: "अपनी फसलों के लिए सलाह लें",
        irrigation: "सिंचाई",
        irrigationSmall: "कुशल सिंचाई की योजना बनाएं",
        fertilizer: "उर्वरक",
        fertilizerSmall: "पोषक तत्व प्रबंधन सुधारें",
        pests: "कीट प्रबंधन",
        pestsSmall: "फसल के कीटों की पहचान और प्रबंधन करें",
        market: "बाज़ार मूल्य",
        marketSmall: "कच्चे माल की कीमत देखें",
        carbon: "कार्बन क्रेडिट",
        carbonSmall: "कार्बन क्रेडिट की तैयारी जांचें",
        assistant: "किसान सहायक",
        askGreenHarvest: "GreenHarvest से पूछें",
        assistantText: "अपना सवाल टाइप करें या वॉइस असिस्टेंट का उपयोग करें।",
        askAssistant: "सहायक से पूछें",
        send: "भेजें",
        typeQuestion: "अपना सवाल लिखें...",
        hello:
            "नमस्ते! मैं फसल, सिंचाई, उर्वरक, कीट, बाज़ार मूल्य और कार्बन क्रेडिट में मदद कर सकता हूँ।",
        back: "वापस",
        close: "बंद करें",
        loginSuccess: "लॉगिन सफल हुआ!",
        accountSuccess: "खाता सफलतापूर्वक बनाया गया!",
        passwordsMismatch: "पासवर्ड मेल नहीं खाते।",
        fillAll: "कृपया सभी आवश्यक जानकारी भरें।",
        invalidLogin: "ईमेल या पासवर्ड गलत है।",
        somethingWrong: "कुछ गलत हुआ। कृपया पुनः प्रयास करें।"
    },

    Tamil: {
        chooseLanguage: "உங்கள் மொழியைத் தேர்ந்தெடுக்கவும்",
        languageText: "தொடர உங்கள் விருப்பமான மொழியைத் தேர்ந்தெடுக்கவும்.",
        continue: "தொடரவும்",
        signIn: "உள்நுழைக",
        createAccount: "கணக்கை உருவாக்கவும்",
        email: "மின்னஞ்சல்",
        password: "கடவுச்சொல்",
        name: "முழுப் பெயர்",
        confirmPassword: "கடவுச்சொல்லை உறுதிப்படுத்தவும்",
        noAccount: "கணக்கு இல்லையா?",
        haveAccount: "ஏற்கனவே கணக்கு உள்ளதா?",
        welcome: "வரவேற்கிறோம், விவசாயி",
        changeLanguage: "மொழியை மாற்றவும்",
        logout: "வெளியேறு",
        smartFarming: "ஸ்மார்ட் விவசாய உதவியாளர்",
        growSmarter: "புத்திசாலித்தனமாக வளர்க்கவும்.<br>நிலையான விவசாயம் செய்யவும்.",
        heroText:
            "பயிர்கள், நீர்ப்பாசனம், உரங்கள், பூச்சிகள் மற்றும் கார்பன் கிரெடிட் குறித்து வழிகாட்டுதல் பெறுங்கள்.",
        help: "உங்களுக்கு எதில் உதவி தேவை?",
        chooseOption: "தொடங்க ஒரு விருப்பத்தைத் தேர்ந்தெடுக்கவும்.",
        crop: "பயிர் வழிகாட்டுதல்",
        cropSmall: "உங்கள் பயிர்களுக்கு ஆலோசனை பெறுங்கள்",
        irrigation: "நீர்ப்பாசனம்",
        irrigationSmall: "திறமையான நீர்ப்பாசனத்தைத் திட்டமிடுங்கள்",
        fertilizer: "உரங்கள்",
        fertilizerSmall: "ஊட்டச்சத்து மேலாண்மையை மேம்படுத்துங்கள்",
        pests: "பூச்சி மேலாண்மை",
        pestsSmall: "பயிர் பூச்சிகளை கண்டறிந்து நிர்வகிக்கவும்",
        market: "சந்தை விலைகள்",
        marketSmall: "மூலப்பொருட்களின் விலையைப் பார்க்கவும்",
        carbon: "கார்பன் கிரெடிட்",
        carbonSmall: "கார்பன் கிரெடிட் தயார்நிலையைச் சரிபார்க்கவும்",
        assistant: "விவசாயி உதவியாளர்",
        askGreenHarvest: "GreenHarvest-ஐ கேளுங்கள்",
        assistantText: "உங்கள் கேள்வியைத் தட்டச்சு செய்யவும் அல்லது குரல் உதவியாளரைப் பயன்படுத்தவும்.",
        askAssistant: "உதவியாளரிடம் கேளுங்கள்",
        send: "அனுப்பு",
        typeQuestion: "உங்கள் கேள்வியை எழுதுங்கள்...",
        hello:
            "வணக்கம்! பயிர்கள், நீர்ப்பாசனம், உரங்கள், பூச்சிகள், சந்தை விலைகள் மற்றும் கார்பன் கிரெடிட் குறித்து உதவ முடியும்.",
        back: "பின்னால்",
        close: "மூடு",
        loginSuccess: "உள்நுழைவு வெற்றி!",
        accountSuccess: "கணக்கு வெற்றிகரமாக உருவாக்கப்பட்டது!",
        passwordsMismatch: "கடவுச்சொற்கள் பொருந்தவில்லை.",
        fillAll: "தேவையான அனைத்து தகவல்களையும் நிரப்பவும்.",
        invalidLogin: "மின்னஞ்சல் அல்லது கடவுச்சொல் தவறானது.",
            somethingWrong: "ஏதோ தவறு ஏற்பட்டது. மீண்டும் முயற்சிக்கவும்."
    },

    Telugu: {
        chooseLanguage: "మీ భాషను ఎంచుకోండి",
        languageText: "కొనసాగించడానికి మీకు ఇష్టమైన భాషను ఎంచుకోండి.",
        continue: "కొనసాగించండి",
        signIn: "సైన్ ఇన్",
        createAccount: "ఖాతాను సృష్టించండి",
        email: "ఇమెయిల్",
        password: "పాస్‌వర్డ్",
        name: "పూర్తి పేరు",
        confirmPassword: "పాస్‌వర్డ్‌ను నిర్ధారించండి",
        noAccount: "ఖాతా లేదా?",
        haveAccount: "ఇప్పటికే ఖాతా ఉందా?",
        welcome: "స్వాగతం, రైతు",
        changeLanguage: "భాషను మార్చండి",
        logout: "లాగ్ అవుట్",
        smartFarming: "స్మార్ట్ వ్యవసాయ సహాయకుడు",
        growSmarter: "తెలివిగా పండించండి.<br>స్థిరమైన వ్యవసాయం చేయండి.",
        heroText: "పంటలు, నీటిపారుదల, ఎరువులు, తెగుళ్లు మరియు కార్బన్ క్రెడిట్ గురించి మార్గదర్శకత్వం పొందండి.",
        help: "మీకు ఏ విషయంలో సహాయం కావాలి?",
        chooseOption: "ప్రారంభించడానికి ఒక ఎంపికను ఎంచుకోండి.",
        crop: "పంట మార్గదర్శకత్వం",
        cropSmall: "మీ పంటలకు సలహా పొందండి",
        irrigation: "నీటిపారుదల",
        irrigationSmall: "సమర్థవంతమైన నీటిపారుదలని ప్లాన్ చేయండి",
        fertilizer: "ఎరువులు",
        fertilizerSmall: "పోషక నిర్వహణను మెరుగుపరచండి",
        pests: "తెగుళ్ల నిర్వహణ",
        pestsSmall: "పంట తెగుళ్లను గుర్తించి నిర్వహించండి",
        market: "మార్కెట్ ధరలు",
        marketSmall: "ముడి పదార్థాల ధరలను చూడండి",
        carbon: "కార్బన్ క్రెడిట్లు",
        carbonSmall: "కార్బన్ క్రెడిట్ సిద్ధతను తనిఖీ చేయండి",
        assistant: "రైతు సహాయకుడు",
        askGreenHarvest: "GreenHarvest ను అడగండి",
        assistantText: "మీ ప్రశ్నను టైప్ చేయండి లేదా వాయిస్ సహాయకుడిని ఉపయోగించండి.",
        askAssistant: "సహాయకుడిని అడగండి",
        send: "పంపండి",
        typeQuestion: "మీ ప్రశ్నను టైప్ చేయండి...",
        hello: "నమస్కారం! పంటలు, నీటిపారుదల, ఎరువులు, తెగుళ్లు, మార్కెట్ ధరలు మరియు కార్బన్ క్రెడిట్ గురించి నేను సహాయం చేయగలను.",
        back: "వెనుకకు",
        close: "మూసివేయండి",
        loginSuccess: "లాగిన్ విజయవంతమైంది!",
        accountSuccess: "ఖాతా విజయవంతంగా సృష్టించబడింది!",
        passwordsMismatch: "పాస్‌వర్డ్‌లు సరిపోలడం లేదు.",
        fillAll: "దయచేసి అవసరమైన అన్ని వివరాలను పూరించండి.",
        invalidLogin: "ఇమెయిల్ లేదా పాస్‌వర్డ్ తప్పుగా ఉంది.",
        somethingWrong: "ఏదో తప్పు జరిగింది. దయచేసి మళ్లీ ప్రయత్నించండి."
    },

    Malayalam: {
        chooseLanguage: "നിങ്ങളുടെ ഭാഷ തിരഞ്ഞെടുക്കുക",
        languageText: "തുടരാൻ നിങ്ങളുടെ ഇഷ്ടപ്പെട്ട ഭാഷ തിരഞ്ഞെടുക്കുക.",
        continue: "തുടരുക",
        signIn: "സൈൻ ഇൻ",
        createAccount: "അക്കൗണ്ട് സൃഷ്ടിക്കുക",
        email: "ഇമെയിൽ",
        password: "പാസ്‌വേഡ്",
        name: "പൂർണ്ണ പേര്",
        confirmPassword: "പാസ്‌വേഡ് സ്ഥിരീകരിക്കുക",
        noAccount: "അക്കൗണ്ട് ഇല്ലേ?",
        haveAccount: "ഇതിനകം അക്കൗണ്ട് ഉണ്ടോ?",
        welcome: "സ്വാഗതം, കർഷകാ",
        changeLanguage: "ഭാഷ മാറ്റുക",
        logout: "ലോഗ് ഔട്ട്",
        smartFarming: "സ്മാർട്ട് കൃഷി സഹായി",
        growSmarter: "സ്മാർട്ടായി കൃഷി ചെയ്യൂ.<br>സുസ്ഥിരമായി കൃഷി ചെയ്യൂ.",
        heroText: "വിളകൾ, ജലസേചനം, വളങ്ങൾ, കീടങ്ങൾ, കാർബൺ ക്രെഡിറ്റ് എന്നിവയെക്കുറിച്ച് മാർഗ്ഗനിർദ്ദേശം നേടുക.",
        help: "നിങ്ങൾക്ക് എന്ത് സഹായമാണ് വേണ്ടത്?",
        chooseOption: "ആരംഭിക്കാൻ ഒരു ഓപ്ഷൻ തിരഞ്ഞെടുക്കുക.",
        crop: "വിള മാർഗ്ഗനിർദ്ദേശം",
        cropSmall: "നിങ്ങളുടെ വിളകൾക്ക് ഉപദേശം നേടുക",
        irrigation: "ജലസേചനം",
        irrigationSmall: "കാര്യക്ഷമമായ ജലസേചനം ആസൂത്രണം ചെയ്യുക",
        fertilizer: "വളങ്ങൾ",
        fertilizerSmall: "പോഷക പരിപാലനം മെച്ചപ്പെടുത്തുക",
        pests: "കീടനിയന്ത്രണം",
        pestsSmall: "വിള കീടങ്ങളെ തിരിച്ചറിഞ്ഞ് നിയന്ത്രിക്കുക",
        market: "വിപണി വിലകൾ",
        marketSmall: "അസംസ്കൃത വസ്തുക്കളുടെ വില പരിശോധിക്കുക",
        carbon: "കാർബൺ ക്രെഡിറ്റുകൾ",
        carbonSmall: "കാർബൺ ക്രെഡിറ്റ് തയ്യാറെടുപ്പ് പരിശോധിക്കുക",
        assistant: "കർഷക സഹായി",
        askGreenHarvest: "GreenHarvest-നോട് ചോദിക്കുക",
        assistantText: "നിങ്ങളുടെ ചോദ്യം ടൈപ്പ് ചെയ്യുക അല്ലെങ്കിൽ വോയ്സ് അസിസ്റ്റന്റ് ഉപയോഗിക്കുക.",
        askAssistant: "സഹായിയോട് ചോദിക്കുക",
        send: "അയയ്ക്കുക",
        typeQuestion: "നിങ്ങളുടെ ചോദ്യം ടൈപ്പ് ചെയ്യുക...",
        hello: "നമസ്കാരം! വിളകൾ, ജലസേചനം, വളങ്ങൾ, കീടങ്ങൾ, വിപണി വിലകൾ, കാർബൺ ക്രെഡിറ്റ് എന്നിവയിൽ എനിക്ക് സഹായിക്കാനാകും.",
        back: "തിരികെ",
        close: "അടയ്ക്കുക",
        loginSuccess: "ലോഗിൻ വിജയകരമായി!",
        accountSuccess: "അക്കൗണ്ട് വിജയകരമായി സൃഷ്ടിച്ചു!",
        passwordsMismatch: "പാസ്‌വേഡുകൾ പൊരുത്തപ്പെടുന്നില്ല.",
        fillAll: "ആവശ്യമായ എല്ലാ വിവരങ്ങളും പൂരിപ്പിക്കുക.",
        invalidLogin: "ഇമെയിൽ അല്ലെങ്കിൽ പാസ്‌വേഡ് തെറ്റാണ്.",
        somethingWrong: "എന്തോ തെറ്റ് സംഭവിച്ചു. ദയവായി വീണ്ടും ശ്രമിക്കുക."
    },

    Marathi: {
        chooseLanguage: "तुमची भाषा निवडा",
        languageText: "पुढे जाण्यासाठी तुमची पसंतीची भाषा निवडा.",
        continue: "पुढे जा",
        signIn: "साइन इन",
        createAccount: "खाते तयार करा",
        email: "ईमेल",
        password: "पासवर्ड",
        name: "पूर्ण नाव",
        confirmPassword: "पासवर्डची पुष्टी करा",
        noAccount: "खाते नाही?",
        haveAccount: "आधीच खाते आहे?",
        welcome: "स्वागत आहे, शेतकरी",
        changeLanguage: "भाषा बदला",
        logout: "लॉग आउट",
        smartFarming: "स्मार्ट शेती सहाय्यक",
        growSmarter: "हुशारीने पिकवा.<br>शाश्वत शेती करा.",
        heroText: "पिके, सिंचन, खते, कीड आणि कार्बन क्रेडिटबद्दल मार्गदर्शन मिळवा.",
        help: "तुम्हाला कशात मदत हवी आहे?",
        chooseOption: "सुरुवात करण्यासाठी एक पर्याय निवडा.",
        crop: "पीक मार्गदर्शन",
        cropSmall: "तुमच्या पिकांसाठी सल्ला मिळवा",
        irrigation: "सिंचन",
        irrigationSmall: "कार्यक्षम सिंचनाचे नियोजन करा",
        fertilizer: "खते",
        fertilizerSmall: "पोषक व्यवस्थापन सुधारित करा",
        pests: "कीड व्यवस्थापन",
        pestsSmall: "पिकांवरील किडी ओळखा आणि त्यांचे व्यवस्थापन करा",
        market: "बाजारभाव",
        marketSmall: "कच्च्या मालाच्या किंमती तपासा",
        carbon: "कार्बन क्रेडिट",
        carbonSmall: "कार्बन क्रेडिटची तयारी तपासा",
        assistant: "शेतकरी सहाय्यक",
        askGreenHarvest: "GreenHarvest ला विचारा",
        assistantText: "तुमचा प्रश्न टाइप करा किंवा व्हॉइस असिस्टंट वापरा.",
        askAssistant: "सहाय्यकाला विचारा",
        send: "पाठवा",
        typeQuestion: "तुमचा प्रश्न टाइप करा...",
        hello: "नमस्कार! मी पिके, सिंचन, खते, कीड, बाजारभाव आणि कार्बन क्रेडिटबद्दल मदत करू शकतो.",
        back: "मागे",
        close: "बंद करा",
        loginSuccess: "लॉगिन यशस्वी झाले!",
        accountSuccess: "खाते यशस्वीरित्या तयार झाले!",
        passwordsMismatch: "पासवर्ड जुळत नाहीत.",
        fillAll: "कृपया सर्व आवश्यक माहिती भरा.",
        invalidLogin: "ईमेल किंवा पासवर्ड चुकीचा आहे.",
        somethingWrong: "काहीतरी चूक झाली. कृपया पुन्हा प्रयत्न करा."
    },

    Gujarati: {
        chooseLanguage: "તમારી ભાષા પસંદ કરો",
        languageText: "ચાલુ રાખવા માટે તમારી પસંદગીની ભાષા પસંદ કરો.",
        continue: "ચાલુ રાખો",
        signIn: "સાઇન ઇન",
        createAccount: "એકાઉન્ટ બનાવો",
        email: "ઇમેઇલ",
        password: "પાસવર્ડ",
        name: "પૂરું નામ",
        confirmPassword: "પાસવર્ડની પુષ્ટિ કરો",
        noAccount: "એકાઉન્ટ નથી?",
        haveAccount: "પહેલેથી એકાઉન્ટ છે?",
        welcome: "સ્વાગત છે, ખેડૂત",
        changeLanguage: "ભાષા બદલો",
        logout: "લૉગ આઉટ",
        smartFarming: "સ્માર્ટ ખેતી સહાયક",
        growSmarter: "સમજદારીથી ખેતી કરો.<br>ટકાઉ ખેતી કરો.",
        heroText: "પાક, સિંચાઈ, ખાતર, જીવાતો અને કાર્બન ક્રેડિટ અંગે માર્ગદર્શન મેળવો.",
        help: "તમને શેમાં મદદ જોઈએ છે?",
        chooseOption: "શરૂ કરવા માટે એક વિકલ્પ પસંદ કરો.",
        crop: "પાક માર્ગદર્શન",
        cropSmall: "તમારા પાક માટે સલાહ મેળવો",
        irrigation: "સિંચાઈ",
        irrigationSmall: "કાર્યક્ષમ સિંચાઈનું આયોજન કરો",
        fertilizer: "ખાતર",
        fertilizerSmall: "પોષક તત્વોનું સંચાલન સુધારો",
        pests: "જીવાત વ્યવસ્થાપન",
        pestsSmall: "પાકની જીવાતોને ઓળખો અને તેનું સંચાલન કરો",
        market: "બજાર ભાવ",
        marketSmall: "કાચા માલના ભાવ તપાસો",
        carbon: "કાર્બન ક્રેડિટ",
        carbonSmall: "કાર્બન ક્રેડિટ માટેની તૈયારી તપાસો",
        assistant: "ખેડૂત સહાયક",
        askGreenHarvest: "GreenHarvest ને પૂછો",
        assistantText: "તમારો પ્રશ્ન ટાઇપ કરો અથવા વૉઇસ સહાયકનો ઉપયોગ કરો.",
        askAssistant: "સહાયકને પૂછો",
        send: "મોકલો",
        typeQuestion: "તમારો પ્રશ્ન ટાઇપ કરો...",
        hello: "નમસ્તે! હું પાક, સિંચાઈ, ખાતર, જીવાતો, બજાર ભાવ અને કાર્બન ક્રેડિટ અંગે મદદ કરી શકું છું.",
        back: "પાછા",
        close: "બંધ કરો",
        loginSuccess: "લૉગિન સફળ થયું!",
        accountSuccess: "એકાઉન્ટ સફળતાપૂર્વક બનાવવામાં આવ્યું!",
        passwordsMismatch: "પાસવર્ડ મેળ ખાતા નથી.",
        fillAll: "કૃપા કરીને બધી જરૂરી માહિતી ભરો.",
        invalidLogin: "ઇમેઇલ અથવા પાસવર્ડ ખોટો છે.",
        somethingWrong: "કંઈક ખોટું થયું. કૃપા કરીને ફરી પ્રયાસ કરો."
    }
};


/* =========================================================
   HELPERS
   ========================================================= */

function getTranslation(key) {
    const lang = translations[selectedLanguage];

    if (lang && lang[key]) {
        return lang[key];
    }

    return translations.English[key] || key;
}


function showScreen(id) {
    document.querySelectorAll(".screen").forEach(screen => {
        screen.classList.add("hidden");
    });

    const target = document.getElementById(id);

    if (target) {
        target.classList.remove("hidden");
    }
}


/* =========================================================
   LANGUAGE SCREEN
   ========================================================= */

function setupLanguageDropdown() {

    const select =
        document.getElementById("language-select") ||
        document.getElementById("language");

    if (!select) return;

    select.innerHTML = "";

    languages.forEach(language => {

        const option = document.createElement("option");

        option.value = language.name;
        option.textContent = language.name;

        select.appendChild(option);
    });

    select.value = selectedLanguage;
}


function selectLanguage(language) {

    selectedLanguage = language;

    localStorage.setItem("greenharvest_language", language);

    updateLanguage();

    showScreen("auth-screen");
}


function continueWithLanguage() {

    const select =
        document.getElementById("language-select") ||
        document.getElementById("language");

    if (!select) {
        showScreen("auth-screen");
        switchAuth("login");
        return;
    }

    const selectedCode = select.value;

    const language = languages.find(
        item => item.code === selectedCode || item.name === selectedCode
    );

    if (language) {
        selectedLanguage = language.name;
    }

    localStorage.setItem(
        "greenharvest_language",
        selectedLanguage
    );

    console.log("SELECTED LANGUAGE:", selectedLanguage);

    // Show Auth page first
    showScreen("auth-screen");

    // Open Sign In
    switchAuth("login");

    // Translate Auth page AFTER it is visible
    updateLanguage();
}


function showLanguageScreen() {

    closeFeature();
    closeChat();

    showScreen("language-screen");

    setupLanguageDropdown();

    const select =
        document.getElementById("language-select") ||
        document.getElementById("language");

    if (select) {
        select.value = selectedLanguage;
    }
}


/* =========================================================
   AUTH SCREEN
   ========================================================= */

function switchAuth(mode) {

    const loginForm = document.getElementById("login-form");
    const signupForm = document.getElementById("signup-form");

    const loginTab = document.getElementById("login-tab");
    const signupTab = document.getElementById("signup-tab");

    if (mode === "signup") {

        if (loginForm) loginForm.classList.add("hidden");
        if (signupForm) signupForm.classList.remove("hidden");

        if (loginTab) loginTab.classList.remove("active");
        if (signupTab) signupTab.classList.add("active");

    } else {

        if (signupForm) signupForm.classList.add("hidden");
        if (loginForm) loginForm.classList.remove("hidden");

        if (signupTab) signupTab.classList.remove("active");
        if (loginTab) loginTab.classList.add("active");
    }

    clearAuthMessage();
}
/* =========================================================
   AUTH BUTTON FUNCTIONS - MATCH HTML
   ========================================================= */

function showLogin() {
    switchAuth("login");
}

function showSignup() {
    switchAuth("signup");
}

function loginUser() {
    signIn();
}

function signupUser() {
    createAccount();
}


function showAuthScreen() {
    showScreen("auth-screen");
    switchAuth("login");
}


function clearAuthMessage() {

    const message =
        document.getElementById("auth-message") ||
        document.getElementById("auth-error");

    if (message) {
        message.textContent = "";
        message.className = "";
    }
}


function showAuthMessage(text, type = "error") {

    const message =
        document.getElementById("auth-message") ||
        document.getElementById("auth-error");

    if (!message) {
        alert(text);
        return;
    }

    message.textContent = text;
    message.className = type;
}


/* =========================================================
   SIGN UP
   ========================================================= */

async function createAccount(event) {

    if (event) event.preventDefault();

    const nameInput =
        document.getElementById("signup-name") ||
        document.getElementById("register-name");

    const emailInput =
        document.getElementById("signup-email") ||
        document.getElementById("register-email");

    const passwordInput =
        document.getElementById("signup-password") ||
        document.getElementById("register-password");

   const confirmInput =
    document.getElementById("signup-confirm") ||
    document.getElementById("signup-confirm-password") ||
    document.getElementById("register-confirm-password");

    const name = nameInput ? nameInput.value.trim() : "";
    const email = emailInput ? emailInput.value.trim() : "";
    const password = passwordInput ? passwordInput.value : "";
    const confirmPassword = confirmInput ? confirmInput.value : "";

    if (!name || !email || !password || !confirmPassword) {
        showAuthMessage(getTranslation("fillAll"));
        return;
    }

    if (password !== confirmPassword) {
        showAuthMessage(getTranslation("passwordsMismatch"));
        return;
    }

    try {

        const response = await fetch(`${API_BASE}/auth/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password
            })
        });

        const data = await response.json().catch(() => ({}));

        if (!response.ok) {

            const errorMessage =
                data.detail ||
                data.message ||
                getTranslation("somethingWrong");

            showAuthMessage(errorMessage);
            return;
        }

        showAuthMessage(
            data.message || getTranslation("accountSuccess"),
            "success"
        );

        setTimeout(() => {
            switchAuth("login");

            const loginEmail = document.getElementById("login-email");

            if (loginEmail) {
                loginEmail.value = email;
            }
        }, 800);

    } catch (error) {

        console.error("Registration error:", error);

        showAuthMessage(
            "Unable to connect to the server. Please make sure the FastAPI backend is running."
        );
    }
}


/* =========================================================
   LOGIN
   ========================================================= */

async function signIn(event) {

    if (event) event.preventDefault();

    const emailInput = document.getElementById("login-email");
    const passwordInput = document.getElementById("login-password");

    const email = emailInput ? emailInput.value.trim() : "";
    const password = passwordInput ? passwordInput.value : "";

    if (!email || !password) {
        showAuthMessage(getTranslation("fillAll"));
        return;
    }

    try {

        const response = await fetch(`${API_BASE}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });

        const data = await response.json().catch(() => ({}));

        if (!response.ok) {

            showAuthMessage(
                data.detail ||
                data.message ||
                getTranslation("invalidLogin")
            );

            return;
        }

        currentUser =
            data.user ||
            data.farmer ||
            data;

        localStorage.setItem(
            "greenharvest_user",
            JSON.stringify(currentUser)
        );

        showDashboard();

    } catch (error) {

        console.error("Login error:", error);

        showAuthMessage(
            "Unable to connect to the server. Please make sure the FastAPI backend is running."
        );
    }
}


/* =========================================================
   DASHBOARD
   ========================================================= */

function showDashboard() {

    showScreen("dashboard-screen");

    updateLanguage();

    loadDashboardData();
}


function logout() {

    currentUser = null;

    localStorage.removeItem("greenharvest_user");

    closeFeature();
    closeChat();

    showLanguageScreen();
}


/* =========================================================
   FEATURE CARDS
   ========================================================= */

function openFeature(feature) {

    currentFeature = feature;

    const modal = document.getElementById("feature-modal");
    const content = document.getElementById("feature-content");

    if (!modal || !content) return;

    const featureData = {

        crop: {
            icon: "🌾",
            title: getTranslation("crop"),
            text: "Enter your crop name and get practical crop-management guidance.",
            fields: `
                <label>Crop Name</label>
                <input id="feature-crop-name" type="text" placeholder="Example: Tomato">

                <label>Crop Stage</label>
                <select id="feature-crop-stage">
                    <option>Seedling</option>
                    <option>Vegetative</option>
                    <option>Flowering</option>
                    <option>Fruiting</option>
                    <option>Harvest</option>
                </select>

                <button class="primary" onclick="getFeatureAdvice('crop')">
                    Get Guidance
                </button>
                <div id="feature-result"></div>
            `
        },

        irrigation: {
            icon: "💧",
            title: getTranslation("irrigation"),
            text: "Plan watering based on your crop and field conditions.",
            fields: `
                <label>Crop</label>
                <input id="irrigation-crop" type="text" placeholder="Example: Tomato">

                <label>Soil Type</label>
                <select id="irrigation-soil">
                    <option>Loamy</option>
                    <option>Sandy</option>
                    <option>Clay</option>
                    <option>Black Soil</option>
                    <option>Red Soil</option>
                </select>

                <label>Area</label>
                <input id="irrigation-area" type="number" placeholder="Area in acres">

                <button class="primary" onclick="getFeatureAdvice('irrigation')">
                    Create Plan
                </button>
                <div id="feature-result"></div>
            `
        },

        fertilizer: {
            icon: "🌱",
            title: getTranslation("fertilizer"),
            text: "Get basic nutrient-management guidance for your crop.",
            fields: `
                <label>Crop</label>
                <input id="fertilizer-crop" type="text" placeholder="Example: Rice">

                <label>Growth Stage</label>
                <select id="fertilizer-stage">
                    <option>Early Growth</option>
                    <option>Vegetative</option>
                    <option>Flowering</option>
                    <option>Fruiting</option>
                </select>

                <button class="primary" onclick="getFeatureAdvice('fertilizer')">
                    Get Recommendation
                </button>
                <div id="feature-result"></div>
            `
        },

        pests: {
            icon: "🐛",
            title: getTranslation("pests"),
            text: "Describe the problem you are seeing in your crop.",
            fields: `
                <label>Crop</label>
                <input id="pest-crop" type="text" placeholder="Example: Tomato">

                <label>Problem</label>
                <textarea id="pest-problem" rows="4"
                    placeholder="Describe what you see on the plant..."></textarea>

                <button class="primary" onclick="getFeatureAdvice('pests')">
                    Get Help
                </button>
                <div id="feature-result"></div>
            `
        },

        market: {
            icon: "📈",
            title: getTranslation("market"),
            text: "Check available market-price information.",
            fields: `
                <label>Search Product</label>
                <input id="market-product" type="text"
                    placeholder="Example: Tomato, Wheat, Rice">

                <button class="primary" onclick="getFeatureAdvice('market')">
                    Check Prices
                </button>

                <div id="feature-result"></div>
            `
        },

        carbon: {
            icon: "♻️",
            title: getTranslation("carbon"),
            text: "Check your farm's readiness for carbon-credit opportunities.",
            fields: `
                <label>Farm Area</label>
                <input id="carbon-area" type="number" placeholder="Area in acres">

                <label>Farming Practice</label>
                <select id="carbon-practice">
                    <option>Conventional Farming</option>
                    <option>Organic Practices</option>
                    <option>Reduced Tillage</option>
                    <option>Crop Rotation</option>
                    <option>Multiple Sustainable Practices</option>
                </select>

                <button class="primary" onclick="getFeatureAdvice('carbon')">
                    Check Readiness
                </button>

                <div id="feature-result"></div>
            `
        }
    };

    const item = featureData[feature];

    if (!item) return;

    content.innerHTML = `
        <div class="feature-header">
            <div class="feature-large-icon">${item.icon}</div>
            <h2>${item.title}</h2>
            <p>${item.text}</p>
        </div>

        <div class="feature-form">
            ${item.fields}
        </div>
    `;

    modal.classList.remove("hidden");
}


function closeFeature() {

    const modal = document.getElementById("feature-modal");

    if (modal) {
        modal.classList.add("hidden");
    }

    currentFeature = null;
}


/* =========================================================
   FEATURE API
   ========================================================= */

async function getFeatureAdvice(feature) {

    const result = document.getElementById("feature-result");

    if (!result) return;

    result.innerHTML = `
        <div class="notice">
            Loading guidance...
        </div>
    `;

    let endpoint = "";
    let payload = {};

    if (feature === "crop") {

        endpoint = "/guidance/crop";

        payload = {
            crop: document.getElementById("feature-crop-name")?.value || "",
            stage: document.getElementById("feature-crop-stage")?.value || ""
        };

    } else if (feature === "irrigation") {

        endpoint = "/guidance/irrigation";

        payload = {
            crop: document.getElementById("irrigation-crop")?.value || "",
            soil_type: document.getElementById("irrigation-soil")?.value || "",
            area: document.getElementById("irrigation-area")?.value || ""
        };

    } else if (feature === "fertilizer") {

        endpoint = "/guidance/fertilizer";

        payload = {
            crop: document.getElementById("fertilizer-crop")?.value || "",
            stage: document.getElementById("fertilizer-stage")?.value || ""
        };

    } else if (feature === "pests") {

        endpoint = "/guidance/pests";

        payload = {
            crop: document.getElementById("pest-crop")?.value || "",
            problem: document.getElementById("pest-problem")?.value || ""
        };

    } else if (feature === "market") {

        endpoint = "/market/prices";

        payload = {
            product: document.getElementById("market-product")?.value || ""
        };

    } else if (feature === "carbon") {

        endpoint = "/carbon/readiness";

        payload = {
            area: document.getElementById("carbon-area")?.value || "",
            practice: document.getElementById("carbon-practice")?.value || ""
        };
    }

    try {

        const response = await fetch(API_BASE + endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        const data = await response.json().catch(() => ({}));

        if (!response.ok) {

            result.innerHTML = `
                <div class="error">
                    ${data.detail || "Unable to get information right now."}
                </div>
            `;

            return;
        }

        displayFeatureResult(data);

    } catch (error) {

        console.error(error);

        result.innerHTML = `
            <div class="notice">
                Your request could not be completed right now.
                Please make sure the backend is running.
            </div>
        `;
    }
}


function displayFeatureResult(data) {

    const result = document.getElementById("feature-result");

    if (!result) return;

    let content = "";

    if (typeof data === "string") {
        content = `<p>${data}</p>`;
    } else {

        const preferredKeys = [
            "message",
            "advice",
            "guidance",
            "recommendation",
            "result",
            "response",
            "readiness"
        ];

        for (const key of preferredKeys) {

            if (data[key]) {

                content += `
                    <p>${formatValue(data[key])}</p>
                `;

                break;
            }
        }

        if (!content) {

            Object.entries(data).forEach(([key, value]) => {

                if (
                    value !== null &&
                    value !== undefined &&
                    typeof value !== "object"
                ) {

                    content += `
                        <p>
                            <strong>${formatKey(key)}:</strong>
                            ${formatValue(value)}
                        </p>
                    `;
                }
            });
        }
    }

    if (!content) {
        content = `<p>Information received successfully.</p>`;
    }

    result.innerHTML = `
        <div class="success">
            ${content}
        </div>
    `;
}


function formatKey(key) {

    return key
        .replace(/_/g, " ")
        .replace(/\b\w/g, char => char.toUpperCase());
}


function formatValue(value) {

    if (typeof value === "object") {
        return JSON.stringify(value);
    }

    return String(value);
}


/* =========================================================
   CHAT
   ========================================================= */

function openChat() {

    const modal = document.getElementById("chat-modal");

    if (!modal) return;

    modal.classList.remove("hidden");

    const input = document.getElementById("chat-input");

    if (input) {
        setTimeout(() => input.focus(), 100);
    }
}


function closeChat() {

    const modal = document.getElementById("chat-modal");

    if (modal) {
        modal.classList.add("hidden");
    }
}


function handleEnter(event) {

    if (event.key === "Enter") {
        event.preventDefault();
        sendMessage();
    }
}


function addMessage(text, type) {

    const messages = document.getElementById("messages");

    if (!messages) return;

    const message = document.createElement("div");

    message.className = `message ${type}`;

    message.textContent = text;

    messages.appendChild(message);

    messages.scrollTop = messages.scrollHeight;
}


async function sendMessage() {

    const input = document.getElementById("chat-input");

    if (!input) return;

    const message = input.value.trim();

    if (!message) return;

    addMessage(message, "user");

    input.value = "";

    const typingId = "typing-" + Date.now();

    const messages = document.getElementById("messages");

    if (messages) {

        const typing = document.createElement("div");

        typing.className = "message bot";
        typing.id = typingId;
        typing.textContent = "Thinking...";

        messages.appendChild(typing);

        messages.scrollTop = messages.scrollHeight;
    }

    try {

        const response = await fetch(`${API_BASE}/chatbot/chat`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: message,
                language: selectedLanguage
            })
        });

        const data = await response.json().catch(() => ({}));

        const typing = document.getElementById(typingId);

        if (typing) {
            typing.remove();
        }

        if (!response.ok) {

            addMessage(
                data.detail || "Sorry, I couldn't process that question.",
                "bot"
            );

            return;
        }

        const reply =
            data.response ||
            data.message ||
            data.answer ||
            data.reply ||
            "I received your question.";

        addMessage(reply, "bot");

    } catch (error) {

        console.error("Chat error:", error);

        const typing = document.getElementById(typingId);

        if (typing) {
            typing.remove();
        }

        addMessage(
            "I couldn't connect to the assistant right now. Please check that the backend is running.",
            "bot"
        );
    }
}


/* =========================================================
   LANGUAGE TRANSLATION / UI UPDATE
   ========================================================= */

function updateLanguage() {

    alert("UPDATE LANGUAGE IS RUNNING: " + selectedLanguage);

    const languageKeyMap = {
    en: "English",
    kn: "Kannada",
    hi: "Hindi",
    ta: "Tamil",
    te: "Telugu",
    ml: "Malayalam",
    mr: "Marathi",
    gu: "Gujarati",
    bn: "Bengali",
    pa: "Punjabi",
    or: "Odia",
    as: "Assamese",
    ur: "Urdu",
    ne: "Nepali",
    si: "Sinhala",
    ar: "Arabic",
    fr: "French",
    es: "Spanish",
    de: "German",
    it: "Italian",
    pt: "Portuguese",
    ru: "Russian",
    ja: "Japanese",
    ko: "Korean",
    zh: "Chinese",
    th: "Thai",
    id: "Indonesian"
};
const currentLanguage = languages.find(
    item => item.name === selectedLanguage
);

const languageKey = currentLanguage
    ? languageKeyMap[currentLanguage.code] || "English"
    : "English";

const t = translations[languageKey] || translations.English;
    alert("TRANSLATION FOUND: " + t.signIn);

    /* =====================================================
       LANGUAGE SCREEN
       ===================================================== */

    setText("language-title", t.chooseLanguage);
    setText("language-heading", t.chooseLanguage);
    setText("language-subtext", t.languageText);
    setText("continue-button", t.continue);


    /* =====================================================
       AUTH
       ===================================================== */

    // Tabs
    setText("login-tab", t.signIn);
    setText("signup-tab", t.createAccount);

    // Subtitle
    const authSubtitle = document.getElementById("auth-subtitle");

    if (authSubtitle) {
        authSubtitle.textContent = t.authSubtitle || (
            selectedLanguage === "Kannada"
                ? "ನಿಮ್ಮ ಫಾರ್ಮ್ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್‌ಗೆ ಮುಂದುವರಿಯಲು ಸೈನ್ ಇನ್ ಮಾಡಿ."
                : selectedLanguage === "Hindi"
                    ? "अपने फार्म डैशबोर्ड पर जाने के लिए साइन इन करें।"
                    : selectedLanguage === "Tamil"
                        ? "உங்கள் பண்ணை டாஷ்போர்டிற்குத் தொடர உள்நுழையவும்."
                        : "Sign in to continue to your farm dashboard."
        );
    }


    /* =====================================================
       LOGIN FORM
       ===================================================== */

    const loginForm = document.getElementById("login-form");

    if (loginForm) {

        const labels = loginForm.querySelectorAll("label");

        if (labels.length >= 2) {

            labels[0].textContent = t.email;
            labels[1].textContent = t.password;
        }

        setPlaceholder(
            "login-email",
            t.loginEmailPlaceholder || t.email
        );

        setPlaceholder(
            "login-password",
            t.loginPasswordPlaceholder || t.password
        );

        const loginButton =
            loginForm.querySelector(".primary-btn");

        if (loginButton) {
            loginButton.textContent = t.signIn;
        }
    }


    /* =====================================================
       SIGNUP FORM
       ===================================================== */

    const signupForm = document.getElementById("signup-form");

    if (signupForm) {

        const labels = signupForm.querySelectorAll("label");

        if (labels.length >= 4) {

            labels[0].textContent = t.name;
            labels[1].textContent = t.email;
            labels[2].textContent = t.password;
            labels[3].textContent = t.confirmPassword;
        }

        setPlaceholder(
            "signup-name",
            t.name
        );

        setPlaceholder(
            "signup-email",
            t.email
        );

        setPlaceholder(
            "signup-password",
            t.password
        );

        setPlaceholder(
            "signup-confirm",
            t.confirmPassword
        );

        const signupButton =
            signupForm.querySelector(".primary-btn");

        if (signupButton) {
            signupButton.textContent = t.createAccount;
        }
    }


    /* =====================================================
       CHANGE LANGUAGE
       ===================================================== */

    const backLanguage =
        document.querySelector(".back-language");

    if (backLanguage) {
        backLanguage.textContent =
            "← " + t.changeLanguage;
    }


    /* =====================================================
       DASHBOARD
       ===================================================== */

    setText("welcome-text", t.welcome);
    setText("change-language", t.changeLanguage);
    setText("logout-button", t.logout);

    setText("smart-farming-label", t.smartFarming);

    const heroTitle =
        document.getElementById("hero-title");

    if (heroTitle) {
        heroTitle.innerHTML = t.growSmarter;
    }

    setText("hero-text", t.heroText);

    setText("help-title", t.help);
    setText("help-subtitle", t.chooseOption);

    setText("crop-title", t.crop);
    setText("crop-description", t.cropSmall);

    setText("irrigation-title", t.irrigation);
    setText("irrigation-description", t.irrigationSmall);

    setText("fertilizer-title", t.fertilizer);
    setText("fertilizer-description", t.fertilizerSmall);

    setText("pests-title", t.pests);
    setText("pests-description", t.pestsSmall);

    setText("market-title", t.market);
    setText("market-description", t.marketSmall);

    setText("carbon-title", t.carbon);
    setText("carbon-description", t.carbonSmall);

    setText("assistant-label", t.assistant);
    setText("assistant-title", t.askGreenHarvest);
    setText("assistant-text", t.assistantText);
    setText("ask-assistant-button", t.askAssistant);

    setText("send-button", t.send);

    const chatInput =
        document.getElementById("chat-input");

    if (chatInput) {
        chatInput.placeholder = t.typeQuestion;
    }

    const helloMessage =
        document.querySelector("#messages .message.bot");

    if (helloMessage) {
        helloMessage.textContent = t.hello;
    }


    /* =====================================================
       HTML LANGUAGE
       ===================================================== */

    document.documentElement.lang =
        getLanguageCode(selectedLanguage);
}

function setText(id, text) {

    const element = document.getElementById(id);

    if (element) {
        element.textContent = text;
    }
}


function setPlaceholder(id, text) {

    const element = document.getElementById(id);

    if (element) {
        element.placeholder = text;
    }
}


function getLanguageCode(languageName) {

    const language = languages.find(
        item => item.name === languageName
    );

    return language ? language.code : "en";
}


/* =========================================================
   DASHBOARD DATA
   ========================================================= */

async function loadDashboardData() {

    /*
       This tries the dashboard endpoint if your backend
       provides it. If it isn't available, the main dashboard
       still works normally.
    */

    try {

        const response = await fetch(`${API_BASE}/dashboard`);

        if (!response.ok) return;

        const data = await response.json();

        updateDashboardMetrics(data);

    } catch (error) {

        console.log("Dashboard data not available yet.");
    }
}


function updateDashboardMetrics(data) {

    if (!data || typeof data !== "object") return;

    if (data.farm_count !== undefined) {
        setText("farm-count", data.farm_count);
    }

    if (data.crop_count !== undefined) {
        setText("crop-count", data.crop_count);
    }

    if (data.carbon_score !== undefined) {
        setText("carbon-score", data.carbon_score);
    }
}


/* =========================================================
   KEYBOARD / MODAL CONTROLS
   ========================================================= */

document.addEventListener("keydown", function(event) {

    if (event.key === "Escape") {

        closeFeature();
        closeChat();
    }
});


document.addEventListener("click", function(event) {

    const featureModal = document.getElementById("feature-modal");
    const chatModal = document.getElementById("chat-modal");

    if (event.target === featureModal) {
        closeFeature();
    }

    if (event.target === chatModal) {
        closeChat();
    }
});


/* =========================================================
   INITIALIZATION
   ========================================================= */

document.addEventListener("DOMContentLoaded", function() {

    /*
       Restore language.
    */

    const savedLanguage =
        localStorage.getItem("greenharvest_language");

    if (savedLanguage && languages.some(
        language => language.name === savedLanguage
    )) {
        selectedLanguage = savedLanguage;
    }

    /*
       Restore logged-in user.
    */

    const savedUser =
        localStorage.getItem("greenharvest_user");

    if (savedUser) {

        try {
            currentUser = JSON.parse(savedUser);
        } catch {
            currentUser = null;
        }
    }

    setupLanguageDropdown();

    updateLanguage();

    /*
       If the user was already logged in, go directly
       to the dashboard. Otherwise start at language screen.
    */

    if (currentUser) {
        showDashboard();
    } else {
        showScreen("language-screen");
    }
});


/* =========================================================
   MAKE FUNCTIONS AVAILABLE TO HTML onclick=""
   ========================================================= */

window.selectLanguage = selectLanguage;
window.continueWithLanguage = continueWithLanguage;
window.showLanguageScreen = showLanguageScreen;

window.switchAuth = switchAuth;
window.showAuthScreen = showAuthScreen;
window.createAccount = createAccount;
window.signIn = signIn;
/* =========================================================
   HTML BUTTON CONNECTIONS
   ========================================================= */

window.showLogin = showLogin;
window.showSignup = showSignup;
window.loginUser = loginUser;
window.signupUser = signupUser;

window.showDashboard = showDashboard;
window.logout = logout;

window.openFeature = openFeature;
window.closeFeature = closeFeature;
window.getFeatureAdvice = getFeatureAdvice;

window.openChat = openChat;
window.closeChat = closeChat;
window.handleEnter = handleEnter;
window.sendMessage = sendMessage;
/* =========================================================
   CONTINUE BUTTON FIX
   ========================================================= */

window.continueLanguage = continueWithLanguage;
window.continueButton = continueWithLanguage;

document.addEventListener("DOMContentLoaded", function () {

    const continueButton =
        document.getElementById("continue-button") ||
        document.getElementById("continue-btn") ||
        document.querySelector(".continue-button");

    if (continueButton) {

        continueButton.addEventListener("click", function (event) {

            event.preventDefault();

            continueWithLanguage();

        });

    }

});