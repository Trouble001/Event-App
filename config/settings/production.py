from .base import *

# SECURITY
DEBUG = False

# Change this to your real domain
ALLOWED_HOSTS = [
    "yourdomain.com",
    "www.yourdomain.com",
]

# -----------------------------
# HTTPS & Security Settings
# -----------------------------

# Redirect HTTP → HTTPS
SECURE_SSL_REDIRECT = True

# Secure Cookies
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True

# HTTP Strict Transport Security (HSTS)
SECURE_HSTS_SECONDS = 31536000  # 1 year
SECURE_HSTS_INCLUDE_SUBDOMAINS = True
SECURE_HSTS_PRELOAD = True

# Security Headers
SECURE_BROWSER_XSS_FILTER = True
SECURE_CONTENT_TYPE_NOSNIFF = True
X_FRAME_OPTIONS = "DENY"

# -----------------------------
# CORS (Production React URL)
# -----------------------------

CORS_ALLOWED_ORIGINS = [
    "https://yourfrontend.com",
]

# -----------------------------
# JWT Cookie Security Override
# -----------------------------

SIMPLE_JWT["AUTH_COOKIE_SECURE"] = True
SIMPLE_JWT["AUTH_COOKIE_SAMESITE"] = "None"