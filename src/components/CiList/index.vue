<template>
    <div class="cinema_body">
        <Loading v-if="isLoading"></Loading>
        <scroller v-else>
        <ul>
            <!-- <li>
                <div>
                    <span>大地影院(澳东世纪店)</span>
                    <span class="q"><span class="price">22.9</span> 元起</span>
                </div>
                <div class="address">
                    <span>金州区大连经济技术开发区澳东世纪3层</span>
                    <span>1763.5km</span>
                </div>
                <div class="card">
                    <div>小吃</div>
                    <div>折扣卡</div>
                </div>
            </li> -->
            <li v-for="data in cinemaList" :key="data.id">
                <div>
                    <span>{{data.nm}}</span>
                    <span class="q"><span class="price">{{data.sellPrice}}</span> 元起</span>
                </div>
                <div class="address">
                    <span>{{data.addr}}</span>
                    <span>{{data.distance}}</span>
                </div>
                <div class="card">
                    <div v-for="(num,index) in data.tag" v-if="num===1" :key="index" :class="index | cardColor">{{index | formatCard}}</div>
                </div>
                <div v-for="(item,index) in data.promotion" :key="index" class="tehui">
                    <img src="@/assets/card.png" alt="">
                    <span>{{item}}</span>
                </div>
            </li>
        </ul>
        </scroller>
    </div>
</template>

<script>
export default {
    name : 'CiList',
    data(){
        return{
            cinemaList:[],
            isLoading:true,
            preCityId:-1
        }
    },
    activated(){
        var cityId=this.$store.state.city.id;
        if(this.preCityId===cityId){
            return;
        }
        this.isLoading=true;

        this.axios.get("/api/cinemaList?cityId="+cityId).then(res=>{
            if(res.data.msg==='ok'){
                this.cinemaList=res.data.data.cinemas;
                this.isLoading=false
                this.preCityId=cityId
            }
        })
    },
    filters:{
        formatCard(index){
            var card=[
                {index:'allowRefund',value:'改签'},
                {index:'endorse',value:'退'},
                {index:'sell',value:'折扣卡'},
                {index:'snack',value:'小吃'},
                {index:'buyout',value:'售空'}
            ];
            for(var i=0;i<card.length;i++){
                if(card[i].index===index){
                    return card[i].value;
                }
            }
            return '';
        },
        cardColor(index){
            var card=[
                {index:'allowRefund',value:'bl'},
                {index:'endorse',value:'bl'},
                {index:'sell',value:'or'},
                {index:'snack',value:'or'},
                {index:"sellout",value:'bl'}
            ];
            for(var i=0;i<card.length;i++){
                if(card[i].index===index){
                    return card[i].value;
                }
            }
            return '';
        }
    }
}
</script>

<style scoped>
#content .cinema_body{ flex:1; overflow:auto;}
.cinema_body ul{ padding:15px;}
.cinema_body li{  border-bottom:1px solid #e6e6e6; margin-bottom: 20px;padding-right: 15px;padding-bottom:10px;}
.cinema_body div{ margin-bottom: 7px;}
.cinema_body li div:nth-child(1){overflow: hidden;white-space: nowrap;text-overflow: ellipsis;}
.cinema_body .q{ font-size: 11px; color:#f03d37;}
.cinema_body .price{ font-size: 18px;}
.cinema_body .address{ font-size: 13px; color:#666;display: flex;justify-content: space-between;}
.cinema_body .address span:nth-of-type(1){overflow: hidden;white-space: nowrap;text-overflow: ellipsis;}
.cinema_body .address span:nth-of-type(2){ float:right; }
.cinema_body .card{ display: flex;}
.cinema_body .card div{ margin-bottom:0;padding: 0 3px; height: 15px; line-height: 15px; border-radius: 2px; color: #f90; border: 1px solid #f90; font-size: 10px; margin-right: 5px;}
.cinema_body .card div.or{ color: #f90; border: 1px solid #f90;}
.cinema_body .card div.bl{ color: #589daf; border: 1px solid #589daf;}
.tehui{display: flex;font-size: 11px;color:#999;}
img{width:15px;height: 14px;margin-right: 3px;}
</style>
