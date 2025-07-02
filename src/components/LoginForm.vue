<script lang="ts">
import OtpVerification from './OtpVerification.vue';
import { defineComponent } from 'vue';
import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';

export default defineComponent({
  name: 'LoginPage', // ❗fixed incorrect "firstname"
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
    },
    startTour() {
      const tour = driver({
        showProgress: true,
        showButtons: ['next', 'previous', 'close'],
        steps: [
          {
            element: '.close-btn',
            popover: {
              title: 'Close Button',
              description: 'Click here to close the form if you wish.',
              side: 'left',
              align: 'start',
            }
          },
          {
            element: 'input[type="tel"]',
            popover: {
              title: 'Phone Number Field',
              description: 'Enter your valid 10-digit mobile number here.',
              side: 'top',
              align: 'start',
            }
          },
          {
            element: '.button-group button:last-child',
            popover: {
              title: 'Continue Button',
              description: 'After entering your phone number, click here.',
              side: 'top',
              align: 'start',
            }
          }
        ]
      });

      tour.drive();
    }
  },
  mounted() {
    // Optional: start tour automatically on page load
    // this.startTour();
  }
});
</script>
