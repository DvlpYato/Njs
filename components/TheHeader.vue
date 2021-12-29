<template>
  <div>
    <b-navbar toggleable="lg" type="ligth" variant="ligth">
      <b-nav-form>
        <div class="h3 mr-3 ml-auto">
          <b-icon icon="code-slash" variant="success"></b-icon>
        </div>
        <b-navbar-brand class="text-success"
          >Sabu Everyday</b-navbar-brand
        ></b-nav-form
      >

      <!-- <b-navbar-nav>
        <b-nav-item to="/">Home</b-nav-item>
      </b-navbar-nav> -->

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav> </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-form> </b-nav-form>

          <b-nav-item v-if="isAuthenticated" right>
            <b-navbar-nav>
              <b-form>
                <b-icon icon="person-fill" style="color: #1c2833"></b-icon>
                <b-nav-text style="color: #28b463" class="mr-3">
                  {{ loggedInUser.username }}</b-nav-text
                ></b-form
              >

              <nuxt-link to="/profile" class="btn btn-success mr-3"
                >Profile</nuxt-link
              >
              <button class="btn btn-success" @click="logout">Logout</button>
            </b-navbar-nav>
          </b-nav-item>
          <template v-else>
            <b-nav-item right>
              <nuxt-link to="/login" class="btn btn-success">login</nuxt-link>
              <nuxt-link to="/register" class="btn btn-success"
                >Register</nuxt-link
              >
            </b-nav-item>
          </template>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      user: this.$auth.user,
      loggedIn: this.$auth.loggedIn,
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser']),
  },
  methods: {
    async logout() {
      await this.$auth.logout()
      this.$router.push('/login')
    },
  },
}
</script>

<style>
.text-main {
  color: #28b463;
}
</style>
