<template>
    <div class="real-time">
        <el-button class="el-buttons" @click="goTenNews">点击我进入动态滚动新闻</el-button>
        <el-button class="el-buttons" @click="goSohuSearch">点击我进入搜狐搜索页</el-button>
        <LeftNav @sendType="reiceiveType" />
        <div class="main">
            <div class="type">{{ type }}</div>
            <div class="dividing-line"></div>
            <!-- <button @click="getData">点击获取数据</button> -->
            <div class="news-list">
                <ul>
                <li v-for="news in newsList" :key="news.id">
                    <a :href="news.url">{{ news.title }}</a>
                    <span>{{ news.publish_time }}</span>
                </li>
            </ul>
            
            <Pagination @sendCurrentPage="recCurrentPage" :pageSize="pageSize" :newsTotal="newsTotal"/>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import LeftNav from './LeftNav'
    import Pagination from '@/components/Pagination'
    // import Graph from '@/components/Graph'
    export default {
        name: 'UpdatingNews',
        components: {
            LeftNav,
            Pagination,
            // Graph,
        },
        data() {
            return {
                // 每生成一次新的定时器时就要关闭旧的定时器，保证每次只有一个定时器
                timer: null,
                type: '全部',
                // 分页器需要用到的参数
                pageSize: 10,
                currentPage: 1
                // 当前页要显示的数据
                // newsPageList: []
            }
        },
        computed: {
            ...mapState(['newsList', 'newsTotal', 'dateNewsList']),
            dateNewsListLen() {
                return this.dateNewsList.length;
            }
            /* newsPageList() {
                console.log('要输出的',this.newsList.slice(0, 10))
                return this.newsList.slice((this.currentPage-1)*10, this.currentPage*10);
            }, */
        },
        mounted() {
            this.getData();
            clearInterval(this.timer);
            this.timer = null;
            this.setTimer();

            /* this.$bus.$on('sendDate', (selectedDate) => {
                console.log('我正在接收数据');
                this.getDataByDate(selectedDate);
            }); */
        },
        /* beforeDestroy() {
            this.$bus.$off('sendDate');
        }, */
        // 每次离开当前界面时，清除定时器
        destroyed() {
            clearInterval(this.timer)
            this.timer = null
        },
        methods:{
            // 进入搜狐搜索页面
            goSohuSearch() {
                this.$router.push('/sohusearch');
            },
            // 开启一个定时向后台请求数据的方法
            setTimer(){
                if(this.timer == null) {
                    // 每隔60秒向后台发送一次请求
                    this.timer = setInterval(()=>{
                        this.getData()
                    },30000)
                }
            },
            // 请求新闻数据的方法
            async getData() {               
                try {
                    await this.$store.dispatch('getTotal', this.type);
                    await this.$store.dispatch('getAllNews', {
                        type: this.type, 
                        page: this.currentPage, 
                        pageSize: this.pageSize
                    });
                    /* if(this.index == 0) {
                        // result = await reqNewsList();
                        console.log(Date.now(), this.currentPage,this.pageSize)
                        await this.$store.dispatch('getTotal', this.type);
                        await this.$store.dispatch('getAllNews', {
                            type: this.type, 
                            page: this.currentPage, 
                            pageSize: this.pageSize
                        });
                    } else {
                        console.log(this.type)
                        await this.$store.dispatch('getTypeNew', this.type);
                    } */
                } catch (error) {
                    // alert('获取数据失败');
                    console.log('获取数据失败');
                }
            },
            // 接收从LeftNav传递过来的参数
            async reiceiveType(type) {
                this.type = type;
                this.currentPage = 1;
                // this.$router.push(`/realtime/${type}`);
                this.getData();
            },
            // 接收来自分页子组件的当前页信息
            recCurrentPage(currentPage) {
                this.currentPage = currentPage;
            },
            // 获取某个具体日期的新闻
            /* async getDataByDate(selectedDate) {
                try {
                    await this.$store.dispatch('getDataByDate', selectedDate);
                } catch (error) {
                    console.log('获取某个具体日期新闻数据失败');
                }
            } */
            goTenNews() {
                console.log('goTenNews1')
                this.$router.push('/tennews');
                console.log('goTenNews2')
            }
        }, 
        watch: {
            currentPage: {
                handler(newValue) {
                    this.currentPage = newValue;
                    this.getData();
                }
            }
        }
    }
</script>

<style scoped lang="less">
    .real-time {
        position: relative;
        width: 1000px;
        margin: 0 auto;

    }

    /* 记录总数的样式 */
    .count {
        position: absolute;
        left: 850px;
        top: 600px;
        margin: 0 auto;
    }
    .main {
        /* 让一个盒子水平居中 margin: 0 auto;*/
        /* position: relative; */
        position: absolute;
        left: 120px;
        top: 80px;
        /* margin-top: 80px; */
        width: 1000px;
        height: 580px;
        // background-color: white;
        /* overflow: scroll; */
        /* overflow: auto; */
        padding-right: 50px;
        /* border: solid 1px gainsboro; */
    }
    .main .type {
        position: absolute;
        /* left: 100px; */
        font-size: 32px;
    }
    /* 这个能够让鼠标在新闻列表的时候显示滚动条，当鼠标移开时滚动条消失 */
    /* .main:not(:hover)::-webkit-scrollbar { 
        display: block;
    } */

    /* 隐藏滚动条 */
    .main::-webkit-scrollbar {
        display: none;
    }
    .main .news-list {
        top: 60px;
        position: absolute;
        
    }
    .dividing-line {
        height: 60px;
        border-bottom: 1px solid gainsboro;
        width: 730px;
    }
    ul {
        margin-top:  20px;
        // border-top: 1px solid gainsboro;
        padding-inline-start: 0px;
    }
    ul li {
        display: flex;
        /* 给li去掉默认的小圆点 */
        list-style-type: none;
        height: 50px;
        /* 设置了能让文字在li中垂直居中 */
        line-height: 50px;
        width: 800px;
        /* padding-right: 50px; */
        /* padding-left: 50px; */
        /* border-bottom: solid gainsboro 1px; */
    }
    ul li span {
        /* margin-left: auto; */
        margin-left: 10px;
        color: rgb(156, 154, 154);
        font-size: 10px;
        width:25%;
    }
    ul li a {
        color: #333;
        /* 去掉下划线 */
        text-decoration: none;
        margin-bottom: 4px;
        margin-top: 4px;
        padding-left: 10px;
        padding-right: 10px;
        width:75%;
        white-space: nowrap;
        overflow:hidden;
        /* 用于确定如何提示用户存在隐藏的溢出内容 ellipsis表示省略号*/
        text-overflow: ellipsis;
    }
    ul li a:hover {
        text-decoration: underline;
    }

</style>