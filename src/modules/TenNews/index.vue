<template>
    <div class="ten-news">
        <!-- <dynamic-marquee :repeat="repeat" :hoverPause="hoverPause" :repeatMargin="repeatMargin">
            <div class="item">item2</div>
            <div class="item">item3</div>
            <div class="item">item4</div>
            <div class="item">item5</div>
            <div class="item">item1</div>
            <div class="item">item6</div>
            <div class="item">item7</div>
            <div class="item">item8</div>
            <div class="item">item9</div>
            <div class="item">item10</div>
        </dynamic-marquee> -->
        <vue-seamless-scroll :data="CardPartsStatisticsList" class="seamless-warp" :class-option="classOption">
            <div class="item" v-for="(item,index) in CardPartsStatisticsList" :key="index">{{ item }}</div>
        </vue-seamless-scroll>
    </div>
</template>

<script>
    // import DynamicMarquee from 'vue-dynamic-marquee';
    import vueSeamlessScroll from 'vue-seamless-scroll';
    export default {
        name: "TenNews",
        components: {
            // DynamicMarquee,
            vueSeamlessScroll
        },
        data() {
            return {
                repeat: true,
                hoverPause: false,
                repeatMargin: 0,

                CardPartsStatisticsList: ['item1','item2','item3','item4','item5','item6','item7','item8',]
            }
        }
    }
</script>

<style scoped>
    .ten-news {
        width: 600px;
        height: 800px;
        margin: 50px auto;
    }
    .item {
        /* width: 600px; */
        height: 80px;
        background-color: skyblue;
    }
</style>