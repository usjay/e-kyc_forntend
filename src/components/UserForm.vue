<template>
  <div class="form-page">
    <h2 class="form-title">User Form</h2>

    <button @click="startTour" class="guide-btn">Start Form Guide</button>

    <form @submit.prevent="submitForm">
      <div class="form-row">
        <div class="form-group" id="step-title">
          <label for="title">Title<span class="required">*</span></label>
          <select v-model="user.title" id="title" @change="clearError('title')">
            <option value="">Select</option>
            <option value="Mr">Mr</option>
            <option value="Mrs">Mrs</option>
            <option value="Ven">Ven</option>
          </select>
          <span class="error" v-if="errors.title">{{ errors.title }}</span>
        </div>

        <div class="form-group" id="step-firstname">
          <label for="firstName">First Name<span class="required">*</span></label>
          <input v-model="user.firstName" type="text" id="firstName" @input="clearError('firstName')" />
          <span class="error" v-if="errors.firstName">{{ errors.firstName }}</span>
        </div>

        <div class="form-group" id="step-lastname">
          <label for="lastName">Last Name<span class="required">*</span></label>
          <input v-model="user.lastName" type="text" id="lastName" @input="clearError('lastName')" />
          <span class="error" v-if="errors.lastName">{{ errors.lastName }}</span>
        </div>
      </div>

      <div class="form-row">
        <div class="form-group" id="step-mobile">
          <label for="mobileNumber">Mobile Number<span class="required">*</span></label>
          <input v-model="user.mobileNumber" type="tel" id="mobileNumber" @input="clearError('mobileNumber')" />
          <span class="error" v-if="errors.mobileNumber">{{ errors.mobileNumber }}</span>
        </div>

        <div class="form-group" id="step-email">
          <label for="email">Email<span class="required">*</span></label>
          <input v-model="user.email" type="email" id="email" @input="clearError('email')" />
          <span class="error" v-if="errors.email">{{ errors.email }}</span>
        </div>
      </div>

      <div class="form-row">
        <div class="form-group" id="step-nationality">
          <label for="nationality">Nationality<span class="required">*</span></label>
          <input v-model="user.nationality" type="text" id="nationality" @input="clearError('nationality')" />
          <span class="error" v-if="errors.nationality">{{ errors.nationality }}</span>
        </div>

        <div class="form-group" id="step-address">
          <label for="address">Address<span class="required">*</span></label>
          <input v-model="user.address" type="text" id="address" @input="clearError('address')" />
          <span class="error" v-if="errors.address">{{ errors.address }}</span>
        </div>
      </div>

      <div class="button-group">
        <button type="button" class="back-btn" @click="$router.back()">Back</button>
        <button type="submit" class="submit-btn">Let's Go</button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';
import ApiNetwork from '@/network/apiNetwork.ts';
import { UserDetailsStore } from '@/stores/UserDetailsStore.ts';

export default defineComponent({
  name: 'UserForm',
  data() {
    return {
      user: {
        title: '',
        firstName: '',
        lastName: '',
        mobileNumber: '',
        email: '',
        nationality: '',
        address: ''
      },
      errors: {
        title: '',
        firstName: '',
        lastName: '',
        mobileNumber: '',
        email: '',
        nationality: '',
        address: ''
      }
    };
  },
  methods: {
    clearError(field: string) {
      this.errors[field] = '';
    },
    startTour() {
      const driverObj = driver({
        showProgress: true,
        allowClose: true,
        steps: [
          {
            element: '#step-title',
            popover: {
              title: 'Select Title',
              description: 'Choose your proper title here.',
              side: 'right'
            }
          },
          {
            element: '#step-firstname',
            popover: {
              title: 'Enter First Name',
              description: 'Provide your first name.',
              side: 'bottom'
            }
          },
          {
            element: '#step-lastname',
            popover: {
              title: 'Enter Last Name',
              description: 'Provide your last name.',
              side: 'bottom'
            }
          },
          {
            element: '#step-mobile',
            popover: {
              title: 'Mobile Number',
              description: 'Enter a valid 10-digit phone number.',
              side: 'bottom'
            }
          },
          {
            element: '#step-email',
            popover: {
              title: 'Email Address',
              description: 'Your email must be valid and active.',
              side: 'bottom'
            }
          },
          {
            element: '#step-nationality',
            popover: {
              title: 'Nationality',
              description: 'Mention your country or nationality.',
              side: 'bottom'
            }
          },
          {
            element: '#step-address',
            popover: {
              title: 'Home Address',
              description: 'Your current residence or address.',
              side: 'bottom'
            }
          }
        ]
      });

      driverObj.drive();
    },
    validateForm() {
      let valid = true;

      this.errors = {
        title: '',
        firstName: '',
        lastName: '',
        mobileNumber: '',
        email: '',
        nationality: '',
        address: ''
      };

      if (!this.user.title) {
        this.errors.title = 'Title is required';
        valid = false;
      }
      if (!this.user.firstName.trim()) {
        this.errors.firstName = 'First name is required';
        valid = false;
      }
      if (!this.user.lastName.trim()) {
        this.errors.lastName = 'Last name is required';
        valid = false;
      }
      const phoneRegex = /^[0-9]{10}$/;
      if (!phoneRegex.test(this.user.mobileNumber)) {
        this.errors.mobileNumber = 'Enter a valid 10-digit mobile number';
        valid = false;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(this.user.email)) {
        this.errors.email = 'Enter a valid email address';
        valid = false;
      }
      if (!this.user.nationality.trim()) {
        this.errors.nationality = 'Nationality is required';
        valid = false;
      }
      if (!this.user.address.trim()) {
        this.errors.address = 'Address is required';
        valid = false;
      }

      return valid;
    },
    submitForm() {
      if (this.validateForm()) {
        const payload = {
          first_name: this.user.firstName,
          last_name: this.user.lastName,
          address: this.user.address,
          email: this.user.email,
          contact_number: this.user.mobileNumber
        };

        const userDetails = UserDetailsStore();
        userDetails.storeformdata({
          title: this.user.title,
          firstName: this.user.firstName,
          lastName: this.user.lastName,
          email: this.user.email,
          mobileNumber: this.user.mobileNumber,
          nationality: this.user.nationality,
          address: this.user.address
        });

        console.log('Stored in Pinia:', userDetails.$state);

        ApiNetwork.postform("api/Student/save", payload, 'POST', 'application/json', (response: any) => {
          console.log("SUCCESSFUL SUBMISSION:", response);
          this.$router.push('/nicimage_test');
        });
      }
    }
  }
});
</script>

<style scoped>

.form-page {
  width: 100vw;
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: sans-serif;
}

.guide-btn {
  background-color: #ff0000;
  color: white;
  border: none;
  padding: 12px 24px;
  margin-bottom: 20px;
  border-radius: 8px;
  cursor: pointer;
}

.guide-btn:hover {
  background-color: #ffffff;
}

form {
  width: 100%;
  max-width: 800px;
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.form-title {
  text-align: center;
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 30px;
  color: black;
}

.form-row {
  display: flex;
  gap: 30px;
  margin-bottom: 30px;
  flex-wrap: wrap;
}

.form-group {
  flex: 1;
  min-width: 250px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

label {
  font-weight: bold;
}

.required {
  color: red;
  margin-left: 4px;
}

input,
select {
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 16px;
}

.button-group {
  display: flex;
  margin-top: 30px;
  gap: 20px;
  justify-content: center;
}

button {
  padding: 14px 28px;
  font-size: 16px;
  border-radius: 8px;
  cursor: pointer;
  border: none;
  transition: background-color 0.3s ease;
}

.back-btn {
  background-color: #ccc;
  color: #333;
}

.back-btn:hover {
  background-color: #999;
  color: white;
}

.submit-btn {
  background-color: #ff4d4d;
  color: white;
}

.submit-btn:hover {
  background-color: #e60000;
}

.error {
  color: red;
  font-size: 13px;
}
</style>
