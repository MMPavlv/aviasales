<template>
    <div id="container">
      <div id="contacts">
        <div id="contacts--contact">
          <p>{{ mail }}, {{mention}}</p>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'Footer',
  props : {
  },
  data(){
    return{
      mail : 'm.pavlov.1998@mail.ru',
      phone : '06.00.00.00.00',
      mention : '2021'
    }
  }
}
</script>

<style>
#contacts{
  display:flex;
  justify-content:space-around;
  align-items:center;
  background-color:#F6DF65;
  width:100%;
}
#contacts--contact{
  text-align:right;
}
#contacts--social{
  width:20%;
  display : flex;
  justify-content : space-between;
}
#contacts--social div{
  height:30px;
  width:30px;
  background-color:white;
  border-radius:50%;
}
</style>