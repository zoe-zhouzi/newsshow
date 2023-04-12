<template>
    <div id="app">
        <router-view></router-view>
        <RightContent/>
    </div>
</template>

<script>
    import RightContent from '@/components/RightContent'

    export default {
        name: 'App',
        components: {
            RightContent, 
        }
    }
</script>

<style>
    /* 清除浏览器默认边距，
    使边框和内边距的值包含在元素的width和height内 */
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    .router-div {
        display: inline-block;
        margin:0 auto;
        height: 80px;
    }
    .router-btn {
         /* 去掉下划线 */
         text-decoration: none;
         margin-right: 0px;
    }
</style>
