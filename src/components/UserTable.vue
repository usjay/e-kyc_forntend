<template>
  <div>
    <v-text-field
      v-model="searchFilter"
      label="filter by name and address"
      clearable
      class="mb-4"
    ></v-text-field>
<!--    <v-btn color="red" @click="applyFilter">Filter</v-btn>-->
    <v-btn text @click="clearFilter">Clear</v-btn>

    <v-data-table-virtual
      :headers="headers"
      :items="filteredItems"
      height="400"
      item-value="firstName"
      fixed-header
    >
      <template #item.action="{ item }">
        <v-btn color="red" @click="goToPreview(item)">Action</v-btn>
      </template>
    </v-data-table-virtual>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { UserDetailsStore } from '@/stores/UserDetailsStore'

const router = useRouter()
const userStore = UserDetailsStore()

const searchFilter = ref('')

onMounted(() => {
  userStore.fetchUsersFromAPI()
})

const filteredItems = computed(() => {
  if (!searchFilter.value) return userStore.users
  const filter = searchFilter.value.toLowerCase()
  return userStore.users.filter(user =>
    (user.firstName && user.firstName.toLowerCase().includes(filter)) ||
    (user.address && user.address.toLowerCase().includes(filter))
  )
})

const headers = [
  { title: 'First Name', key: 'firstName' },
  { title: 'Last Name', key: 'lastName' },
  { title: 'Email', key: 'email' },
  { title: 'Mobile Number', key: 'mobileNumber' },
  { title: 'Address', key: 'address' },
  { title: 'Action', key: 'action', align: 'center' }
]

function goToPreview(user: any) {
  router.push({ path: `/students/${user.id}` })
}


function clearFilter() {
  searchFilter.value = ''
}
</script>
