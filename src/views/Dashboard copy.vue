<template lang="">
    <div class="container">
        <el-card style="padding:0px">
            <template #header>
            <div class="card-header">
                <h3>出租车实时情况</h3>
            </div>
            </template>
            <div class="card-container">
                <el-row :gutter="40">
                    <el-col :span="3">

                    </el-col>
                <el-col :span="6">
                    <!-- t1 -->
                    <div class="taxi-container">
                        <h3 class="title-line">T1</h3>
                        <!-- 航站区 -->
                        <div class="terminal" >
                            <el-row :gutter="50">
                                <el-col :span="8">
                                    <div class="number">2000</div>
                                    <div class="line border-right-line">第一条道</div>
                                </el-col>
                                <el-col :span="8">
                                    <div class="number">85</div>
                                     <div class="line border-right-line">第二条道</div>
                                </el-col>
                                <el-col :span="8">
                                    <div class="number">12</div>
                                     <div class="line border-right-line">补短通道</div>
                                </el-col>
                            </el-row>
                        </div>
                        <!-- 路途中 -->
                        <div class="on-the-way">
                            <p class="line">
                            路途车
                           </p>
                           <div class="number">85</div>
                        </div>

                        <!-- 蓄车池 -->
                         <div class="pool">
                            <p class="line">80</p>
                            <p class="line">T1蓄车池</p>
                            <!-- <el-row :gutter="5">
                                <el-col :span="12"> <div class="line border-right-line">t1正常</div></el-col>
                                <el-col :span="12"> <div class="line">t1盘短</div></el-col>
                            </el-row> -->
                         </div>
                    </div>
                </el-col>
                <el-col :span="3">

                </el-col>       
                <!-- <el-col :span="4">
                    <div class="title-header">
                        <h4 class="header-text" style="height:40px;"></h4>
                        <h4 class="header-text">航站楼</h4>
                        <h4 class="header-text">路途</h4>
                        <h4 class="header-text">蓄车池</h4>
                    </div>
                   
                </el-col> -->

                <el-col :span="6">
                    <!-- t2 -->
                    <div class="taxi-container">
                        <h3 class="title-line">T2</h3>
                        <!-- 航站区 -->
                        <div class="terminal" >
                            <el-row :gutter="50">
                                <el-col :span="8"> <div class="line border-right-line">第一条道</div></el-col>
                                <el-col :span="8"> <div class="line border-right-line">第二条道</div></el-col>
                                <el-col :span="8"> <div class="line border-right-line">补短通道</div></el-col>
                            </el-row>
                        </div>
                        <!-- 路途中 -->
                        <div class="on-the-way">
                            <p class="line">
                            路途车
                           </p>
                        </div>
                        <!-- 蓄车池 -->
                         <div class="pool">
                            <p class="line">T2蓄车池</p>
                            <!-- <el-row :gutter="5">
                                <el-col :span="12"> <div class="line border-right-line">t1正常</div></el-col>
                                <el-col :span="12"> <div class="line">t1盘短</div></el-col>
                            </el-row> -->
                         </div>
                    </div>
                </el-col>
                <el-col :span="3">

                </el-col>
            </el-row>
            </div>
           
          
            <template #footer>
                <div class="card-footer">
                    <h4>T1航站楼第一列排队车辆数据</h4>
                <el-table :data="tableData" stripe style="width: 100%">
                    <el-table-column prop="date" label="Date" width="180" />
                    <el-table-column prop="name" label="Name" width="180" />
                    <el-table-column prop="address" label="Address" />
                </el-table>
                </div>
               
            </template>
        </el-card>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted, watch, onDeactivated, onActivated } from "vue";
import axios from "axios";
onMounted(() => {
    getTaxiNumber()
})
    const getTaxiNumber= async () =>{
        await axios.get("/api/get_taxi_num").then((res) => {
            console.log(res.data,"出租车数据")
    })
    }

    const tableData = [
    {
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-02',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-04',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    ]
</script>


<style lang="scss" scoped>
    .container {
  height: 100%;
//   width: 800px;
  position: relative;
  .title-line{
    // height: 100%;
    line-height: 25px;
    text-align: center;
    vertical-align: middle;
}
 .el-card {
   
      height: 100%;
      width: 100%;
      .card-header{
        // height:30px !important;
        // font-size: 25px;
        // line-height: 30px;
        padding: 5px;
    // text-align: center;
    vertical-align: middle;
        // border: 1px solid red;
      }
      .card-container{
        height: 80% !important;
        // border: 1px solid red;
        padding: -10px 0 !important;
        .title-header{
        height: 100%;
        .header-text{
        // border: 1px solid red;
        margin-top: 10px;
        height: 100px;
        line-height: 100px;
        text-align: center;
        vertical-align: middle;
        font-size: 30px;
        }
      }
   
    .border-right{
        // padding-right: 5px;
        border-right:1px solid gray;
    }

      .taxi-container{
        .terminal{
            border-bottom: 1px solid #539AF7;
            // border: 1px solid gray;
            padding-bottom: 10px;
            margin-right: 5px;
            padding-right: 5px;
            height: 200px;
            text-align: center;
            .number{
                height: 30px;
                line-height: 30px;
                font-size: 35px;
                padding-top: 15px;
                margin-bottom: 10px;
                padding-bottom: 10px;
                color: #3cb371;
                // border: 1px solid red;
            }
            .border-right-line {
                border-left: 1px dashed #539AF7;
                border-right: 1px dashed #539AF7; /* 也可以单独添加一个类来移除 border-right */
            }
            .line{
                // border: 1px solid red;
                writing-mode: vertical-rl;
                letter-spacing: 15px;
                line-height:40px;
                top: 0;
                bottom :0;
                margin: auto;
                font-size: 15px;
                color: #539AF7;
                
            }
        }
        .on-the-way{
            // 3、对应的，需要父类的高度够支撑字体原有的高度加上字间距的高度
            height: 100px;
            position: relative; /* 父元素需要设置为相对定位 */
            // 设置子类居中
            text-align: center;
            // border: 1px solid red;
            // 让边线不贴着上面的div
            margin-top:10px;
                .number{
                    position: absolute; /* 设置为绝对定位 */
                    top:  calc(100% - 75px);; /* 顶部与父元素对齐 */
                    right: calc(100% - 215px); /* 与右边距离设定的间距相隔 */
                    height: 30px;
                    line-height: 30px;
                    font-size: 40px;
                    padding-bottom: 10px;
                    color: #3cb371;
                    // border: 1px solid red;
                }
                .line{
                    opacity: 0.5; /* 设置透明度为50% */
                    border-right:1px dashed #539AF7;
                    border-left:1px dashed #539AF7;
                    // border:1px solid red;
                    // height: 100%;
                    // 4、这里的行高就是页面上看见的宽度，因为字体是竖着写的
                    line-height: 70px;
                    // 1、让字体竖着写
                    writing-mode: vertical-rl;
                    //2、 只能通过控制字间距来让字体变长
                    letter-spacing: 15px;

                    // 让字体相对于box居中
                    left: 0;
                    right:0;
                    margin: auto;

                    color: #539AF7;
                }
        }
        .pool{
            height: 100px;
            width:200px;
            line-height: 100px;
            left: 0;
            right:0;
            margin: auto;
            border: 1px solid #539AF7;
            margin-top: 10px;
                // .border-right-line {
                //     border-right: 1px solid gray; /* 也可以单独添加一个类来移除 border-right */
                // }
                .line{
                    height: 100px;
                    line-height: 100px;
                    text-align: center;
                    vertical-align: middle;
                    color: #539AF7;
                }
        }
}
      }
     
    .card-footer{
        height: 250px;
        // border: 1px solid red;
    }
  

    }
   
    :deep(.el-card){
        --el-card-padding: 2px 0 !important;
    }
    
 
    }
</style>