import Vue from 'vue';
import Vuex from 'vuex';
import calculator from './calculator';
import comments from './comments';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    calculator,
    comments,
  }
})
