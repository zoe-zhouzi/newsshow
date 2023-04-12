<template>
    <div class="left-nav">
         <ul>
            <li v-for="(type,index) in typeList" :key="index">
                <a :class="{active: index==isActive}" @click="switchType($event, index)">{{ type }}
                </a>
            </li>
         </ul>
    </div>
</template>

<script>
    // 这是leftNav如果和UpdataingNews作为同级目录时
    // import {reqNewsList, reqDataByType} from '@/api'
    export default {
        name: 'LeftNav',
        data() {
            return {
                typeList: ['全部', '时政', '东西问', '国际', '社会', '财经', '大湾区', '华人', '文娱', '体育', '健康·生活', '图片', '视频'],
                isActive: 0,
            }
        },
        methods: {
            switchType(e, index) {
                this.isActive = index;
                this.$emit('sendType', e.target.innerText);
                // 每次切换到一个新的type时，页码要重新变为1,所以这里要通知分页器改变当前页码
                this.$bus.$emit('sendCurrentPage');
            }
            // 这是leftNav如果和UpdataingNews作为同级目录时
            /* async switchType(e, index) {
                this.isActive = index;
                let result;
                if(index == 0) {
                    result = await reqNewsList(e.target.innerText);
                } else {
                    result = await reqDataByType(e.target.innerText);
                }
                console.log(result);
                if(result.status == 200) {
                    this.$bus.$emit('newsListByType', result.data)
                    console.log(result);
                } else {
                    alert('获取数据失败');
                }
            } */
        }
    }
</script>

<style scoped>
    .left-nav {
        width: 80px;
        /* height: 460px; */
        background-color: gainsboro;
        position: absolute;
        /* left: 100px; */
        top: 100px;
        /* position: relative; */
        /* position: fixed; */
        /* 如果不设置就无法点击那些盒子，是为啥呢 */
        /* z-index: 11; */
        /* float: left; */
        /* left: 10%; */
        /* top: 10%; */
        
    }
    .left-nav ul {
        position: absolute;
        padding-inline-start: 0px;
        justify-content: center;
        /* flex-direction:column; */
        /* float: left; */
    }
    ul li {
        /* 让li标签没有默认的那个项目符 */
        list-style-type: none;
        height: 40px;
        /* 当高度为40px的时候，行高也设置为40px就能使li中文本竖直居中 */
        line-height: 40px;
        text-align: center;
        border: 1px solid #fff ;
        background-color: #f6f6f6;
    }
    ul li a {
        color: black;
        /* 去掉下划线 */
        text-decoration: none;
        color: #333;
        font-size: 15px;

        /* display: flex; */
        display: block;
        justify-content: center;
        /* align-items: center; */
    }
    ul li a:hover {
        background: #cd131c;
        color: white;
    }
    .active {
        background: #cd131c;
        color: white;
    }
    
</style>