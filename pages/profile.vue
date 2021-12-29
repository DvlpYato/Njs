<template>
  <div class="row">
    <div v-if="loggedIn" class="col-12">
      <h2 class="">Profile</h2>
    </div>
    <div class="col-4">
      <b-card-group deck>
        <b-card class="text-center">
          <template #header>
            <h6 class="mb-0">Profile Image</h6>
          </template>
          <nuxt-img
            :src="user.profile_img"
            class="text-center img-fluid"
            width="auto"
          />
        </b-card>
      </b-card-group>
    </div>
    <div class="col-8">
      <b-card-group deck>
        <b-card>
          <template #header>
            <h6 class="mb-0">Profile Detail</h6>
          </template>
          <b-form class="row" @submit.prevent="onSubmit">
            <!-- Username -->
            <b-form-group
              id="input-group-1"
              label-for="input-1"
              class="col-6"
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
                disabled
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
              class="col-6"
              description=""
            >
              <label for="feedback-user">Password</label>
              <b-form-input
                id="feedback-user"
                v-model="form.password"
                :state="validation_password"
                type="text"
                placeholder="Your last password"
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
              class="col-6"
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
              class="col-6"
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
              class="col-12"
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
            <b-button class="ml-auto mr-3" type="submit" variant="success"
              >Update profile</b-button
            >
          </b-form>
        </b-card>
      </b-card-group>
    </div>
  </div>
</template>

<script>
const md5 = require('md5')
export default {
  name: 'ProfilePage',
  data() {
    return {
      user: this.$auth.user,
      loggedIn: this.$auth.loggedIn,
      form: {
        user_id: this.$auth.user.u_id,
        username: this.$auth.user.username,
        password: '',
        firstname: this.$auth.user.firstname,
        lastname: this.$auth.user.lastname,
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
      return this.form.password.length > 0 && regex.test(this.form.password)
    },
  },
  methods: {
    async onSubmit(e) {
      e.preventDefault()
      const payload = {
        data: {
          username: this.form.username,
          password: this.form.password,
          firstname: this.form.firstname,
          lastname: this.form.lastname,
          profileImg: this.form.profileImg,
        },
      }
      try {
        const bodyFormData = new FormData()
        bodyFormData.append('u_id', this.$auth.user.u_id)
        bodyFormData.append('username', this.form.username)
        if (this.form.password === this.$auth.user.password) {
          bodyFormData.append('password', this.$auth.user.password)
        } else {
          bodyFormData.append('password', md5(this.form.password))
        }
        bodyFormData.append('firstname', this.form.firstname)
        bodyFormData.append('lastname', this.form.lastname)
        if (this.form.profileImg) {
          console.log('new', this.form.profileImg)
          bodyFormData.append('profile_img', this.form.profileImg)
        } else {
          console.log('old', this.$auth.user.profile_img)
          bodyFormData.append('profile_img_old', this.$auth.user.profile_img)
        }

        const ip = await this.$axios.$post('/update', bodyFormData)
        console.log(ip)
        if (ip.message === 1) {
          alert('Duplicate password from last 5 edits.')
          this.form.password = ''
        } else {
          // const new_img = URL.createObjectURL(this.form.profile_img)
          await this.$auth.loginWith('local', payload)
          alert('Update')
          this.$router.push('/profile')
        }
      } catch (error) {
        this.$router.push('/profile')
      }
    },
  },
}
</script>

<style></style>
