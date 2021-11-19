<template>
  <div class="home">
    <div class="big-container">
      <TicketPage></TicketPage>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'
import TicketPage from '@/components/TicketPage.vue'

export default {
  name: 'Home',
  components: {
    //HelloWorld
    TicketPage
  }
}
</script>

<style>
.big-container {
    max-width: 1000px; /* Can be in percentage also. */
    height: auto;
    margin: 0 auto;
    padding: 10px;
    position: relative;
}
</style>