<template>
  <div class="passNews">
    <div class="main">
      <div class="router-div">
          <el-button class="el-buttons" @click="goRealtime">点击我进入实时新闻</el-button>
          <!-- <router-link to="/realtime" class="router-btn">点击我进入实时新闻</router-link> -->
        </div>
      <div class="title">
        全部（时间：{{ nowDate }} 数据总数：{{ dateNewsTotal }}）
      </div>
      <div class="dividing-line"></div>
      <div class="news-list">
        <ul>
          <li v-for="news in dateNewsList" :key="news.id">
            <a :href="news.url">{{ news.title }}</a>
            <span>{{ news.publish_time }}</span>
          </li>
        </ul>
        <Pagination
          @sendCurrentPage="recCurrentPage"
          :pageSize="pageSize"
          :newsTotal="dateNewsTotal"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Pagination from "@/components/Pagination";
export default {
  name: "PassedNews",
  components: {
    Pagination,
  },
  mounted() {
    // 得到calendar选中的日期
   /*  this.$bus.$on("sendDate", (selectedDate) => {
      console.log("执行了3");
      console.log("我这里收到了选中的日期", selectedDate);
    }); */
    this.nowDate = this.$route.params.date;
    this.getDataByDate();
  },
  data() {
    return {
      // 在日历上选中的日期
      nowDate: "",
      pageSize: 10,
      newsTotal: 230,
      currentPage: 1,
    };
  },
  computed: {
    ...mapState(["dateNewsList", "dateNewsTotal"]),
  },
  beforeDestroy() {
    this.$bus.$off("sendDate");
  },
  methods: {
    async getDataByDate() {
      try {
        // console.log("PassedNews：",this.nowDate,this.currentPage,this.pageSize);
        this.$store.dispatch("getTotalByDate", this.nowDate);
        await this.$store.dispatch("getDataByDate", {
          date: this.nowDate,
          page: this.currentPage,
          pageSize: this.pageSize,
        });
      } catch (error) {
        console.log("获取某个具体日期新闻数据失败");
      }
    },
    recCurrentPage(currentPage) {
      this.currentPage = currentPage;
    },
    goRealtime() {
      this.$router.push('/realtime');
    }
  },
  watch: {
    currentPage: {
      handler(newValue) {
        this.currentPage = newValue;
        this.getDataByDate();
      },
    },
    $route: {
      // 监听相同路由下参数变化的时候，从而实现异步刷新
      handler() {
        this.nowDate = this.$route.params.date;
        this.getDataByDate();
      }
    }
  },
};
</script>

<style scoped>
    .passNews {
        position: relative;
        width: 1000px;
        /* background-color: white; */
        margin: 0 auto;
    }
    .main {
        position: absolute;
        left: 120px;
        /* 没加实时新闻 */
        /* top: 80px; */
        top: 60px;
        width: 1000px;
        height: 580px;
        padding-right: 50px;
    }
    .title {
        position: absolute;
        /* left: 100px; */
        font-size: 32px;
    }
    .dividing-line {
        height: 60px;
        border-bottom: 1px solid gainsboro;
        width: 730px;
    }
    ul {
        margin-top: 20px;
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
        width: 25%;
    }
    ul li a {
        color: #333;
        /* 去掉下划线 */
        text-decoration: none;
        margin-bottom: 4px;
        margin-top: 4px;
        padding-left: 10px;
        padding-right: 10px;
        width: 75%;
        white-space: nowrap;
        overflow: hidden;
        /* 用于确定如何提示用户存在隐藏的溢出内容 ellipsis表示省略号*/
        text-overflow: ellipsis;
    }
    ul li a:hover {
        text-decoration: underline;
    }
    
    .el-buttons {
      color: #CD131C;
      border-color: #CD131C !important;
    }
  /*按钮悬浮*/
  .el-buttons:hover {
    background: #CD131C!important;
    color: white !important;
    font-weight: bold;
    border-color: #CD131C !important;
  }
  /*按钮点击*/
  .el-buttons:focus {
    background: #CD131C !important;
    color: white !important;
    font-weight: bold;
 
    border-color: #CD131C !important;
  }

</style>