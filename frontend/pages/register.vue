<template>
  <div class="flex justify-center bg-gray-200 min-h-screen">
    <div class="max-w-screen-sm flex flex-col w-full drop-shadow-md">
      <div
        class="bg-white rounded-md text-center items-center p-16 flex flex-col"
      >
        <img src="~/assets/logo.svg" class="logo" height="80" width="80" />
        <h1 class="text-3xl mt-8">Welcome to Company X</h1>
        <p class="text-md text-gray-500 mb-8">Create new Company X account</p>
        <form class="block w-full" @submit.stop.prevent="handleSubmit">
          <div
            v-if="err"
            class="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded relative mb-8"
            role="alert"
          >
            <strong class="font-bold text-xs block">Error Message!</strong>
            <span class="block text-sm">{{ err.message }}.</span>
          </div>
          <div class="mb-6">
            <label class="flex flex-col items-stretch text-left">
              <span class="text-xs font-medium mb-1">Username</span>
              <input
                v-model="username"
                class="border rounded-md bg-white p-2 text-gray-600 w-full"
                type="text"
              />
            </label>
          </div>
          <div class="mb-6">
            <label class="flex flex-col items-stretch text-left">
              <span class="text-xs font-medium mb-1">Email</span>
              <input
                v-model="email"
                class="border rounded-md bg-white p-2 text-gray-600 w-full"
                type="email"
              />
            </label>
          </div>
          <div class="mb-6">
            <label class="flex flex-col items-stretch text-left">
              <span class="text-xs font-medium mb-1">Password</span>
              <input
                v-model="password"
                class="border rounded-md bg-white p-2 text-gray-600 w-full"
                type="password"
              />
            </label>
          </div>
          <button
            class="mt-4 bg-blue-500 text-white border border-gray-200 d hover:shadow-lg py-2 px-4 rounded shadow w-40"
            type="submit"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import { mapMutations } from 'vuex'
export default {
  data() {
    return {
      username: '',
      email: '',
      password: '',
      err: null,
    }
  },
  methods: {
    // Method that will register your users
    async handleSubmit() {
      try {
        const { jwt, user } = await this.$http.$post('auth/local/register', {
          username: this.username,
          email: this.email,
          password: this.password,
        })
        this.setUser({
          jwt,
          id: user.id,
          username: user.username,
        })
        this.$router.push({
          path: '/',
        })
      } catch (err) {
        this.err = err.response?.data?.error
      }
    },
    ...mapMutations({
      setUser: 'auth/setUser',
    }),
  },
}
</script>
