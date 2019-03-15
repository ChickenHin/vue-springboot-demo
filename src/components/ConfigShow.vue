<template>
  <div class="show">
    <select id="service-select" @change="selectApartment($event)">
      <option value="" disabled selected></option>
      <option v-for="(service,index) in serviceList" v-bind:key=index>{{service}}</option>
    </select>
    <button class="add-btn" @click="addAppkey()">添加appkey</button>
    <layer :type="1" v-on:confirmAdd="confirmAdd" v-on:cancleAdd="cancleAdd" v-if="layerFlag"></layer>
    <table>
      <thead>
        <tr>
          <th>appkey</th>
          <th>api</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(list, index) in appkeyList" v-bind:key=index>
          <td>{{list.appkey}}</td>
          <td>
            <div v-for="(l, index) in list.apiList" v-bind:key=index>
              <span>{{l.api}}</span>
              <span v-if="l.opt">*</span>
            </div>
          </td>
          <td>
            <button class="add-btn">添加接口</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Layer from '../components/Layer'
export default {
  name: 'ConfigShow',
  data () {
    return {
      serviceList: [],
      selectedApartment: '请输入',
      appkeyList: [],
      layerFlag: false,
      inputVal: ''
    }
  },
  created () {
    this.$axios.get('/api/getApartment')
      .then((response) => {
        this.serviceList = response.data
        console.log(this.selectedApartment)
      }).catch(function (response) {
        console.log(response)
      })
  },
  methods: {
    addAppkey: function () {
      this.layerFlag = true
    },
    cancleAdd: function () {
      this.layerFlag = false
    },
    confirmAdd: function (val) {
      this.layerFlag = false
      this.$axios.post('/api/addAppkey', {
        apartment: 'CRM',
        appkeys: val
      }).then((response) => {
        console.log(response.data)
      }).catch(function (response) {
        console.log(response)
      })
    },
    selectApartment: function () {
      this.$axios.get('/api/getAppkeyAndApi', {
        params: {
          apartment: event.target.value
        }
      }).then((response) => {
        this.appkeyList = response.data
        console.log(response.data)
      }).catch(function (response) {
        console.log(response)
      })
    }
  },
  components: {
    Layer
  }
}
</script>

<style scoped>
.show {
  margin: 20px 0 0 140px;
  padding: 20px;
  border: 1px solid #000;
  height: 100%;
}
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
input {
  height: 24px;
  margin-left: 10px;
}
.op-btn {
  width: 30px;
  height: 30px;
  color: #42b983;
  cursor: pointer;
  border: none;
  font-size: 24px;
}
.cfm-btn {
  width: 40px;
  height: 30px;
  background-color: #42b983;
  cursor: pointer;
  color: #fff;
  border: none;
  border-radius: 4px;
}
select {
  width: 100px;
  height: 36px;
  margin: 20px 20px 0 40px;
}
table {
  border-collapse: collapse;
  margin: 40px;
  width: 100%;
}
table, tr, th, td {
  border: 1px solid #000;
}
td,th {
  padding: 30px;
  text-align: center;
}
td:nth-child(n+1), th:nth-child(n+1) {
  width: 70px;
}
.add-btn {
  width: 100px;
  height: 35px;
  background-color: #42b983;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
  border: none;
  font-size: 14px;
}
</style>
