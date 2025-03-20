<script setup lang="ts">
import { useQRStore } from '@/store';
import { ref, onMounted } from 'vue';

const qrStore = useQRStore();
const loading = ref(false);
console.log(qrStore.getQRCodeItems);

const deleteQRCode = (index: number) => {
  qrStore.deleteQRCodeItem(index);
};

const downloadQR = (qrCode: string) => {
  if (qrCode) {
    const link = document.createElement('a');
    link.href = qrCode;
    link.download = 'qr-code.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

const handleScroll = () => {
  const scrollContainer = document.querySelector('.scroll-container');
};

</script>

<template>
  <div class="container">
    <div class="content-wrapper">
      <h1>Kaydedilen QR Kodlar</h1>
      <p class="subtitle">Oluşturduğunuz QR kodları burada görüntüleyebilirsiniz</p>

      <div @scroll="handleScroll" class="scroll-container">
        <div v-if="qrStore.getQRCodeItems.length === 0" class="empty-state">
          <div class="empty-icon">📱</div>
          <p>Henüz kaydedilmiş QR kod bulunmuyor</p>
          <p class="empty-subtitle">QR kod oluşturmak için ana sayfaya dönün</p>
        </div>
        
        <div v-else class="qr-grid">
          <div v-for="(item, index) in qrStore.getQRCodeItems" 
               :key="index" 
               class="qr-card">
            <div class="qr-image-container">
              <img v-if="item.qrCode" 
                   :src="item.qrCode" 
                   alt="QR Code" 
                   class="qr-image" />
              <div v-else class="no-qr">QR Kodu yok</div>
            </div>
            <div class="qr-content">
              <p class="qr-link" :title="item.link">{{ item.link }}</p>
              <div class="button-group">
                <button @click="deleteQRCode(index)" class="action-btn delete-btn" title="Sil">
                  <span class="btn-icon">🗑️</span>
                </button>
                <button @click="downloadQR(item.qrCode)" class="action-btn download-btn" title="İndir">
                  <span class="btn-icon">⬇</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div v-if="loading" class="loading">
          <div class="loading-spinner"></div>
          <p>Yükleniyor...</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background: linear-gradient(135deg, #A53B1B 0%, #8B2E16 100%);
}

.content-wrapper {
  width: 100%;
  max-width: 1200px;
  background: white;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

h1 {
  color: #A53B1B;
  font-size: 2.5rem;
  margin-bottom: 10px;
  text-align: center;
  font-weight: 700;
}

.subtitle {
  color: #666;
  text-align: center;
  margin-bottom: 30px;
  font-size: 1.1rem;
}

.scroll-container {
  height: calc(100vh - 250px);
  overflow-y: auto;
  padding: 10px;
  border-radius: 12px;
  background-color: #f8f9fa;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.qr-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  padding: 10px;
}

.qr-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
  display: flex;
  flex-direction: column;
}

.qr-card:hover {
  transform: translateY(-5px);
}

.qr-image-container {
  padding: 20px;
  background: #f8f9fa;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 180px;
  flex: 1;
}

.qr-image {
  max-width: 150px;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.no-qr {
  color: #6c757d;
  font-size: 1.1rem;
}

.qr-content {
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.qr-link {
  color: #2c3e50;
  font-size: 0.9rem;
  word-break: break-all;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  flex: 1;
  margin: 0;
}

.button-group {
  display: flex;
  gap: 8px;
  justify-content: space-between;
}

.action-btn {
  width: 36px;
  height: 36px;
  padding: 0;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.action-btn .btn-icon {
  font-size: 1.2rem;
}

.download-btn {
  background: #A53B1B;
  color: white;
}

.download-btn:hover {
  background: #A53B1B;
  transform: translateY(-2px);
}

.delete-btn {
  background: black;
  color: white;
}

.delete-btn:hover {
  background: black;
  transform: translateY(-2px);
}

.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  color: #6c757d;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #42b883;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 10px;
}

.empty-state {
  text-align: center;
  padding: 40px;
  color: #6c757d;
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: 20px;
}

.empty-subtitle {
  color: #999;
  font-size: 0.9rem;
  margin-top: 10px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Scrollbar Styling */
.scroll-container::-webkit-scrollbar {
  width: 8px;
}

.scroll-container::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

.scroll-container::-webkit-scrollbar-thumb {
  background: #A53B1B;
  border-radius: 4px;
}

.scroll-container::-webkit-scrollbar-thumb:hover {
  background: #A53B1B;
}

@media (max-width: 1024px) {
  .qr-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .content-wrapper {
    padding: 30px 20px;
  }

  .qr-grid {
    grid-template-columns: 1fr;
  }

  .scroll-container {
    height: calc(100vh - 200px);
  }
}
</style>
