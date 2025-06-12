<template>
  <div class="page-container">


    <div class="main-content">


      <div class="form-container">
        <div class="form-header">
          <h2>OTP Verification</h2>
        </div>

        <p class="otp-instruction">OTP code has been sent to {{ phoneNumber }} enter the code below to continue.</p>

        <div class="otp-input-group">
          <input
              v-for="(digit, index) in otpDigits"
              :key="index"
              type="text"
              v-model="otpDigits[index]"
              maxlength="1"
              @input="handleInput(index, $event)"
              @keydown.delete="handleBackspace(index, $event)"
              @paste.prevent="handlePaste"
              ref="otpInputs"
              class="otp-input"
          />
        </div>

        <div class="resend-section">
          <p v-if="timeLeft > 0" class="timer">Resend OTP in {{ minutes }}:{{ seconds }}</p>
          <a
              v-else
              href="#"
              @click.prevent="resendOtp"
              class="resend-link"
          >
            Resend OTP
          </a>
        </div>

        <div class="action-buttons">
          <button class="back-btn" @click="goBack">Back</button>
          <button class="verify-btn" @click="verifyOtp">Verify</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {useRouter} from "vue-router";

export default defineComponent({
  firstname: "OtpVerification",

  setup(){
    const router = useRouter()
    return {
      router
    }
  },


  props: {
    phoneNumber: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      otpDigits: ['', '', '', ''],
      timeLeft: 120,
      timer: null
    };
  },
  computed: {
    minutes() {
      return Math.floor(this.timeLeft / 60).toString().padStart(2, '0');
    },
    seconds() {
      return (this.timeLeft % 60).toString().padStart(2, '0');
    }
  },
  methods: {
    handleInput(index, event) {
      this.otpDigits[index] = event.target.value.replace(/\D/g, '');
      if (event.target.value && index < 3) {
        this.$refs.otpInputs[index + 1].focus();
      }
    },
    handleBackspace(index, event) {
      if (!this.otpDigits[index] && index > 0) {
        this.$refs.otpInputs[index - 1].focus();
      }
    },
    handlePaste(event) {
      const pasteData = event.clipboardData.getData('text').replace(/\D/g, '');
      for (let i = 0; i < Math.min(pasteData.length, 4); i++) {
        this.otpDigits[i] = pasteData[i];
        if (i < 3) {
          this.$refs.otpInputs[i + 1].focus();
        }
      }
    },
    startTimer() {
      this.timer = setInterval(() => {
        if (this.timeLeft > 0) {
          this.timeLeft--;
        } else {
          clearInterval(this.timer);
        }
      }, 1000);
    },
    resendOtp() {
      alert('New OTP sent to ' + this.phoneNumber);
      this.timeLeft = 120;
      this.startTimer();
      this.resetOtpInputs();
    },
    resetOtpInputs() {
      this.otpDigits = ['', '', '', ''];
      this.$refs.otpInputs[0].focus();
    },
    verifyOtp() {
      const comp = this;
      const otp = comp.otpDigits.join('');
      if (otp.length === 4) {

        alert(`OTP ${otp} verified successfully!`);
        comp.router.push('/userform');
        // comp.$router.push('/')

      } else {
        alert('Please enter complete 4-digit OTP');

      }
    },
    goBack() {
      this.$emit('go-back');
    }
  },
  mounted() {
    console.log(">>>>", this.$router)
    this.startTimer();
    this.$refs.otpInputs[0].focus();
  },
  beforeUnmount() {
    clearInterval(this.timer);
  }
});
</script>

<style scoped>
.page-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
  background: #ffffff;
}

.top-banner {
  width: 100%;
  height: 200px;
  position: relative;
  z-index: 1;
}

.top-banner img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.main-content {
  flex: 1;
  position: relative;
  z-index: 2;
}

.bottom-layer {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 150px;
  background: #ff4d4d;
  z-index: 1;
}

.form-container {
  position: relative;
  margin: 40px auto 0;
  width: 90%;
  max-width: 400px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  z-index: 3;
  text-align: center;
  overflow: hidden;
}

.form-header {
  background-color: #ff4d4d;
  padding: 20px;
  color: white;
}

.form-header h2 {
  margin: 0;
  font-size: 1.5rem;
}

.otp-instruction {
  padding: 20px 30px 0;
  color: #666;
  margin-bottom: 20px;
}

.otp-input-group {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin: 25px 30px;
  padding-bottom: 10px;
}

.otp-input {
  width: 50px !important;
  height: 50px;
  text-align: center;
  font-size: 24px;
  border: 1px solid #ddd !important;
  border-radius: 8px;
  background: #f9f9f9;
  transition: border-color 0.3s;
}

.otp-input:focus {
  border-color: #ff4d4d !important;
  outline: none;
}

.resend-section {
  margin: 10px 30px;
}

.timer {
  color: #666;
  font-size: 14px;
  margin: 0;
}

.resend-link {
  color: #ff4d4d;
  text-decoration: none;
  font-weight: bold;
  font-size: 14px;
  display: inline-block;
  margin: 10px 0;
}

.resend-link:hover {
  text-decoration: underline;
}

.action-buttons {
  display: flex;
  justify-content: space-between;
  margin: 20px 30px 30px;
}

.back-btn {
  padding: 12px;
  font-size: 16px;
  background-color: #f0f0f0;
  color: #333;
  border-radius: 8px;
  cursor: pointer;
  border: none;
  transition: all 0.3s ease;
  flex: 1;
  margin-right: 10px;
}

.back-btn:hover {
  background-color: #e0e0e0;
}

.verify-btn {
  padding: 12px;
  font-size: 16px;
  background-color: #ff4d4d;
  color: #ffffff;
  border-radius: 8px;
  cursor: pointer;
  border: none;
  transition: all 0.3s ease;
  flex: 1;
  margin-left: 10px;
}

.verify-btn:hover {
  background-color: #e60000;
}
</style>
