<script setup>
import { ref, onMounted } from 'vue';
import { queryStrip } from '@/api/strip/stripdata.js'

const now = ref(new Date());
const formattedTime = ref(now.value.toLocaleTimeString());
const formattedDate = ref(null);

onMounted(() => {
  setInterval(() => {
        now.value = new Date();
        formattedTime.value = now.value.toLocaleTimeString();
      }, 1000);
  formattedDate.value = now.value.toLocaleDateString();
});
const ArrtableData = ref([])
const DeptableData = ref([])
const loading = ref(false)
const getStripList = async () => {
  loading.value = true
  const res = await queryStrip()
  ArrtableData.value = res.data.ArrtableData
  DeptableData.value = res.data.DeptableData
  console.log(ArrtableData.value)
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
  rows.splice(index, 3);
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
</script>
<template>
  <div style="text-align: center;">
    <p style="font-size: 30px;">{{ formattedTime }}</p>
    <p> {{ formattedDate }}</p>
  </div>
  <el-container>
    <el-main  style="padding-top:0px">
      <el-tag size="mini">进港进程单</el-tag>
      <div v-for="(item, index) in ArrtableData" :key="index">
        <el-table :data="item" :show-header="false" border :span-method="objectSpanMethod" :row-style="jingangRowStyle()"
          :cell-style="{ padding: '0px' }" :cell-class-name="cellclass">
          <el-table-column prop="strip1" label="1" width="180">
          </el-table-column>
          <el-table-column prop="strip2" width="75" className="large">
          </el-table-column>
          <el-table-column prop="strip3" width="120">
            <!-- TAX<br>R/W -->
            <template #default="scope">
              TAX<div class="assign" @click="getAgreeShow(scope.$index, item, 1)"
                v-bind:class="[item[0].agreeShow1 ? 'tick' : '']"></div><br>
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
          <el-table-column fixed="right" label="操作" width="50">
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
      <el-divider></el-divider>
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
          <el-table-column fixed="right" label="操作" width="50">
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
      <el-divider></el-divider>
    </el-main>

  </el-container>
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
  width: 20px;
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
  width: 12px;
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
</style>