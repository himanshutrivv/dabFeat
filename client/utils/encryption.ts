/**
 * SecureStorage implementation for encrypted localStorage
 * This provides the API used by the store: getItem, setItem, removeItem, clear
 * Currently uses localStorage with JSON serialization. Can be enhanced with encryption later.
 */

export const SecureStorage = {
  getItem: (key: string): any | null => {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return null;
      // Parse JSON data - add encryption/decryption here if needed
      return JSON.parse(raw);
    } catch (err) {
      console.error("SecureStorage.getItem parse error:", err);
      return null;
    }
  },

  setItem: (key: string, value: any): void => {
    try {
      // Serialize to JSON - add encryption here if needed
      const raw = JSON.stringify(value);
      localStorage.setItem(key, raw);
    } catch (err) {
      console.error("SecureStorage.setItem error:", err);
    }
  },

  removeItem: (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch (err) {
      console.error("SecureStorage.removeItem error:", err);
    }
  },

  clear: (): void => {
    try {
      localStorage.clear();
    } catch (err) {
      console.error("SecureStorage.clear error:", err);
    }
  },
};

export default SecureStorage;
