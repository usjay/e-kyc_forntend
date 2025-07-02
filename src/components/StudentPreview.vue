<template>
  <div v-if="student" class="container">
    <div class="details-container">
      <v-data-table
        :headers="headers"
        :items="studentTableData"
        class="elevation-1"
        hide-default-footer
      >
        <template #item.field="{ item }">{{ item.field }}</template>
        <template #item.value="{ item }">{{ item.value }}</template>
      </v-data-table>
    </div>

    <div class="images-container">
      <h3>NIC Images</h3>
      <div class="image-section">
        <div v-if="student.image.nicFrontPath">
          <p><strong>NIC Front:</strong></p>
          <img :src="getImageUrl(student.image.nicFrontPath)" alt="NIC Front" width="200" />
        </div>
        <div v-if="student.image.nicBackPath">
          <p><strong>NIC Back:</strong></p>
          <img :src="getImageUrl(student.image.nicBackPath)" alt="NIC Back" width="200" />
        </div>
        <div v-if="student.image.selfiePath">
          <p><strong>Selfie:</strong></p>
          <img :src="getImageUrl(student.image.selfiePath)" alt="Selfie" width="200" />
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <p>Loading student data...</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ApiNetwork from '@/network/apiNetwork.ts';

export default defineComponent({
  data() {
    return {
      student: null as any | null,
      studentTableData: [] as { field: string; value: any }[],
      headers: [
        { title: 'Field', key: 'field' },
        { title: 'Value', key: 'value' },
      ],
    };
  },
  methods: {
    fetchStudent() {
      const id = this.$route.params.id;
      ApiNetwork.postform(`api/StudentImage/${id}`, null, 'GET', 'application/json', (response) => {
          if (response.data) {this.student = response.data.data;
          } else {console.error('error get student:', response);this.student = null;
          }
        }
      );
    },
    getImageUrl(path: string) {
      if (!path) return '';
      const clean = path.replace(/^\/?C:\\Users\\ADMIN\\Downloads\\DemoAPI\\DemoAPI\\wwwroot\\/, '');
      return `${import.meta.env.VITE_BASE_API_URL}/${clean.replace(/\\/g, '/')}`;
    },
  },
  created() {
    this.fetchStudent();
  },
  watch: {
    student(newVal) {
      if (!newVal) {
        this.studentTableData = [];
        return;
      }
      this.studentTableData = [
        { field: 'Student ID', value: newVal.student_id },
        { field: 'Full Name', value: newVal.full_name },
        { field: 'Email', value: newVal.email },
        { field: 'Contact Number', value: newVal.contact_number },
        { field: 'Address', value: newVal.address },
      ];
    },
  },
});
</script>

<style scoped>
.container {
  display: flex;
  gap: 40px;
  align-items: flex-start;
  padding: 20px;
}
.details-container,
.images-container {
  flex: 1;
}
.image-section {
  display: flex;
  gap: 20px;
  margin-top: 10px;
  flex-wrap: wrap;
}
.image-section > div {
  flex: 1 1 120px;
}
@media (max-width: 600px) {
  .container {
    flex-direction: column;
  }
}
</style>
