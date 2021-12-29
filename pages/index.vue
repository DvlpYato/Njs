<template>
  <div>
    <div class="text-center">
      <h1 class="mb-5">Wellcome</h1>
      <div v-if="loggedIn" class="col mb-5">
        <h2>username : {{ user.username }}</h2>
        <!-- <nuxt-img :src="user.profile_img" class="text-center w-50 h-50" /> -->
        <!-- <img :src="getPath()" /> -->
      </div>
      <NuxtLogo />
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
}
</script>

<script>
export default {
  data() {
    return {
      user: this.$auth.user,
      loggedIn: this.$auth.loggedIn,
    }
  },
  methods: {
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
    showAlert() {
      this.dismissCountDown = this.dismissSecs
    },
    getPath() {
      return '@' + this.user.profile_img
    },
  },
}
</script>

<style scoped></style>
