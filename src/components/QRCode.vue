<script setup lang="ts">
import { ref } from 'vue'
import useQRCode from '../hook/useQRCode.vue'
import { useQRStore } from '@/store'

const inputText = ref('')
const qrCode = ref('')
const savedText = ref('')

const qrStore = useQRStore()
const { result } = useQRCode(inputText)

const generateQR = () => {
  if (result?.value) {
    qrCode.value = result?.value
    savedText.value = inputText.value
    inputText.value = ''
  }
}
const saveQRCode = () => {
  if (savedText.value && qrCode.value) {
    try {
      const processedLink = savedText.value.replace(/^(https?:\/\/)?(www\.)?/, "");
      qrStore.setQRCodeItem(processedLink, qrCode.value);
      savedText.value = ''
      qrCode.value = ''
    } catch (error) {
      console.error('Kaydetme hatası:', error)
    }
  }
}
const deleteQRCode = () => {
  qrCode.value = ''
  savedText.value = ''
}
</script>

<template>
  <div class="container">
    <div class="content-wrapper">
      <h1>QR Kod Oluşturucu</h1>
      <p class="subtitle">URL veya metin girin, anında QR kod oluşturun</p>

      <div class="input-container">
        <div class="input-wrapper">
          <input
            v-model="inputText"
            type="text"
            placeholder="URL giriniz..."
            class="input-field"
            :class="{ 'has-value': inputText }"
          />
          <span class="input-icon">🔗</span>
        </div>
        <button 
          @click="generateQR" 
          class="generate-btn" 
          :disabled="!inputText"
          :class="{ 'active': inputText }"
        >
          <span class="btn-icon">⚡</span>
          QR Kod Oluştur
        </button>
      </div>

      <div v-if="qrCode" class="qr-container">
        <div class="qr-card">
          <div class="qr-header">
            <h3>Oluşturulan QR Kod</h3>
            <p class="qr-link">{{ savedText }}</p>
          </div>
          <div class="qr-image-wrapper">
            <img :src="qrCode" alt="QR Code" class="qr-image" />
          </div>
          <div class="qr-actions">
            <button @click="deleteQRCode" class="action-btn delete-btn">
              <span class="btn-icon">🗑️</span>
              Sil
            </button>
            <button @click="saveQRCode" class="action-btn save-btn" :disabled="!qrCode">
              <span class="btn-icon">💾</span>
              Kaydet
            </button>
          </div>
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
  align-items: flex-start;
  padding: 20px;
  background: linear-gradient(135deg, #A53B1B 0%, #8B2E16 100%);
  overflow-y: auto;
  position: relative;
  z-index: 1;
}

.content-wrapper {
  width: 100%;
  max-width: 600px;
  background: white;
  padding: 20px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  margin: 20px auto;
  position: relative;
  z-index: 2;
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

.input-container {
  display: flex;
  gap: 15px;
  margin-bottom: 30px;
}

.input-wrapper {
  flex: 1;
  position: relative;
}

.input-field {
  width: 100%;
  padding: 15px 45px 15px 20px;
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: #f8f9fa;
}

.input-field:focus {
  outline: none;
  border-color: #A53B1B;
  background: white;
  box-shadow: 0 0 0 3px rgba(165, 59, 27, 0.1);
}

.input-field.has-value {
  border-color: #A53B1B;
  background: white;
}

.input-icon {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.2rem;
  color: #666;
}

.generate-btn {
  padding: 0 25px;
  background: #A53B1B;
  color: white;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
  opacity: 0.7;
}

.generate-btn.active {
  opacity: 1;
  background: #A53B1B;
}

.generate-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(165, 59, 27, 0.3);
}

.generate-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.qr-container {
  margin-top: 30px;
}

.qr-card {
  background: #f8f9fa;
  border-radius: 16px;
  padding: 25px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
}

.qr-header {
  text-align: center;
  margin-bottom: 20px;
}

.qr-header h3 {
  color: #A53B1B;
  font-size: 1.3rem;
  margin-bottom: 10px;
}

.qr-link {
  color: #666;
  font-size: 0.9rem;
  word-break: break-all;
  margin: 0;
}

.qr-image-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background: white;
  border-radius: 12px;
  margin-bottom: 20px;
}

.qr-image {
  max-width: 200px;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.qr-actions {
  display: flex;
  gap: 10px;
  justify-content: center;
}

.action-btn {
  padding: 12px 25px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 0.95rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
}

.save-btn {
  background: #A53B1B;
  color: white;
}

.save-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(66, 184, 131, 0.3);
}

.save-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.delete-btn {
  background: black;
  color: white;
}

.delete-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(220, 53, 69, 0.3);
}

.btn-icon {
  font-size: 1.2rem;
}

@media (max-width: 768px) {
  .container {
    padding: 10px;
    align-items: flex-start;
    min-height: auto;
    height: auto;
  }

  .content-wrapper {
    padding: 15px;
    margin: 10px auto;
    position: relative;
    z-index: 2;
  }

  h1 {
    font-size: 1.8rem;
    margin-bottom: 8px;
  }

  .subtitle {
    font-size: 1rem;
    margin-bottom: 20px;
  }

  .input-container {
    flex-direction: column;
    gap: 10px;
    margin-bottom: 20px;
  }

  .generate-btn {
    width: 100%;
    justify-content: center;
    padding: 12px 20px;
  }

  .qr-container {
    margin-top: 20px;
    position: relative;
    z-index: 2;
  }

  .qr-card {
    padding: 15px;
    margin-bottom: 20px;
  }

  .qr-image {
    max-width: 150px;
  }

  .qr-actions {
    flex-direction: column;
    gap: 8px;
  }

  .action-btn {
    width: 100%;
    padding: 10px 20px;
  }
}
</style>