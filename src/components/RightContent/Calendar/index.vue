<template>
    <div class="calendar">
        <el-calendar 
            v-model="value" 
            >
            <!-- @click.native="changeDate($event)" -->
            <template
                slot="dateCell"
                slot-scope="{data}">
                <div>
                    <!-- <div class="calendar-day">{{ data.day.split('-').slice(2).join('-') }}</div> -->
                    <div class="calendar-day">{{ Number(data.day.split('-').slice(2)[0]) }}</div>
                </div>
            </template>
        </el-calendar>
    </div>
</template>

<script>
    export default {
        name: 'Calendar',
        data() {
            return {
                value: new Date(),
            }
        },
        watch:{
            value: {
                handler(newValue) {
                    // console.log('我这里接收到了newValue',newValue)
                    var year = this.value.getFullYear();
                    var month = this.value.getMonth() + 1;
                    var date = this.value.getDate();
                    if (date >= 1 && date <= 9) {
                        date = "0" + date;
                    }
                    if (month >= 1 && month <= 9) {
                        month = "0" + month;
                    }
                    // console.log(year + '-' + month + '-' + date)
                    this.sendDateToUpdatingNews(year + '-' + month + '-' + date)
                }
            }
        },
        methods: {
            sendDateToUpdatingNews(selectedDate){
                /* console.log('执行了1')
                this.$bus.$emit('sendDate', selectedDate);
                console.log('执行了2') */
                /* this.$router.push({
                    name: "passednews",
                    params: { date: selectedDate },
                }); */
                this.$router.push(`/passednews/${selectedDate}`)
            },
        }
    }
</script>

<style>
    .calendar {
        height: 310px;
    }
    .el-calendar-table th {
        font-size: 14px;
    }
    
</style>