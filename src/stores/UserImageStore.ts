import { defineStore } from 'pinia';

export const UserImageStore = defineStore('userImage', {
  state: () => ({
    referenceNumber: '',
    front: null as File | null,
    back: null as File | null,
    selfie: null as File | null,
  }),

  actions: {
    setImage(data: { referenceNumber: string; front: File | null; back: File | null; selfie: File | null }) {
      this.referenceNumber = data.referenceNumber;
      this.front = data.front;
      this.back = data.back;
      this.selfie = data.selfie;
    },

  }
});
