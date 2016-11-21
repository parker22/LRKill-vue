<template>
<div id = "main">
  <div class="container-fluid">
    <div id="panda_process">
        <div id="room-info-panel" class="player_name center_top">
            <div id="confirmedPlayers" class="confirmed_Players">
                <ul>
                    <li
                            is="confirmedPlayer-item"
                            v-for="(player, index) in confirmedPlayers"
                            v-bind:player="player"
                    ></li>
                    号玩家已经确认
                </ul>
                <a v-on:click="startFirstNight" id="start-first-night"
                   v-show="confirmedPlayers.length==isAwaiting&&isOwner"
                   class="btn button_position tianheile" role="button"></a>
            </div>
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
export default{
  sockets : {
    "execute-step" : function (stepData){
      var step = stepData.step;
      if(step == "night"){
        this.$router.push('killprocess');
      }
      var strings = stepData["audioList"].split(" ");
      var index = 1;
      var audio = new Audio("/static/sounds/" + strings[0] + ".mp3");
      audio.play();
      this.$store.commit('changeProcessStep',step);
      console.log(this.$store.getters.getRoomInfo);
      audio.onended = function () {
        if (index < strings.length) {
            audio.src = "/static/sounds/" + strings[index] + ".mp3";
            setTimeout(function () {
                audio.play();
            }, 1);
            index++;
        }
      };
    }
  },
  data: function () {
    return this.$store.getters.getLangrenInfo;
  },
  methods:{
    startFirstNight: function () {
        this.$socket.emit("startFirstNight");
    }
  },
  computed: {
    confirmedPlayers: function () {
      return _.keys(_.pickBy(this.roomInfo.characters, function (v, k) {
          return v.isIdentityConfirmed == true;
      }));
    },
    isAwaiting: function() {
      return  _.size(this.roomInfo.characters);
    },
    isOwner: function () {
       return this.roomInfo.id == this.$store.state.player_info.owns;
    }
  },
  components: {
    'confirmedPlayer-item' : {
      template: '\
      <li>\
      {{ player }}\
      </li>\
      ',
      props: ['player']

    }
  }

}
</script>

<style scoped>
#main{
height:100%;
background-image: url("../images/Fourthpage.png");
background-size: 100% 100%;
}
.center_top{
    margin-top: 15%;
    text-align: center;
}
</style>
