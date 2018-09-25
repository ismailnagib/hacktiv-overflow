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
        vote: {{ detailed.upvote.length - detailed.downvote.length }}</p>
        <p v-for='(item, index) in detailed.answer' :key='index'>
          {{ item.content }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import store from '@/store'

export default {
  name: 'questionlist',
  store,
  data: function () {
    return {}
  },
  filters: {
    dateSlice (value) {
      return value.slice(0, 10)
    }
  },
  watch: {
    '$route': function () {
      this.$store.dispatch('showOne', this.$route.params.id)
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
    }
  }
}
</script>

<style>

</style>
