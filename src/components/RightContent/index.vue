<template>
    <div class="content-right">
        <Calendar/>
        <Graph/>
    </div>
</template>

<script>
    import Calendar from '@/components/Calendar'
    import Graph from '@/components/Graph'
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
        float: right;
        /* top: 30%; */
        /* left: 75%; */
        width: 370px;
        margin-right: 20px;
        /* margin-left: 100px; */
        margin-top: 80px;
    }
</style>