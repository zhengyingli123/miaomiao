<template>
    <div class="movie_body">
        <Loading v-if="isLoading"></Loading>   
        <scroller v-else>
        <ul>
            <!-- <li>
                <div class="pic_show"><img src="/images/movie_1.jpg"></div>
                <div class="info_list">
                    <h2>无名之辈</h2>
                    <p><span class="person">17746</span> 人想看</p>
                    <p>主演: 陈建斌,任素汐,潘斌龙</p>
                    <p>2018-11-30上映</p>
                </div>
                <div class="btn_pre">
                    预售
                </div>
            </li> -->
            <li v-for="data in comingList" :key="data.id">
                <div class="pic_show" @tap="handleToDetail(data.id)"><img :src="data.img | setWH('128.180')"></div>
                <div class="info_list" @tap="handleToDetail(data.id)">
                    <h2>{{data.nm}} <img v-if="data.version" src="@/assets/maxs.png"></h2>
                    <p><span class="person">{{data.wish}}</span> 人想看</p>
                    <p>主演: {{data.star}}</p>
                    <p>{{data.rt}}上映</p>
                </div>
                <div class="btn_pre">
                    预售
                </div>
            </li>
        </ul>
        </scroller>
    </div>
</template>

<script>
export default {
    name : 'ComingSoon',
    data(){
        return{
            comingList:[],
            isLoading:true,
            preCityId:-1
        }
    },
    activated(){
        var cityId= this.$store.state.city.id;
        if(this.preCityId===cityId){
            return;
        }
        this.isLoading=true;
        this.axios.get("/api/movieComingList?cityId="+cityId).then((res)=>{
            this.isLoading=false
            var msg=res.data.msg;
            if(msg==="ok"){
                this.comingList=res.data.data.comingList;
                this.isLoading=false;
                this.preCityId=cityId;
            }
            console.log(this.comingList)
        })
    },
    methods:{
        handleToDetail(movieId){
            // console.log(movieId)
            this.$router.push('/movie/detail/2/'+movieId)
        }
    }
}
</script>

<style scoped>
#content .movie_body{ flex:1; overflow:auto;}
.movie_body ul{ margin:0 12px; overflow: hidden;}
.movie_body ul li{ margin-top:12px; display: flex; align-items:center; border-bottom: 1px #e6e6e6 solid; padding-bottom: 10px;}
.movie_body .pic_show{ width:64px; height: 90px;}
.movie_body .pic_show img{ width:100%;}
.movie_body .info_list { margin-left: 10px; flex:1; position: relative;}
.movie_body .info_list h2{ font-size: 17px; line-height: 24px; width:150px; overflow: hidden; white-space: nowrap; text-overflow:ellipsis;}
.movie_body .info_list p{ font-size: 13px; color:#666; line-height: 22px; width:200px; overflow: hidden; white-space: nowrap; text-overflow:ellipsis;}
.movie_body .info_list .grade{ font-weight: 700; color: #faaf00; font-size: 15px;}
.movie_body .info_list img{ width:50px; position: absolute; right:10px; top: 5px;}
.movie_body .btn_mall , .movie_body .btn_pre{ width:47px; height:27px; line-height: 28px; text-align: center; background-color: #f03d37; color: #fff; border-radius: 4px; font-size: 12px; cursor: pointer;}
.movie_body .btn_pre{ background-color: #3c9fe6;}
.person{font-size: 15px;color: #faaf00;}
</style>
