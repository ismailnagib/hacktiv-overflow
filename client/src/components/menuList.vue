<template>
  <div id='menulist'>
    <div v-if='islogin'>
      <button id='toggleModal' v-bind:style='{background: defaultColor}' v-on:click='toggleModal()' title="Post A Question"><strong>Post A Question</strong></button><br><br>
      <div v-if='openModal'>
        <div id='backdrop'></div>
        <div id='addQuestion'>
          <button class='iconBtn closeModal' v-bind:style='{color: defaultColor}' v-on:click="toggleModal()" title='Close'><i class="far fa-times-circle"></i></button><br>
          <div id='addQuestionInput'>
            <input v-model='questiontitle' type="text" placeholder="Question">
            <textarea rows=5 v-model='questiondesc' placeholder="Description"></textarea>
          </div>
          <button class='modalBtn' v-bind:style='{background: defaultColor}' v-on:click="toggleModal()">Maybe Later</button>
          <button class='modalBtn' v-bind:style='{background: defaultColor}' v-on:click="addQuestion()">Post It</button><br>
        </div>
      </div>
    </div>
    <button class='menubtn' v-on:click='mostVotedQ()' v-bind:style='({color: byVote})'>Most Voted Questions</button><br><br>
    <button class='menubtn' v-on:click='mostRecentQ()' v-bind:style='({color: byDate})'>Most Recent Questions</button><br><br>
    <button class='menubtn' v-on:click='myQ()' v-bind:style='({color: mine})' v-if='islogin'>My Questions</button><br><br>
  </div>
</template>

<script>
import axios from 'axios'
import store from '@/store'
import { mapState } from 'vuex'

export default {
  name: 'menulist',
  store,
  methods: {
    mostVotedQ: function () {
      this.$store.dispatch('mostVotedQ', this.defaultColor)
      let ls = {
        defaultColor: this.defaultColor,
        openTab: 'mostVotedQ'
      }
      localStorage.setItem('hacktiv_overflow_data', JSON.stringify(ls))
      this.$router.push({ path: '/' })
    },
    mostRecentQ: function () {
      this.$store.dispatch('mostRecentQ', this.defaultColor)
      let ls = {
        defaultColor: this.defaultColor,
        openTab: 'mostRecentQ'
      }
      localStorage.setItem('hacktiv_overflow_data', JSON.stringify(ls))
      this.$router.push({ path: '/' })
    },
    myQ: function () {
      this.$store.dispatch('myQ', this.defaultColor)
      let ls = {
        defaultColor: this.defaultColor,
        openTab: 'myQ'
      }
      localStorage.setItem('hacktiv_overflow_data', JSON.stringify(ls))
      this.$router.push({ path: '/' })
    },
    toggleModal: function () {
      if (this.openModal) {
        this.$store.commit('openModalFalse')
      } else {
        this.$store.commit('openModalTrue')
      }
    },
    addQuestion: function () {
      axios({
        method: 'post',
        url: 'http://hackover-server.ismailnagib.xyz/questions',
        data: { title: this.questiontitle, content: this.questiondesc, token: localStorage.getItem('jwtToken') }
      })
        .then(data => {
          this.myQ()
          this.$router.push({ path: `/${data.data.data._id}` })
          this.$store.commit('openModalFalse')
          this.$store.commit('updateQuestionTitle', '')
          this.$store.commit('updateQuestionDesc', '')
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  computed: {
    ...mapState(['islogin', 'byVote', 'byDate', 'mine', 'openModal', 'defaultColor']),
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
    }
  },
  created () {
    if (this.$route.params.id) {
      this.$store.dispatch('showOne', this.$route.params.id)
    } else if (localStorage.getItem('hacktiv_overflow_data')) {
      this[JSON.parse(localStorage.getItem('hacktiv_overflow_data')).openTab]()
    } else {
      this.mostVotedQ()
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
    color: white;
    margin: 20px 10px;
    border-radius: 25px;
  }
</style>
