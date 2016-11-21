import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
        //房间信息
        roomInfo:{
          name : null,
          id : null,
          owner : null,
          people : [],
          peopleLimit : null,
          status : "available",
          private : false,
          dayNo : 0,
          isNight : false,
          step : null,
          lastGuard : 0,
          lastKill:0,
          lastPoison :0,
          lastSave : 0,
          killChoices : [],
          stepFlow:[],
          deathPool : [],
          outPool:[],
          characters : {},
          firstNightAudio: ""
        },
        process_step:{
          killprocess_step: "",
          guardObj:0,
          poisonObj:0,
          wolfObj:0,
          predictorObj:0
        },
        //用户信息
        player_info:{
          "name": null,
          "owns": null,
          "inroom": null,
          "seatNum": null
        },
        //中英文对照
        characterDict:{
         "wolf": "狼人",
         "villager": "村民",
         "predictor": "预言家",
         "witch": "女巫",
         "huntsman": "猎人",
         "Idiot": "白痴",
         "guard": "守卫"
        },
        //狼人杀游戏信息
        info_kill:{
            position_nums:8,
            characters:[
              {
               "c_name": "wolf",
               "c_num": 1,
               "limit_num": false
           },
           {
               "c_name": "villager",
               "c_num": 0,
               "limit_num": false
           },
           {
               "c_name": "predictor",
               "c_num": 0,
               "limit_num": true
           },
           {
               "c_name": "witch",
               "c_num": 1,
               "limit_num": true
           },
           {
               "c_name": "huntsman",
               "c_num": 0,
               "limit_num": true
           },
           {
               "c_name": "Idiot",
               "c_num": 0,
               "limit_num": true
           },
           {
               "c_name": "guard",
               "c_num": 1,
               "limit_num": true
           }
            ]
        }

    },
    getters: {
      // ...
      getLangrenInfo: state => {
        return state
      },
      getPlayerInfo: state => {
        return state.player_info
      },
      getRoomInfo: state => {
        return state.roomInfo
      },
      getInfoKill: state => {
        return state.info_kill
      },
      getProcessStep: state => {
        return state.process_step
      }
    },
    mutations: {
      add:(state,idx) => {
        if (state.info_kill.characters[idx].c_num >= 1) {
            if (!state.info_kill.characters[idx].limit_num) {
                state.info_kill.characters[idx].c_num++;
            }
        } else {
            state.info_kill.characters[idx].c_num++;
        }
      },
      minus:(state,idx) => {
        if (state.info_kill.characters[idx].c_num > 0) {
            state.info_kill.characters[idx].c_num--;
        }
      },
      setRoomInfo:(state,room)=> {
        _.extend(state.roomInfo, room);
      },
      setPlayerInfo:(state,playerinfo)=> {
        _.extend(state.player_info, playerinfo);
      },
      changeProcessStep:(state,step)=> {
        state.process_step.killprocess_step = step;
      },
      changePoisonObj:(state,idx)=> {
        state.process_step.poisonObj = idx;
      },
      changeGuardObj:(state,idx)=> {
        state.process_step.guardObj = idx;
      },
      changeWolfObj:(state,idx)=> {
        state.process_step.wolfObj = idx;
      },
      changePredictorObj:(state,idx)=> {
        state.process_step.predictorObj = idx;
      }
    }
});


export default store
