<template>
<div id = "main">
  <div class="container-fluid">
    <div class = "endGame process_top">
      <p>狼人获胜</p>
      <p>场上信息</p>
      <div class="row no_margin">
          <div v-for="(pos,key) in roomInfo.characters" class="col-xs-3 col-sm-3 col-md-3">
              <div class="pos_box thumbnail thumbnail_change">
                  <div class="container_num">
                      <img class="center_top img_change" :src="'/static/images/'+c_name+'.png'"
                           style="display: block;">
                  </div>
                  <div class="caption caption_change">
                      <div class="row center">
                        <p>{{pos.c_status}}</p>
                      </div>
                  </div>
              </div>
          </div>
      </div>
      <div class="row">
          <p>守卫每晚只可以守护一个玩家</p>
          <p>并且不能连续两晚守护同一个人</p>
      </div>
      <div class="row button_position">
          <a id="guard_confirm" v-on:click="reStartGame" class="btn forsure" role="button"></a>
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
  data: function () {
    return this.$store.getters.getLangrenInfo;
  },
  methods:{
    reStartGame : function () {
        
    }
  },
  computed: {
    c_name: function () {
      // `this` points to the vm instance
      // console.log(roomInfo.characters[userInfoVm.seatNum].c_name)
      return this.roomInfo.characters[this.$store.getters.getPlayerInfo.seatNum].c_name
    },
  }
}
</script>


<style scoped>
#main{
height:100%;
background-image: url("../images/Fourthpage.png");
background-size: 100% 100%;
}
</style>
