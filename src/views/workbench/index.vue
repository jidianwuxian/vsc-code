<script setup>
import axios from 'axios'
import { StarFilled } from '@element-plus/icons-vue'
import { ref, onMounted } from 'vue';
import { queryStrip,deleteStrip } from '@/api/strip/stripdata.js'
import { ElMessage,ElMessageBox} from 'element-plus'
const now = ref(new Date());
const formattedTime = ref(now.value.toLocaleTimeString());
const formattedDate = ref(null);
const dayOfWeek=ref(null)
function getDayOfWeek(day) {
  switch (day) {
    case 0:
      return '星期日';
    case 1:
      return '星期一';
    case 2:
      return '星期二';
    case 3:
      return '星期三';
    case 4:
      return '星期四';
    case 5:
      return '星期五';
    case 6:
      return '星期六';
    default:
      return '';
  }
}
onMounted(() => {
  setInterval(() => {
    now.value = new Date();
    formattedTime.value = now.value.toLocaleTimeString();
    dayOfWeek.value = getDayOfWeek(now.value.getDay());
  }, 1000);
  formattedDate.value = now.value.toLocaleDateString();
  search()
});
const weather = ref({})
const cityName = ref('景德镇')
const ArrtableData = ref([])
const DeptableData = ref([])
const loading = ref(false)
const getStripList = async () => {
  loading.value = true
  const res = await queryStrip()
  ArrtableData.value = res.data.arrtableData.data
  DeptableData.value = res.data.deptableData.data
  loading.value = false
}
getStripList()



const getAgreeShow = (index, rows, num) => {
  if (num === 1)
    rows[0].agreeShow1 = !rows[0].agreeShow1; // 控制点击
  if (num === 2)
    rows[0].agreeShow2 = !rows[0].agreeShow2;
  if (num === 3)
    rows[0].agreeShow3 = !rows[0].agreeShow3;

}
const getAgreeShow2 = (index, rows, num) => {
  console.log(index)
  if (num === 10)
    rows[0].agreeShow10 = !rows[0].agreeShow10; // 控制点击
  if (num === 20)
    rows[0].agreeShow20 = !rows[0].agreeShow20;
  if (num === 30)
    rows[0].agreeShow30 = !rows[0].agreeShow30;
  if (num === 40)
    rows[0].agreeShow40 = !rows[0].agreeShow40;
}
let ascendPo = (index, rows) => {
  let num = parseInt(rows[0].strip2.slice(1)) + 30;
  rows[0].strip2 = 'H' + num.toString();
}
let descendPo = (index, rows) => {
  let num = parseInt(rows[0].strip2.slice(1)) - 30;
  rows[0].strip2 = 'H' + num.toString();
}
const deleteRow = (index, rows) => {
  // rows.splice(index, 3);
  console.log(rows[0].id)
  ElMessageBox.confirm(`正在删除：${rows[0].strip1}，确认删除？`, 'Warning', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    deleteStrip(rows[0].id).then(() => {
      getStripList()
      ElMessage.success('删除成功')
      
    })
  })

}

const objectSpanMethod = ({ rowIndex, columnIndex }) => {
  if (columnIndex === 1 || columnIndex === 2 || columnIndex === 4) {
    if (rowIndex === 0) {
      return {
        rowspan: 3,
        colspan: 1
      };
    } else {
      return {
        rowspan: 0,
        colspan: 0
      };
    }
  }
}

const jingangRowStyle = (row) => {
  return {
    background: '#FFF8DC',
    color: 'black',
  };
}
const ligangRowStyle = () => {
  return {
    background: '#ADD8E6',
    color: 'black',
  };
}

const search=() =>{
      //必须输入城市的名字 如果为空 不做任何反馈
      if (cityName.value.trim() === '') {
        return
      }
      //发送ajax请求 根据城市的名字获取维度和经度
      const apiKey = "4c72b247ee4d9a725d048dfc25f0fb09"
      // const apiKey = "   78b262ed7919f0d79a2ca50a4a6f82bf"

      const apiUrlGetLatAndLon = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName.value}&appid=${apiKey}`
      axios.get(apiUrlGetLatAndLon).then(
        response => {
          console.log("响应数据：", response.data)

          //获取维度和经度
          const lat = response.data[0].lat
          const lon = response.data[0].lon
          console.log("维度和经度：", lat, lon)
          //在发送ajax请求 调用接口 根据维度和经度获取天气信息
          const apiUrlGetWeather = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
          axios.get(apiUrlGetWeather).then(
            response => {
              console.log("响应数据：", response.data)
              //从响应的数据当中获取我们想要的信息 温度 适度 风俗 天气图标
              const weathera = {
                imgPath: `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
                temp: response.data.main.temp,
                windSpeed: response.data.wind.speed,
                windDirection: response.data.wind.deg,
                humidity: response.data.main.humidity,
                pressure: response.data.main.pressure,
                visibility: response.data.visibility,
                clouds:response.data.clouds.all,
                description: response.data.weather[0].description,
                city: cityName.value,
              }
              // console.log("天气信息：", weather)
              //触发事件使用全局事件总线 传递数据
              weather.value = weathera
              console.log(weather.value)
            },
            error => {
              console.group("错误信息为：", error.message)
            }

          )
        },
        error => {
          console.log("错误信息为：", error.message)
        }
      )
    }
const data=ref("18L")

  
</script>
<template>
  <div style="text-align: center;">
    <p style="font-size: 32px;">{{ formattedTime }}</p>
    <p> {{ formattedDate }} {{ dayOfWeek }}</p>
  </div>
  <el-container>
    <el-main style="padding-top:0px;">     
      <el-tag size="mini">进港进程单</el-tag>
      <div v-for="(item, index) in ArrtableData" :key="index">
        <el-table :data="item" :show-header="false" border :span-method="objectSpanMethod" :row-style="jingangRowStyle()"
          :cell-style="{ padding: '0px' }" >
          <el-table-column prop="strip1" label="1" width="180">
          </el-table-column>
          <el-table-column prop="strip2" width="75" className="large">
          </el-table-column>
          <el-table-column prop="strip3" width="120">
            <!-- TAX<br>R/W -->
            <template #default="scope">
              TAX<div class="assign" @click="getAgreeShow(scope.$index, item, 1)"
                v-bind:class="[item[0].agreeShow1 ? 'tick' : '']"></div><br>
              R/W<select >
                <option></option>
                <option>18L</option>
                <option>36R</option>
              </select>
            </template>



          </el-table-column>
          <el-table-column prop="strip4" width="110">
          </el-table-column>
          <el-table-column prop="strip5" width="80">
            <template #default="scope">
              M<div class="assign" @click="getAgreeShow2(scope.$index, item, 10)"
                v-bind:class="[item[0].agreeShow10 ? 'tick' : '']"></div><br>
              E<div class="assign" @click="getAgreeShow2(scope.$index, item, 20)"
                v-bind:class="[item[0].agreeShow20 ? 'tick' : '']"></div><br>
              A<div class="assign" @click="getAgreeShow2(scope.$index, item, 30)"
                v-bind:class="[item[0].agreeShow30 ? 'tick' : '']"></div><br>
              I<div class="assign" @click="getAgreeShow2(scope.$index, item, 40)"
                v-bind:class="[item[0].agreeShow40 ? 'tick' : '']"></div><br>
            </template>

          </el-table-column>
          <el-table-column fixed="right" label="操作" width="52">
            <template #default="scope">
              <el-button @click.native.prevent="deleteRow(scope.$index, item)" type="text" size="small"
                v-if="scope.$index === 0">
                移交
              </el-button>
              <el-button @click.native.prevent="descendPo(scope.$index, item)" type="text" size="small"
                v-if="scope.$index === 2">
                下降
              </el-button>
              <el-button type="text" size="small" v-if="scope.$index === 1">
                操作
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-main>
    <el-main style="padding-top:0px">
      <el-tag size="mini">离港进程单</el-tag>

      <div v-for="(item, index) in DeptableData" :key="index">
        <el-table :data="item" :show-header="false" border :span-method="objectSpanMethod" :row-style="ligangRowStyle()"
          :cell-style="{ padding: '0px' }">
          <el-table-column prop="strip1" label="1" width="180">
          </el-table-column>
          <el-table-column prop="strip2" width="75" className="large">

          </el-table-column>
          <el-table-column prop="strip3" width="120" @cell-click="getAgreeShow()">
            <template #default="scope">
              P/B<div class="assign" @click="getAgreeShow(scope.$index, item, 1)"
                v-bind:class="[item[0].agreeShow1 ? 'tick' : '']"></div><br>
              S/T<div class="assign" @click="getAgreeShow(scope.$index, item, 2)"
                v-bind:class="[item[0].agreeShow2 ? 'tick' : '']"></div><br>
              TAX<div class="assign" @click="getAgreeShow(scope.$index, item, 3)"
                v-bind:class="[item[0].agreeShow3 ? 'tick' : '']"></div><br>
              R/W<select>
                <option></option>
                <option>18L</option>
                <option>36R</option>
              </select>
            </template>

          </el-table-column>
          <el-table-column prop="strip4" width="110">
          </el-table-column>
          <el-table-column prop="strip5" width="80">
            <template #default="scope">
              M<div class="assign" @click="getAgreeShow2(scope.$index, item, 10)"
                v-bind:class="[item[0].agreeShow10 ? 'tick' : '']"></div><br>
              E<div class="assign" @click="getAgreeShow2(scope.$index, item, 20)"
                v-bind:class="[item[0].agreeShow20 ? 'tick' : '']"></div><br>
              A<div class="assign" @click="getAgreeShow2(scope.$index, item, 30)"
                v-bind:class="[item[0].agreeShow30 ? 'tick' : '']"></div><br>
              I<div class="assign" @click="getAgreeShow2(scope.$index, item, 40)"
                v-bind:class="[item[0].agreeShow40 ? 'tick' : '']"></div><br>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="52">
            <template #default="scope">
              <el-button @click.native.prevent="deleteRow(scope.$index, item)" type="text" size="small"
                v-if="scope.$index === 0">
                移交
              </el-button>
              <el-button @click.native.prevent="ascendPo(scope.$index, item)" type="text" size="small"
                v-if="scope.$index === 2">
                上升
              </el-button>
              <el-button type="text" size="small" v-if="scope.$index === 1">
                操作
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-main>
  </el-container>
  <el-divider><el-icon><star-filled /></el-icon></el-divider>
  <el-tabs type="border-card" class="demo-tabs">
    <el-tab-pane>
      <template #label>
        <span class="custom-tabs-label">
          <span>天气信息</span>
        </span>
      </template>
      当前城市：{{ weather.city }} <el-divider direction="vertical" /> 气温：{{ weather.temp }}°C 
      <el-divider direction="vertical" />湿度(百分比)：{{ weather.humidity }} <el-divider direction="vertical" />风速(米/秒)：{{ weather.windSpeed }} 
      <el-divider direction="vertical" />风向：{{ weather.windDirection }} <el-divider direction="vertical" />气压(hPa)：{{ weather.pressure }}
      <el-divider direction="vertical" />可见度(米)：{{ weather.visibility }}<el-divider direction="vertical" />天气描述信息：{{ weather.description }}
      <img :src="weather.imgPath" style="display: inline-block;vertical-align: middle;">
    </el-tab-pane>
    <el-tab-pane label="本场流控信息">111</el-tab-pane>
  </el-tabs>
</template>

<style>
.el-table {
  border-bottom: 1px solid #000;
}

.bottomStyle {
  border-bottom: 1px solid blue;
}

.assign {
  position: relative;
  float: right;
  display: inline-block;
  width: 25px;
  height: 20px;
  margin: 0 6px;
  border: 1px solid #e64848 !important;
  border-radius: 2px;
}

#max {
  background-color: white;
}

.tick::after {
  content: " ";
  position: absolute;
  display: inline-block;
  width: 14px;
  height: 6px;
  border-width: 0 0 2px 2px;
  overflow: hidden;
  border-color: #e64848;
  border-style: solid;
  -webkit-transform: rotate(-50deg);
  transform: rotate(-50deg);
  left: 3px;
  top: 4px;
}

.large {
  font-size: 20px;
  /* 设置字体大小为 14 像素 */
}

/* .bgcChange {
  filter: invert(1) hue-rotate(180deg);
} */
img {
  width: 50px;
  height: 50px
}
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
}
.demo-tabs .custom-tabs-label .el-icon {
  vertical-align: middle;
}
.demo-tabs .custom-tabs-label span {
  vertical-align: middle;
  margin-left: 4px;
}
</style>