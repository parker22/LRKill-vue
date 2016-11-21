<template>
<div id="main">
  <div class="container-fluid">
    <div id="enter_room" class="row center no_margin">
      <div id="player_status" class="application_status roomnumber">
        <div class="row">
          <div class="col-xs-6 col-sm-6 col-md-6 col-xs-offset-3 col-md-offset-3 col-sm-offset-3 roomnumber_top">
            <span style="">{{roomInfo.id}}号房间</span>
          </div>
        </div>

        <!-- <div class="row no_margin center_top" class = "seat"> -->
        <!-- <div v-for="(char,key) in roominfo.characters" class="col-xs-3 col-sm-3 col-md-3 no_padding">
                  <div class="thumbnail seat_thumbnail">
                      <img :src="'images/'+key+'.png'" style="display: block; width:100%; height:100%; border: 1px solid white;">
                  </div>
                  <div class = "caption">
                    <button class="sitbutton" v-on:click="sit( key )"></button>
                  </div>
                </div> -->

        <div class="row" style="margin-top: -50px">
          <div class="table_bg">
            <table class="table table-condensed">
              <tr v-for="(char,key) in roomInfo.characters">
                <td class="vert-align">{{ key }}</td>
                <td class="vert-align">{{ char.c_status }}</td>
                <td>
                  <button class="sitbutton" v-on:click="sit( key )"></button>
                </td>
              </tr>
            </table>
          </div>
        </div>
        <a v-on:click="startGame" id="start_game" v-show="isAwaiting&&isOwner" class="btn button_position startgamebutton" role="button"></a>
      </div>
    </div>
  </div>
  <div id="user-info-panel" class="footer row  center">
    <div class="col-xs-4 col-sm-4 col-md-4 footer_font">
      <span>昵称：</span><span>{{player_info.name}}</span>
    </div>
    <div class="col-xs-4 col-sm-4 col-md-4 footer_font">
      <span>房间号：</span><span v-if="player_info.inroom == null">未加入游戏</span><span v-else>{{player_info.inroom}}</span>
    </div>
    <div class="col-xs-4 col-sm-4 col-md-4 footer_font">
      <span>当前号码：</span><span v-if="player_info.seatNum == null">未落座</span><span v-else>{{player_info.seatNum}}</span>
    </div>
  </div>
</div>
</template>


<script>
export default {
sockets:{
   "init-game" : function () {
      this.initGame();

    }
  },
  data: function() {
    return this.$store.getters.getLangrenInfo
  },
  computed: {
    isOwner: function() {
      return this.roomInfo.id == this.$store.state.player_info.owns;
    },
    isAwaiting: function() {
      var isAw = typeof _.findKey(this.roomInfo.characters, function(o) {
        return o.c_status == 'awaiting';
      }) == 'undefined';
      return isAw;
    }
  },
  methods: {
    sit: function(seatNum) {
      this.$socket.emit("sit", seatNum);
    },
    startGame: function() {
      this.$socket.emit("startGame");
    },
    initGame : function () {
      this.$router.push('identify');
      console.log("sbsbs")
    }
  }
}
</script>
<style scoped>
#main {
  height: 100%;
  background-image: url("../images/Thirdpage1.png");
  background-size: 100% 100%;
}
</style>
