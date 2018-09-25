<template>
  <div>
    <div class="row" v-if='showAll'>
      <div class="card col-12" v-for='(question, index) in questions' v-bind:key='index'>
        <div class="card-body">
          <router-link class="card-title" :to="{name: 'questionpage', params: {id:`${question._id}`}}">{{ question.title }}</router-link>
          <p class="card-text">
            asked by {{ question.asker.name }} on {{ question.createdAt | dateSlice }}<br>
            vote: {{ question.upvote.length - question.downvote.length }} | answer: {{ question.answer.length }}
          </p>
        </div>
      </div>
    </div>
    <div class='row' v-else>
      <div class="col-12">
        <h5>{{ detailed.title }}</h5>
        <p>asked by {{ detailed.asker.name }}<br>
        vote: {{ detailed.vote }}</p>
        <p v-for='(item, index) in detailed.answer' :key='index'>
          {{ item.content }}
        </p>
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
      showAll: true,
      detailed: {}
    }
  },
  methods: {
    showOne: function (id) {
      if (id !== undefined) {
        axios({
          method: 'get',
          url: `http://localhost:3000/questions/${id}`
        })
          .then(data => {
            this.detailed = data.data.data
            this.showAll = false
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        this.showAll = true
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
      this.showOne(this.$route.params.id)
    }
  },
  computed: {
    questions () {
      return this.$store.state.questions
    }
  }
}
</script>

<style>

</style>
