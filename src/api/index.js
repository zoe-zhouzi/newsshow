// 对于axios进行二次封装
import axios from 'axios'

const requests = axios.create({

});
// 获取实时新闻数据
export const reqNewsList = (type, page, pageSize) => {
    return requests({method: 'get', url: `/api/get_data/${type}/${page}/${pageSize}`});
}
export const reqDataByType = (type) => requests({method: 'get', url: `/api/type_data/${type}`})
// 获取实时新闻的总条数
export const reqNewsTotal = (type) => requests({method: 'get', url: `/api/news_total/${type}`})
// 获取某个具体日期的新闻数据
export const reqNewsListByDate = (date, page, pageSize) => requests({method: 'get', url: `/api/get_date_by_date/${date}/${page}/${pageSize}`})
// 获取某个具体日期的新闻总条数
export const reqNewsTotalByDate = (date) => requests({method: 'get', url: `/api/get_total_by_date/${date}`})
// 获取最近一周爬取的数据
export const reqDayData = () => requests({method: 'get', url: '/api/get_day_data'});
// 在爬取最近一周的数据之前先更新一下数据库中的周数据，执行一下插入数据
export const reqUpdateDB = (date) => requests({method: 'get', url: `/api/update_db/${date}`})

export const reqInsertData = (date, total) => requests({method: 'get', url: `/api/insert_db/${date}/${total}`})