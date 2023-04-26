<template>
    <div class="sohu-search">
        <!-- 搜索框 -->
        <div class="page-header">
            <div class="search-box">
                <div class="search-box2">
                    <div class="media-type">
                        <div class="selected">
                            <div class="media-name">{{ mediaName[0].name }}</div>
                            <div>
                                <svg @click="unfoldMediaSelect" v-show="isShowMedia" t="1681371297255" class="icon" viewBox="0 0 1792 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1804" width="200" height="200"><path d="M0 1024h1792L896 0z" fill="#979CA4" p-id="1805"></path></svg>
                                <svg @click="unfoldMediaSelect" v-show="!isShowMedia" t="1681372143414" class="icon" viewBox="0 0 1778 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1950" width="200" height="200"><path d="M0 0h1776.015857L888.007929 1024z" fill="#979CA4" p-id="1951"></path></svg>
                            </div>
                        </div>
                        <ul class="select" v-show="isShowMedia">
                            <li 
                                v-for="media in mediaSelectList" 
                                :key="media.id"
                                @click="changeSelectedMedia(media.id)"
                            >{{ media.name }}</li>
                        </ul>
                    </div>
                    <div class="search-item">
                        <input 
                            class="search-input" 
                            type="text" 
                            placeholder="请输入要搜索的url"
                            @focus="focusHandler"
                            @input="inputHandler"
                            v-model="keyword"
                            ref = "input"
                        >
                        <div class="clear" v-show="isShowClear">
                            <svg @click="clearInput" t="1681299983484" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1603" width="200" height="200"><path d="M542.173333 512l347.58-347.58a21.333333 21.333333 0 1 0-30.173333-30.173333L512 481.826667 164.42 134.246667a21.333333 21.333333 0 0 0-30.173333 30.173333L481.826667 512l-347.58 347.58a21.333333 21.333333 0 0 0 30.173333 30.173333L512 542.173333l347.58 347.58a21.333333 21.333333 0 0 0 30.173333-30.173333z" fill="#bfbfbf" p-id="1604"></path></svg>
                        </div>
                    </div>
                    <div class="search-button">
                        <svg @click="goSearch" t="1681300918040" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2172" width="200" height="200"><path d="M966.4 924.8l-230.4-227.2c60.8-67.2 96-156.8 96-256 0-217.6-176-390.4-390.4-390.4-217.6 0-390.4 176-390.4 390.4 0 217.6 176 390.4 390.4 390.4 99.2 0 188.8-35.2 256-96l230.4 227.2c9.6 9.6 28.8 9.6 38.4 0C979.2 950.4 979.2 934.4 966.4 924.8zM102.4 441.6c0-185.6 150.4-339.2 339.2-339.2s339.2 150.4 339.2 339.2c0 89.6-35.2 172.8-92.8 233.6-3.2 0-3.2 3.2-6.4 3.2-3.2 3.2-3.2 3.2-3.2 6.4-60.8 57.6-144 92.8-233.6 92.8C256 780.8 102.4 627.2 102.4 441.6z" fill="#bfbfbf" p-id="2173"></path></svg>
                    </div>
                </div>
            </div>
        </div>
        <!-- 搜索结果内容 -->
        <div class="page-content" v-if="searchResult">
            <div class="author">
                <h1>作者：{{ searchResult.author }}</h1>
            </div>
            <div class="source">
                <div class="source-title">
                    <h1>原文内容</h1>
                    <svg @click="sourceFold" v-show="isShowSource" t="1681371297255" class="icon" viewBox="0 0 1792 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1804" width="200" height="200"><path d="M0 1024h1792L896 0z" fill="#979CA4" p-id="1805"></path></svg>
                    <svg @click="sourceFold" v-show="!isShowSource" t="1681372143414" class="icon" viewBox="0 0 1778 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1950" width="200" height="200"><path d="M0 0h1776.015857L888.007929 1024z" fill="#979CA4" p-id="1951"></path></svg>
                </div>
                <div class="origin-article" v-show="isShowSource">
                    <div class="title">{{ sourceArticle.title }}</div>
                    <div class="pub-time">{{ sourceArticle.publish_time }}</div>
                    <div class="text">
                        {{ sourceArticle.text }}
                    </div>
                </div>
            </div>
            <div class="article-list">
                <div class="list-title">
                    <h1>文章列表</h1>
                    <svg @click="listFold" v-show="isShowList" t="1681371297255" class="icon" viewBox="0 0 1792 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1804" width="200" height="200"><path d="M0 1024h1792L896 0z" fill="#979CA4" p-id="1805"></path></svg>
                    <svg @click="listFold" v-show="!isShowList" t="1681372143414" class="icon" viewBox="0 0 1778 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1950" width="200" height="200"><path d="M0 0h1776.015857L888.007929 1024z" fill="#979CA4" p-id="1951"></path></svg>
                </div>
                <div v-show="isShowList">
                    <div class="origin-article" v-for="(article,index) in articleList" :key="index" >
                        <div class="title">{{ article.title }}</div>
                        <div class="pub-time">{{ article.publish_time }}</div>
                        <div class="text">
                            {{ article.text }}
                        </div>
                        <a href="sourceArticle.url">{{ sourceArticle.url }}</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import debounce from 'lodash/debounce'
    import { mapState, mapGetters } from 'vuex';
    // import throttle from 'lodash/throttle';
    export default {
        name: 'SohuSearch',
        data() {
            return {
                keyword: '',
                // 用来标识是否显示输入框的清除图标的
                isShowClear: false,
                // 用来标识是否显示原文内容
                isShowSource: false,
                // 用来标识是否显示最近文章列表
                isShowList: false,
                // 用来标识媒体类型的下拉框
                isShowMedia: false,
                // isShowMedia: true,
                mediaTypeList: [
                    {id:1, name: '搜狐', isSelected: true,},
                    {id:2, name: '百家号', isSelected: false,},
                    {id:3, name: '头条', isSelected: false,},
                    {id:4, name: '网易', isSelected: false,},
                    {id:5, name: 'bilibili', isSelected: false,},
                    {id:6, name: '微博', isSelected: false,},
                    {id:7, name: '快手', isSelected: false,},
                    {id:8, name: '微信', isSelected: false,},

                ],
            }
        },
        computed: {
            ...mapState(["searchResult", "isUpdate"]),
            ...mapGetters(["sourceArticle", "articleList"]),
            mediaName() {
                return this.mediaTypeList.filter(item => item.isSelected === true)
            },
            mediaSelectList() {
                return this.mediaTypeList.filter(item => item.isSelected === false)
            },
        },
        methods: {
            focusHandler() {
                if(this.keyword != '') {
                    this.isShowClear = true;
                }
            },
            clearInput() {
                this.keyword = '';
                this.isShowClear = false;
                this.$refs.input.focus();
            },
            // 用户在输出一个字显示历史记录的时候
            // 这里用这个，难受的是有延迟，没有延迟的话就触发好多次keydown
            // 需要改进，要做到像谷歌那样，即使输入是在打字软件上也要显示x，我的清除按钮显示太慢了
            inputHandler:debounce(function() {
                console.log(11)
                if(this.keyword === '') {
                    this.isShowClear = false;
                } else {
                    this.isShowClear = true;
                }
            }, 200),
            // 节流
            // inputHandler:throttle(function() {
            //     console.log(11)
            //     if(this.keyword === '') {
            //         this.isShowClear = false;
            //     } else {
            //         this.isShowClear = true;
            //     }
            // }, 2000),
            async goSearch() {
                let data = {url:this.keyword, type:this.mediaName[0]['name']}
                if(data.type == '头条' || data.type == '百家号') {
                    // this.getData('getToutiao', data);
                    this.getData('getSohuSearch', data)
                    let timer = setInterval(() => {
                        // Object.keys(this.sourceArticle).length == 0
                        if(!this.isUpdate) {
                            console.log('发送了一次又一次');
                            // this.getData('getToutiao', data);
                            this.getData('getSohuSearch', data);
                        } else {
                            console.log('终于有数据了');
                            clearInterval(timer);
                        }
                    }, 60 * 1000)
                } else {
                    this.getData('getSohuSearch', data)
                }
                this.isShowMedia = false;
            },
            async getData(actionName, data) {
                try {
                    await this.$store.dispatch(actionName, data);
                } catch (error) {
                    console.log('搜索发生了错误', error)
                }
            },
            sourceFold() {
                this.isShowSource = !this.isShowSource;
            },
            listFold() {
                this.isShowList = !this.isShowList;
            },
            unfoldMediaSelect() {
                this.isShowMedia = !this.isShowMedia
            },
            changeSelectedMedia(id) {
                this.mediaTypeList.forEach(item=>{
                    if(item.id == id) {
                        item.isSelected = true;
                    } else {
                        item.isSelected = false;
                    }
                })
                this.isShowMedia = false;
            },
        },
    }
</script>

<style>
    /* 这是为了解决多次点击出现部分蓝色的问题 */
    body{
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none; 
    }
    /* 头部 */
    .page-header {
        width: 800px;
        height: 200px;
        /* background-color: gray; */
        display: flex;
        margin: 0 auto;
    }
    .search-box {
        display: flex;
        width: 665px;
        height: 60px;
        /* background-color: orange; */
        /* border: 1px solid transparent; */
        border: 2px solid rgba(6, 183, 12, 0.4);
        /* box-shadow:  0 2px 8px 1px rgba(64,60,67,.24); */
        box-shadow:  0 0px 8px 0px rgba(6, 183, 12, 0.733);
        margin: auto;
        border-radius: 28px;
    }
    .search-box2 {
        width: 652px;
        height: 55px;
        display: flex;
    }
    .media-type {
        width: 100px;
        height: 58px;
        margin: auto;
        padding-left: 24px;
        line-height: 58px;
        font-size: 16px;
        border-top-left-radius: 24px;
        border-bottom-left-radius: 24px;
        background-color: limegreen;
        color: white;
    }
    .media-type div svg {
        width: 20px;
        height: 20px;
    }
    .selected {
        height: 58px;
        display: flex;
        justify-content: space-evenly;
    }
    .select {
        display: flex;
        width: 76px;
        flex-direction: column;
        position: relative;
        transition: linear 3s;
        box-shadow:  0 0px 8px 0px rgba(6, 183, 12, 0.733);
    }
    .select li {
        background-color: white;
        text-align: center;
        border: 1px solid #ccc;
        /* border: 1px solid limegreen; */
        border-top: 0;
        height: 50px;
        line-height: 50px;
        /* background-color: limegreen; */
        color: black;
    }
    .select li:first-child {
        margin-top: 2px;
        border-top: 1px solid #ccc;
    }
    .select li:last-child {
        border-bottom-right-radius: 5px;
        border-bottom-left-radius: 5px;
    }
    .select li:hover {
        box-shadow:  0 2px 8px 2px rgba(64,60,67,.24);
        transform: scale(1.02);
        /* background-color: white; */
        background-color: limegreen;
        color: white;
    }
    .search-item {
        width: 500px;
        /* background-color: plum; */
        margin-right:2px;
        display: flex;
    }
    .search-input {
        margin: auto;
        width: 500px;
        height: 50px;
        border: transparent;
        background-color: transparent;
        font: 16px arial,sans-serif;
        padding-left:20px;
        /* border-left: 1px solid #ccc; */
    }
    .clear {
        width: 50px;
        height: 55px;
        display: flex;
    }
    .clear svg {
        /* width: 30px; */
        height: 30px;
        margin: auto;
    }
    .search-input:focus{
        background-color: transparent;
        outline: none;
    }
    .search-button {
        width: 50px;
        height: 55px;
        display: flex;
        flex-direction: row-reverse;
    }
    .search-button svg {
        height: 30px;
        margin: auto;
    }
    /* 内容区 */
    .page-content {
        width: 800px;
        margin: 0 auto;
    }
    /* 内容区 作者栏 */
    .page-content .author {
        width: 800px;
        /* box-shadow:  0 2px 8px 1px rgba(64,60,67,.24); */
        box-shadow:  0 0px 8px 0px rgba(6, 183, 12, 0.733);
        border-radius: 4px;
        margin-bottom: 10px;
        line-height: 100px;
        padding-left: 24px;
    }
    /* 内容区，原文栏 */
    .page-content .source {
        width: 800px;
    }
    .page-content .source .source-title {
        /* box-shadow:  0 2px 8px 1px rgba(64,60,67,.24); */
        box-shadow:  0 0px 8px 0px rgba(6, 183, 12, 0.733);
        border-radius: 4px;
        margin-bottom: 10px;
        line-height: 100px;
        padding-left: 24px;
        padding-right: 24px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .page-content .source .source-title svg {
        width: 50px;
        height: 50px;
    }
    .origin-article {
        /* box-shadow:  0 2px 8px 1px rgba(64,60,67,.24); */
        box-shadow:  0 0px 8px 0px rgba(6, 183, 12, 0.733);
        border-radius: 4px;
        margin-top: 10px;
        margin-bottom: 10px;
        text-align: center;
        padding: 30px;
    }
    .origin-article .title {
        font-size: 20px;
        font-weight: bold;
    }
    .origin-article .pub-time {
        font-size: 14px;
    }
    .origin-article .text {
        text-align: justify;
    }
    /* 内容区 作者最近文章列表栏 */
    .page-content .article-list {
        width: 800px;
        /* background-color: rgb(195, 127, 255); */
    }
    .page-content .article-list .list-title {
        /* box-shadow:  0 2px 8px 1px rgba(64,60,67,.24); */
        box-shadow:  0 0px 8px 0px rgba(6, 183, 12, 0.733);
        border-radius: 4px;
        /* margin-bottom: 1px; */
        line-height: 100px;
        padding-left: 24px;
        padding-right: 24px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .page-content .article-list .list-title svg {
        width: 50px;
        height: 50px;
    }
</style>