<template>
<div id = "main">
  <div class="container-fluid">
    <div id="panda_process">
      <div id="identify"  class="identify_scene">
          <div class="row">
              <div class="col-xs-2 col-sm-2 col-md-2 center">
              </div>
              <div class="col-xs-8 col-sm-8 col-md-8 center no_padding">
                  <img :src="'/static/images/'+c_name+'card.png'" class="identify_status">
              </div>
              <div class="col-xs-2 col-sm-2 col-md-2 center">
              </div>
          </div>
          <div class="row center">
              <a id="identify_button" v-on:click="confirmIdentity" class="btn sure_identify" role="button"></a>
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
  data: function () {
    return this.$store.getters.getLangrenInfo;
  },
  methods:{
    confirmIdentity: function () {
      this.$socket.emit("confirmIdentity", this.$store.getters.getPlayerInfo.seatNum);
      this.$router.push('roominfopanel');
    }
  },
  computed: {
      c_name: function () {
      // `this` points to the vm instance
      // console.log(roomInfo.characters[userInfoVm.seatNum].c_name)
      return this.roomInfo.characters[this.$store.getters.getPlayerInfo.seatNum].c_name
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
</style>
