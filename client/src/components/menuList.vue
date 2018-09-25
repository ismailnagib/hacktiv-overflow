<template>
  <div id='menulist'>
    <button v-on:click='mostVotedQ()' v-bind:style='({color: byVote})'>Most Voted Questions</button><br><br>
    <button v-on:click='mostRecentQ()' v-bind:style='({color: byDate})'>Most Recent Questions</button><br><br>
    <button v-on:click='myQ()' v-bind:style='({color: mine})' v-if='islogin'>My Questions</button><br><br>
    <button v-on:click='starredQ()' v-bind:style='({color: starred})' v-if='islogin'>Starred Questions</button>
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
      starred: 'black'
    }
  },
  methods: {
    mostVotedQ: function () {
      this.byVote = '#42b983'
      this.byDate = 'black'
      this.mine = 'black'
      this.starred = 'black'
      this.$store.dispatch('listMostVoted')
      localStorage.setItem('openTab', 'mostVotedQ')
    },
    mostRecentQ: function () {
      this.byVote = 'black'
      this.byDate = '#42b983'
      this.mine = 'black'
      this.starred = 'black'
      this.$store.dispatch('listMostRecent')
      localStorage.setItem('openTab', 'mostRecentQ')
    },
    myQ: function () {
      this.byVote = 'black'
      this.byDate = 'black'
      this.mine = '#42b983'
      this.starred = 'black'
      this.$store.dispatch('listMine')
      localStorage.setItem('openTab', 'myQ')
    },
    starredQ: function () {
      this.byVote = 'black'
      this.byDate = 'black'
      this.mine = 'black'
      this.starred = '#42b983'
      this.$store.dispatch('listStarred')
      localStorage.setItem('openTab', 'starredQ')
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
    #menulist button {
        position: absolute;
        right: 5%;
        border: none;
        background-color: white;
        cursor: pointer;
        font-weight: bold;
    }
</style>
