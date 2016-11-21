<template>
<div id = "main">
  <div class="container-fluid">
      <div id="game-plaza-view">
        <div id="panda_kill">
            <div class="row center_top no_margin">
                <div v-for="(char,index) in info_kill.characters" class="col-xs-4 col-sm-4 col-md-4 no_padding">
                    <div class="thumbnail special_thumbnail">
                        <img :src="'/static/images/'+char.c_name+'.png'" style="display: block;">
                    </div>
                    <div class="caption">
                        <div class="row center_bottom no_margin">
                            <div class="col-xs-4 col-sm-4 col-md-4 no_padding">
                                <a v-on:click="minus(index)" class="btn down" role="button"></a>
                            </div>
                            <div class="col-xs-4 col-sm-4 col-md-4 no_padding">
                                <div class="text_view">
                                    <span>{{char.c_num}}</span>
                                </div>
                            </div>
                            <div class="col-xs-4 col-sm-4 col-md-4 no_padding">
                                <a v-on:click="add(index)" class="btn up" role="button"></a>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <div class="row center_top no_margin">
                <p>当前人数：<span>{{totalNum}}</span></p>
            </div>
        </div>
        <div class="row button_position no_margin  ">
            <div class="col-xs-6 col-sm-6 col-md-6 center no_padding">
                <a id="create_room" v-on:click="creatroom" class="btn createroom_button" role="button"></a>
            </div>
            <div class="col-xs-6 col-sm-6 col-md-6 center no_padding">
                <a id="join-game" v-on:click="joingame" class="btn joingame_button" role="button"></a>
            </div>
        </div>
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
  computed: {
     totalNum: function () {
         return _.sumBy(this.info_kill.characters, function (o) {
             return o.c_num;
         });
     }
  },
  methods:{
    minus: function (idx) {
      this.$store.commit('minus',idx);
    },
    add: function (idx) {
      this.$store.commit('add',idx);
    },
    creatroom: function () {
      var characters = [];
      _.forEach(this.$store.getters.getInfoKill.characters, function (value) {
        for (var i = 0; i < value.c_num; i++) {
            characters.push(value.c_name);
        }
      });
      console.log(characters);
      this.$socket.emit("createRoom", characters);
      this.$router.push('room');
    },
    joingame: function () {
      this.$router.push('joinroom');
    }
  }
}
</script>




<style scoped>
#main{
height:100%;
background-image: url("../images/Secondpage.png");
background-size: 100% 100%;
}
</style>
