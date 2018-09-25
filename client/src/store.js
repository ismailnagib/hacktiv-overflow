import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    islogin: false,
    questions: [],
    afterlogout: false,
    detailed: {},
    showAll: true
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
    },
    changeDetailed (state, detailed) {
      state.detailed = detailed
    },
    showAllTrue (state) {
      state.showAll = true
    },
    showAllFalse (state) {
      state.showAll = false
    }
  },
  actions: {
    mostVotedQ: function (context) {
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
    mostRecentQ: function (context) {
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
    myQ: function (context) {
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
    starredQ: function (context) {
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
    },
    showOne: function (context, id) {
      if (id !== undefined) {
        axios({
          method: 'get',
          url: `http://localhost:3000/questions/${id}`
        })
          .then(data => {
            context.commit('changeDetailed', data.data.data)
            context.commit('showAllFalse')
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        context.commit('showAllTrue')
      }
    }
  }
})
