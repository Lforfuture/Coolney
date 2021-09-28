import defaultTagsList from '@/assets/static/defaultTagList'
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    defaultTagsList: defaultTagsList as Tag[],
    tagsList: [] as Tag[]
  },
  mutations: {
    fetchTagsList(state) {
      if(window.localStorage.getItem('tagsList')){
      state.tagsList = JSON.parse(window.localStorage.getItem('tagsList')!)
      }else{
        state.tagsList = defaultTagsList
      }
    },
    saveTagsList(state) {
      window.localStorage.setItem('tagsList', JSON.stringify(state.tagsList))
      window.localStorage.setItem('_MaxId', JSON.stringify(state.tagsList[state.tagsList.length - 1].id))
    }
  },
  actions: {
  },
  modules: {
  }
})
