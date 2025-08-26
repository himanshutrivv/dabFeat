// Simple business store hook
export interface Business {
  bussId: string;
  name: string;
}

// Mock business store hook
export const useBusinessStore = () => {
  return {
    selectedBusiness: { bussId: '1', name: 'Default Business' } as Business | null,
  };
};
