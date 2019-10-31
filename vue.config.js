module.exports={
// export default{ // es6写法
    publicPath:'miaomiao',
    devServer:{
        proxy:{ // 反向代理
            '/api2' : {
                target : 'http://localhost:3000',//代理本地的接口写在上面
                changeOrigin : true
            },
            '/api':{
                target:"http://39.97.33.178",
                changeOrigin:true
            }
        }
    }
}