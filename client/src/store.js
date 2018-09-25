import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    islogin: false,
    questions: [],
    afterlogout: false
  },
  mutations: {
    login (state) {
      state.islogin = true
    },
    logout (state) {
      state.islogin = false
      state.afterlogout = true
    },
    changeQuestions (state, questions) {
      state.questions = questions
    },
    pushQuestion (state, question) {
      state.questions.push(question)
    },
    resetQuestions (state) {
      state.questions = []
    },
    afterLogout (state) {
      state.afterlogout = false
    }
  },
  actions: {
    listMostVoted: function (context) {
      axios({
        method: 'get',
        url: 'http://localhost:3000/questions/sort/vote'
      })
        .then(data => {
          context.commit('changeQuestions', data.data.data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    listMostRecent: function (context) {
      axios({
        method: 'get',
        url: 'http://localhost:3000/questions/sort/createdAt'
      })
        .then(data => {
          context.commit('changeQuestions', data.data.data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    listMine: function (context) {
      axios({
        method: 'get',
        url: 'http://localhost:3000/questions/sort/createdAt'
      })
        .then(data => {
          context.commit('resetQuestions')
          data.data.data.forEach(datum => {
            let userId = localStorage.getItem('userId')
            if (datum.asker._id === userId) {
              context.commit('pushQuestion', datum)
            }
          })
        })
        .catch(err => {
          console.log(err)
        })
    },
    listStarred: function (context) {
      axios({
        method: 'post',
        url: 'http://localhost:3000/users',
        data: { token: localStorage.getItem('jwtToken') }
      })
        .then(data => {
          context.commit('changeQuestions', data.data.data.starred)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
})
