<template>
  <div class="home">
    <div class="container">
      <div class="row">
        <div class="col-12 col-md-3 border-right">
          <menulist></menulist>
        </div>
        <div class="col-12 col-md-1"></div>
        <div class="col-12 col-md-8">
          <question-list></question-list>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import menulist from '@/components/menuList.vue'
import questionList from '@/components/questionList.vue'

export default {
  name: 'home',
  components: {
    menulist,
    questionList
  }
}
</script>

<style>
  .home {
    margin-top: 12vh;
  }
</style>
