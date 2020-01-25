import Vue from 'vue';
import socket from '@/websocket';

let idIncrement = 0;

export default {
  namespaced: true,
  state: () => {
    const comments = [
      {
        id: idIncrement++,
        text: 'Тестовый коммент 1',
      },
      {
        id: idIncrement++,
        text: 'Это шедевр',
      },
      {
        id: idIncrement++,
        text: 'Это прекрасно',
      },
      {
        id: idIncrement++,
        text: 'Лучшее, что я видел',
      },
      {
        id: idIncrement++,
        text: 'Два чая этому автору',
      },
    ];

    return {
      comments: comments.reduce((comments, comment) => {
        comments[comment.id] = comment;
        return comments;
      }, {}),
      list: comments.map(comment => comment.id),
    }
  },
  actions: {
    createComment({commit}, text) {
      return socket.sendRequest()
        .then(() => {
          commit('createComment', {
            id: idIncrement++,
            text,
          });
        })
    },
    removeComment({commit}, id) {
      return socket.sendRequest()
        .then(() => {
          commit('removeComment', id);
        })
    },
  },
  mutations: {
    createComment (state, comment) {
      Vue.set(state.comments, comment.id, comment);
      state.list.unshift(comment.id);
    },
    removeComment (state, id) {
      const pos = state.list.indexOf(id);
      if (~pos) {
        delete state.comments[id];
        state.list.splice(pos, 1);
      }
    }
  },
  getters: {
    getComments (state) {
      return state.list.map(id => state.comments[id]);
    },
  },
}