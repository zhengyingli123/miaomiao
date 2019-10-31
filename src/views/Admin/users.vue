<template>
    <div>
        <el-table :data="nowTableData"  style="width: 100%">
            <el-table-column prop="userHead" label="用户头像">
                <template slot-scope="scope">   
                    <img class="userHead" :src="scope.row.userHead" alt="">
                </template>
            </el-table-column>
            <el-table-column prop="date" label="日期">
            </el-table-column>
            <el-table-column prop="username" label="姓名">
            </el-table-column>
            <el-table-column prop="email" label="邮箱">
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="small" @click="handleToFreeze(scope.$index,scope.row)">{{scope.row.isFreeze?'已冻结':'未冻结'}}</el-button>
                    <el-button size="small" type="danger" @click="handleToDel(scope.$index,scope.row)">移除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination class="page" 
        background layout="prev, pager, next"
        :current-page.sync="currentPage" 
        :page-size="pageSize" 
        :total="tableData.length">
        </el-pagination>
    </div>
</template>

<script>
export default {
    name:'users',
    data(){
        return{
            tableData:[],
            currentPage:2,
            pageSize:3
        }
    },
    computed:{
        nowTableData(){
            return this.tableData.slice((this.currentPage-1)*this.pageSize,this.currentPage*this.pageSize)||[]
        }
    },
    mounted(){
        this.axios.get('/api2/admin/usersList').then((res)=>{
            // console.log(res)
            var status=res.data.status;
            if(status===0){
                this.tableData=res.data.data.usersList
            }
        })
    },
    methods: {
        handleToFreeze(index,row){
            // console.log(index,row)
            this.axios.post('/api2/admin/updateFreeze',{
                email:row.email,
                isFreeze:!row.isFreeze
            }).then((res)=>{
                var status=res.data.status;
                if(status===0){
                    this.$alert('冻结操作已成功', '信息', {
                        confirmButtonText: '确定',
                        callback: action => { //刷新后才能显示冻结效果，需要实现无刷新技术
                            this.tableData[index].isFreeze=!row.isFreeze
                        }
                    });
                }else{
                    this.$alert('冻结操作失败', '信息', {
                        confirmButtonText: '确定'
                    });
                }
            })
        },
        handleToDel(index,row){
            this.axios.post('/api2/admin/deleteUser',{
                email:row.email
            }).then((res)=>{
                console.log(res)
                var status=res.data.status;
                if(status===0){
                    this.$alert('账号删除操作已成功', '信息', {
                        confirmButtonText: '确定',
                        callback: action => { 
                            this.tableData.splice(index,1)
                        }
                    });
                }else{
                    this.$alert('账号删除操作失败', '信息', {
                        confirmButtonText: '确定'
                    });
                }
            })
        }
    },
}
</script>

<style lang="scss" scoped>
.page{margin-top:20px;}
.userHead{width:50px;height:50px;border-radius: 50%;overflow: hidden;}
</style>