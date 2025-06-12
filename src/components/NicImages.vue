<template>
  <div class="nic-page">
    <div class="form-section">
      <h2 class="form-title">Upload Your NIC & Selfie</h2>

      <div class="upload-grid">
        <div v-for="(label, key) in imageLabels" :key="key" class="upload-box">
          <div class="text-above-image">Upload {{ label }}</div>
          <div class="image-preview">
            <img v-if="imagesBase64[key]" :src="imagesBase64[key]" alt="Preview" />
            <img
              v-else
              src="@/assets/success.png"
              alt="placeholder icon"
              class="placeholder-icon"
            />
          </div>

          <label class="upload-label">
            <input type="file" accept="image/*" @change="handleFileChange(key, $event)" />
            <div class="round-button">
              <i class="fas fa-camera"></i>
              <span>Upload {{ label }}</span>
            </div>
          </label>
        </div>
      </div>

      <div class="button-group">
        <button type="button" class="back-btn" @click="$router.back()">Back</button>
        <button class="submit-button" @click="submitImages">Submit</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Footer from '@/layout/Footer.vue'
import Header from '@/layout/Header.vue'
import ApiNetwork from '@/network/apiNetwork.ts'

export default defineComponent({
  firstname: 'NicImages',
  components: { Header, Footer },
  data() {
    return {
      images: {
        front: null as File | null,
        rear: null as File | null,
        selfie: null as File | null,
      },
      imagesBase64: {
        front: null as string | null,
        rear: null as string | null,
        selfie: null as string | null,
      },
      imageLabels: {
        front: 'NIC Front',
        rear: 'NIC Rear',
        selfie: 'Selfie',
      },
    }
  },
  methods: {
    handleFileChange(type: 'front' | 'rear' | 'selfie', event: Event) {
      const target = event.target as HTMLInputElement
      if (target.files?.length) {
        const file = target.files[0]
        this.images[type] = file

        const reader = new FileReader()
        reader.onload = (e) => {
          const img = new Image()
          img.onload = () => {
            const maxSize = 200
            let width = img.width
            let height = img.height

            if (width > height) {
              if (width > maxSize) {
                height *= maxSize / width
                width = maxSize
              }
            } else {
              if (height > maxSize) {
                width *= maxSize / height
                height = maxSize
              }
            }

            const canvas = document.createElement('canvas')
            canvas.width = width
            canvas.height = height
            const ctx = canvas.getContext('2d')
            ctx?.clearRect(0, 0, width, height)
            ctx?.drawImage(img, 0, 0, width, height)

            const resizedBase64 = canvas.toDataURL('image/jpeg', 0.7)
            this.imagesBase64[type] = resizedBase64
          }
          img.src = e.target?.result as string
        }
        reader.readAsDataURL(file)
      }
    },
    submitImages() {
      if (!this.imagesBase64.front || !this.imagesBase64.rear || !this.imagesBase64.selfie) {
        alert('Please upload all three images.')
        return
      }

      const payload = {
        front: this.imagesBase64.front,
        rear: this.imagesBase64.rear,
        selfie: this.imagesBase64.selfie,
      }

      ApiNetwork.post('api/UserImage/upload', payload, 'POST', () => {
        console.log('Payload:', payload)
        localStorage.setItem('nicImagesData', JSON.stringify(payload));
        this.$router.push('/preview')
      })
    },
  },
})
</script>

<style scoped>
.nic-page {
  width: 100vw;
  min-height: 100vh;
  background: #f8f9fa;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.form-section {
  padding: 60px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.form-title {
  font-size: 34px;
  font-weight: bold;
  margin-bottom: 30px;
  color: #070606;
}

.upload-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 50px;
  width: 200%;
  max-width: 600px;
}

.upload-box {
  background: white;
  border-radius: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 20px;
  text-align: center;
  position: relative;
}

.text-above-image {
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 16px;
}

.image-preview {
  height: 150px;
  width: 100%;
  border: 2px dashed #ccc;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  margin-bottom: 15px;
}

.image-preview img {
  max-height: 100%;
  max-width: 100%;
  object-fit: cover;
  border-radius: 10px;
}

.placeholder-icon {
  max-height: 60px;
  opacity: 0.4;
}

.upload-label input[type='file'] {
  display: none;
}

.round-button {
  background-color: #ff0000;
  color: white;
  padding: 10px 15px;
  border-radius: 30px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s;
}

.round-button:hover {
  background-color: #ffffff;
}

.button-group {
  display: flex;
  gap: 20px;
  margin-top: 30px;
  width: 100%;
  max-width: 300px;
}

.back-btn,
.submit-button {
  flex: 1;
  padding: 12px 0;
  font-size: 16px;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  text-align: center;
}

.back-btn {
  background-color: white;
  color: #070606;
  border: 2px solid #070606;
}

.submit-button {
  background-color: #ff0000;
  color: white;
  border: none;
}

.submit-button:hover {
  background-color: #cc0000;
}
</style>
