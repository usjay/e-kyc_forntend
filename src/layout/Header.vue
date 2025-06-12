<template>
  <div class="top-banner">
    <img src="@/assets/banner/banner.jpg" alt="Banner" class="banner-img" />
    <img src="@/assets/banner1.png" alt="Phone Icon" class="top-right-icon" />
  </div>
</template>

<script>
export default {
  firstname: "HeaderBanner"
}
</script>

<style scoped>
.top-banner {
  position: relative;
  width: 100%;
  height: 544px;
  top: -89px;
  overflow: hidden;
}

.banner-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  background-color: red;
}

.top-right-icon {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 30px;
  height: 30px;
}
</style>
