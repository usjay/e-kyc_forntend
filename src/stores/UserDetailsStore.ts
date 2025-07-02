import { defineStore } from 'pinia'
import ApiNetwork from '@/network/apiNetwork.ts'

export const UserDetailsStore = defineStore('userdetails', {
  state: () => ({
    users: [] as any[],
    user: {
      title: '',
      firstName: '',
      lastName: '',
      email: '',
      mobileNumber: '',
      nationality: '',
      address: ''
    }
  }),

  actions: {
    async fetchUsersFromAPI() {
      ApiNetwork.postform(
        'api/Student/list', {}, 'GET', 'application/json', (response) => {
          if (response?.data?.data?.students) {
            this.users = response.data.data.students.map((student: any) => ({
              id: student.id,
              firstName: student.first_name,
              lastName: student.last_name,
              address: student.address,
              email: student.email,
              mobileNumber: student.contact_number
            }))
          }
        }
      )
    },

    storeformdata(data: {
      title: string;
      firstName: string;
      lastName: string;
      email: string;
      mobileNumber: string;
      nationality: string;
      address: string;
    }) {
      this.user = { ...data }
    }
  }
})
