<template>
    <div class="findPs_body">
        <div>
            <input v-model="email" type="text" class="findPs_text" placeholder="请输入您的邮箱">
            <button class="findPs_code" @touchstart="handleToVerify">获取验证码</button>
        </div>
        <div>
            <input v-model="password" type="password" class="findPs_text" placeholder="请输入新的密码">
        </div>
        <div>
            <input type="password" class="findPs_text" placeholder="确认新密码">
        </div>
        <div>
            <input v-model="verify" type="text" class="findPs_text" placeholder="邮箱验证码">
        </div>
        <div class="findPs_btn">
            <input @touchstart="handleToFindPs" type="submit" value="修改">
        </div>
        <div class="findPs_link">
            <router-link href="#" to="/mine/login">立即登录</router-link>
            <router-link href="#" to="/mine/register">立即注册</router-link>
        </div>
    </div>
</template>

<script>
import {messageBox} from '@/components/JS';

export default {
    name:'findPassword',
    data() {
        return {
            email:'',
            password:'',
            verify:''
        }
    },
    methods:{
        handleToVerify(){
            this.axios.get('/api2/users/verify?email='+this.email).then((res)=>{
                var status=res.data.status;
                if(status===0){
                    messageBox({
                        title:'验证码',
                        content:'验证码已成功发送',
                        ok:'确定'
                    })
                }else{
                    messageBox({
                        title:'验证码',
                        content:'验证码发送失败',
                        ok:'确定'
                    })
                }
            })
        },
        handleToFindPs(){
            this.axios.post('/api2/users/findPassword',{
                password:this.password,
                email:this.email,
                verify:this.verify
            }).then((res)=>{
                // console.log(res)
                var status=res.data.status;
                var This=this;
                if(status===0){
                    messageBox({
                        title:'修改密码',
                        content:'修改密码成功',
                        ok:'确定',
                        handleOk(){
                            // console.log(123)
                            This.$router.push('/mine/login');
                        }
                    }) 
                }else{
                    messageBox({
                        title:'修改密码',
                        content:'修改密码失败',
                        ok:'确定'
                    })
                }
            })
        }
    },
}
</script>

<style lang="scss" scoped>
#content .findPs_body{  width:100%;height:auto;}
.findPs_body>div{display: flex;justify-content: space-between;}
.findPs_code{border: 0;width:130px;height:30px;margin:10px;padding:0 15px;outline: 0;}
.findPs_body .findPs_text{  height: 40px; width:100%;border:none; border-bottom: 1px #ccc solid; margin-bottom: 5px; outline: none; text-indent: 10px;}
.findPs_body .findPs_btn{width:auto; height:50px; margin:10px;}
.findPs_body .findPs_btn input{ width:100%; height:50px; background:#e54847; border-radius: 3px; border:none; display: block; color:white; font-size: 20px;}
.findPs_body .findPs_link{ display: flex; justify-content:space-between;}
.findPs_body .findPs_link a{ text-decoration: none; margin:0 5px; font-size: 12px; color:#e54847;}
</style>