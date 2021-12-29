<template>
  <div class="row">
    <div class="col-5 ml-auto mr-auto mt-5">
      <div class="main">
        <h1 class="text-main">login page</h1>
      </div>

      <b-card class="mt-3">
        <b-form @submit="onSubmit">
          <!-- username -->
          <b-form-group
            id="input-group-1"
            label-for="input-1"
            class="col-"
            description=""
          >
            <label for="feedback-user">Username</label>
            <b-form-input
              id="feedback-user"
              v-model="form.username"
              type="text"
              placeholder="Username"
              pattern="^[A-Za-z0-9_]+$"
              maxlength="12"
              title="require : A-Z, a-z, 0-9 , _ Maxinum 12 character"
              autocomplete="off"
              required
            ></b-form-input>
          </b-form-group>
          <!-- Password -->
          <b-form-group
            id="input-group-2"
            label-for="input-2"
            class="col-"
            description=""
          >
            <label for="feedback-user">Password</label>
            <b-form-input
              id="feedback-user"
              v-model="form.password"
              type="password"
              placeholder="password"
              pattern="^[A-Za-z0-9]+$"
              maxlength="6"
              title="Password : () maximum 6 character"
              autocomplete="off"
              required
            ></b-form-input>
          </b-form-group>
          <b-button type="submit" class="btn-block" variant="success"
            >Login</b-button
          >
        </b-form>
      </b-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  data() {
    return {
      form: {
        username: '',
        password: '',
      },
    }
  },
  methods: {
    async onSubmit(e) {
      e.preventDefault()
      const payload = {
        data: {
          username: this.form.username,
          password: this.form.password,
        },
      }
      try {
        await this.$auth.loginWith('local', payload)
      } catch (error) {
        alert('User and password Invaild')
        this.form.username = ''
        this.form.password = ''
        this.$router.push('/login')
      }
    },
  },
}
</script>

<style></style>
