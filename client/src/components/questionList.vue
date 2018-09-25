<template>
  <div>
    <div class="row" v-if='showAll'>
      <div class="card col-12" v-for='(question, index) in questions' v-bind:key='index'>
        <div v-if='loggedInUser === question.asker._id'>
          <button class='iconBtn' v-on:click='removeModal(question._id)'><i class="fas fa-trash-alt"></i></button>
          <button class='iconBtn' v-on:click='editModal(question._id, question.title, question.content)'><i class="fas fa-edit"></i></button>
        </div>
        <div v-else>
            <div id='cardTopSpace'></div>
        </div>
        <div class="card-body">
          <router-link class="card-title" :to="{name: 'questionpage', params: {id:`${question._id}`}}">{{ question.title }}</router-link>
          <p class="card-text mb-4">
            asked by {{ question.asker.name }} on {{ question.createdAt | dateSlice }}<br>
            vote: {{ question.upvote.length - question.downvote.length }} | answer: {{ question.answer.length }}
          </p>
        </div>
      </div>
    </div>
    <div class='row' v-else>
      <div class="col-12">
        <div v-if='loggedInUser === detailed.asker._id'>
          <button class='iconBtn' v-on:click='removeModal(detailed._id, "detailed")'><i class="fas fa-trash-alt"></i></button>
          <button class='iconBtn' v-on:click='editModal(detailed._id, detailed.title, detailed.content)'><i class="fas fa-edit"></i></button>
        </div>
        <div id="detailed">
          <h5>{{ detailed.title }}</h5>
          <p>asked by {{ detailed.asker.name }} on {{ detailed.createdAt | dateSlice }}<br>
          vote: {{ detailed.upvote.length - detailed.downvote.length }}</p>
          <p>{{ detailed.content }}</p>
          <div id='answerbox' v-if='islogin'>
            <h5><strong>Add your answer here</strong></h5>
            <textarea rows=2 v-model='newanswer' placeholder="Write some words"></textarea>
            <button v-on:click='addAnswer()'>Add answer</button>
          </div>
          <div class='border-bottom' id='answers' v-if='detailed.answer.length > 0'>
            <h5><strong>Answers</strong></h5>
            <div v-for="answer in detailed.answer" :key='answer._id' class="border-top pt-2">
              <button class="iconBtn" v-if='loggedInUser === answer.giver._id' v-on:click='editAnswerModal(answer._id, answer.content)'><i class="fas fa-edit"></i></button>
              <h6><strong>{{ answer.giver.name }}</strong> answered on {{ answer.createdAt | dateSlice }}</h6>
              <p id='answer'>{{ answer.content }}</p>
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
        <button class="iconBtn closeModal" v-on:click="editModal()" title='Close'><i class="far fa-times-circle"></i></button><br>
        <div id='editQuestionInput'>
          <input v-model='questiontitle' type="text" placeholder="Question">
          <textarea rows=5 v-model='questiondesc' placeholder="Description"></textarea>
        </div>
        <button class='modalBtn' v-on:click="editModal()">Cancel Edit</button>
        <button class='modalBtn' v-on:click="editQuestion()">Commit Edit</button><br>
      </div>
    </div>

    <div v-if='openRemove'>
      <div id='backdrop'></div>
      <div class='removeConfirmation'>
        <button class="iconBtn closeModal" v-on:click="removeModal()" title='Close'><i class="far fa-times-circle"></i></button><br>
        <h3>Are you sure?</h3>
        <h5>You're about to delete the question permanently</h5>
        <button class='modalBtn' v-on:click="removeModal()">Nope</button>
        <button class='modalBtn' v-on:click="removeQuestion()">Yeah</button><br>
      </div>
    </div>

    <div v-if='openEditAnswer'>
      <div id='backdrop'></div>
      <div id='editAnswer'>
        <button class="iconBtn closeModal" v-on:click="editAnswerModal()" title='Close'><i class="far fa-times-circle"></i></button><br>
        <div id='editAnswerInput'>
          <textarea rows=2 v-model='editanswer' placeholder="Write some words"></textarea>
        </div>
        <button class='modalBtn' v-on:click="editAnswerModal()">Cancel Edit</button>
        <button class='modalBtn' v-on:click="editAnswer()">Commit Edit</button><br>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import store from '@/store'

export default {
  name: 'questionlist',
  store,
  data: function () {
    return {
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
      editAnswerId: ''
    }
  },
  methods: {
    editModal: function (id, title, content, from) {
      if (this.openEdit) {
        this.openEdit = false
      } else {
        this.openEdit = true
      }
      if (id && title && content) {
        this.editId = id
        this.questiontitle = title
        this.questiondesc = content
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
            this.openEdit = false
          })
          .catch(err => {
            console.log(err)
          })
      }
    },
    removeModal: function (id, from) {
      if (this.openRemove) {
        this.openRemove = false
      } else {
        this.openRemove = true
      }
      if (id) {
        this.removeId = id
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
          this.openRemove = false
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
          this.newanswer = ''
          this.$store.dispatch('showOne', this.detailed._id)
        })
        .catch(err => {
          console.log(err)
        })
    },
    editAnswerModal: function (id, content) {
      if (this.openEditAnswer) {
        this.openEditAnswer = false
      } else {
        this.openEditAnswer = true
      }
      if (id && content) {
        this.editAnswerId = id
        this.editanswer = content
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
            this.editanswer = ''
            this.$store.dispatch('showOne', this.detailed._id)
            this.openEditAnswer = false
          })
          .catch(err => {
            console.log(err)
          })
      }
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
      this.loggedInUser = localStorage.getItem('userId')
    }
  },
  computed: {
    questions () {
      return this.$store.state.questions
    },
    detailed () {
      return this.$store.state.detailed
    },
    showAll () {
      return this.$store.state.showAll
    },
    islogin () {
      return this.$store.state.islogin
    }
  }
}
</script>

<style>
  #cardTopSpace {
    height: 40px;
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
    background-color: #42b983;
    font-weight: bold;
  }
  #answerbox h5 {
    text-align: left;
    margin-left: 10px;
  }
  #answerbox h5:hover {
    color: #42b983
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
</style>
