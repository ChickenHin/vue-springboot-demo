<template>
  <div class="app_body">
    <select id="service-select" v-model="selectedApartment" @change="selectApartment">
      <option v-for="(service,index) in serviceList" v-bind:key=index>{{service}}</option>
    </select>
    <select class="time-select" v-model="startTime" >
      <option v-for="(time,index) in timeList" v-bind:key=index>{{time}}</option>
    </select>
    <select class="time-select" v-model="endTime" >
      <option v-for="(time,index) in timeList" v-bind:key=index>{{time}}</option>
    </select>
    <button @click="pullData">拉取数据</button>
  </div>
</template>

<script>
export default {
  name: 'ConfigShow',
  data () {
    return {
      serviceList: [],
      selectedApartment: 0,
      timeList: ['2019-02-01', '2019-02-02', '2019-02-03', '2019-02-04', '2019-02-05', '2019-02-06', '2019-02-07', '2019-02-08', '2019-02-09', '2019-02-10', '2019-02-11', '2019-02-12', '2019-02-13', '2019-02-14', '2019-02-15', '2019-02-16', '2019-02-17', '2019-02-18', '2019-02-19', '2019-02-20', '2019-02-21', '2019-02-22', '2019-02-23', '2019-02-24', '2019-02-25', '2019-02-26', '2019-02-27', '2019-02-28', '2019-02-29', '2019-02-30', '2019-02-31', '2019-03-01', '2019-03-02', '2019-03-03', '2019-03-04', '2019-03-05', '2019-03-06', '2019-03-07', '2019-03-08', '2019-03-09', '2019-03-10', '2019-03-11', '2019-03-12', '2019-03-13', '2019-03-14', '2019-03-15', '2019-03-16', '2019-03-17', '2019-03-18', '2019-03-19', '2019-03-20', '2019-03-21', '2019-03-22', '2019-03-23', '2019-03-24', '2019-03-25', '2019-03-26', '2019-03-27', '2019-03-28', '2019-03-29', '2019-03-30', '2019-03-31'],
      startTime: '',
      endTime: ''
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
        }).catch(function (response) {
          console.log(response)
        })
      }).catch(function (response) {
        console.log(response)
      })
  },
  methods: {
    pullData: function () {
      this.$axios.get('/api/pullOctoDataInRange', {
        params: {
          apartment: this.selectedApartment,
          startTime: this.startTime,
          endTime: this.endTime
        }
      }).then((response) => {
        alert('成功')
      }).catch(function (response) {
        alert('失败')
      })
    }
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
select {
  width: 100px;
  height: 36px;
  margin: 20px;
}
</style>
