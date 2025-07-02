<template>
  <div class="user-details-page">
    <h2>User Details</h2>

    <section class="user-info">
      <h3>User Info</h3>

      <div class="form-row">
        <div class="form-group">
          <label>First Name</label>
          <input type="text" :value="user.firstName" readonly />
        </div>
        <div class="form-group">
          <label>Last Name</label>
          <input type="text" :value="user.lastName" readonly />
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label>Mobile Number</label>
          <input type="text" :value="user.mobileNumber" readonly />
        </div>
        <div class="form-group">
          <label>Email</label>
          <input type="text" :value="user.email" readonly />
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label>Address</label>
          <input type="text" :value="user.address" readonly />
        </div>
      </div>
    </section>

    <div class="button-group">
      <button @click="$router.back()">Back</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { UserDetailsStore } from '@/stores/UserDetailsStore'

const route = useRoute()
const userStore = UserDetailsStore()

if (userStore.users.length === 0) {
  userStore.fetchUsersFromAPI()
}

const user = computed(() => {
  return userStore.users.find(u => u.id === Number(route.params.id)) || {}
})
</script>

<style scoped>
.user-details-page {
  max-width: 800px;
  margin: 30px auto;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 10px;
  box-sizing: border-box;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}

.user-info {
  background: white;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 30px;
  box-shadow: 0 0 8px rgba(0,0,0,0.1);
}

.user-info h3 {
  margin-bottom: 15px;
  border-bottom: 2px solid #333;
  padding-bottom: 8px;
  color: #444;
}

.form-row {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.form-group {
  flex: 1;
  min-width: 200px;
}

label {
  display: block;
  margin-bottom: 6px;
  font-weight: 600;
  color: #555;
}

input[readonly] {
  width: 100%;
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
  background-color: #eee;
  font-weight: 600;
  color: #222;
  cursor: default;
}

.button-group {
  text-align: right;
}

button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 12px 25px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #0056b3;
}
</style>
