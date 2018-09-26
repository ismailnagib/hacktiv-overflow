<template>
  <div class="home">
    <div class="container">
      <div class="row">
        <div id='menulist' class="col-12 col-md-3 border-right">
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
  .home #menulist {
    height: 30vh;
  }
  #backdrop {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background: rgba(51,51,51,0.8);
    z-index: 2000;
  }
</style>
