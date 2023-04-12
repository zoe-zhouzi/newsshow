<template>
    <el-pagination
        v-show="newsTotal!=0"
        background
        :current-page="currentPage"
        @current-change="changePage($event)"
        :page-size="pageSize"
        :total="newsTotal"
        layout="prev, pager, next"
    >
    </el-pagination>
</template>

<script>
    export default {
        name: 'Pagination',
        props: ['pageSize', 'newsTotal'],
        data() {
            return {
                currentPage: 1,
            }
        },
        mounted() {
            this.changePage(this.currentPage);
            this.$bus.$on('sendCurrentPage', () => {
                this.currentPage = 1;
            });
        },
        beforeDestroy() {
            this.$bus.$off('sendCurrentPage');
        },
        methods: {
            // 点击不同的页码展示不同的数据
            changePage(currentPage) {
                this.currentPage = currentPage; 
                this.$emit('sendCurrentPage', currentPage);
            }
        }
    }
</script>

<style>

</style>