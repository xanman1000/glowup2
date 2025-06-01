// Export all types
export * from './types';
export * from './utils';

// Re-export commonly used types for convenience
export type {
  User,
  Product,
  FaceAnalysis,
  GlowUpRequest,
  GlowUpResult,
  ApiResponse,
  Feedback,
  Subscription,
  AffiliateClick,
} from './types';

// Re-export commonly used utilities
export {
  validateImageFile,
  convertFileToBase64,
  formatPrice,
  formatDate,
  formatTimeAgo,
  generateShareUrl,
  isValidEmail,
  isValidUUID,
  getErrorMessage,
} from './utils';