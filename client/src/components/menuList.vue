<template>
  <div id='menulist'>
    <div v-if='islogin'>
      <button id='toggleModal' v-on:click='toggleModal()' title="Post A Question"><strong>Post A Question</strong></button><br><br>
      <div v-if='openModal'>
        <div id='backdrop'></div>
        <div id='addQuestion'>
          <button class='iconBtn closeModal' v-on:click="toggleModal()" title='Close'><i class="far fa-times-circle"></i></button><br>
          <div id='addQuestionInput'>
            <input v-model='questiontitle' type="text" placeholder="Question">
            <textarea rows=5 v-model='questiondesc' placeholder="Description"></textarea>
          </div>
          <button class='modalBtn' v-on:click="toggleModal()">Maybe Later</button>
          <button class='modalBtn' v-on:click="addQuestion()">Post It</button><br>
        </div>
      </div>
    </div>
    <button class='menubtn' v-on:click='mostVotedQ()' v-bind:style='({color: byVote})'>Most Voted Questions</button><br><br>
    <button class='menubtn' v-on:click='mostRecentQ()' v-bind:style='({color: byDate})'>Most Recent Questions</button><br><br>
    <button class='menubtn' v-on:click='myQ()' v-bind:style='({color: mine})' v-if='islogin'>My Questions</button><br><br>
    <button class='menubtn' v-on:click='starredQ()' v-bind:style='({color: starred})' v-if='islogin'>Starred Questions</button>
  </div>
</template>

<script>
import axios from 'axios'
import store from '@/store'

export default {
  name: 'menulist',
  store,
  data: function () {
    return {
      byVote: '#42b983',
      byDate: 'black',
      mine: 'black',
      starred: 'black',
      openModal: false,
      questiontitle: '',
      questiondesc: ''
    }
  },
  methods: {
    mostVotedQ: function () {
      this.byVote = '#42b983'
      this.byDate = 'black'
      this.mine = 'black'
      this.starred = 'black'
      this.$store.dispatch('mostVotedQ')
      localStorage.setItem('openTab', 'mostVotedQ')
      this.$router.push({ path: '/' })
    },
    mostRecentQ: function () {
      this.byVote = 'black'
      this.byDate = '#42b983'
      this.mine = 'black'
      this.starred = 'black'
      this.$store.dispatch('mostRecentQ')
      localStorage.setItem('openTab', 'mostRecentQ')
      this.$router.push({ path: '/' })
    },
    myQ: function () {
      this.byVote = 'black'
      this.byDate = 'black'
      this.mine = '#42b983'
      this.starred = 'black'
      this.$store.dispatch('myQ')
      localStorage.setItem('openTab', 'myQ')
      this.$router.push({ path: '/' })
    },
    starredQ: function () {
      this.byVote = 'black'
      this.byDate = 'black'
      this.mine = 'black'
      this.starred = '#42b983'
      this.$store.dispatch('starredQ')
      localStorage.setItem('openTab', 'starredQ')
      this.$router.push({ path: '/' })
    },
    toggleModal: function () {
      if (this.openModal === true) {
        this.openModal = false
      } else {
        this.openModal = true
      }
    },
    addQuestion: function () {
      axios({
        method: 'post',
        url: 'http://localhost:3000/questions',
        data: { title: this.questiontitle, content: this.questiondesc, token: localStorage.getItem('jwtToken') }
      })
        .then(data => {
          this.myQ()
          this.$router.push({ path: `/${data.data.data._id}` })
          this.toggleModal()
          this.questiontitle = ''
          this.questiondesc = ''
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  computed: {
    islogin () {
      return this.$store.state.islogin
    },
    afterlogout () {
      return this.$store.state.afterlogout
    }
  },
  created () {
    if (localStorage.getItem('openTab')) {
      this[localStorage.getItem('openTab')]()
    } else {
      this.mostVotedQ()
    }
  },
  watch: {
    afterlogout () {
      if (this.afterlogout) {
        this.mostVotedQ()
        this.$store.dispatch('afterLogout')
      }
    }
  }
}
</script>

<style>
  .menubtn {
        position: absolute;
        right: 5%;
        border: none;
        background-color: white;
        cursor: pointer;
        font-weight: bold;
    }
  .menubtn:hover {
    background-color: rgba(211,211,211,0.3);
  }
  #toggleModal {
    margin: 1vh 0;
    border: none;
    background-color: #42b983;
    color: white;
    height: 50px;
    width: 100%;
    cursor: pointer;
    border-radius: 25px
  }
  #addQuestion {
    position: fixed;
    background-color: white;
    left: 25%;
    top: 32.5%;
    width: 50%;
    height: 35%;
    z-index: 2001;
  }
  #addQuestionInput textarea {
    width: 90%;
    margin-top: 1%;
    border: none;
    font-size: 16px;
  }
  #addQuestionInput input {
    border: none;
    width: 90%;
    margin-top: 1%;
    font-size: 20px;
    padding: 10px;
  }
  .modalBtn {
    height: 50px;
    font-size: 20px;
    padding: 10px 20px;
    background-color: #42b983;
    color: white;
    margin: 20px 10px;
    border-radius: 25px;
  }
</style>
