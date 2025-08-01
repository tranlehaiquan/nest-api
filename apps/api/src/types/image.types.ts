// Image Service Request/Response Types
export interface UploadImageRequest {
  file: Buffer;
  filename: string;
}

export interface UploadImageResponse {
  success: boolean;
  imageId: string;
  filename: string;
  url: string;
  message: string;
}

export interface GetImageRequest {
  imageId: string;
}

export interface GetImageResponse {
  success: boolean;
  imageId: string;
  url: string;
  metadata: {
    size: string;
    format: string;
    dimensions: string;
  };
}

export interface DeleteImageRequest {
  imageId: string;
}

export interface DeleteImageResponse {
  success: boolean;
  imageId: string;
  message: string;
}

export interface HealthCheckResponse {
  message: string;
}

// Message Pattern Types
export type ImageServicePatterns = {
  upload_image: UploadImageRequest;
  get_image: GetImageRequest;
  delete_image: DeleteImageRequest;
  health_check: void;
};

export type ImageServiceResponses = {
  upload_image: UploadImageResponse;
  get_image: GetImageResponse;
  delete_image: DeleteImageResponse;
  health_check: HealthCheckResponse;
}; 