import { defaultIncomeTagsList, defaultPayTagsList } from '@/assets/static/defaultTagList'
import { Tag, RecordItem } from '@/custom'
import deepClone from '@/assets/lib/deepClone'
import dayjs from 'dayjs'
import Vue from 'vue'
import Vuex from 'vuex'
import { createIncomeId, createPayId } from '@/assets/lib/idCreator'
Vue.use(Vuex)

const recordsListName = 'recordsList'
const payTagsListName = 'payTagsList'
const incomeTagsListName = 'incomeTagsList'

export const store = new Vuex.Store({
  state: {
    defaultPayTagsList: defaultPayTagsList as Tag[],
    defaultIncomeTagsList: defaultIncomeTagsList as Tag[],
    payTagsList: [] as Tag[],
    incomeTagsList: [] as Tag[],
    recordsList: [] as RecordItem[],
    currentMonth: new Date(),
    monthList: [] as RecordItem[],
    monthInOut: { income: 0, pay: 0 }
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
      if (window.localStorage.getItem(payTagsListName)) {
        state.payTagsList = JSON.parse(window.localStorage.getItem(payTagsListName)!)
      } else {
        state.payTagsList = defaultPayTagsList
      }
      if (window.localStorage.getItem(incomeTagsListName)) {
        state.incomeTagsList = JSON.parse(window.localStorage.getItem(incomeTagsListName)!)
      } else {
        state.incomeTagsList = defaultIncomeTagsList
      }
    },
    fetchMonthList(state) {
      state.monthList = state.recordsList.filter((record: RecordItem) => {
        return dayjs(record.time).format("YYYY-MM") === dayjs(state.currentMonth).format("YYYY-MM")
      })
    },
    fetchMonthInOut(state) {
      state.monthInOut = state.monthList.reduce(
        (result, item) => {
          if (item.inOut === "+") {
            result.income += item.amount;
          } else {
            result.pay += item.amount;
          }
          return result;
        },
        { income: 0, pay: 0 }
      );
    },
    addPayTag(state, newTag: Tag) {
      const describeArray = state.payTagsList.map(tag => tag.describe)
      if (describeArray.indexOf(newTag.describe) >= 0) {
        return window.alert("请勿重复创建标签")
      }
      const payId = createPayId()
      console.log(payId)
      newTag.id = payId
      state.payTagsList.push(newTag)
      store.commit("savePayTagsList")
    },
    addIncomeTag(state, newTag: Tag) {
      const describeArray = state.incomeTagsList.map(tag => tag.describe)
      if (describeArray.indexOf(newTag.describe) >= 0) {
        return window.alert("请勿重复创建标签")
      }
      const incomeId = createIncomeId()
      newTag.id = incomeId
      state.incomeTagsList.push(newTag)
      store.commit("saveIncomeTagsList")
    },
    savePayTagsList(state) {
      window.localStorage.setItem(payTagsListName, JSON.stringify(state.payTagsList))
      window.localStorage.setItem('_MaxPayId', JSON.stringify(state.payTagsList[state.payTagsList.length - 1].id))
    },
    saveIncomeTagsList(state) {
      window.localStorage.setItem(incomeTagsListName, JSON.stringify(state.incomeTagsList))
      window.localStorage.setItem('_MaxIncomeId', JSON.stringify(state.incomeTagsList[state.incomeTagsList.length - 1].id))
    },
    saveRecordList(state) {
      store.commit('sortRecord')
      window.localStorage.setItem(recordsListName, JSON.stringify(state.recordsList))
    },
    pushRecord(state, newRecord: RecordItem) {
      const copyRecord = deepClone(newRecord)
      state.recordsList.push(copyRecord)
      store.commit('saveRecordList', copyRecord)
    },
    sortRecord(state): void {//把记录按近期到历史排序
      state.recordsList.sort((a, b) => { return dayjs(b.time).valueOf() - dayjs(a.time).valueOf() })
    },
    updateCurrentMonth(state, currentMonth): void {
      state.currentMonth = currentMonth
    },
    updateInOut(state, inOut) {
      state.monthInOut = inOut
    }
  },
  actions: {
    fetchMonthList({commit}){
      commit('fetchMonthList')
    },
    async fetchMonthInOut({dispatch,commit}){
      await dispatch('fetchMonthList')
      commit('fetchMonthInOut')
    }
  },
  modules: {
  }
})
