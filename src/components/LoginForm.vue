<template>
  <div class="page-container">
    <div v-if="showLoginForm" class="form-container">
      <button class="close-btn" @click="closeForm">×</button>
      <h2>Register or User Login</h2>

      <p v-if="phoneError" style="color: red; margin-bottom: 10px;">
        {{ phoneError }}
      </p>

      <input
        type="tel"
        v-model="phoneNumber"
        placeholder="Enter your phone number"
        required
        @keyup.enter="handleContinue"
      />

      <div class="button-group">
        <button @click="handleBack">Back</button>
        <button @click="handleContinue">Continue</button>
      </div>
    </div>
  </div>

  <OtpVerification
    v-if="showOtpVerification"
    :phone-number="phoneNumber"
    @back="handleOtpBack"
    @verify="handleOtpVerify"
  />
</template>

<script lang="ts">
import OtpVerification from './OtpVerification.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  firstname: 'LoginPage',
  components: {
    OtpVerification
  },
  data() {
    return {
      phoneNumber: '',
      phoneError: '',
      showLoginForm: true,
      showOtpVerification: false
    };
  },
  methods: {
    closeForm() {
      this.showLoginForm = false;
    },
    handleBack() {
      alert("Going back...");
    },
    handleContinue() {
      const phoneRegex = /^[0-9]{10}$/;
      this.phoneError = '';
      if (this.phoneNumber.trim() === '') {
        this.phoneError = 'Phone number is required.';
        return;
      }
      if (!phoneRegex.test(this.phoneNumber)) {
        this.phoneError = 'Please enter a valid 10-digit phone number.';
        return;
      }
      this.showLoginForm = false;
      this.showOtpVerification = true;
    },
    handleOtpBack() {
      this.showOtpVerification = false;
      this.showLoginForm = true;
    },
    handleOtpVerify(otp: string) {
      alert(`OTP ${otp} verified for ${this.phoneNumber}`);
    }
  }
});
</script>

<style scoped>
.page-container {
  position: relative;
  width: 100vw;
  height: 100vh;
  background: #ffffff;
  overflow: hidden;
}

.form-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  max-width: 400px;
  padding: 30px;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  z-index: 2;
  text-align: center;
  color: #ff4d4d;
  margin-bottom: 20px;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 15px;
  background: transparent;
  font-size: 24px;
  font-weight: bold;
  cursor: pointer;
  color: #ff4d4d;
  line-height: 1;
  padding: 5px;
}

.button-group {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin-top: 20px;
}

.button-group button {
  font-size: 16px;
  cursor: pointer;
  border-radius: 10px;
  border-width: 2px;
  border-style: solid;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20.21px;
  transition: all 0.3s ease;
}

/* Back Button */
.button-group button:first-child {
  background-color: #f0f0f0;
  color: #333;
  width: 144px;
  height: 60px;
  border-color: #ccc;
}

.button-group button:first-child:hover {
  background-color: #ff0000;
  color: #fff;
}

/* Continue Button */
.button-group button:last-child {
  background-color: #ff4d4d;
  color: white;
  width: 265px;
  height: 60px;
  border-color: #ff4d4d;
}

.button-group button:last-child:hover {
  background-color: #e60000;
}

input {
  width: 100%;
  padding: 12px;
  font-size: 16px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: #f9f9f9;
  transition: border-color 0.3s;
}

input:focus {
  border-color: #ff4d4d;
}
</style>
