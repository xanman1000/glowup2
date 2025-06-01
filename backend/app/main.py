from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware
from fastapi.responses import JSONResponse
import os
from dotenv import load_dotenv
import logging

from app.routers import auth, images, products, glowups, analytics
from app.utils.logger import setup_logger

# Load environment variables
load_dotenv()

# Setup logging
logger = setup_logger()

# Create FastAPI app
app = FastAPI(
    title="GlowUp.ai API",
    description="AI-powered beauty transformation and product recommendation platform",
    version="1.0.0",
    docs_url="/docs" if os.getenv("APP_ENV") == "development" else None,
    redoc_url="/redoc" if os.getenv("APP_ENV") == "development" else None,
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",  # Web development
        "http://localhost:19006",  # Expo development
        "https://glowup.ai",  # Production web
        "https://www.glowup.ai",  # Production web with www
    ],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "PATCH"],
    allow_headers=["*"],
)

# Add trusted host middleware for production
if os.getenv("APP_ENV") == "production":
    app.add_middleware(
        TrustedHostMiddleware, 
        allowed_hosts=["glowup.ai", "www.glowup.ai", "api.glowup.ai"]
    )

# Global exception handler
@app.exception_handler(HTTPException)
async def http_exception_handler(request, exc):
    logger.error(f"HTTP exception: {exc.detail}")
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "success": False,
            "error": exc.detail,
            "status_code": exc.status_code
        }
    )

@app.exception_handler(Exception)
async def general_exception_handler(request, exc):
    logger.error(f"Unhandled exception: {str(exc)}")
    return JSONResponse(
        status_code=500,
        content={
            "success": False,
            "error": "Internal server error",
            "status_code": 500
        }
    )

# Health check endpoint
@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "environment": os.getenv("APP_ENV", "development"),
        "version": "1.0.0"
    }

# Include routers
app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])
app.include_router(images.router, prefix="/api/images", tags=["Image Processing"])
app.include_router(products.router, prefix="/api/products", tags=["Products"])
app.include_router(glowups.router, prefix="/api/glowups", tags=["Glow-ups"])
app.include_router(analytics.router, prefix="/api/analytics", tags=["Analytics"])

# Startup event
@app.on_event("startup")
async def startup_event():
    logger.info("GlowUp.ai API starting up...")
    # Add any startup initialization here

# Shutdown event
@app.on_event("shutdown")
async def shutdown_event():
    logger.info("GlowUp.ai API shutting down...")
    # Add any cleanup here

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=int(os.getenv("PORT", 8000)),
        reload=os.getenv("APP_ENV") == "development"
    )