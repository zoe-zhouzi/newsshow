<template>
    <div class="batch-search">
        <upload-excel-component :on-success="handleSuccess" :before-upload="beforeUpload" />
         <!-- 展示excel的区域 -->
         <div class="result">
            <!-- 使用table，要不要把table熟悉一下再写 -->
            <table border="1">
                <thead>
                    <tr>
                        <th v-for="(colName, index) in excelHeader" :key="index">{{ colName }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index1) in excelData" :key="index1">
                        <td v-for="(obj, index2) in item" :key="index2">{{ obj }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    import UploadExcelComponent from '@/components/UploadExcel/index.vue'
    export default {
        components: { UploadExcelComponent },
        data() {
            return {
                excelHeader: [],
                excelData: []
            }
        },
        methods: {
            beforeUpload(file) {
                const isLt1M = file.size / 1024 / 1024 < 1  // 判断传入的数据是否在1M以内  返回布尔值
                if (isLt1M) {
                    return true
                }
                // 消息弹框
                this.$message({
                    message: '文件大于1M 请重新上传',
                    type: 'warning'
                })
                return false
            }, // 你可以在上传之前做一些自己的特殊判断，如判断文件的大小是否大于 1 兆？若大于 1 兆则停止解析并提示错误信息。
            handleSuccess({ results, header }) {
                console.log('results', results)
                console.log('header', header)
                this.excelHeader = header
                this.excelData = results
            }// 解析成功时候会触发的回调函数，它会返回表格的表头和内容。
        }
    }

</script>

<style>
    .result {
        margin-top: 80px;
    }
    .result table {
        width: 90%;
        margin: 50px auto;
        border: limegreen;
        border-collapse: collapse;
        font-size: 12px;
        table-layout: fixed;
        text-align: center;
    }
</style>