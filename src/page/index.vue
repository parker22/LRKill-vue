<template>
<div id = "main">
  <div class="container-fluid">
    <div id="first_view" class="center firstview">
        <div id="player_n" class="player_input ">
            <div class="row ">
                <div class="col-xs-1 col-sm-1 col-md-1">
                </div>
                <div class="col-xs-10 col-sm-10 col-md-10 input_name ">
                    <input id="player_name_input" class="input_back" type="text" placeholder="昵称长度小于4个汉字或字母">
                </div>
                <div class="col-xs-1 col-sm-1 col-md-1">
                </div>
            </div>
            <div class="row">
                <a id="enter_game" v-on:click="enterGame" class="btn enter_button" role="button"></a>
            </div>
        </div>
    </div>
  </div>
</div>
</template>

<script>
  export default{
    methods:{
      enterGame: function () {
          var name = document.getElementById("player_name_input").value;
          if(name != ""){
             console.log(name.length);
             if(name.length < 5){
              this.$socket.emit("joinserver", name);
             }else{
              alert("输入昵称过长，请重新输入");
             }
          }else{
            alert("请输入你的昵称");
          }
      }
    }
  }
</script>
