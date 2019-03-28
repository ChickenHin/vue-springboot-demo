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
    <button @click="confirmQuery">查&nbsp;&nbsp;询</button>
    <div id="tp95_chart" ref="tp95_chart" class="chart"></div>
    <div id="tp99_chart" ref="tp99_chart" class="chart"></div>
    <div id="succ_chart" ref="succ_chart" class="chart"></div>
  </div>
</template>

<script>
export default {
  name: 'DataShow',
  data () {
    return {
      serviceList: [],
      selectedApartment: 0,
      appkeyList: [],
      timeList: ['2019-03-17', '2019-03-18', '2019-03-19', '2019-03-20', '2019-03-21', '2019-03-22', '2019-03-23', '2019-03-24', '2019-03-25', '2019-03-26', '2019-03-27', '2019-03-28'],
      startTime: '',
      endTime: '',
      timeOption: [],
      tp95Option: [],
      tp99Option: [],
      succOption: []
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
        }).then((a) => {
          this.appkeyList = a.data
        }).catch(function (response) {
          console.log(response)
        })
      }).catch(function (response) {
        console.log(response)
      })
  },
  mounted () {
    this.getRecentDate()
  },
  methods: {
    drawTP95: function () {
      let myChart = this.$echarts.init(this.$refs.tp95_chart)
      var option = {
        title: {
          text: 'CRM_TP95'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: this.appkeyList
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.timeOption
        },
        yAxis: {
          type: 'value'
        },
        series: this.tp95Option
      }
      myChart.setOption(option, true)
    },
    drawTP99: function () {
      let myChart = this.$echarts.init(this.$refs.tp99_chart)
      var option = {
        title: {
          text: 'CRM_TP99'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: this.appkeyList
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.timeOption
        },
        yAxis: {
          type: 'value'
        },
        series: this.tp99Option
      }

      myChart.setOption(option, true)
    },
    drawSucc: function () {
      let myChart = this.$echarts.init(this.$refs.succ_chart)
      var option = {
        title: {
          text: 'CRM_SUCCESSRATE'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: this.appkeyList
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.timeOption
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            formatter: function (value, index) {
              return value.toFixed(2)
            }
          },
          min: 90,
          max: 100,
          split: 10
        },
        series: this.succOption
      }

      myChart.setOption(option, true)
    },
    selectApartment: function () {
      this.$axios.get('/api/getAppkeyAndApi', {
        params: {
          apartment: this.selectedApartment
        }
      }).then((response) => {
        this.appkeyList = response.data
        console.log(response.data)
      }).catch(function (response) {
        console.log(response)
      })
    },
    getRecentDate: function () {
      var date = new Date()
      var month = date.getMonth() + 1
      if (month <= 9) {
        month = '0' + month
      }
      var day = date.getDate()
      if (day <= 9) {
        day = '0' + day
      }
      var time = date.getFullYear() + '-' + month + '-' + day
      this.startTime = time
      this.endTime = time
    },
    getAllDayInRange: function (start, end) {
      if (!start || !end) {
        alert('开始或结束时间不能为空')
        return false
      }
      Date.prototype.format = function () {
        var s = ''
        var month = this.getMonth() + 1
        var day = this.getDate()
        s += this.getFullYear() + '-'
        s += month + '-'
        s += day
        return s
      }
      var startNum = start.split('-')
      var endNum = end.split('-')
      var startDate = new Date()
      // 返回符合UTC的时间格式
      startDate.setUTCFullYear(startNum[0], startNum[1] - 1, startNum[2])
      var endDate = new Date()
      endDate.setUTCFullYear(endNum[0], endNum[1] - 1, endNum[2])
      var unixStart = startDate.getTime()
      var unixEnd = endDate.getTime()
      var arr = []
      for (var k = unixStart; k <= unixEnd;) {
        arr.push(new Date(parseInt(k)).format())
        k = k + 24 * 60 * 60 * 1000
      }
      return arr
    },
    confirmQuery: function () {
      this.$axios.get('/api/getAppkeyOctoData', {
        params: {
          apartment: this.selectedApartment,
          startTime: this.startTime,
          endTime: this.endTime
        }
      }).then((response) => {
        this.timeOption = this.getAllDayInRange(this.startTime, this.endTime)
        this.tp95Option = []
        this.tp99Option = []
        this.succOption = []
        var allOctoData = response.data
        var oneAppkeyDataList = []
        for (var i = 0, len1 = this.appkeyList.length; i < len1; i++) {
          var appkey = this.appkeyList[i]['appkey']
          oneAppkeyDataList = allOctoData[appkey]

          var oneAppkeyTP95List = []
          var oneAppkeyTP99List = []
          var oneAppkeySuccList = []
          for (var j = 0, len = oneAppkeyDataList.length; j < len; j++) {
            oneAppkeyTP95List.push(oneAppkeyDataList[j].tp95)
            oneAppkeyTP99List.push(oneAppkeyDataList[j].tp99)
            oneAppkeySuccList.push(oneAppkeyDataList[j].successrate)
          }
          var tp95ChartData = {
            name: appkey,
            type: 'line',
            data: oneAppkeyTP95List
          }
          var tp99ChartData = {
            name: appkey,
            type: 'line',
            data: oneAppkeyTP99List
          }
          var succChartData = {
            name: appkey,
            type: 'line',
            data: oneAppkeySuccList
          }
          this.tp95Option.push(tp95ChartData)
          this.tp99Option.push(tp99ChartData)
          this.succOption.push(succChartData)
        }
        this.drawTP95()
        this.drawTP99()
        this.drawSucc()
        console.log(this.tp95Option, 111111111)
      }).catch(function (response) {
        console.log(response)
      })
    }
  }
}
</script>

<style scoped>
.app_body {
  margin: 20px 0 0 180px;
  padding: 20px;
  border: 1px solid #000;
  height: 100%;
}
.chart {
  width: 1100px;
  height: 500px;
  margin: 50px 40px;
}
select {
  width: 100px;
  height: 36px;
  margin: 20px 20px 0 40px;
}
button {
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
