<template>
  <div>
    <div class="row" v-if='showAll'>
      <div id='qBoxHead' v-bind:style='{background: defaultColor}' class="col-12">
        <div class="row pt-1">
          <div class="col-8">
            <h5>Questions</h5>
          </div>
          <div class="col-1" title='Vote'>
            <i class="fas fa-poll"></i>
          </div>
          <div class="col-1" title='Answer'>
            <i class="fas fa-comments"></i>
          </div>
        </div>
      </div>
      <div id='questions' class="col-12 border-bottom" v-for='(question, index) in questions' v-bind:key='index'>
        <div id='question' class="row">
          <div class="col-8 text-left">
            <router-link :to="{name: 'questionpage', params: {id:`${question._id}`}}">{{ question.title }}</router-link>
            <p>asked by {{ question.asker.name }} on {{ question.createdAt | dateSlice }}</p>
          </div>
          <div class="col-1">
            <div id='qVote'>{{ question.vote }}</div>
          </div>
          <div class="col-1">
            <div id='qAnswer'>{{ question.answer.length }}</div>
          </div>
          <div class="col-2">
            <div id='qOpt' v-if='loggedInUser === question.asker._id'>
              <button class='iconBtn' v-bind:style='{color: defaultColor}' v-on:click='removeModal(question._id)'><i class="fas fa-trash-alt"></i></button>
              <button class='iconBtn' v-bind:style='{color: defaultColor}' v-on:click='editModal(question._id, question.title, question.content)'><i class="fas fa-edit"></i></button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class='row' v-else>
      <div class="col-12">
        <div v-if='loggedInUser === detailed.asker._id'>
          <button class='iconBtn' v-bind:style='{color: defaultColor}' v-on:click='removeModal(detailed._id, "detailed")'><i class="fas fa-trash-alt"></i></button>
          <button class='iconBtn' v-bind:style='{color: defaultColor}' v-on:click='editModal(detailed._id, detailed.title, detailed.content)'><i class="fas fa-edit"></i></button>
        </div>
        <div id="detailed">
          <div class="row mb-4">
            <div class="col-2">
              <div class="row mb-4">
                <div class="col-12"><h6><strong>VOTE</strong></h6></div>
                <button class="col-12 voteBtn" v-if='islogin && detailed.upvote.indexOf(loggedInUser) === -1 && detailed.asker._id !== loggedInUser' v-on:click='qUpvote()'><i class="fas fa-caret-up"></i></button>
                <button v-bind:style='{color: defaultColor}' class="col-12 voteBtn" v-else-if='islogin && detailed.asker._id !== loggedInUser' v-on:click='qUpvote()'><i class="fas fa-caret-up"></i></button>
                <div class="col-12 unselectable votePh" v-else>.</div>
                <div class="col-12">{{ detailed.vote }}</div>
                <button class="col-12 voteBtn" v-if='islogin && detailed.downvote.indexOf(loggedInUser) === -1 && detailed.asker._id !== loggedInUser' v-on:click='qDownvote()'><i class="fas fa-caret-down"></i></button>
                <button v-bind:style='{color: defaultColor}' class="col-12 voteBtn" v-else-if='islogin && detailed.asker._id !== loggedInUser' v-on:click='qDownvote()'><i class="fas fa-caret-down"></i></button>
                <div class="col-12 unselectable votePh" v-else>.</div>
              </div>
            </div>
            <div class="col-10 border-left">
              <div class="row">
                <div class="col-12 unselectable votePh">.</div>
                <div class="col-12"><h5><strong>{{ detailed.title }}</strong></h5></div>
                <div class="col-12"><p>asked by {{ detailed.asker.name }} on {{ detailed.createdAt | dateSlice }}</p></div>
                <div class="col-12"><h6><strong>{{ detailed.answer.length }} ANSWER(S)</strong></h6></div>
              </div>
            </div>
          </div>
          <p>{{ detailed.content }}</p>
          <div id='answerbox' v-if='islogin'>
            <h5><strong>Add your answer here</strong></h5>
            <textarea rows=2 v-model='newanswer' placeholder="Write some words"></textarea>
            <button v-on:click='addAnswer()' v-bind:style='{background: defaultColor}'>Add answer</button>
          </div>
          <div class='border-bottom' id='answers' v-if='detailed.answer.length > 0'>
            <h5><strong>Answers</strong></h5>
            <div v-for="answer in detailed.answer" :key='answer._id' class="border-top pt-2">
              <div class="row">
                <div class="col-2">
                  <button class="col-12 voteBtn" v-if='islogin && answer.upvote.indexOf(loggedInUser) === -1 && answer.giver._id !== loggedInUser' v-on:click='aUpvote(answer._id)'><i class="fas fa-caret-up"></i></button>
                  <button v-bind:style='{color: defaultColor}' class="col-12 voteBtn" v-else-if='islogin && answer.giver._id !== loggedInUser' v-on:click='aUpvote(answer._id)'><i class="fas fa-caret-up"></i></button>
                  <div class="col-12 unselectable votePh" v-else>.</div>
                  <div class="col-12" id='answerVote'>{{ answer.vote }}</div>
                  <button class="col-12 voteBtn" v-if='islogin && answer.downvote.indexOf(loggedInUser) === -1 && answer.giver._id !== loggedInUser' v-on:click='aDownvote(answer._id)'><i class="fas fa-caret-down"></i></button>
                  <button v-bind:style='{color: defaultColor}' class="col-12 voteBtn" v-else-if='islogin && answer.giver._id !== loggedInUser' v-on:click='aDownvote(answer._id)'><i class="fas fa-caret-down"></i></button>
                  <div class="col-12 unselectable votePh" v-else>.</div>
                </div>
                <div class="col-9 border-left">
                  <h6><strong>{{ answer.giver.name }}</strong> answered on {{ answer.createdAt | dateSlice }}</h6>
                  <p id='answer'>{{ answer.content }}</p>
                </div>
                <div class="col-1">
                  <button class="iconBtn" v-bind:style='{color: defaultColor}' v-if='loggedInUser === answer.giver._id' v-on:click='editAnswerModal(answer._id, answer.content)'><i class="fas fa-edit"></i></button>
                </div>
              </div>
            </div>
          </div>
          <div v-else id='noanswer'>
            <h5>There's no answer on this question yet</h5>
          </div>
        </div>
      </div>
    </div>

    <!-- MODALS -->
    <div v-if='openEdit'>
      <div id='backdrop'></div>
      <div id='editQuestion'>
        <button class="iconBtn closeModal" v-bind:style='{color: defaultColor}' v-on:click="editModal()" title='Close'><i class="far fa-times-circle"></i></button><br>
        <div id='editQuestionInput'>
          <input v-model='questiontitle' type="text" placeholder="Question">
          <textarea rows=5 v-model='questiondesc' placeholder="Description"></textarea>
        </div>
        <button class='modalBtn' v-bind:style='{background: defaultColor}' v-on:click="editModal()">Cancel Edit</button>
        <button class='modalBtn' v-bind:style='{background: defaultColor}' v-on:click="editQuestion()">Commit Edit</button><br>
      </div>
    </div>

    <div v-if='openRemove'>
      <div id='backdrop'></div>
      <div class='removeConfirmation'>
        <button class="iconBtn closeModal" v-bind:style='{color: defaultColor}' v-on:click="removeModal()" title='Close'><i class="far fa-times-circle"></i></button><br>
        <h3>Are you sure?</h3>
        <h5>You're about to delete the question permanently</h5>
        <button class='modalBtn' v-bind:style='{background: defaultColor}' v-on:click="removeModal()">Nope</button>
        <button class='modalBtn' v-bind:style='{background: defaultColor}' v-on:click="removeQuestion()">Yeah</button><br>
      </div>
    </div>

    <div v-if='openEditAnswer'>
      <div id='backdrop'></div>
      <div id='editAnswer'>
        <button class="iconBtn closeModal" v-bind:style='{color: defaultColor}' v-on:click="editAnswerModal()" title='Close'><i class="far fa-times-circle"></i></button><br>
        <div id='editAnswerInput'>
          <textarea rows=2 v-model='editanswer' placeholder="Write some words"></textarea>
        </div>
        <button class='modalBtn' v-bind:style='{background: defaultColor}' v-on:click="editAnswerModal()">Cancel Edit</button>
        <button class='modalBtn' v-bind:style='{background: defaultColor}' v-on:click="editAnswer()">Commit Edit</button><br>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import store from '@/store'
import { mapState } from 'vuex'

export default {
  name: 'questionlist',
  store,
  methods: {
    editModal: function (id, title, content, from) {
      if (this.openEdit) {
        this.$store.commit('openEditFalse')
      } else {
        this.$store.commit('openEditTrue')
      }
      if (id && title && content) {
        this.$store.commit('updateEditId', id)
        this.$store.commit('updateQuestionTitle', title)
        this.$store.commit('updateQuestionDesc', content)
      }
      if (from === 'detailed') {
        this.detailedUD = true
      } else {
        this.detailedUD = false
      }
    },
    editQuestion: function () {
      if (this.questiontitle.length > 0 && this.questiondesc.length > 0) {
        axios({
          method: 'put',
          url: 'http://localhost:3000/questions/',
          data: { id: this.editId, token: localStorage.getItem('jwtToken'), title: this.questiontitle, content: this.questiondesc }
        })
          .then(data => {
            if (this.detailedUD) {
              this.$store.dispatch('showOne', this.detailed._id)
            } else {
              this.$store.dispatch(localStorage.getItem('openTab'))
            }
            this.$store.commit('updateQuestionTitle', '')
            this.$store.commit('updateQuestionDesc', '')
            this.$store.commit('openEditFalse')
          })
          .catch(err => {
            console.log(err)
          })
      }
    },
    removeModal: function (id, from) {
      if (this.openRemove) {
        this.$store.commit('openRemoveFalse')
      } else {
        this.$store.commit('openRemoveTrue')
      }
      if (id) {
        this.$store.commit('updateRemoveId', id)
      }
    },
    removeQuestion: function () {
      axios({
        method: 'delete',
        url: 'http://localhost:3000/questions/',
        data: { id: this.removeId, token: localStorage.getItem('jwtToken') }
      })
        .then(data => {
          this.$store.dispatch(localStorage.getItem('openTab'))
          this.$store.commit('showAllTrue')
          this.$store.commit('openRemoveFalse')
        })
        .catch(err => {
          console.log(err)
        })
    },
    addAnswer: function () {
      axios({
        method: 'post',
        url: 'http://localhost:3000/answers/',
        data: { questionId: this.detailed._id, content: this.newanswer, token: localStorage.getItem('jwtToken') }
      })
        .then(data => {
          this.$store.commit('updateNewAnswer', '')
          this.$store.dispatch('showOne', this.detailed._id)
        })
        .catch(err => {
          console.log(err)
        })
    },
    editAnswerModal: function (id, content) {
      if (this.openEditAnswer) {
        this.$store.commit('openEditAnswerFalse')
      } else {
        this.$store.commit('openEditAnswerTrue')
      }
      if (id && content) {
        this.$store.commit('updateEditAnswerId', id)
        this.$store.commit('updateEditAnswer', content)
      }
    },
    editAnswer: function () {
      if (this.editanswer.length > 0) {
        axios({
          method: 'put',
          url: 'http://localhost:3000/answers/',
          data: { id: this.editAnswerId, content: this.editanswer, token: localStorage.getItem('jwtToken') }
        })
          .then(data => {
            this.$store.commit('updateEditAnswer', '')
            this.$store.dispatch('showOne', this.detailed._id)
            this.$store.commit('openEditAnswerFalse')
          })
          .catch(err => {
            console.log(err)
          })
      }
    },
    qUpvote: function () {
      axios({
        method: 'put',
        url: 'http://localhost:3000/questions/upvote',
        data: { id: this.detailed._id, token: localStorage.getItem('jwtToken') }
      })
        .then(data => {
          this.$store.dispatch('showOne', this.detailed._id)
        })
        .catch(err => {
          console.log(err)
        })
    },
    qDownvote: function () {
      axios({
        method: 'put',
        url: 'http://localhost:3000/questions/downvote',
        data: { id: this.detailed._id, token: localStorage.getItem('jwtToken') }
      })
        .then(data => {
          this.$store.dispatch('showOne', this.detailed._id)
        })
        .catch(err => {
          console.log(err)
        })
    },
    aUpvote: function (id) {
      axios({
        method: 'put',
        url: 'http://localhost:3000/answers/upvote',
        data: { id: id, token: localStorage.getItem('jwtToken') }
      })
        .then(data => {
          this.$store.dispatch('showOne', this.detailed._id)
        })
        .catch(err => {
          console.log(err)
        })
    },
    aDownvote: function (id) {
      axios({
        method: 'put',
        url: 'http://localhost:3000/answers/downvote',
        data: { id: id, token: localStorage.getItem('jwtToken') }
      })
        .then(data => {
          this.$store.dispatch('showOne', this.detailed._id)
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  filters: {
    dateSlice (value) {
      return value.slice(0, 10)
    }
  },
  watch: {
    '$route': function () {
      this.$store.dispatch('showOne', this.$route.params.id)
    },
    islogin: function () {
      this.$store.commit('updateLoggedInUser')
    }
  },
  computed: {
    ...mapState(['questions', 'detailed', 'showAll', 'islogin', 'loggedInUser', 'openEdit', 'openRemove', 'openEditAnswer', 'defaultColor']),
    questiontitle: {
      get () {
        return this.$store.state.questiontitle
      },
      set (value) {
        this.$store.commit('updateQuestionTitle', value)
      }
    },
    questiondesc: {
      get () {
        return this.$store.state.questiondesc
      },
      set (value) {
        this.$store.commit('updateQuestionDesc', value)
      }
    },
    editId: {
      get () {
        return this.$store.state.editId
      },
      set (value) {
        this.$store.commit('updateEditId', value)
      }
    },
    removeId: {
      get () {
        return this.$store.state.removeId
      },
      set (value) {
        this.$store.commit('updateRemoveId', value)
      }
    },
    newanswer: {
      get () {
        return this.$store.state.newanswer
      },
      set (value) {
        this.$store.commit('updateNewAnswer', value)
      }
    },
    editanswer: {
      get () {
        return this.$store.state.editanswer
      },
      set (value) {
        this.$store.commit('updateEditAnswer', value)
      }
    },
    editAnswerId: {
      get () {
        return this.$store.state.editAnswerId
      },
      set (value) {
        this.$store.commit('updateEditAnswerId', value)
      }
    }
  }
}
</script>

<style>
  #qBoxHead {
    color: white;
  }
  #question {
    padding: 20px 10px;
  }
  #question p {
    margin: 0;
  }
  #qVote, #qAnswer {
    margin: 12px 0px;
  }
  #qOpt button {
    margin: 9px 0px;
  }
  #detailed {
    margin-top: 40px;
  }
  #editQuestion {
    position: fixed;
    background-color: white;
    left: 25%;
    top: 32.5%;
    width: 50%;
    height: 35%;
    z-index: 2001;
  }
  #editQuestionInput textarea {
    width: 90%;
    margin-top: 1%;
    border: none;
    font-size: 16px;
  }
  #editQuestionInput input {
    border: none;
    width: 90%;
    margin-top: 1%;
    font-size: 20px;
    padding: 10px;
  }
  .removeConfirmation {
    position: fixed;
    background-color: white;
    left: 25%;
    top: 37.5%;
    width: 50%;
    height: 20%;
    z-index: 2001;
  }
  #answers {
    text-align: justify;
  }
  #answer {
    margin: 10px 0;
    font-size: 18px;
  }
  #answerbox {
    margin-top: 3vh;
  }
  #answerbox button {
    color: white;
    font-weight: bold;
  }
  #answerbox h5 {
    text-align: left;
    margin-left: 10px;
  }
  #answerbox textarea{
    width: 98%;
    margin: 1%;
    font-size: 14px;
    padding: 10px;
  }
  #noanswer, #answers {
    margin-top: 3vh;
    margin-bottom: 6vh;
  }
  #editAnswer {
    position: fixed;
    background-color: white;
    left: 25%;
    top: 40%;
    width: 50%;
    height: 20%;
    z-index: 2001;
  }
  #editAnswerInput textarea {
    width: 90%;
    margin-top: 1%;
    border: none;
    font-size: 16px;
  }
  .voteBtn {
    background-color: white;
  }
  .votePh {
    height: 40px;
    width: 100%;
  }
  #answerVote {
    text-align: center;
  }
</style>
