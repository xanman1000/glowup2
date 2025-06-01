import { z } from 'zod';

// User Types
export const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  name: z.string().optional(),
  avatar_url: z.string().url().optional(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
  subscription_status: z.enum(['free', 'premium']).default('free'),
  credits_remaining: z.number().default(3),
});

export type User = z.infer<typeof UserSchema>;

// Face Analysis Types
export const FaceAnalysisSchema = z.object({
  skin_tone: z.string(),
  skin_type: z.enum(['oily', 'dry', 'combination', 'normal', 'sensitive']),
  concerns: z.array(z.enum(['acne', 'dark_circles', 'wrinkles', 'dullness', 'redness', 'pigmentation'])),
  face_shape: z.enum(['oval', 'round', 'square', 'heart', 'diamond', 'oblong']),
  age_estimate: z.number().min(13).max(100),
  confidence_score: z.number().min(0).max(1),
});

export type FaceAnalysis = z.infer<typeof FaceAnalysisSchema>;

// Product Types
export const ProductSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  brand: z.string(),
  category: z.enum(['skincare', 'makeup', 'haircare', 'wellness', 'supplements']),
  subcategory: z.string(),
  price: z.number().positive(),
  currency: z.string().default('USD'),
  affiliate_url: z.string().url(),
  image_url: z.string().url(),
  ingredients: z.array(z.string()),
  benefits: z.array(z.string()),
  skin_types: z.array(z.enum(['oily', 'dry', 'combination', 'normal', 'sensitive'])),
  concerns_addressed: z.array(z.enum(['acne', 'dark_circles', 'wrinkles', 'dullness', 'redness', 'pigmentation'])),
  virality_score: z.number().min(0).max(100),
  rating: z.number().min(0).max(5),
  review_count: z.number().min(0),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

export type Product = z.infer<typeof ProductSchema>;

// Glow-up Generation Types
export const GlowUpRequestSchema = z.object({
  user_id: z.string().uuid(),
  image_data: z.string(), // base64 encoded image
  analysis_id: z.string().uuid(),
  product_ids: z.array(z.string().uuid()),
  quality: z.enum(['preview', 'hd']).default('preview'),
});

export type GlowUpRequest = z.infer<typeof GlowUpRequestSchema>;

export const GlowUpResultSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  original_image_url: z.string().url(),
  generated_image_url: z.string().url(),
  analysis: FaceAnalysisSchema,
  recommended_products: z.array(ProductSchema),
  quality: z.enum(['preview', 'hd']),
  created_at: z.string().datetime(),
  share_url: z.string().url().optional(),
});

export type GlowUpResult = z.infer<typeof GlowUpResultSchema>;

// API Response Types
export const ApiResponseSchema = z.object({
  success: z.boolean(),
  message: z.string().optional(),
  data: z.any().optional(),
  error: z.string().optional(),
});

export type ApiResponse<T = any> = {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
};

// Upload Types
export const ImageUploadSchema = z.object({
  file: z.instanceof(File),
  consent_given: z.boolean().refine(val => val === true, {
    message: "Consent must be given to proceed"
  }),
});

export type ImageUpload = z.infer<typeof ImageUploadSchema>;

// Feedback Types
export const FeedbackSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  glow_up_id: z.string().uuid(),
  rating: z.enum(['thumbs_up', 'thumbs_down']),
  comment: z.string().optional(),
  created_at: z.string().datetime(),
});

export type Feedback = z.infer<typeof FeedbackSchema>;

// Subscription Types
export const SubscriptionSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  plan: z.enum(['free', 'premium']),
  status: z.enum(['active', 'cancelled', 'past_due']),
  current_period_start: z.string().datetime(),
  current_period_end: z.string().datetime(),
  stripe_subscription_id: z.string().optional(),
});

export type Subscription = z.infer<typeof SubscriptionSchema>;

// Affiliate Tracking Types
export const AffiliateClickSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  product_id: z.string().uuid(),
  glow_up_id: z.string().uuid(),
  clicked_at: z.string().datetime(),
  ip_address: z.string(),
  user_agent: z.string(),
});

export type AffiliateClick = z.infer<typeof AffiliateClickSchema>;

// Error Types
export class AppError extends Error {
  public statusCode: number;
  public isOperational: boolean;

  constructor(message: string, statusCode: number = 500, isOperational: boolean = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;

    Error.captureStackTrace(this, this.constructor);
  }
}

// Constants
export const SUPPORTED_IMAGE_FORMATS = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'] as const;
export const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB
export const FREE_CREDITS_LIMIT = 3;
export const HD_CREDIT_COST = 1;