<template>
    <div class="container">
        <!-- 上传excel的区域 -->
        <div>
            <input ref="excel-upload-input" class="excel-upload-input" type="file" accept=".xlsx, .xls" @change="handleClick">
            <div class="drop" @drop="handleDrop" @dragover="handleDragover" @dragenter="handleDragover">
                Drop excel file here or
                <el-button :loading="loading" style="margin-left:16px;" size="mini" type="primary" @click="handleUpload">
                    Browse
                </el-button>
            </div>
        </div>
    </div>
</template>

<script>
    import XLSX from 'xlsx'
    export default {
        name: 'UploadExcel',
        props: {
            beforeUpload: Function, // eslint-disable-line
            onSuccess: Function// eslint-disable-line
        },
        data() {
            return {
                loading: false, // loading用来记录是否在爬取数据
                excelData: {
                    header: null,
                    results: null
                },
            }
        },
        methods: {
            generateData({ header, results }) {
                this.excelData.header = header
                this.excelData.results = results
                this.onSuccess && this.onSuccess(this.excelData)
            },
            handleDrop(e) {
                e.stopPropagation()
                e.preventDefault()
                if (this.loading) return
                const files = e.dataTransfer.files
                if (files.length !== 1) {
                    this.$message.error('Only support uploading one file!')
                    return
                }
                const rawFile = files[0] // only use files[0]
                if (!this.isExcel(rawFile)) {
                    this.$message.error('Only supports upload .xlsx, .xls, .csv suffix files')
                    return false
                }
                this.upload(rawFile)
                e.stopPropagation()
                e.preventDefault()
            },
            handleDragover(e) {
                e.stopPropagation()
                e.preventDefault()
                e.dataTransfer.dropEffect = 'copy'
            },
            handleUpload() {
                this.$refs['excel-upload-input'].click()
            },
            handleClick(e) {
                const files = e.target.files
                const rawFile = files[0] // only use files[0]
                if (!rawFile) return
                this.upload(rawFile)
            },
            upload(rawFile) {
                this.$refs['excel-upload-input'].value = null // fix can't select the same excel
                if (!this.beforeUpload) {
                    this.readerData(rawFile)
                    return
                }
                const before = this.beforeUpload(rawFile)
                if (before) {
                    this.readerData(rawFile)
                }
            },
            readerData(rawFile) {
                this.loading = true
                return new Promise((resolve, reject) => {
                    const reader = new FileReader()
                    // FileReader.onload 处理load事件，该事件在读取操作完成时触发
                    reader.onload = e => {
                        // e.target.result 是这个格式 ArrayBuffer 的数据
                        const data = e.target.result
                        // 读取excel，返回一个workbook对象，其中type的值有
                        // base64: 以 base64 方式读取
                        // binary: BinaryString 格式（byte n is data.charCodeAt(n)）
                        // string: UTF8编码的字符串
                        // buffer: nodejs Buffer
                        // array: Uint8Array,8位无符号数组
                        // file: 文件的路径（仅nodejs下支持）
                        const workbook = XLSX.read(data, { type: 'array' })
                        // 读取excel中的第一个工作簿名字
                        const firstSheetName = workbook.SheetNames[0]
                        const worksheet = workbook.Sheets[firstSheetName]
                        // 读取工作簿的头部
                        const header = this.getHeaderRow(worksheet)
                        // 读取了工作簿的数据，是数组类型，每一个元素是一个对象类型，键是头部名字，值是头部对应每行列的值
                        const results = XLSX.utils.sheet_to_json(worksheet)
                        this.generateData({ header, results })
                        this.loading = false
                        resolve()
                    }
                    reader.readAsArrayBuffer(rawFile)
                })
            },
            getHeaderRow(sheet) {
                const headers = []
                const range = XLSX.utils.decode_range(sheet['!ref'])
                let C
                const R = range.s.r
                /* start in the first row */
                for (C = range.s.c; C <= range.e.c; ++C) { /* walk every column in the range */
                    const cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })]
                    /* find the cell in the first row */
                    let hdr = 'UNKNOWN ' + C // <-- replace with your desired default
                    if (cell && cell.t) hdr = XLSX.utils.format_cell(cell)
                    headers.push(hdr)
                }
                return headers
            },
            isExcel(file) {
                return /\.(xlsx|xls|csv)$/.test(file.name)
            }
        }
    }
</script>

<style>
    .excel-upload-input{
        display: none;
        z-index: -9999;
    }
    .drop{
        border: 2px dashed #bbb;
        width: 600px;
        height: 160px;
        line-height: 160px;
        margin: 0 auto;
        font-size: 24px;
        border-radius: 5px;
        text-align: center;
        color: #bbb;
        position: relative;
    }
</style>