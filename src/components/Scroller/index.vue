<template>
    <div class="wrapper" ref="wrapper">
        <slot></slot>
    </div>
</template>

<script>
import betterScroll from "better-scroll"
export default {
    name:"Scroller",
    props:{
        handleToScroll:{
            type:Function,
            default:function(){}
        },
        handleToTouchEnd:{
            type:Function,
            default:function(){}
        }
    },
    mounted(){
        var scroll=new betterScroll(this.$refs.wrapper,{
            tap:true, // tap事件
            probeType:1
        });

        this.scroll=scroll;

        scroll.on('scroll',(pos)=>{
            this.handleToScroll(pos);
        });
        scroll.on('touchEnd',(pos)=>{
            this.handleToTouchEnd(pos);
        })
    },
    methods:{
        toScrollTop(y){ // 跳转的高度
            this.scroll.scrollTo(0,y);
        }
    }
}
</script>

<style lang="scss" scoped>
    .wrapper{height:100%;}
</style>