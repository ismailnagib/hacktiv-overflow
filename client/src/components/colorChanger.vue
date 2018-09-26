<template>
  <div>
    <button v-on:click="changeColorModal()"><i class="fas fa-brush"></i></button>
    <div v-if='openChangeColor'>
      <div id=backdrop></div>
      <div id='colorchoice'>
        <button class='iconBtn closeModal' v-bind:style='{color: defaultColor}' v-on:click="changeColorModal()" title='Close'><i class="far fa-times-circle"></i></button><br>
        <div id='colorchoiceinput'>
          <input v-on:click='changeColor()' type="radio" id="red" value="Red" v-model="chosencolor">
          <label for="red">Red</label>
          <br>
          <input v-on:click='changeColor()' type="radio" id="green" value="Green" v-model="chosencolor">
          <label for="green">Green</label>
          <br>
          <input v-on:click='changeColor()' type="radio" id="blue" value="Blue" v-model="chosencolor">
          <label for="blue">Blue</label>
          <br>
          <input v-on:keyup='changeColor()' v-bind:style='{color: defaultColor}' type="text" value="" placeholder='Choose your own color' v-model="chosencolor">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from '@/store'
import { mapState } from 'vuex'

export default {
  name: 'colorchanger',
  store,
  methods: {
    changeColorModal: function () {
      if (this.openChangeColor) {
        this.$store.commit('openChangeColorFalse')
      } else {
        this.$store.commit('openChangeColorTrue')
      }
    },
    changeColor: function () {
      setTimeout(() => {
        this.$store.commit('changeDefaultColor', this.chosencolor)
        let openTab = JSON.parse(localStorage.getItem('hacktiv_overflow_data')).openTab
        switch (openTab) {
          case 'mostVotedQ': {
            this.$store.commit('updateByVote', this.chosencolor)
            break
          }
          case 'mostRecentQ': {
            this.$store.commit('updateByDate', this.chosencolor)
            break
          }
          case 'myQ': {
            this.$store.commit('updateMine', this.chosencolor)
            break
          }
        }
        if (this.isregistering) {
          this.$store.commit('updateRegisterColor', this.chosencolor)
        } else {
          this.$store.commit('updateLoginColor', this.chosencolor)
        }
        let ls = {
          defaultColor: this.chosencolor,
          openTab: openTab
        }
        localStorage.setItem('hacktiv_overflow_data', JSON.stringify(ls))
      }, 1)
    }
  },
  computed: {
    ...mapState(['defaultColor', 'openChangeColor', 'isregistering']),
    chosencolor: {
      get () {
        return this.$store.state.chosencolor
      },
      set (value) {
        this.$store.commit('changeChosenColor', value)
      }
    }
  },
  created () {
    if (localStorage.getItem('hacktiv_overflow_data')) {
      let chosenFromLS = JSON.parse(localStorage.getItem('hacktiv_overflow_data')).defaultColor
      this.$store.commit('changeChosenColor', chosenFromLS)
      this.changeColor()
    }
  }
}
</script>

<style>
  .fa-brush {
    font-size: 20px;
    cursor: pointer;
  }
  #colorchoice {
    position: fixed;
    background-color: white;
    text-align: left;
    font-size: 25px;
    left: 45%;
    top: 35%;
    width: 20%;
    height: 30%;
    z-index: 2001;
  }
  #colorchoiceinput input {
    margin-top: 5%;
    margin-left: 15%;
  }
  #colorchoiceinput input[type='text'] {
    width: 70%;
  }
  #colorchoiceinput label {
    margin-left: 5%;
  }
</style>
