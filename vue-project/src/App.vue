<script setup>
  import Nav from './components/Nav.vue'
  import Post from './components/Post.vue'

  const date = new Date();
  const postsData = [
        {
            userId: '@abc',
            userName: 'abc',
            recordTime: date.toISOString().split('T')[0],
            userText: 'this is fake data'
        },
        {
            userId: '@abc',
            userName: 'abc',
            recordTime: date.toISOString().split('T')[0],
            userText: 'this is fake data'
        },
        {
            userId: '@abc',
            userName: 'abc people',
            recordTime: date.toISOString().split('T')[0],
            userText: 'this is fake data'
        },
    ];
</script>

<template>
  <div>
    <header>
      <Nav></Nav>
    </header>
    <main>
      <Post :tweets="postsData"></Post>
    </main>
  </div>
  
</template>

<style scoped>
</style>
