import defaultTagsList from '@/assets/static/defaultTagList'
import { Tag, RecordItem } from '@/custom'
import deepClone from '@/assets/lib/deepClone'
import dayjs from 'dayjs'
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const recordsListName = 'recordsList'
const tagsListName = 'tagsList'

export const store = new Vuex.Store({
  state: {
    defaultTagsList: defaultTagsList as Tag[],
    tagsList: [] as Tag[],
    recordsList: [] as RecordItem[],
    currentMonth:""
  },
  mutations: {
    fetchRecordsList(state) {
      if (window.localStorage.getItem(recordsListName)) {
        state.recordsList = JSON.parse(window.localStorage.getItem(recordsListName)!)
      } else {
        state.recordsList = []
      }
    },
    fetchTagsList(state) {
      if (window.localStorage.getItem(tagsListName)) {
        state.tagsList = JSON.parse(window.localStorage.getItem(tagsListName)!)
      } else {
        state.tagsList = defaultTagsList
      }
    },
    saveTagsList(state) {
      window.localStorage.setItem(tagsListName, JSON.stringify(state.tagsList))
      window.localStorage.setItem('_MaxId', JSON.stringify(state.tagsList[state.tagsList.length - 1].id))
    },
    saveRecordList(state) {
      store.commit('sortRecord')
      window.localStorage.setItem(recordsListName, JSON.stringify(state.recordsList))
    },
    pushRecord(state, newRecord: RecordItem) {
      const copyRecord = deepClone(newRecord)
      copyRecord.time = dayjs().format()
      state.recordsList.push(copyRecord)
      store.commit('saveRecordList', copyRecord)
    },
    sortRecord(state): void {//把记录按近期到历史排序
      state.recordsList.sort((a, b) => { return dayjs(b.time).valueOf() - dayjs(a.time).valueOf() })
    },
    updateCurrentMonth(state,currentMonth):void{
      state.currentMonth = currentMonth
    }
  },
  actions: {
  },
  modules: {
  }
})
