<template>
    <div id="detailContainer" class="slide-enter-active">
		<!-- <header id="header">
			<i class="iconfont icon-right"></i><h1>影片详情</h1>
		</header> -->
        <Header title="影片详情">
            <i class="iconfont icon-right" @touchstart="handleToBack"></i>
        </Header>
        <Loading v-if="isLoading"></Loading>
		<div v-else id="content" class="contentDetail">
			<div class="detail_list">
				<div class="detail_list_bg" :style="{'background-image':'url('+detailMovie.img.replace(/w\.h/,'148.208')+')'}"></div>
				<div class="detail_list_filter"></div>
				<div class="detail_list_content">
					<div class="detail_list_img">
						<!-- <img src="/images/movie_1.jpg" alt="">	 -->
                        <img :src="detailMovie.img |  setWH('148.208')" alt="">
					</div>
					<div class="detail_list_info">
						<!-- <h2>无名之辈</h2>
						<p>A Cool Fish</p>
						<p>9.2</p>
						<p>剧情,喜剧,犯罪</p>
						<p>中国大陆 / 108分钟</p>
						<p>2018-11-16大陆上映</p> -->
                        <h2>{{detailMovie.nm}}</h2>
                        <p>{{detailMovie.enm}}</p>
                        <p>{{detailMovie.sc}}</p>
                        <p>{{detailMovie.star}}</p>
                        <p>{{detailMovie.cat}}</p>
                        <p>{{detailMovie.src}} / {{detailMovie.dur}}分钟</p>
                        <p>{{detailMovie.pubDesc}}</p>
					</div>
				</div>
			</div>
            <div class="detail_body">
                <div class="detail_intro">
                    <p>简介</p>
                    <!-- <p>在一座山间小城中，一对低配劫匪、一个落魄的泼皮保安、一荒诞喜剧。</p> -->
                    <p>{{detailMovie.dra}}</p>
                    <p>剧照</p>
                </div>
                
                <div class="detail_player swiper-container" ref="detail_player">
                    <ul class="swiper-wrapper">
                        <!-- <li class="swiper-slide">
                            <div>
                                <img src="/images/person_1.webp" alt="">
                            </div>
                            <p>陈建斌</p>
                            <p>马先勇</p>
                        </li> -->
                        <li class="swiper-slide" v-for="(item,index) in detailMovie.photos" :key="index">
                            <div>
                                
                                <!-- <img :src="" alt=""> -->
                                <img :src="item |  setWH('148.208')" alt="">
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
		</div>
	</div>
</template>

<script>
import Header from '@/components/Header';
export default {
    name:"detail",
    data(){
        return{
            detailMovie:{},
            isLoading:true
        }
    },
    components:{
        Header
    },
    props:['movieId'],
    methods:{
        handleToBack(){
            this.$router.back();
        }
    },
    mounted(){
        // console.log(this.movieId);
        this.axios.get("/api/detailmovie?movieId="+this.movieId).then((res)=>{
            if(res.data.msg==='ok'){
                this.isLoading=false;
                this.detailMovie=res.data.data.detailMovie;
                this.$nextTick(()=>{
                    new Swiper(this.$refs.detail_player,{
                        slidesPerView:'auto',
                        freeMode:true,
                        freeModeSticky:true
                    })
                });
            }
        });
    }
}
</script>

<style lang="scss" scoped>
#detailContainer{position: absolute;left: 0;top:0;z-index: 100;width: 100%;min-height: 100%;background: #fff;}
#detailContainer.slide-enter-active{animation: 0.3s slideMove;}
@keyframes slideMove{
    0%{transform: translateX(100%);}
    100% {transform: translateX(0);}
}
.detail_body{width:100%;height:auto;background:#e54847;min-height: 416px;}
#content.contentDetail{ display: block; margin-bottom:0;}
#content .detail_list{ height:200px; width:100%; position: relative; overflow: hidden;}
.detail_list .detail_list_bg{ width:100%; height:100%; background: 0 40%; filter: blur(5px); background-size:cover; position: absolute; left: 0; top: 0;}
.detail_list .detail_list_filter{ width:100%; height:100%; position: absolute;background-color: #40454d;opacity: .55; position: absolute; left: 0; top: 0; z-index: 1;}
.detail_list .detail_list_content{ display: flex; width:100%; height:100%; position: absolute; left: 0; top: 0; z-index: 2;}
.detail_list .detail_list_img{ width:108px; height: 150px; border: solid 1px #f0f2f3; margin:20px;}
.detail_list .detail_list_img img{ width:100%; height: 100%;}
.detail_list .detail_list_info{ margin-top: 20px;}
.detail_list .detail_list_info h2{ font-size: 20px; color:white; font-weight: normal; line-height: 30px;height:30px;}
.detail_list .detail_list_info p{ color:white; line-height: 20px; font-size: 14px; color:#ccc;}

#content .detail_intro{ padding: 10px;color: #fff;padding-bottom: 0;}
#content .detail_intro p:nth-child(2n+1){line-height: 30px;margin-top: 15px;}
#content .detail_player{ margin: 0 10px;}
.detail_player .swiper-slide{ width:140px; margin-right: 10px; text-align: center; font-size: 14px;}
.detail_player .swiper-slide img{ width:100%; margin-bottom: 5px;}
.detail_player .swiper-slide p:nth-of-type(2){ color:#999;}
</style>