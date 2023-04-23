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
    .clearfix {
        clear: both;
    }
    .content-right {
        position: fixed;
        right: 0;
        top: 80px;
        width: 305px;
        display: flex;
        flex-direction: column;
    }
</style>