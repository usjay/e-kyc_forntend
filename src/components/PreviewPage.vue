<template>
  <div class="preview-page">
    <h2>Preview</h2>

    <section class="user-info">
      <h3>User Info</h3>

      <div class="form-row">
        <div class="form-group">
          <label>Title</label>
          <input type="text" :value="user.title" readonly />
        </div>
        <div class="form-group">
          <label>First Name</label>
          <input type="text" :value="user.firstname" readonly />
        </div>
        <div class="form-group">
          <label>Last Name</label>
          <input type="text" :value="user.lastName" readonly />
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label>Mobile Number</label>
          <input type="text" :value="user.mobile" readonly />
        </div>
        <div class="form-group">
          <label>Email</label>
          <input type="text" :value="user.email" readonly />
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label>Nationality</label>
          <input type="text" :value="user.nationality" readonly />
        </div>
        <div class="form-group">
          <label>Address</label>
          <input type="text" :value="user.address" readonly />
        </div>
      </div>
    </section>

    <section class="images-preview">
      <h3>NIC & Selfie Images</h3>
      <div v-if="images.front">
        <p><strong>NIC Front:</strong></p>
        <img :src="images.front" alt="NIC Front Image" class="preview-image" />
      </div>
      <div v-if="images.back">
        <p><strong>NIC Rear:</strong></p>
        <img :src="images.back" alt="NIC Rear Image" class="preview-image" />
      </div>
      <div v-if="images.selfie">
        <p><strong>Selfie:</strong></p>
        <img :src="images.selfie" alt="Selfie Image" class="preview-image" />
      </div>
    </section>

    <div class="button-group">
      <button class="back-btn" @click="$router.back()">Back</button>
      <button class="submit-btn" @click="finalSubmit">Submit All</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { UserDetailsStore } from '@/stores/UserDetailsStore';
// import { useUserImageStore } from '@/stores/UserImageStore';

export default defineComponent({
  name: 'PreviewPage',
  data() {
    return {
      user: {
        title: '',
        firstname: '',
        lastName: '',
        address: '',
        mobile: '',
        email: '',
        nationality: '',
      },
      images: {
        front: null,
        back: null,
        selfie: null,
      },
    };
  },
  created() {
    // const userDetails = UserDetailsStore();
    // const userImages = useUserImageStore();

    // this.user.title = userDetails.title;
    // this.user.firstname = userDetails.initialName;
    // this.user.lastName = userDetails.lastName;
    // this.user.email = userDetails.email;
    // this.user.mobile = userDetails.mobileNumber;
    // this.user.nationality = userDetails.nationality;
    // this.user.address = userDetails.address;
    //
    // this.images.front = userImages.frontpath ? URL.createObjectURL(userImages.frontpath) : null;
    // this.images.back = userImages.backpath ? URL.createObjectURL(userImages.backpath) : null;
    // this.images.selfie = userImages.selfiepath ? URL.createObjectURL(userImages.selfiepath) : null;

  },
  methods: {
    finalSubmit() {
      const finalData = {
        user: this.user,
        images: this.images,
      };

      console.log('Final data to submit:', finalData);
      alert('Data submitted successfully!');
      this.$router.push('/thank-you');
    },
  },
});
</script>

<style scoped>
.preview-page {
  width: 100vw;
  height: 100vh;
  padding: 30px;
  background: #fff;
  box-sizing: border-box;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  max-width: 900px;
  margin: 0 auto;
}

h3,
label,
p,
strong {
  color: #070606;
  font-weight: 700;
}

h2 {
  text-align: center;
  margin-bottom: 30px;
  font-weight: 700;
  color: red;
}

.user-info {
  background: #f7f7f7;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 30px;
}

.user-info h3 {
  margin-bottom: 20px;
  border-bottom: 2px solid #070606;
  padding-bottom: 8px;
}

.form-row {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.form-group {
  flex: 1;
  min-width: 250px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
}

input[readonly] {
  width: 100%;
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 16px;
  background-color: #eee;
  color: black;
  font-weight: 700;
  cursor: default;
}

.images-preview {
  margin-bottom: 20px;
}

.preview-image {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  margin-top: 5px;
}

.button-group {
  display: flex;
  margin-top: 30px;
  justify-content: flex-end;
  gap: 10px;
  padding-right: 20px;
}

button {
  padding: 12px 20px;
  border: none;
  font-weight: bold;
  border-radius: 10px;
  cursor: pointer;
  flex: 1;
  margin: 0 10px;
  transition: background-color 0.3s ease;
}

.back-btn {
  background-color: white;
  color: #070606;
  border: 2px solid #070606;
  flex: 0 0 120px;
}

.back-btn:hover {
  background-color: #ffe6e6;
}

.submit-btn {
  background-color: #ff4d4d;
  color: white;
  flex: 0 0 120px;
}

.submit-btn:hover {
  background-color: #e60000;
}
</style>
