import logging
import os
import sys
from typing import Optional

def setup_logger(name: Optional[str] = None) -> logging.Logger:
    """
    Set up logger with appropriate configuration based on environment
    """
    logger = logging.getLogger(name or __name__)
    
    # Prevent duplicate handlers
    if logger.handlers:
        return logger
    
    # Set log level based on environment
    env = os.getenv("APP_ENV", "development")
    if env == "production":
        log_level = logging.INFO
    else:
        log_level = logging.DEBUG
    
    logger.setLevel(log_level)
    
    # Create console handler
    console_handler = logging.StreamHandler(sys.stdout)
    console_handler.setLevel(log_level)
    
    # Create formatter
    if env == "production":
        # JSON formatter for production (better for log aggregation)
        formatter = logging.Formatter(
            '{"timestamp": "%(asctime)s", "level": "%(levelname)s", "module": "%(name)s", "message": "%(message)s"}'
        )
    else:
        # Human readable formatter for development
        formatter = logging.Formatter(
            '%(asctime)s - %(name)s - %(levelname)s - %(message)s'
        )
    
    console_handler.setFormatter(formatter)
    logger.addHandler(console_handler)
    
    return logger