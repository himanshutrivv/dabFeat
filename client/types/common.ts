export interface Business {
  // Unique business ID used by dashboard and other sources
  bussId: string;

  // Display name used in UI
  bussName: string;

  // Additional optional fields that may be present from API
  description?: string;
  createdAt?: string;
  updatedAt?: string;
  status?: string;
  
  // Allow additional properties for extensibility
  [key: string]: any;
}
