<template>
    <div class="content-right">
        <Calendar/>
        <Graph/>
    </div>
</template>

<script>
    import Calendar from './Calendar'
    import Graph from './Graph'
    export default {
        name: 'RightContent',
        components: {
            Calendar,
            Graph
        }
    }
</script>

<style>
    .content-right {
        position: relative;
        right: 10px;
        top: 0;
        float: right;
        z-index: 50;
        /* top: 30%; */
        /* left: 75%; */
        width: 370px;
        margin-right: 20px;
        /* margin-left: 100px; */
        margin-top: 80px;
    }
</style>