<template>
  <div id='loginform'>
    <button v-if='islogin' class="logBtn" id='logOutBtn' v-on:click='logout()'><strong>Log Out</strong></button>
    <div v-else class='my-auto'>
      <span v-if='isregistering'><input class='mx-2 logInput' v-model='name' type="text" placeholder="Name">|</span>
      <input class='mx-2 logInput' v-model='email' type="email" placeholder="Email">|
      <input class='mx-2 logInput' v-model='password' type="password" placeholder="Password">|
      <button class='logBtn' v-on:click='login()' v-bind:style="{color: loginColor}"><strong>Log In</strong></button> |
      <button class='logBtn' v-on:click='register()' v-bind:style="{color: registerColor}"><strong>Register</strong></button>
      <div class='unselectable' v-bind:style="{color: noticeColor}" id='notice'>{{ notice }}</div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import store from '@/store'
import { mapState } from 'vuex'

export default {
  name: 'loginform',
  store,
  methods: {
    login: function () {
      if (this.isregistering) {
        this.$store.commit('isRegisteringFalse')
        this.$store.commit('updateNoticeColor', 'white')
        this.$store.commit('updateNotice', 'placeholder')
        this.$store.commit('updateLoginColor', this.defaultColor)
        this.$store.commit('updateRegisterColor', 'black')
      } else {
        axios({
          method: 'post',
          url: 'http://localhost:3000/users/login',
          data: { email: this.email, password: this.password }
        })
          .then(data => {
            localStorage.setItem('jwtToken', data.data.token)
            localStorage.setItem('userId', data.data.userId)
            store.commit('login')
            this.$store.commit('updateNoticeColor', 'white')
            this.$store.commit('updateNotice', 'placeholder')
            this.$store.commit('updateName', '')
            this.$store.commit('updateEmail', '')
            this.$store.commit('updatePassword', '')
          })
          .catch(err => {
            this.$store.commit('updateNotice', err.response.data.message)
            this.$store.commit('updateNoticeColor', 'red')
          })
      }
    },
    checklogin: function () {
      axios({
        method: 'post',
        url: 'http://localhost:3000/users/checklogin',
        data: { token: localStorage.getItem('jwtToken') }
      })
        .then(data => {
          if (data.data.isLogin) {
            store.commit('login')
          } else {
            store.commit('logout')
          }
        })
        .catch(err => {
          store.commit('logout')
          localStorage.clear()
          console.log(err)
        })
    },
    logout: function () {
      localStorage.removeItem('jwtToken')
      localStorage.removeItem('userId')
      store.commit('logout')
    },
    register: function () {
      if (this.isregistering) {
        axios({
          method: 'post',
          url: 'http://localhost:3000/users/register',
          data: { name: this.name, email: this.email, password: this.password }
        })
          .then(data => {
            this.$store.commit('updateNotice', "Registration successful. You can enjoy the the web's full feature now by logging in.")
            this.$store.commit('updateNoticeColor', 'green')
            this.$store.commit('isRegisteringFalse')
            this.$store.commit('updateLoginColor', this.defaultColor)
            this.$store.commit('updateRegisterColor', 'black')
            this.$store.commit('updateName', '')
            this.$store.commit('updatePassword', '')
          })
          .catch(err => {
            this.$store.commit('updateNotice', err.response.data.message)
            this.$store.commit('updateNoticeColor', 'red')
          })
      } else {
        this.$store.commit('isRegisteringTrue')
        this.$store.commit('updateNoticeColor', 'white')
        this.$store.commit('updateNotice', 'placeholder')
        this.$store.commit('updateLoginColor', 'black')
        this.$store.commit('updateRegisterColor', this.defaultColor)
      }
    }
  },
  created () {
    if (localStorage.getItem('jwtToken')) {
      this.checklogin()
    }
  },
  computed: {
    ...mapState(['islogin', 'notice', 'noticeColor', 'isregistering', 'loginColor', 'registerColor', 'defaultColor']),
    name: {
      get () {
        return this.$store.state.name
      },
      set (value) {
        this.$store.commit('updateName', value)
      }
    },
    email: {
      get () {
        return this.$store.state.email
      },
      set (value) {
        this.$store.commit('updateEmail', value)
      }
    },
    password: {
      get () {
        return this.$store.state.password
      },
      set (value) {
        this.$store.commit('updatePassword', value)
      }
    }
  }
}
</script>

<style>
  #loginform {
    margin-top: 10px;
  }
  .logInput {
    padding: 5px;
    border: none;
  }
  .logBtn {
    border-radius: 0;
    padding: 3px 15px;
    margin: 0px 5px;
    background-color: white;
  }
  .logBtn:hover {
    background-color: rgba(211,211,211,0.3);
  }
</style>
