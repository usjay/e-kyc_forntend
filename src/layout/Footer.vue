<template>
  <div class="bottom-layer">
    <img :src="paymediaImage" alt="Paymedia" class="logo" />

    <div class="contact-info">
      <span class="section-label">contact us</span>
      <a href="mailto:info@paymedia.lk" class="contact-link">
        <font-awesome-icon :icon="['fas', 'envelope']" />
        <span>care@paymedia.lk</span>
      </a>
      <a href="tel:+94112223344" class="contact-link">
        <font-awesome-icon :icon="['fas', 'phone']" />
        <span>+94 112 223 344</span>
      </a>

      <a href="https://maps.google.com?q=Colombo" target="_blank" class="contact-link">
        <font-awesome-icon :icon="['fas', 'map-marker-alt']" />
        <span>Pay Media Limited,106 Havelock Road, Colombo 05.</span>
      </a>
    </div>

    <div class="social-section">
      <span class="section-label">social media</span>
      <div class="social-icons">
        <a class="social-icon" href="https://www.facebook.com" target="_blank">
          <font-awesome-icon :icon="['fab', 'facebook-f']" />
        </a>
        <a class="social-icon" href="https://x.com/" target="_blank">
          <font-awesome-icon :icon="['fab', 'twitter']" />
        </a>
        <a class="social-icon" href="https://www.youtube.com/" target="_blank">
          <font-awesome-icon :icon="['fab', 'youtube']" />
        </a>
        <a class="social-icon" href="https://www.instagram.com/" target="_blank">
          <font-awesome-icon :icon="['fab', 'instagram']" />
        </a>
        <a class="social-icon" href="https://www.linkedin.com/" target="_blank">
          <font-awesome-icon :icon="['fab', 'linkedin']" />
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import paymediaImage from '@/assets/paymedia.png'

export default defineComponent({
  firstname: 'BottomLayer',
  data() {
    return {
      paymediaImage,
    }
  }
})
</script>

<style scoped>
.bottom-layer {
  width: 100%;
  height: 408px;
  border-top: 0.5px solid rgba(0, 0, 0, 0.3);
  background-color: #ff4d4d;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 100px;
  padding: 0 40px;
  box-sizing: border-box;
  margin: 0 auto;
  text-align: left;
}

.logo {
  height: 120px;
  object-fit: contain;
  transition: transform 0.2s ease;
  cursor: pointer;
}
.logo:hover {
  transform: scale(1.1);
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 20px;
  color: white;
}

.contact-link {
  color: white;
  text-decoration: none;
  font-size: 18px;
  display: flex;
  align-items: center;
  gap: 15px;
  transition: color 0.2s ease;
  cursor: pointer;
}
.contact-link:hover {
  color: black;
}

.social-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  color: white;
}

.social-icons {
  display: flex;
  gap: 30px;
  justify-content: center;
  color: white;
}

.social-icon {
  font-size: 36px;
  color: white;
  transition: transform 0.2s ease, color 0.2s ease;
  cursor: pointer;
}
.social-icon:hover {
  transform: scale(1.2);
  color: black;
}

.section-label {
  font-size: 24px;
  font-weight: bold;
  color: white;
  user-select: none;
}
</style>
