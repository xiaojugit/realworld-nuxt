<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">{{ isLogin ? "Sign in" : "Sign up" }}</h1>
          <p class="text-xs-center">
            <nuxt-link v-if="isLogin" to="/register">Need an account?</nuxt-link>
            <nuxt-link v-else to="/login">Have an account?</nuxt-link>
          </p>

          <ul class="error-messages">
            <template v-for="(messages, field) of errors">
              <li v-for="message in messages" :key="field+message">{{field}} {{message}}</li>
            </template>
          </ul>

          <form @submit.prevent="submitHandler">
            <fieldset v-if="!isLogin" class="form-group">
              <input
                class="form-control form-control-lg"
                v-model="user.username"
                type="text"
                placeholder="Your Name"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                v-model="user.email"
                type="email"
                placeholder="Email"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                v-model="user.password"
                type="password"
                minlength="8"
                placeholder="Password"
              />
            </fieldset>
            <button
              class="btn btn-lg btn-primary pull-xs-right"
            >{{ isLogin ? "Sign in" : "Sign up" }}</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { login, register } from '@/api/user'
const Cookie = process.client ? require('js-cookie') : undefined

export default {
  middleware: ['notAuthenticated'],
  name: 'LoginIndex',
  computed: {
    isLogin () {
      return this.$route.name === 'login'
    }
  },
  data () {
    return {
      errors: {},
      user: {
        username: '',
        email: '',
        password: ''
      }
    }
  },
  methods: {
    async submitHandler () {
      try {
        // 提交表单请求登录
        const { data } = this.isLogin
          ? await login({
            user: this.user
          })
          : await register({
            user: this.user
          })

        this.$store.commit('setUser', data.user)
        Cookie.set('user', data.user)


        this.$router.replace('/')
      } catch (error) {
        console.dir(error)
        this.errors = error.response.data.errors
      }




    }
  }
}
</script>

<style>
</style>