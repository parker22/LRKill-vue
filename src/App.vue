<template>
  <div id = "mainapp">
      <router-view class="child-view"></router-view>
  </div>


</template>
<script>
  import Index from './page/index'
  export default {
  sockets:{
     "update-room-status" : function (room) {
         this.$store.commit('setRoomInfo',room);
     },
     "update" : function (status) {
         toastr.info(status);
     },

     "update-user-status" : function (status) {
        console.log(status)
          if (status.name != null) {
            this.$store.commit('setPlayerInfo',status);
            if (status.inroom != null) {
                console.log(this.$store.getters.getRoomInfo.step);
                switch(this.$store.getters.getRoomInfo.step){
                  case "room":
                    this.$router.push('room');
                    break;
                  case "identify":
                    this.$router.push('identify');
                    break;
                  case "roominfopanel":
                    this.$router.push('roominfopanel');
                    break;
                }
            }else{
              this.$router.push('secondpage');
            }
          }else{
             this.$router.push('index');
          }
        }
     },
     created:function(){
     console.log("ah");
     this.$socket.emit("back");
     this.$cookie.set('test', 'Hello world!', 1);

         if(this.$route.name==undefined){
             this.$router.push('index');
         }
     }
}
</script>

<style>
html {
    /*overflow: hidden;*/
    height: 100%;
    color: transparent;;
    width: 100%;
}

body {
    width: 100%;
    font-family: "MFDianHei_Noncommercial-Regular", serif;
    min-height: 100%;
    height: 100% !important;
    overflow: auto;
    color: white;
}
  #app{
    height:100%;
  }
  #mainapp{
    height:100%;
  }
  #main{
    height:100%;
    background-image: url("./images/Firstpage.png");
    background-size: 100% 100%;
  }

.title {
    margin-top: 8%;
}

.title_name {
    text-align: center;
}

.title_text {
    font-family: Georgia;
    color: white;
    font-size: 1em;
}

.small_title {
    margin-top: 5%;
    margin-left: 4%;
    color: white;
    font-size: 1.5em;
}

.newfont {
    color: white;
}

.personal_info {
    border: 3px solid white;
    margin-left: 2%;
    margin-right: 2%;
    border-radius: 15%;
}

.player_input {
    position: absolute;
    bottom: 0;
    width: 100%;
    text-align: center;
    margin-bottom: 15%;
    padding-right: 2em;

}

.input_name {
    background-image: url("./images/NameInput.png");
    background-size: 100% 100%;
}

.input_back {
    background-color: transparent;
    border: 0;
    margin-top: 5%;
    margin-bottom: 5%;
    height: 2em;
}

.enter_button {
    background-color: transparent;
    margin-top: 5%;
    background-image: url("./images/JRYX.png");
    background-size: 100% 100%;
    width: 8em;
    height: 3em;
    border: 0;
}

.enter_button:active {
    background-image: url("./images/JRYX2.png");
    background-color: transparent;
}

.special_thumbnail {
    background-color: transparent;
    border: 0;
    padding: 8px;
    margin-bottom:0px;
}

.center_bottom {
    margin-bottom: 5%;
    text-align: center;
}

.center_top {
    margin-top: 1%;
    text-align: center;
}

.center {
    text-align: center;
}

.button_position {
    text-align: center;
    margin-bottom: 5%;
}

.application_status {
    margin-left: 10%;
    margin-right: 10%;
    margin-top: 4%;
}

.back_img {
    width: 100%;
}

.identify_scene {
    margin-top: 25%;
}

.text_view {
    background-image: url('./images/textfield.png');
    background-size: 100% 100%;
    border: 0;
    background-color: transparent;
}

.up {
    background-image: url('./images/add.png');
    background-size: 100% 100%;
    border: 0;
    width: 1em;
    height: 1.5em;
    background-color: transparent;;
    border-radius: 20px;
}

.up:active {
    background-image: url('./images/add2.png');
}

.down {
    background-image: url('./images/minus.png');
    background-size: 100% 100%;
    border: 0;
    width: 1em;
    height: 1.5em;
    background-color: transparent;;
    border-radius: 20px;
}

.down:active {
    background-image: url('./images/minus2.png');
}

.night {
    margin-left: 10%;
    margin-right: 10%;
    margin-top: 60%;
}

.footer {
    background-image: url('./images/downText.png');
    background-size: 100% 100%;
    position: fixed;
    bottom: 0;
    width: 100%;
    margin: 0;
    line-height:13px;
}

.xiangshang_caidan {
    background-image: url('./images/minus.png');
    background-size: 100% 100%;
    border: 0;
    width: 1em;
    height: 1.5em;
    margin-left: 4%;
    margin-right: 4%;
    background-color: transparent;;
    border-radius: 20px;
}

.no_padding {
    padding-left: 0;
    padding-right: 0;

}

.no_margin {
    margin-left: 0;
    margin-right: 0;
}

.createroom_button {
    background-color: transparent;
    margin-top: 5%;
    background-image: url("./images/CJFJ.png");
    background-size: 100% 100%;
    width: 8em;
    height: 3em;
    border: 0;
}

.createroom_button:active {
    background-image: url("./images/CJFJ2.png");
}

.joingame_button {
    background-color: transparent;
    margin-top: 5%;
    background-image: url("./images/JRFJ.png");
    background-size: 100% 100%;
    width: 8em;
    height: 3em;
    border: 0;
}

.joingame_button:active {
    background-image: url("./images/JRFJ2.png");
}

.roomnumber_top {
    height: 4.5em;
    background-size: 100% 100%;
    background-position: center;
    background-image: url(./images/menpai.png);
}

.roomnumber_top span {
    line-height: 4.5em;
}

.table_bg {
    background-image: url(./images/sitPanel.png);
    background-size: 100% 100%;
    padding-top: 5%;
}

.tableset {
    margin-left: auto;
    margin-right: auto;
    border: 0;
    line-height: 8.5em;
    width: 80%;
}

.sitbutton {
    background-image: url(./images/ZX.png);
    background-size: 100% 100%;
    background-color: transparent;
    border: 0;
    width: 3em;
    height: 1.5em;
}

.sitbutton:active {
    background-image: url(./images/ZX2.png);
    background-size: 100% 100%;
    background-color: transparent;
    border: 0;
    width: 3em;
    height: 1.5em;
}

.table tbody > tr > td.vert-align {
    vertical-align: middle;
}

.startgamebutton {
    background-image: url(./images/KSYX.png);
    background-size: 100% 100%;
    background-color: transparent;
    width: 6em;
    height: 3em;
    border: 0;
}

.startgamebutton:active {
    background-image: url(./images/KSYX2.png);
}

.entergametext {
    height: 4.5em;
    background-size: 100% 100%;
    background-position: center;
    background-image: url(./images/roomNumber.png);
    margin-bottom: 30px;
}

.entergametext span {
    line-height: 4.5em;
}

.joinbutton {
    background-image: url(./images/JRYX.png);
    background-size: 100% 100%;
    background-color: transparent;
    width: 8em;
    height: 3em;
    border: 0;
}

.joinbutton:active {
    background-image: url(./images/JRYX2.png);
}

.joinbutton_position {
    margin-top: 50%;

}

.inputtext {
    text-align: center;
    font-size: 1.5em;
    padding: 6px 12px;
    color: white;
    background-color: transparent;
    background-image: none;
    border: 0;
    border-radius: 4px;
    height: 4em;
}

.inputbg {
    height: 12em;
    background-image: url(./images/roomNumber.png);
    background-size: auto 100%;
    background-color: transparent;
    background-position: center;
    background-repeat: no-repeat;
    float: none;
    display: table-cell;
    vertical-align: bottom;
}

.identify_status {
    width: 16em;
    height: 22em;
}

.sure_identify {
    background-image: url(./images/QRSF.png);
    background-size: 100% 100%;
    background-color: transparent;
    width: 8em;
    height: 3em;
    margin-top: 5%;
}

.sure_identify:active {
    background-image: url(./images/QRSF2.png);
}

.thumbnail_change {
    background-color: transparent;
    border: 0;
    margin-bottom: 0;

}

.tianheile {
    background-image: url(./images/THL.png);
    background-size: 100% 100%;
    background-color: transparent;
    width: 9em;
    height: 3em;
    margin-top: 5%;
}

.tianheile:active {
    background-image: url(./images/THL2.png);
}

.reset {
    background-image: url(./images/CZ.png);
    background-size: 100% 100%;
    background-color: transparent;
    width: 9em;
    height: 3em;
    margin-top: 2%;
}

.reset:active {
    background-image: url(./images/CZ2.png);
}

.forsure {
    background-image: url(./images/QD.png);
    background-size: 100% 100%;
    background-color: transparent;
    width: 9em;
    height: 3em;
    margin-top: 3%;
}

.forsure:active {
    background-image: url(./images/QD2.png);
}

.thumbnail .caption_change {
    color: white;
    padding: 0;
}

.process_top {
    margin-top: 10%;
    text-align: center;
}

.img_change {
    width: 100%;
    height: 100%;
}

.container_num {
    position: relative;
}

.overlay_image {
    position: absolute;
    bottom: 2%;
    right: 3%;
    width: 0.8em;
    height: 0.8em;
    background-image: url(./images/duigou.png);
    background-size: 100% 100%;
    background-color: transparent;
}
.langren_overlay_image{
  position: absolute;
  bottom: -10%;
  right: -10%;
  width: 1.5em;
  height: 1.5em;
  background-image: url(./images/wolf_duigou.png);
  background-size: 100% 100%;
  background-color: transparent;
}
.guard_overlay_image{
  position: absolute;
  bottom: -5%;
  right: -10%;
  width: 1em;
  height: 1em;
  background-image: url(./images/guard_duigou.png);
  background-size: 100% 100%;
  background-color: transparent;
}
.predictor_overlay_image{
  position: absolute;
  bottom: -5%;
  right: -5%;
  width: 1em;
  height: 1em;
  background-image: url(./images/predictor_duigou.png);
  background-size: 100% 100%;
  background-color: transparent;
}
.witch_overlay_image{
  position: absolute;
  bottom: -5%;
  right: -10%;
  width: 1.2em;
  height: 1.2em;
  background-image: url(./images/witch_duigou.png);
  background-size: 100% 100%;
  background-color: transparent;
}

.delete_padding {
    padding: 0 0;
}

.footer_font {
    font-size: 12px;
    margin-top: 1%;
}

.room_operation {
    margin-top: 20%;
}

.drop_info {
    background-color: transparent;
    padding: 0;
    left: -2.5em;
}

.confirmed_Players {
    margin-top: 5%;
}

.witch_scene {
    margin-top: 5%;
}

.show_witchinfo {
    margin-top: 5%;
}

.witchsavemedicine {
    border-radius: 18px;
    border: 1px solid white;
    margin-left: 3em;
    margin-right: 3em;
}

.witch_save {
    margin-bottom: 2%;
    background-image: url(./images/SYJY.png);
    background-size: 100% 100%;
    background-color: transparent;
    width: 6em;
    height: 2em;
}

.witch_save:active {
    background-image: url(./images/SYJY2.png);
}

.witch_posion {
    margin-bottom: 2%;
    background-image: url(./images/SYDY.png);
    background-size: 100% 100%;
    background-color: transparent;
    width: 6em;
    height: 2em;
}

.witch_posion:active {
    background-image: url(./images/SYDY2.png);
}

.witchposionmedicine {
    border-radius: 18px;
    border: 1px solid white;
    margin-left: 2em;
    margin-right: 2em;
}

.fold_panel{
  margin-bottom: 1%;
  background-color: transparent;
}

.fold_heading{
  color: white;
  background-color: transparent;
}
.seat{
  margin-top: -10px;
}
.seat_thumbnail{
  background-color: transparent;
  padding: 6px;
  margin-bottom: 0px;
  border:0px;

}
.seat_fontstyle{
  color:white;
  font-size: 5px;
}

@media (min-width: 768px) {
    .input_back {
        height: 4em;
    }

    .enter_button {
        width: 13em;
        height: 5em;
    }

    .createroom_button {
        width: 11em;
        height: 5em;
    }

    .joingame_button {
        width: 11em;
        height: 5em;
    }

    #game-plaza-view p {
        font-size: 25px;
    }

    .roomnumber_top {
        height: 6.5em;
    }

    .roomnumber_top span {
        line-height: 3.5em;
        font-size: 25px;
    }

    .tableset {
        font-size: 25px;
    }

    .joinbutton {
        width: 11em;
        height: 5em;
    }

    .identify_status {
        width: 30em;
        height: 40em;
    }

    .sure_identify {
        width: 12em;
        height: 5em;
    }

    .overlay_image {
        position: absolute;
        bottom: 2%;
        right: 2%;
        width: 1.5em;
        height: 1.5em;
        background-image: url(./images/duigou.png);
        background-size: 100% 100%;
        background-color: transparent;
    }
   .langren_overlay_image {
         position: absolute;
         bottom: -5%;
         right: 20%;
         width: 2em;
         height: 2em;
        background-image: url(./images/wolf_duigou.png);
        background-size: 100% 100%;
        background-color: transparent;
    }
    .guard_overlay_image {
          position: absolute;
          bottom: -5%;
          right: 20%;
          width: 1.5em;
          height: 1.5em;
         background-image: url(./images/guard_duigou.png);
         background-size: 100% 100%;
         background-color: transparent;
     }
     .predictor_overlay_image {
           position: absolute;
           bottom: -5%;
           right: 20%;
           width: 1.5em;
           height: 1.5em;
          background-image: url(./images/predictor_duigou.png);
          background-size: 100% 100%;
          background-color: transparent;
      }
      .witch_overlay_image {
            position: absolute;
            bottom: -5%;
            right: 20%;
            width: 2em;
            height: 2em;
           background-image: url(./images/witch_duigou.png);
           background-size: 100% 100%;
           background-color: transparent;
       }
    .process_top p {
        font-size: 25px;
    }

    .tianheile {
        background-image: url(./images/THL.png);
        background-size: 100% 100%;
        background-color: transparent;
        width: 14em;
        height: 5em;
        margin-top: 5%;
    }

    .reset {
        background-image: url(./images/CZ.png);
        background-size: 100% 100%;
        background-color: transparent;
        width: 14em;
        height: 5em;
        margin-top: 5%;
    }

    .forsure {
        background-image: url(./images/QD.png);
        background-size: 100% 100%;
        background-color: transparent;
        width: 14em;
        height: 5em;
        margin-top: 3%;
    }

    .witch_save {
        margin-bottom: 2%;
        background-image: url(./images/SYJY.png);
        background-size: 100% 100%;
        background-color: transparent;
        width: 9em;
        height: 3.5em;
    }

    .witch_posion {
        margin-bottom: 2%;
        background-image: url(./images/SYDY.png);
        background-size: 100% 100%;
        background-color: transparent;
        width: 9em;
        height: 3.5em;
    }

    .footer_font {
        margin-top: 0.5%;
        font-size: 20px;
    }
    .footer {
        background-image: url('./images/downText.png');
        background-size: 100% 100%;
        position: fixed;
        bottom: 0;
        width: 100%;
        margin: 0;
        line-height:20px;
    }

}
</style>
