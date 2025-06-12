<template>
  <div class="form-page">
    <h2 class="form-title">User Form</h2>
    <form @submit.prevent="submitForm">
      <div class="form-row">
        <div class="form-group">
          <label for="title">Title<span class="required">*</span></label>
          <select v-model="user.title" id="title" @change="clearError('title')">
            <option value="">Select</option>
            <option value="Mr">Mr</option>
            <option value="Mrs">Mrs</option>
            <option value="Ven">Ven</option>
          </select>
          <span class="error" v-if="errors.title">{{ errors.title }}</span>
        </div>

        <div class="form-group">
          <label for="name">First Name<span class="required">*</span></label>
          <input v-model="user.firstname" type="text" id="name" @input="clearError('name')" />
          <span class="error" v-if="errors.firstname">{{ errors.firstname }}</span>
        </div>

        <div class="form-group">
          <label for="lastName">Last Name<span class="required">*</span></label>
          <input v-model="user.lastName" type="text" id="lastName" @input="clearError('lastName')" />
          <span class="error" v-if="errors.lastName">{{ errors.lastName }}</span>
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label for="mobile">Mobile Number<span class="required">*</span></label>
          <input v-model="user.mobile" type="tel" id="mobile" @input="clearError('mobile')" />
          <span class="error" v-if="errors.mobile">{{ errors.mobile }}</span>
        </div>

        <div class="form-group">
          <label for="email">Email<span class="required">*</span></label>
          <input v-model="user.email" type="email" id="email" @input="clearError('email')" />
          <span class="error" v-if="errors.email">{{ errors.email }}</span>
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label for="nationality">Nationality<span class="required">*</span></label>
          <input v-model="user.nationality" type="text" id="nationality" @input="clearError('nationality')" />
          <span class="error" v-if="errors.nationality">{{ errors.nationality }}</span>
        </div>

        <div class="form-group">
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
import ApiNetwork from '@/network/apiNetwork.ts';

export default defineComponent({
  firstname: 'UserForm',
  data() {
    return {
      user: {
        title: '',
        firstname: '',
        lastName: '',
        mobile: '',
        email: '',
        nationality: '',
        address: ''
      },
      errors: {
        title: '',
        firstname: '',
        lastName: '',
        mobile: '',
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
    validateForm() {
      let valid = true;
      this.errors = {
        title: '',
        firstname: '',
        lastName: '',
        mobile: '',
        email: '',
        nationality: '',
        address: ''
      };

      if (!this.user.title) {
        this.errors.title = 'Title is required';
        valid = false;
      }
      if (!this.user.firstname.trim()) {
        this.errors.firstname = 'First name is required';
        valid = false;
      }
      if (!this.user.lastName.trim()) {
        this.errors.lastName = 'Last name is required';
        valid = false;
      }
      const phoneRegex = /^[0-9]{10}$/;
      if (!phoneRegex.test(this.user.mobile)) {
        this.errors.mobile = 'Enter a valid 10-digit mobile number';
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
          first_name: this.user.firstname,
          last_name: this.user.lastName,
          address: this.user.address,
          email: this.user.email,
          contact_number: this.user.mobile,
        };

        ApiNetwork.post("api/Student/save", payload, 'POST', (response: any) => {
          console.log("Payload:", payload);
          localStorage.setItem('userFormData', JSON.stringify(this.user));
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
