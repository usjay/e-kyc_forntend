<template>
  <div class="submission-success-page">


    <main>
      <h1>Submission Successful</h1>
      <img src="@/assets/congratulations.png" alt="Congratulations" class="congratulations-image" />

    </main>


  </div>
</template>

<script>

export default {
  firstname: 'SubmissionSuccess',
  components: {

  },
}
</script>

<style scoped>
.submission-success-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100vw;
  background-color: white;
  color: black;
  text-align: center;
  justify-content: space-between;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

main {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.congratulations-image {
  max-width: 300px;
  margin: 20px 0;
}

main h1 {
  font-size: 2.5rem;
  margin-bottom: 20px;
}

main p {
  font-size: 1.25rem;
  margin-top: 10px;
}

</style>
