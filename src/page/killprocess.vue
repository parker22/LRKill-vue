<template>
<div id="main">
  <div class="container-fluid">
    <div id="panda_process">
      <div id="night" v-if="step == 'night'|| (step !='day' && step != c_name)" class="night">
          <img class="back_img" src="/static/images/night.png"/>
      </div>
      <!--&lt;!&ndash; 屏幕黑了，开始放声音，天黑请闭眼守卫请睁眼 &ndash;&gt;-->
       <!-- 守卫操作 -->
      <div id="guard" v-if= "step == 'guard'&& c_name == 'guard'" class="row process_top">
        <p>守卫可点击一个人守护或者直接点确定空守</p>
        <div class="row no_margin">
            <div v-for="(pos,key) in roomInfo.characters" class="col-xs-3 col-sm-3 col-md-3">
                <div class="pos_box thumbnail thumbnail_change">
                    <div class="container_num">
                        <a :id="'guardbutton'+key" v-on:click="guard(key)"
                           class="btn guard_button delete_padding" role="button">
                            <img class="center_top img_change" :src="'/static/images/'+key+'.png'"
                                 style="display: block;">
                        </a>
                        <div :id="'guardhint'+key" v-show= "currentGuard == 'guardhint'+key" class="guard_overlay_image"></div>
                    </div>
                    <div class="caption caption_change">
                        <div class="row center">
                            <!-- <p><span>{{key}}</span>号玩家：<span>{{pos.c_status}}</span></p> -->
                            <p>{{pos.c_status}}</p>
                            <!-- <a :id="'guardbutton'+key" v-on:click="guard(key)"
                            class="btn btn-default guard_button" role="button">守卫</a> -->
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
            <a id="guard_confirm" v-on:click="guardConfirm" class="btn forsure" role="button"></a>
        </div>
      </div>

      <!--&lt;!&ndash; 守卫操作完，等5秒钟的时间，播放声音，狼人请睁眼 &ndash;&gt;-->
      <div id="wolf" v-if="step == 'wolf'&& c_name == 'wolf'" class="row process_top">
          <p>狼人请统一意见后，共同按一个号码，若均确认后，击杀目标不同则被认为是平安夜</p>
          <div class="row">
              <p v-for="choice in killChoices"><span v-for="wolf in choice.wolves">{{wolf.wolf}}号</span>希望杀害{{choice.target}}号
              </p>
          </div>
          <div class="row no_margin">
              <div v-for="(pos,key) in roomInfo.characters" class="col-xs-3 col-sm-3 col-md-3">
                  <div class="pos_box thumbnail thumbnail_change">
                      <div class="container_num">
                          <a :id="'wolvesbutton'+key" v-on:click="wolves(key)"
                             class="btn wolves_button delete_padding" role="button">
                              <img class="center_top img_change " :src="'/static/images/'+key+'.png'"
                                   style="display: block;">
                          </a>
                          <div :id="'wolveshint'+key" v-show= "currentWolf == 'wolveshint'+key" class="langren_overlay_image"></div>
                      </div>
                      <div class="caption caption_change">
                          <div class="row center_top">
                              <!-- <p><span>{{key}}</span>号玩家：<span>{{pos.c_status}}</span></p> -->
                              <p>{{pos.c_status}}</p>
                              <!-- <a :id="'wolvesbutton'+key" v-on:click="wolves(key)"
                              class="btn btn-default wolves_button" role="button">杀害</a> -->
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          <p>最终决定<span v-if="killDecision == 0">今晚将是平安夜</span><span v-else>猎杀{{killDecision}}号</span></p>
          <div class="row button_position">
              <a id="wolves_confirm" v-on:click="wolvesDecision" class="btn forsure" role="button"></a>
          </div>
      </div>

      <div id="predictor" v-if="step=='predictor'&& c_name == 'predictor'" class="row process_top" >
          <div class="row no_margin">
              <p>预言家每晚可以查验一个人的身份</p>
              <div v-for="(pos,key) in roomInfo.characters" class="col-xs-3 col-sm-3 col-md-3">
                  <div class="pos_box thumbnail thumbnail_change">
                      <div class="container_num">
                          <a :id="'predictorbutton'+key" v-on:click="predictorCheck(key)"
                             class="btn predictor_button delete_padding" role="button">
                              <img class="center_top img_change" :src="'/static/images/'+key+'.png'"
                                   style="display: block;">
                          </a>
                          <div :id="'predictorhint'+key"  v-show= "currentPredictor == 'predictorhint'+key" class="predictor_overlay_image"></div>
                      </div>
                      <div class="caption caption_change">
                          <div class="row center_top">
                              <p>{{pos.c_status}}</p>
                              <!-- <p><span>{{key}}</span>号玩家：<span>{{pos.c_status}}</span></p>
                              <a :id="'predictorbutton'+key" v-on:click="predictorCheck(key)"
                              class="btn btn-default predictor_button" role="button">查验</a> -->
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          <div class="row button_position">
              <div class="center ">
                  <a id="predictor_confirm" v-on:click="predictorConfirm" class="btn forsure" role="button"></a>
              </div>
          </div>
       </div>


          <div id="wolf" v-if="step=='witch'&& c_name == 'witch'" class="row process_top" >
              <p>Tips: 女巫晚上只可以用一瓶药(解药／毒药),用完解药后无法看到死的人或者点击确定直接跳过</p>
              <div id="usedrug" class="row witch_scene">
                  <div v-if = "use_Save">
                    <p>解药已用</p>
                  </div>
                  <div v-else class="witchsavemedicine">
                      <p v-if="roomInfo.lastKill==0">今夜无人死亡</p>
                      <p v-else>今夜死的玩家是 : <span>{{roomInfo.lastKill}}</span>号玩家</p>
                      <p>你可以选择使用解药</p>
                      <a v-on:click="witchSave" class="btn  witch_save" role="button"></a>
                  </div>
              </div>
              <div id="posionuse" class="row no_margin center_top witchposionmedicine">
                  <div v-if = "use_Poison != 0 ">
                     <p>毒药已用</p>
                  </div>
                  <div v-else class="row">
                      <div v-for="(pos,key) in roomInfo.characters" class="col-xs-3 col-sm-3 col-md-3 ">
                          <div class="pos_box thumbnail thumbnail_change">
                              <div class="container_num">
                                  <a :id="'witchbutton'+key" v-on:click="witchPoison(key)"
                                     class="btn witch_button delete_padding" role="button">
                                      <img class="center_top img_change" :src="'/static/images/'+key+'.png'"
                                           style="display: block;">
                                  </a>
                                  <div :id="'witchhint'+key"  v-show= "currentPoison == 'witchhint'+key" class="witch_overlay_image"></div>
                              </div>
                              <div class="caption caption_change">
                                  <div class="row center_top">
                                      <p>{{pos.c_status}}</p>
                                      <!-- <p><span>{{key}}</span>号玩家：<span>{{pos.c_status}}</span></p> -->
                                      <!-- <a :id="'witchbutton'+key" v-on:click="witchPoison(key)"
                                      class="btn btn-default witch_button" role="button">毒杀</a> -->
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
                  <div class="row">
                      <a v-on:click="witchPoisonComfirmation" class="btn  witch_posion" role="button"></a>
                  </div>
                  <!-- </div> -->
                <!-- </div> -->
              <!--<div class="row show_witchinfo">-->
                  <!--<p>2号玩家被杀</p>-->
                  <!--<p>3号玩家被毒杀</p>-->
              <!--</div>-->
          </div>
            <div class="row button_position">
              <a v-on:click="witchConfirm" id="witchConfirm" class="btn forsure" role="button"></a>
            </div>
        </div>

          <div id="day" v-if = "step=='day'" >
          <div id="room-info-panel" class="player_name center_top">
            <div  id="room-opera" class="btn-group room_operation">
              <button type="button" class="btn btn-default">{{roomInfo.name}}</button>
              <button type="button" class="btn btn-default dropdown-toggle"
                      data-toggle="dropdown">
                  <span class="caret"></span>
                  <span class="sr-only">切换下拉菜单</span>
              </button>
              <ul class="dropdown-menu drop_info" role="menu">
                  <li><a v-on:click="restartGame" type="button" class="btn btn-default">重新开始</a></li>
                  <li><a v-on:click="startFirstNight" type="button" class="btn btn-default">下一夜</a></li>
                  <li><a v-on:click="wolfSuicide" type="button" class="btn btn-default">狼人自爆</a></li>
                  <li><a type="button" class="btn btn-default disabled">警长投票</a></li>
                  <!-- <li class="divider"></li> -->
                  <li><a type="button" class="btn btn-default disabled">公投投票</a></li>
              </ul>
            </div>
          </div>

          <div id="accordion" role="tablist" aria-multiselectable="true">
            <div class="panel  fold_panel center">
              <div class="panel-heading fold_heading" role="tab" id="headingOne">
                <h4 class="panel-title">
                  <a data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    第<span>1</span>天白天投票信息
                  </a>
                </h4>
              </div>
              <div id="collapseOne" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne">
                <p>投票<span>1</span>号的玩家: 4 5 6 7</p>
                <p>投票<span>2</span>号的玩家: 3 4 5</p>
                <p>弃票: 9<p>
              </div>
            </div>
            <div class="panel  fold_panel center">
              <div class="panel-heading fold_heading" role="tab" id="headingTwo">
                <h4 class="panel-title">
                  <a class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                    第<span>2</span>天白天投票信息
                  </a>
                </h4>
              </div>
              <div id="collapseTwo" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingTwo">
                <p>投票<span>1</span>号的玩家: 4 5 6 7</p>
                <p>投票<span>2</span>号的玩家: 3 4 5</p>
                <p>弃票: 9<p>
              </div>
            </div>
            <div class="panel  fold_panel center">
              <div class="panel-heading fold_heading" role="tab" id="headingThree">
                <h4 class="panel-title">
                  <a class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                    第<span>3</span>天白天投票信息
                  </a>
                </h4>
              </div>
              <div id="collapseThree" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingThree">
                <p>投票<span>1</span>号的玩家: 4 5 6 7</p>
                <p>投票<span>2</span>号的玩家: 3 4 5</p>
                <p>弃票: 9<p>
              </div>
            </div>
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
        console.log("execute-step-data", stepData);
        console.log("sbsbs");
        var step = stepData.step;
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
    },
    restartGame: function () {
        this.$socket.emit("startGame");
    },
    wolfSuicide: function () {
        console.log("endFirstDay");
        this.$socket.emit("specialAction", {action: "endFirstDay", detail:null});
    },
    resetGuard : function(){
      this.$store.commit('changeGuardObj',0);
    },
    resetWitchPosion : function(){
      this.$store.commit('changePoisonObj',0);
    },
    resetPredictor : function(){
      this.$store.commit('changePredictorObj',0);
    },
    resetWolf : function(){
      this.$store.commit('changeWolfObj',0);
    },
    guard: function (index) {
       console.log("想守卫" + index);
       this.$store.commit('changeGuardObj',parseInt(index));
    },
    guardConfirm: function () {
       console.log("确定守卫" + this.$store.getters.getProcessStep.guardObj);
       this.$socket.emit("action", {action: "guard", detail: this.$store.getters.getProcessStep.guardObj});
    },
    // //狼人的方法和逻辑，点一个按钮后 其他按钮变灰色 重置功能
    wolves: function (index) {
       console.log("想杀害" + index);
       this.$store.commit('changeWolfObj',parseInt(index));
       this.$socket.emit("action", {action: "killChoice", detail: index});
    },
    wolvesDecision: function () {
       console.log("决定杀害" + this.killDecision);
       this.$socket.emit("action", {action: "wolf", detail: this.killDecision});
    },
    predictorCheck: function (index) {
        $(".predictor_button").addClass("disabled");
        this.$store.commit('changePredictorObj',parseInt(index));
        var idnt = this.roomInfo.characters[index].c_name;
        if (idnt == "wolf") {
            alert("他是坏人");
        } else {
            alert("他是好人");
        }
    },
    predictorConfirm: function () {
        this.$socket.emit("action", {action: "predictor", detail: null});
    },
    witchSave: function () {
     $(".witch_save").addClass("disabled");
       this.$socket.emit("action", {action: "witchSave", detail: null});
     },
     witchPoison: function (index) {
         this.$store.commit('changePoisonObj',parseInt(index));
     },

     //没写使用毒药按键的方法，逻辑是先点上面的号码，再点使用毒药，然后再点确认进入下一个界面
     witchPoisonComfirmation: function(){
         this.$socket.emit("action", {action: "witchPoison", detail:  this.$store.getters.getProcessStep.poisonObj});
         $(".witch_posion").addClass("disabled");
     },
     witchConfirm: function () {
         this.$socket.emit("action", {action: "witch", detail: null});
     }
  },
  computed: {
    use_Save: function(){
      return this.roomInfo.characters[this.$store.getters.getPlayerInfo.seatNum].isSave
    },
    use_Poison: function(){
      return this.roomInfo.characters[this.$store.getters.getPlayerInfo.seatNum].isPosin
    },
    c_name: function () {
      // `this` points to the vm instance
      // console.log(roomInfo.characters[userInfoVm.seatNum].c_name)
      return this.roomInfo.characters[this.$store.getters.getPlayerInfo.seatNum].c_name
    },
    currentGuard : function(){
      return "guardhint"+this.$store.getters.getProcessStep.guardObj;
    },
    currentWolf : function(){
      return "wolveshint"+this.$store.getters.getProcessStep.wolfObj;
    },
    currentPredictor : function(){
      return "predictorhint"+this.$store.getters.getProcessStep.predictorObj;
    },
    currentPoison : function(){
      return "witchhint"+this.$store.getters.getProcessStep.poisonObj;
    },
    step : function(){
      return this.$store.getters.getProcessStep.killprocess_step;
    },
    isOwner: function () {
       return this.roomInfo.id == this.$store.state.player_info.owns;
    },
    killChoices: function () {
      console.log(this.$store.getters.getRoomInfo.killChoices);
      var result = _.chain(this.$store.getters.getRoomInfo.killChoices)
          .groupBy("target")
          .toPairs()
          .map(function (currentItem) {
              return _.zipObject(["target", "wolves"], currentItem);
          })
          .value();
      console.log(result);
      return result
    },
    killDecision: function () {
        if (this.killChoices.length == 1) {
            return parseInt(this.killChoices[0].target)
        }
        else return 0
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
