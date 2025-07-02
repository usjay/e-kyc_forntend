<template>
  <div class="nic-page">
    <div class="form-section">
      <h2>Upload Your NIC & Selfie</h2>

      <div class="reference-input">
        <label for="referenceNumber">NIC Number:</label>
        <input
          id="referenceNumber"
          v-model="referenceNumber"
          type="text"
          placeholder="Enter your NIC number"
          required
        >
      </div>

      <div class="upload-grid">
        <div class="upload-box">
          <h3>NIC Front</h3>
          <div class="image-preview">
            <img v-if="preview.front" :src="preview.front" alt="NIC Front Preview">
            <div v-else class="placeholder">No image selected</div>
          </div>
          <input type="file" @change="handleFileChange('front', $event)" accept="image/*">
        </div>

        <div class="upload-box">
          <h3>NIC Back</h3>
          <div class="image-preview">
            <img v-if="preview.back" :src="preview.back" alt="NIC Back Preview">
            <div v-else class="placeholder">No image selected</div>
          </div>
          <input type="file" @change="handleFileChange('back', $event)" accept="image/*">
        </div>

        <div class="upload-box">
          <h3>Selfie</h3>
          <div class="image-preview">
            <img v-if="preview.selfie" :src="preview.selfie" alt="Selfie Preview">
            <div v-else class="placeholder">No image selected</div>
          </div>
          <input type="file" @change="handleFileChange('selfie', $event)" accept="image/*">
        </div>
      </div>

      <div class="buttons">
        <button @click="$router.back()" :disabled="loading">Back</button>
        <button @click="submitImages" :disabled="loading || !referenceNumber || !allFilesUploaded()">
          {{ loading ? 'Uploading...' : 'Submit' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ApiNetwork from '@/network/apiNetwork.ts';
import { UserImageStore } from '@/stores/UserImageStore.ts'

export default defineComponent({
  name: 'NicImages',
  data() {
    return {
      referenceNumber: '',
      files: {
        front: null as File | null,
        back: null as File | null,
        selfie: null as File | null,
      },
      preview: {
        front: null as string | null,
        back: null as string | null,
        selfie: null as string | null,
      },
      // loading: false,
    };
  },
  methods: {
    handleFileChange(type: 'front'|'back'|'selfie', event: Event) {
      const input = event.target as HTMLInputElement;
      if (input.files?.length) {
        const file = input.files[0];
        this.files[type] = file;
        this.createPreview(type, file);
      }
    },
    createPreview(type: 'front'|'back'|'selfie', file: File) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.preview[type] = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    },
    allFilesUploaded(): boolean {
      return !!this.files.front && !!this.files.back && !!this.files.selfie;
    },
    submitImages() {
      if (!this.referenceNumber) {
        alert('Please enter your NIC number.');
        return;
      }
      if (!this.allFilesUploaded()) {
        alert('Please select all three images.');
        return;
      }

      this.loading = true;
      const formData = new FormData();
      formData.append('front', this.files.front!);
      formData.append('back', this.files.back!);
      formData.append('selfie', this.files.selfie!);
      formData.append('referenceNumber', this.referenceNumber);

      const imagestore= UserImageStore();
        imagestore.setImage({

        referenceNumber:this.referenceNumber,
        front :this.files.front,
        back: this.files.back,
        selfie : this.files.selfie,


      });

      ApiNetwork.postform('api/UserImage/upload', formData, 'POST', 'multipart/form-data', (response) => {
        // console.log("IMAGE SUBMITION SUCCESSFULL :", response);
        console.log('Stored in Pinia:', imagestore.$state);
          this.$router.push('/preview');


      });
    }

  }
});
</script>

<style scoped>
.nic-page {
  padding: 20px;
  max-width: 1000px;
  margin: 0 auto;
}

.form-section {
  background: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

h2 {
  text-align: center;
  margin-bottom: 30px;
  color: #333;
}

.upload-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.upload-box {
  border: 2px dashed #ddd;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
}

.upload-box h3 {
  margin-top: 0;
  color: #444;
}

.image-preview {
  height: 200px;
  margin: 15px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f9f9f9;
  border-radius: 5px;
  overflow: hidden;
}

.image-preview img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.placeholder {
  color: #999;
}

input[type="file"] {
  width: 100%;
  margin-top: 10px;
}

.buttons {
  display: flex;
  justify-content: center;
  gap: 15px;
}

button {
  padding: 14px 28px;
  font-size: 16px;
  border-radius: 8px;
  cursor: pointer;
  border: none;
  transition: background-color 0.3s ease;
}

button:first-child {
  background-color: #ccc;
  color: #333;
}

button:last-child {
  background-color: #ff4d4d;
  color: white;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.reference-input {
  margin-bottom: 25px;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
}

.reference-input label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #444;
}

.reference-input input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}
</style>
