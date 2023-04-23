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
        }
    }
</script>

<style scoped>
    .left-nav {
        width: 80px;
        background-color: gainsboro;
        position: absolute;
        top: 100px;       
    }
    .left-nav ul li {
        /* 让li标签没有默认的那个项目符 */
        list-style-type: none;
        height: 40px;
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
        display: block;
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