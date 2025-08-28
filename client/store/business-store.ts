import { Business } from "@/types/common";
import { SecureStorage } from "@/utils/encryption";
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface BusinessStore {
  userName: string | null
  selectedBusiness: Business | null;
  businesses: Business[];
  setSelectedBusiness: (business: Business | null) => void;
  setBusinesses: (businesses: Business[]) => void;
  setUserName: (userName: string) => void;
  clearSelectedBusiness: () => void;
  clearAllData: () => void;
}

const encryptedStorage = {
  getItem: (name: string): string | null => {
    const data = SecureStorage.getItem(name);
    return data ? JSON.stringify(data) : null;
  },
  setItem: (name: string, value: string): void => {
    try {
      const parsedValue = JSON.parse(value);
      SecureStorage.setItem(name, parsedValue);
    } catch (error) {
      console.error('Failed to parse and encrypt data:', error);
    }
  },
  removeItem: (name: string): void => {
    SecureStorage.removeItem(name);
  },
};

export const useBusinessStore = create<BusinessStore>()(
  persist(
    (set) => ({
      userName: null,
      selectedBusiness: { bussId: "default", bussName: "Default Business" },
      businesses: [],
      setSelectedBusiness: (business) => {
        set({ selectedBusiness: business });
      },
      setBusinesses: (businesses) => set({ businesses }),
      setUserName: (userName) => set({ userName }),
      clearSelectedBusiness: () => {
        set({ selectedBusiness: null });
      },
      clearAllData: () => {
        set({ selectedBusiness: null, businesses: [], userName: null });
        SecureStorage.clear();
      },
    }),
    {
      name: 'business-storage',
      storage: createJSONStorage(() => encryptedStorage),

      partialize: (state) => ({
        selectedBusiness: state.selectedBusiness,
        businesses: state.businesses,
        userName: state.userName,
      }),

      onRehydrateStorage: () => (state) => {
        if (state?.selectedBusiness) {
          console.log('Rehydrated encrypted business data:', state.selectedBusiness.bussName, state.userName);
        }
      },
    }
  )
);
