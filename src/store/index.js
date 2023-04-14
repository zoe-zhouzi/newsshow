import Vue from 'vue'
import Vuex from 'vuex'

import {reqNewsList, reqDataByType, reqNewsTotal, reqNewsListByDate, reqNewsTotalByDate, reqDayData, reqUpdateDB, reqInsertData, reqSohuSearch} from '@/api'

Vue.use(Vuex);


const actions = {
    async getTotal({commit}, type) {
        let result = await reqNewsTotal(type);
        // console.log(result);
        if(result.status == 200) {
            commit('GET_TOTAL', result.data[0].total)
        } else {
            console.log('getTotal状态码非200', result);
        }
    },
    async getAllNews({commit}, {type, page, pageSize}) {
        let result = await reqNewsList(type, page, pageSize);
        // console.log(result)
        if(result.status == 200) {
            commit('GET_NEWS_LIST', result.data)
            return 'ok'
        } else {
            console.log('getAllNews状态码非200', result);
        }
    },
    async getTypeNew({commit}, type) {
        let result = await reqDataByType(type);
        // console.log(result);
        if(result.status == 200) {
            commit('GET_TYPE_NEWS', result.data);
        } else {
            console.log('getTypeNew状态码非200', result);
        }
        
    },
    // 请求某个具体日期的数据
    async getDataByDate({commit}, {date,page,pageSize}) {
        let result = await reqNewsListByDate(date, page, pageSize);
        // console.log(result)
        if(result.status == 200) {
            commit('GET_DATE_DATA', result.data);
        } else {
            console.log('getDataByDate状态码非200', result);
        }
        // console.log('日期请求接口结果', result);
    },
    // 获取某个具体日期的总数
    async getTotalByDate({commit}, date) {
        let result = await reqNewsTotalByDate(date);
        // console.log('日期请求总数接口结果', result);
        if(result.status == 200) {
            commit("GET_DATE_TOTAL", result.data[0].total)
        }else {
            console.log(' getTotalByDate状态码非200', result);
        }
    },
    // 获取统计图需要的数据
    async getWeekNum({commit}) {
        let result = await reqDayData();
        // console.log(new Date(), result);
        if(result.status == 200) {
            commit('GET_WEEK_NUM', result.data)
        }else {
            console.log('状态码非200', result);
        }
    },
    // 更新一下周数据，没有需要接收的返回结果
    async updateWeekData(context, date) {
        console.log(11111)
        let result = await reqUpdateDB(date);
        if(result.status == 200) {
            await context.dispatch('insertTodayNum', {
                date:date,
                total:result.data[0].total})
        }else {
            console.log('updateWeekData状态码非200', result);
        }
    },
    async insertTodayNum({commit}, {date, total}) {
        console.log('进来插入数据的actions了')
        let result = await reqInsertData(date, total);
        if(result.status == 200) {
            return 'ok';
        }else {
            console.log('insertTodayNum 状态码非200', result);
        }
    },
    async getSohuSearch({commit}, url) {
        let data = {'url': url}
        let result = await reqSohuSearch(data);
        if(result.status == 200) {
            commit('GET_SOHU_RESULT', result.data);
        }
    }
}
const mutations = {
    GET_NEWS_LIST(state, newsList) {
        state.newsList = newsList;
    },
    GET_TYPE_NEWS(state, typeList) {
        state.newsList = typeList;
    }, 
    GET_TOTAL(state, total) {
        state.newsTotal = total
    },
    GET_DATE_DATA(state, dateNewsList) {
        state.dateNewsList = dateNewsList;
    },
    GET_DATE_TOTAL(state, dateNewsTotal) {
        state.dateNewsTotal = dateNewsTotal;
    },
    GET_WEEK_NUM(state, weekNum) {
        state.weekNum = weekNum.map(v => {return v.number}).reverse();
        state.weekDate = weekNum.map(v => {return v.id.slice(5).replace('-','')}).reverse();
    },
    GET_SOHU_RESULT(state, searchResult) {
        state.searchResult = searchResult;
    }
}
const state = {
    newsList: [], // 全部的新闻数据
    newsTotal: 0,
    dateNewsList: [],
    dateNewsTotal: 0,
    weekNum: [],
    weekDate: [],
    searchResult: {}
}
const getters = {
    sourceArticle(state) {
        return state.searchResult.source_article || {};
    },
    articleList(state) {
        return state.searchResult.article_list || [];
    }
}

export default new Vuex.Store({
    actions,
    mutations,
    state,
    getters
})
