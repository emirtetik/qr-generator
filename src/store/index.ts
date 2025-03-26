import { defineStore, createPinia } from 'pinia';

const pinia = createPinia();

export interface QRItem {
  price: number;
  kod: string;
  qrCode: string;
}

export interface State {
  qrCodes: QRItem[];
}

const getPersistedState = (): State => {
  const savedState = localStorage.getItem('qrStore');
  return savedState ? JSON.parse(savedState) : { qrCodes: [] };
};

const saveToLocalStorage = (qrCodes: QRItem[]) => {
  localStorage.setItem('qrStore', JSON.stringify({ qrCodes }));
};

const clearLocalStorage = () => {
  localStorage.removeItem('qrStore');
};

export const useQRStore = defineStore('qr', {
  state: (): State => getPersistedState(),
  actions: {
    setQRCodeItem(newKod: string, newPrice: number, newQRCode: string) {
      this.qrCodes.push({ kod: newKod, qrCode: newQRCode, price: newPrice });
      saveToLocalStorage(this.qrCodes);
    },
    clearQRCode() {
      this.qrCodes = [];
      clearLocalStorage();
    },
    deleteQRCodeItem(index: number) {
      this.qrCodes = this.qrCodes.filter((_, i) => i !== index);
      saveToLocalStorage(this.qrCodes);
    }
  },
  getters: {
    getQRCodeItems: (state) => state.qrCodes,
  },
});

export default pinia;
