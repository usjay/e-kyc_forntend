<template>
  <div>
    <Header />
    <main>
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Header from './layout/Header.vue';
import Footer from './layout/Footer.vue';

export default defineComponent({
  name: 'App',
  components: { Header, Footer }
});
</script>

<!--<style>-->
<!--/* Make sure html and body fill viewport with no margin/padding and no scroll */-->
<!--html, body {-->
<!--  margin: 0;-->
<!--  padding: 0;-->
<!--  width: 100vw;-->
<!--  height: 100vh;-->
<!--  overflow: hidden; /* prevent scrolling on body */-->
<!--}-->

<!--/* App container fills viewport and uses flex column layout */-->
<!--#app {-->
<!--  display: flex;-->
<!--  flex-direction: column;-->
<!--  width: 100vw;-->
<!--  height: 100vh;-->
<!--  box-sizing: border-box;-->
<!--  overflow: hidden;-->
<!--}-->

<!--/* Header and Footer fixed height and full width */-->
<!--Header, Footer {-->
<!--  flex-shrink: 0;-->
<!--  height: 60px;-->
<!--  width: 100vw;-->
<!--  background: #eee;-->
<!--}-->

<!--/* Main content fills remaining space, scrollable if content too tall */-->
<!--main {-->
<!--  flex-grow: 1;-->
<!--  width: 100vw;-->
<!--  overflow-y: auto; /* scroll vertically if needed */-->
<!--  background: white;-->
<!--  padding: 20px;-->
<!--  box-sizing: border-box;-->
<!--}-->
<!--</style>-->
