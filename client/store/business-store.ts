import { create } from 'zustand';

interface Business {
  bussId: string;
  name: string;
}

interface BusinessStore {
  selectedBusiness: Business | null;
  setSelectedBusiness: (business: Business) => void;
}

export const useBusinessStore = create<BusinessStore>((set) => ({
  selectedBusiness: { bussId: '1', name: 'Default Business' },
  setSelectedBusiness: (business) => set({ selectedBusiness: business }),
}));
