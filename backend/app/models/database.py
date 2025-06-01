from sqlalchemy import Column, String, Integer, Float, DateTime, Boolean, Text, JSON, ForeignKey, Enum
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from sqlalchemy.dialects.postgresql import UUID
import uuid
import enum

Base = declarative_base()

class SubscriptionStatus(enum.Enum):
    FREE = "free"
    PREMIUM = "premium"

class SkinType(enum.Enum):
    OILY = "oily"
    DRY = "dry"
    COMBINATION = "combination"
    NORMAL = "normal"
    SENSITIVE = "sensitive"

class ProductCategory(enum.Enum):
    SKINCARE = "skincare"
    MAKEUP = "makeup"
    HAIRCARE = "haircare"
    WELLNESS = "wellness"
    SUPPLEMENTS = "supplements"

class QualityLevel(enum.Enum):
    PREVIEW = "preview"
    HD = "hd"

class User(Base):
    __tablename__ = "users"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    email = Column(String, unique=True, index=True, nullable=False)
    name = Column(String, nullable=True)
    avatar_url = Column(String, nullable=True)
    subscription_status = Column(Enum(SubscriptionStatus), default=SubscriptionStatus.FREE)
    credits_remaining = Column(Integer, default=3)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relationships
    face_analyses = relationship("FaceAnalysis", back_populates="user")
    glow_up_results = relationship("GlowUpResult", back_populates="user")
    feedback = relationship("Feedback", back_populates="user")
    affiliate_clicks = relationship("AffiliateClick", back_populates="user")

class Product(Base):
    __tablename__ = "products"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String, nullable=False)
    brand = Column(String, nullable=False)
    category = Column(Enum(ProductCategory), nullable=False)
    subcategory = Column(String, nullable=False)
    price = Column(Float, nullable=False)
    currency = Column(String, default="USD")
    affiliate_url = Column(String, nullable=False)
    image_url = Column(String, nullable=False)
    ingredients = Column(JSON, nullable=False)  # Array of strings
    benefits = Column(JSON, nullable=False)  # Array of strings
    skin_types = Column(JSON, nullable=False)  # Array of skin types
    concerns_addressed = Column(JSON, nullable=False)  # Array of concerns
    virality_score = Column(Float, default=0.0)
    rating = Column(Float, default=0.0)
    review_count = Column(Integer, default=0)
    embedding = Column(JSON, nullable=True)  # OpenAI embedding vector
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relationships
    glow_up_products = relationship("GlowUpProduct", back_populates="product")
    affiliate_clicks = relationship("AffiliateClick", back_populates="product")

class FaceAnalysis(Base):
    __tablename__ = "face_analyses"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    skin_tone = Column(String, nullable=False)
    skin_type = Column(Enum(SkinType), nullable=False)
    concerns = Column(JSON, nullable=False)  # Array of concerns
    face_shape = Column(String, nullable=False)
    age_estimate = Column(Integer, nullable=False)
    confidence_score = Column(Float, nullable=False)
    analysis_data = Column(JSON, nullable=True)  # Raw analysis results
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # Relationships
    user = relationship("User", back_populates="face_analyses")
    glow_up_results = relationship("GlowUpResult", back_populates="analysis")

class GlowUpResult(Base):
    __tablename__ = "glow_up_results"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    analysis_id = Column(UUID(as_uuid=True), ForeignKey("face_analyses.id"), nullable=False)
    original_image_url = Column(String, nullable=False)
    generated_image_url = Column(String, nullable=False)
    quality = Column(Enum(QualityLevel), nullable=False)
    generation_prompt = Column(Text, nullable=True)
    share_url = Column(String, nullable=True)
    is_public = Column(Boolean, default=False)
    view_count = Column(Integer, default=0)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # Relationships
    user = relationship("User", back_populates="glow_up_results")
    analysis = relationship("FaceAnalysis", back_populates="glow_up_results")
    products = relationship("GlowUpProduct", back_populates="glow_up_result")
    feedback = relationship("Feedback", back_populates="glow_up_result")

class GlowUpProduct(Base):
    __tablename__ = "glow_up_products"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    glow_up_result_id = Column(UUID(as_uuid=True), ForeignKey("glow_up_results.id"), nullable=False)
    product_id = Column(UUID(as_uuid=True), ForeignKey("products.id"), nullable=False)
    recommendation_score = Column(Float, nullable=False)
    position = Column(Integer, nullable=False)  # Order in recommendation list

    # Relationships
    glow_up_result = relationship("GlowUpResult", back_populates="products")
    product = relationship("Product", back_populates="glow_up_products")

class Feedback(Base):
    __tablename__ = "feedback"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    glow_up_result_id = Column(UUID(as_uuid=True), ForeignKey("glow_up_results.id"), nullable=False)
    rating = Column(String, nullable=False)  # thumbs_up or thumbs_down
    comment = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # Relationships
    user = relationship("User", back_populates="feedback")
    glow_up_result = relationship("GlowUpResult", back_populates="feedback")

class AffiliateClick(Base):
    __tablename__ = "affiliate_clicks"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    product_id = Column(UUID(as_uuid=True), ForeignKey("products.id"), nullable=False)
    glow_up_result_id = Column(UUID(as_uuid=True), ForeignKey("glow_up_results.id"), nullable=False)
    ip_address = Column(String, nullable=False)
    user_agent = Column(String, nullable=False)
    clicked_at = Column(DateTime(timezone=True), server_default=func.now())

    # Relationships
    user = relationship("User", back_populates="affiliate_clicks")
    product = relationship("Product", back_populates="affiliate_clicks")

class Subscription(Base):
    __tablename__ = "subscriptions"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    plan = Column(String, nullable=False)
    status = Column(String, nullable=False)
    current_period_start = Column(DateTime(timezone=True), nullable=False)
    current_period_end = Column(DateTime(timezone=True), nullable=False)
    stripe_subscription_id = Column(String, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())