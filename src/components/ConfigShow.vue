<template>
  <div class="app_body">
    <select id="service-select" v-model="selectedApartment" @change="selectApartment">
      <option v-for="(service,index) in serviceList" v-bind:key=index>{{service}}</option>
    </select>
    <button class="add-btn" @click="addAppkey()">添加appkey</button>
    <button class="add-btn" @click="addApi()">添加接口</button>
    <layer :type="1" v-on:confirmAdd="confirmAddAppkey" v-on:cancleAdd="cancleAddAppkey" v-if="appkeyLayerFlag"></layer>
    <layer :type="2" v-on:confirmAdd="confirmAddApi" v-on:cancleAdd="cancleAddApi" v-if="apiLayerFlag"></layer>
    <table>
      <thead>
        <tr>
          <th>appkey</th>
          <th>api(*为待优化接口)</th>
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
      selectedApartment: 0,
      appkeyList: [],
      appkeyLayerFlag: false,
      apiLayerFlag: false,
      inputVal: ''
    }
  },
  created () {
    this.$axios.get('/api/getApartment')
      .then((response) => {
        this.serviceList = response.data
        this.selectedApartment = this.serviceList[0]
        this.$axios.get('/api/getAppkeyAndApi', {
          params: {
            apartment: this.selectedApartment
          }
        }).then((response) => {
          this.appkeyList = response.data
        }).catch(function (response) {
          console.log(response)
        })
      }).catch(function (response) {
        console.log(response)
      })
  },
  methods: {
    addAppkey: function () {
      this.appkeyLayerFlag = true
    },
    cancleAddAppkey: function () {
      this.appkeyLayerFlag = false
    },
    confirmAddAppkey: function (val) {
      this.appkeyLayerFlag = false
      this.$axios.post('/api/addAppkey', this.qs.stringify({
        apartment: this.selectedApartment,
        appkey: val,
        api: val
      })).then((response) => {
        console.log(response.data)
      }).catch(function (response) {
        console.log(response)
      })
    },
    addApi: function () {
      this.apiLayerFlag = true
    },
    cancleAddApi: function () {
      this.apiLayerFlag = false
    },
    confirmAddApi: function (data) {
      this.apiLayerFlag = false
      this.$axios.post('/api/addApi', this.qs.stringify({
        apartment: this.selectedApartment,
        appkey: data['appkey'],
        api: data['api'],
        opt: data['opt']
      })).then((response) => {
        console.log(response.data)
      }).catch(function (response) {
        console.log(response)
      })
    },
    selectApartment: function () {
      this.$axios.get('/api/getAppkeyAndApi', {
        params: {
          apartment: this.selectedApartment
        }
      }).then((response) => {
        this.appkeyList = response.data
        console.log(this.appkeyList)
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
.app_body {
  margin: 40px;
  padding: 60px;
  /*border-radius: 0 100px 100px 0;*/
  height: 100%;
  overflow: auto;
  background-color: #ffffff;
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
select {
  width: 100px;
  height: 36px;
  margin: 20px;
}
table {
  border-collapse: collapse;
  margin: 40px auto;
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
  /*width: 70px;*/
}
.add-btn {
  width: 100px;
  height: 35px;
  background-color: #107957;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
  border: none;
  font-size: 14px;
}
.add-btn:hover {
  opacity: 0.8;
}
</style>
