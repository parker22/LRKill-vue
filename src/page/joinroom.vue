<template>
<div id = "main">
  <div class="container-fluid">
    <div id="join-game-screen" class="center_top">
        <form class="form-inline" id="joinGameForm">
            <div class="row">
                <div class="col-xs-6 col-sm-2 col-md-2 col-xs-offset-3 col-md-offset-5 col-sm-offset-5  inputbg">
                    <input type="text" class="inputtext" placeholder="输入房间号" id="room-num">
                </div>
            </div>
            <div class="row joinbutton_position">
                <a id="join" v-on:click="joinGAME" class="btn joinbutton" role="button"></a>
            </div>
        </form>
    </div>
  </div>
  <div id="user-info-panel" class="footer row  center">
      <div class="col-xs-4 col-sm-4 col-md-4 footer_font">
          <span>昵称：</span><span>{{player_info.name}}</span>
      </div>
      <div class="col-xs-4 col-sm-4 col-md-4 footer_font">
          <span>房间号：</span><span v-if="player_info.inroom == null">未加入游戏</span><span v-else>{{palyerinfo.inroom}}</span>
      </div>
      <div class="col-xs-4 col-sm-4 col-md-4 footer_font">
          <span>当前号码：</span><span v-if="player_info.seatNum == null">未落座</span><span v-else>{{palyerinfo.seatNum}}</span>
      </div>
  </div>
  <div id="user-info-panel" class="footer row  center">
      <div class="col-xs-4 col-sm-4 col-md-4 footer_font">
          <span>昵称：</span><span>{{player_info.name}}</span>
      </div>
      <div class="col-xs-4 col-sm-4 col-md-4 footer_font">
          <span>房间号：</span><span v-if="player_info.inroom == null">未加入游戏</span><span v-else>{{palyerinfo.inroom}}</span>
      </div>
      <div class="col-xs-4 col-sm-4 col-md-4 footer_font">
          <span>当前号码：</span><span v-if="player_info.seatNum == null">未落座</span><span v-else>{{palyerinfo.seatNum}}</span>
      </div>
  </div>
</div>
</template>

<script>
export default{
    data: function () {
      return this.$store.getters.getLangrenInfo
  },
  methods:{
    joinGAME: function () {
        var roomNum = document.getElementById("room-num").value;
        console.log(roomNum);
        if(name != null){
           this.$socket.emit("joinRoom", roomNum);
           this.$router.push('room');
        }else{
          alert("房间号为空");
        }
    }
  }
}
</script>

<style scoped>
#main{
  height:100%;
  background-image: url("../images/Thirdpage1.png");
  background-size: 100% 100%;
}
</style>
