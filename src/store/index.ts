import { defineStore, createPinia } from 'pinia';

const pinia = createPinia();

export interface QRItem {
  link: string;
  qrCode: string;
}

export interface State {
  qrCodes: QRItem[];
}

const getPersistedState = () => {
  const savedState = localStorage.getItem('qrStore');
  return savedState ? JSON.parse(savedState) : null;
};

const saveToLocalStorage = (state: State) => {
  localStorage.setItem('qrStore', JSON.stringify(state));
};

const clearLocalStorage = () => {
  localStorage.removeItem('qrStore');
};

export const useQRStore = defineStore('qr', {
  state: (): State => {
    const persistedState = getPersistedState();
    // Ensure qrCodes is always an array, even if no persisted data exists
    return persistedState ? { qrCodes: persistedState.qrCodes || [] } : { qrCodes: [] };
  },
  actions: {
    setQRCodeItem(newLink: string, newQRCode: string) {
      this.qrCodes.push({ link: newLink, qrCode: newQRCode });
      saveToLocalStorage(this.$state);
    },
    clearQRCode() {
      this.qrCodes = [];
      clearLocalStorage();
    },
    deleteQRCodeItem(index: number) {
      this.qrCodes.splice(index, 1);
      saveToLocalStorage(this.$state);
    }
  },
  getters: {
    getQRCodeItems: (state) => state.qrCodes,
  },
});

export default pinia;