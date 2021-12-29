<template>
  <div class="row">
    <div class="col-6 ml-auto mr-auto">
      <h1>{{ title }}</h1>
      <b-card>
        <b-form @submit.prevent="onSubmit">
          <!-- Username -->
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
              :state="validation_username"
              type="text"
              placeholder="Username"
              pattern="^[A-Za-z0-9_]+$"
              maxlength="12"
              title="require : A-Z, a-z, 0-9 , _ Maxinum 12 character"
              autocomplete="off"
              required
            ></b-form-input>
            <b-form-invalid-feedback :state="validation_username">
              Username : A-Z, a-z, 0-9 , _ Maxinum 12 character
            </b-form-invalid-feedback>
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
              :state="validation_password"
              type="text"
              placeholder="Password"
              pattern="^[A-Za-z0-9]+$"
              maxlength="6"
              title="Password : () maximum 6 character"
              autocomplete="off"
              required
            ></b-form-input>
            <b-form-invalid-feedback :state="validation_password">
              Password : (can't contain character and number ex. aa , 11)
              maximum 6 character
            </b-form-invalid-feedback>
          </b-form-group>
          <!-- First name  -->
          <b-form-group
            id="input-group-3"
            label-for="input-3"
            class="col-"
            description=""
          >
            <label for="feedback-user">First name</label>
            <b-form-input
              id="feedback-user"
              v-model="form.firstname"
              type="text"
              placeholder="First name"
              pattern="^[A-Za-z]+$"
              maxlength="100"
              title="input your first name"
              autocomplete="off"
              required
            ></b-form-input>
          </b-form-group>
          <!-- Last name -->
          <b-form-group
            id="input-group-4"
            label-for="input-4"
            class="col-"
            description=""
          >
            <label for="feedback-user">Last name</label>
            <b-form-input
              id="feedback-user"
              v-model="form.lastname"
              type="text"
              placeholder="Last name"
              pattern="^[A-Za-z]+$"
              maxlength="100"
              title="input your last name"
              autocomplete="off"
              required
            ></b-form-input>
          </b-form-group>
          <!-- img -->
          <b-form-group
            label="Profile image"
            label-for="form-image"
            label-cols-lg="2"
          >
            <b-input-group>
              <b-input-group-prepend is-text>
                <b-icon icon="image-fill"></b-icon>
              </b-input-group-prepend>
              <b-form-file
                id="form-image"
                v-model="form.profileImg"
                accept="image/*"
              ></b-form-file>
            </b-input-group>
          </b-form-group>
          <!-- submit -->
          <b-button type="submit" variant="success">Register</b-button>
          <nuxt-link class="ml-3" to="/login">Cancel</nuxt-link>
        </b-form>
      </b-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RegisterPage',
  data() {
    return {
      title: 'Register Page',
      form: {
        username: '',
        password: '',
        firstname: '',
        lastname: '',
      },
    }
  },
  computed: {
    validation_username() {
      const regex = /^[A-Za-z0-9_]+$/
      return (
        this.form.username.length > 0 &&
        this.form.username.length < 13 &&
        regex.test(this.form.username)
      )
    },
    validation_password() {
      const regex = /^[A-Za-z0-9]+$/
      const regexText = /^[A-Za-z]+$/
      const regexNumber = /^[0-9]+$/
      const str = this.form.password.split('')

      if (this.form.password.length > 1) {
        if (regexText.test(str[str.length - 1]) === true) {
          if (
            regexText.test(str[str.length - 2]) &&
            regexText.test(str[str.length - 1])
          ) {
            return false
          }
        } else if (regexNumber.test(str[str.length - 1]) === true) {
          if (
            regexNumber.test(str[str.length - 2]) &&
            regexNumber.test(str[str.length - 1])
          ) {
            return false
          }
        }
      }
      return this.form.password.length > 5 && regex.test(this.form.password)
    },
  },
  methods: {
    async onSubmit(e) {
      e.preventDefault()
      const payload = {
        data: {
          action: 'register',
          username: this.form.username,
          password: this.form.password,
          firstname: this.form.firstname,
          lastname: this.form.lastname,
          profileImg: this.form.profileImg,
        },
      }
      try {
        const bodyFormData = new FormData()
        bodyFormData.append('username', this.form.username)
        bodyFormData.append('password', this.form.password)
        bodyFormData.append('firstname', this.form.firstname)
        bodyFormData.append('lastname', this.form.lastname)
        bodyFormData.append('profileImg', this.form.profileImg)
        const ip = await this.$axios.$post('/register', bodyFormData)
        if (ip.message === 1) {
          alert('Username : ' + this.form.username + '  used')
          this.form.username = ''
        } else {
          await this.$auth.loginWith('local', payload)
        }
      } catch (error) {
        this.$router.push('/register')
      }
    },
  },
}
</script>

<style></style>
