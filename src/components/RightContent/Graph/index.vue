<template>
  <div class="mychart">
    <div ref="weekData" class="weekChart" style="width: 305px; height: 250px"></div>
    <!-- <el-button class="btn1" type="primary" @click="updateSQL" round></el-button> -->
    <button class="btn1" @click="updateSQL">更新</button>
  </div>
</template>

<script>
  import { mapState } from "vuex";
  import * as echarts from "echarts";
  export default {
    name: "Graph",
    data() {
      return {
        xData: ["0320", "0321", "0322", "0323", "0324", "0325", "0326"],
        yData: [10, 52, 200, 334, 390, 330, 220],
      };
    },
    computed: {
      ...mapState(["weekNum", "weekDate"]),
    },
    created() {
      this.getScrapyNum();
    },
    methods: {
      intitEcharts() {
        // console.log('重新挂载')
        // 指定图表的配置项和数据
        const option = {
          color: ['#4499ED'],
          notMerge: false,
          title: {
            text: "最近一周日爬取量",
            // 让title居中
            left: "center",
            // padding: [0,0,0,0],
            textStyle: {
              fontSize: 13,
            },
          },
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow",
            },
          },
          grid: {
            // left: '3%',
            // right: '4%',
            bottom: "3%",
            containLabel: true,
            // grid 组件离容器右侧的距离。如果不设置40，会导致x轴的标题溢出
            right: 38,
          },
          xAxis: [
            {
              name: "日期",
              // name: "日/n期", // x轴name能够换行
              nameGap: 1,  // x轴name与横坐标轴线的间距
              type: "category",
              // 这个是让name显示在x轴的啥位置，有三个值，start middle end
              nameLocation: 'end',
              // 动态生成
              data: this.weekDate,
              axisTick: {
                alignWithLabel: true,
              },
              axisLabel: {
                // 设置坐标轴刻度标签的显示间隔，可以设置成 0 强制显示所有标签，仅在类目轴中有效。
                // 横轴信息全部显示
                interval: 0,
                // rotate: 45 // 倾斜显示
                // 字体大小和颜色修改
                textStyle: {
                  fontFamily: 'Microsoft YaHei',
                  fontSize: 11,
                  color: '#000'
                }
              },
            },
          ],
          yAxis: [
            {
              name: "数量/条",
              nameGap: 10,  // x轴name与横坐标轴线的间距
              type: "value",
              axisLabel: {
                // 设置坐标轴刻度标签的显示间隔，可以设置成 0 强制显示所有标签，仅在类目轴中有效。
                // 横轴信息全部显示
                interval: 0,
                // rotate: 45 // 倾斜显示
                // 字体大小和颜色修改
                textStyle: {
                  fontFamily: 'Microsoft YaHei',
                  fontSize: 11,
                  color: '#000'
                }
              },
            },
          ],
          series: [
            {
              name: "Direct",
              type: "bar",
              // 每个柱形的宽度
              barWidth: "70%",
              // barWidth: '20',
              // 动态生成
              data: this.weekNum,
              // 让柱状图每个柱形上显示对应的纵坐标
              itemStyle: {
                normal: {
                  label: {
                    show: true,
                    position: "top",
                    textStyle: {
                      color: "black",
                      fontSize: 11,
                    },
                  },
                },
              },
              // 柱形与柱形之间的宽度
              // barGap: "0%", // 两个柱子之间的距离相对于柱条宽度的百分比;
              // barCategoryGap: "0%" // 每侧空余的距离相对于柱条宽度的百分比
            },
          ],
        };
        const myChart = echarts.init(this.$refs.weekData);
        myChart.setOption(option);
        // 随着屏幕大小调整图表
        window.addEventListener("resize", () => {
          myChart.resize();
        });
      },
      async getScrapyNum() {
        try {
          // let date = this.getNowDate();
          // await this.$store.dispatch('updateWeekData', date)
          await this.$store.dispatch("getWeekNum");
          this.intitEcharts();
        } catch (error) {
          console.log("Graph组件：获取每周数据失败");
        }
      },
      getNowDate() {
        let t = new Date();
        let y = t.getFullYear();
        let m = t.getMonth() + 1;
        m = m < 10 ? "0" + m : "" + m;
        let d = t.getDate();
        d = d < 10 ? "0" + d : "" + d;
        return y + "-" + m + "-" + d;
      },
      updateSQL() {
        this.$store.dispatch('updateWeekData', this.getNowDate());
      }
    },
    mounted() {
      this.updateSQL();
    }
  };
</script>

<style>
    .mychart {
        display: flex;/*  */
        flex-direction: column;
        align-items: flex-end;
    }
    .weekChart {
        margin-right: 0px !important;
    }
    .mychart .btn1 {
        width: 50px;
        height: 30px;
        background-color: #409EFF;
        border: #ccc;
        border-radius: 10px;
        color: white;
        transform: translateX(-100%);
    }
</style>