<template>
    <div class="register_body">
        <div>
            <input v-model="email" type="text" class="register_text" placeholder="请输入您的邮箱">
            <button class="register_code" :disabled="disabled" @touchstart="handleToVerify">{{verifyInfo}}</button>
        </div>
        <div>
            <input v-model="username" type="text" class="register_text" placeholder="请输入用户名">
        </div>
        <div>
            <input v-model="password" type="password" class="register_text" placeholder="请输入密码">
        </div>
        <div>
            <input type="password" class="register_text" placeholder="确认密码">
        </div>
        <div>
            <input v-model="verify" type="text" class="register_text" placeholder="邮箱验证码">
        </div>
        <div class="register_btn">
            <input @touchstart="handleToRegister" type="submit" value="注册">
        </div>
        <div class="register_link">
            <router-link href="#" to="/mine/login">立即登录</router-link>
            <router-link href="#" to="/mine/findPassword">找回密码</router-link>
        </div>
    </div>
</template>

<script>
import {messageBox} from '@/components/JS';

export default {
    name:'register',
    data() {
        return {
            email:'',
            password:'',
            username:'',
            verify:'',
            verifyInfo:'发送验证码',
            disabled:false
        }
    },
    methods:{
        handleToVerify(){
            if(this.disabled){return;}
            this.axios.get('/api2/users/verify?email='+this.email).then((res)=>{
                var status=res.data.status;
                var This=this;
                if(status===0){
                    messageBox({
                        title:'验证码',
                        content:'验证码已成功发送',
                        ok:'确定',
                        handleOk(){
                            This.countDown();
                        }
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
        handleToRegister(){
            this.axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
            this.axios.post('/api2/users/register',{
                username:this.username,
                password:this.password,
                email:this.email,
                verify:this.verify
            }).then((res)=>{
                // console.log(res)
                var status=res.data.status;
                var This=this;
                if(status===0){
                    messageBox({
                        title:'注册',
                        content:'用户注册成功',
                        ok:'确定',
                        handleOk(){
                            console.log(123)
                            This.$router.push('/mine/login');
                        }
                    }) 
                }else{
                    messageBox({
                        title:'注册',
                        content:res.data.msg+',请重新注册',
                        ok:'确定'
                    })
                }
            })
        },
        countDown(){
            this.disabled=true;
            var count=60;
            var timer=setInterval(()=>{
                count--;
                this.verifyInfo="剩余"+count+'秒';
                if(count===0){
                    this.disabled=false;
                    count=60;
                    this.verifyInfo='发送验证码';
                    clearInterval(timer);
                }
            },1000)
        }
    }
}
</script>

<style lang="scss" scoped>
#content .register_body{  width:100%;height:auto;}
.register_body>div{display: flex;justify-content: space-between;}
.register_code{border: 0;width:130px;height:30px;margin:10px;padding:0 15px;outline: 0;}
.register_body .register_text{  height: 40px; width:100%;border:none; border-bottom: 1px #ccc solid; margin-bottom: 5px; outline: none; text-indent: 10px;}
.register_body .register_btn{width:auto; height:50px; margin:10px;}
.register_body .register_btn input{ width:100%; height:50px; background:#e54847; border-radius: 3px; border:none; display: block; color:white; font-size: 20px;}
.register_body .register_link{ display: flex; justify-content:space-between;}
.register_body .register_link a{ text-decoration: none; margin:0 5px; font-size: 12px; color:#e54847;}

</style>