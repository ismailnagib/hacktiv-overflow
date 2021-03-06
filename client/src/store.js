import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    islogin: false,
    questions: [],
    detailed: {},
    showAll: true,
    loggedInUser: localStorage.getItem('userId'),
    openEdit: false,
    openRemove: false,
    questiontitle: '',
    questiondesc: '',
    editId: '',
    removeId: '',
    newanswer: '',
    editanswer: '',
    openEditAnswer: false,
    editAnswerId: '',
    defaultColor: 'orange',
    chosencolor: '',
    openChangeColor: false,
    byVote: 'orange',
    byDate: 'black',
    mine: 'black',
    openModal: false,
    notice: 'placeholder',
    noticeColor: 'white',
    isregistering: false,
    loginColor: 'orange',
    registerColor: 'black',
    name: '',
    email: '',
    password: '',
    firstLoad: true
  },
  mutations: {
    login (state) {
      state.islogin = true
    },
    logout (state) {
      state.islogin = false
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
    changeDetailed (state, detailed) {
      state.detailed = detailed
    },
    showAllTrue (state) {
      state.showAll = true
    },
    showAllFalse (state) {
      state.showAll = false
    },
    updateLoggedInUser (state) {
      state.loggedInUser = localStorage.getItem('userId')
    },
    openEditTrue (state) {
      state.openEdit = true
    },
    openEditFalse (state) {
      state.openEdit = false
    },
    openRemoveTrue (state) {
      state.openRemove = true
    },
    openRemoveFalse (state) {
      state.openRemove = false
    },
    openEditAnswerTrue (state) {
      state.openEditAnswer = true
    },
    openEditAnswerFalse (state) {
      state.openEditAnswer = false
    },
    openModalTrue (state) {
      state.openModal = true
    },
    openModalFalse (state) {
      state.openModal = false
    },
    openChangeColorTrue (state) {
      state.openChangeColor = true
    },
    openChangeColorFalse (state) {
      state.openChangeColor = false
    },
    updateNotice (state, value) {
      state.notice = value
    },
    updateNoticeColor (state, value) {
      state.noticeColor = value
    },
    updateLoginColor (state, value) {
      state.loginColor = value
    },
    updateRegisterColor (state, value) {
      state.registerColor = value
    },
    isRegisteringTrue (state) {
      state.isregistering = true
    },
    isRegisteringFalse (state) {
      state.isregistering = false
    },
    notFirstLoad (state) {
      state.firstLoad = false
    },
    updateQuestionTitle (state, value) {
      state.questiontitle = value
    },
    updateQuestionDesc (state, value) {
      state.questiondesc = value
    },
    updateEditId (state, value) {
      state.editId = value
    },
    updateRemoveId (state, value) {
      state.removeId = value
    },
    updateNewAnswer (state, value) {
      state.newanswer = value
    },
    updateEditAnswer (state, value) {
      state.editanswer = value
    },
    updateEditAnswerId (state, value) {
      state.editAnswerId = value
    },
    updateByVote (state, value) {
      state.byVote = value
    },
    updateByDate (state, value) {
      state.byDate = value
    },
    updateMine (state, value) {
      state.mine = value
    },
    updateName (state, value) {
      state.name = value
    },
    updateEmail (state, value) {
      state.email = value
    },
    updatePassword (state, value) {
      state.password = value
    },
    changeDefaultColor (state, value) {
      state.defaultColor = value
    },
    changeChosenColor (state, value) {
      state.chosencolor = value
    }
  },
  actions: {
    mostVotedQ: function (context, color) {
      axios({
        method: 'get',
        url: 'http://localhost:3000/questions/sort/vote'
      })
        .then(data => {
          context.commit('changeQuestions', data.data.data)
          context.commit('updateByVote', color)
          context.commit('updateByDate', 'black')
          context.commit('updateMine', 'black')
        })
        .catch(err => {
          console.log(err)
        })
    },
    mostRecentQ: function (context, color) {
      axios({
        method: 'get',
        url: 'http://localhost:3000/questions/sort/createdAt'
      })
        .then(data => {
          context.commit('changeQuestions', data.data.data)
          context.commit('updateByVote', 'black')
          context.commit('updateByDate', color)
          context.commit('updateMine', 'black')
        })
        .catch(err => {
          console.log(err)
        })
    },
    myQ: function (context, color) {
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
          context.commit('updateByVote', 'black')
          context.commit('updateByDate', 'black')
          context.commit('updateMine', color)
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
