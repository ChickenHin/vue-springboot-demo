<template>
  <div class="app_body">
    <div class="choose">
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
    </div>
    <div id="tp95_chart" ref="tp95_chart" class="chart"></div>
    <div id="tp99_chart" ref="tp99_chart" class="chart"></div>
    <div id="succ_chart" ref="succ_chart" class="chart"></div>
    <div id="api_tp95_chart" ref="api_tp95_chart" class="chart"></div>
    <div id="api_tp99_chart" ref="api_tp99_chart" class="chart"></div>
    <div id="opt_api_tp95_chart" ref="opt_api_tp95_chart" class="chart"></div>
    <div id="opt_api_tp99_chart" ref="opt_api_tp99_chart" class="chart"></div>
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
      apiLists: [],
      apiLegend: [],
      optApiLists: [],
      optApiLegend: [],
      timeList: ['2018-10-01', '2018-10-02', '2018-10-03', '2018-10-04', '2018-10-05', '2018-10-06', '2018-10-07', '2018-10-08', '2018-10-09', '2018-10-10', '2018-10-11', '2018-10-12', '2018-10-13', '2018-10-14', '2018-10-15', '2018-10-16', '2018-10-17', '2018-10-18', '2018-10-19', '2018-10-20', '2018-10-21', '2018-10-22', '2018-10-23', '2018-10-24', '2018-10-25', '2018-10-26', '2018-10-27', '2018-10-28', '2018-10-29', '2018-10-30', '2018-10-31','2018-11-01', '2018-11-02', '2018-11-03', '2018-11-04', '2018-11-05', '2018-11-06', '2018-11-07', '2018-11-08', '2018-11-09', '2018-11-10', '2018-11-11', '2018-11-12', '2018-11-13', '2018-11-14', '2018-11-15', '2018-11-16', '2018-11-17', '2018-11-18', '2018-11-19', '2018-11-20', '2018-11-21', '2018-11-22', '2018-11-23', '2018-11-24', '2018-11-25', '2018-11-26', '2018-11-27', '2018-11-28', '2018-11-29', '2018-11-30', '2018-12-01', '2018-12-02', '2018-12-03', '2018-12-04', '2018-12-05', '2018-12-06', '2018-12-07', '2018-12-08', '2018-12-09', '2018-12-10', '2018-12-11', '2018-12-12', '2018-12-13', '2018-12-14', '2018-12-15', '2018-12-16', '2018-12-17', '2018-12-18', '2018-12-19', '2018-12-20', '2018-12-21', '2018-12-22', '2018-12-23', '2018-12-24', '2018-12-25', '2018-12-26', '2018-12-27', '2018-12-28', '2018-12-29', '2018-12-30', '2018-12-31','2019-01-01', '2019-01-02', '2019-01-03', '2019-01-04', '2019-01-05', '2019-01-06', '2019-01-07', '2019-01-08', '2019-01-09', '2019-01-10', '2019-01-11', '2019-01-12', '2019-01-13', '2019-01-14', '2019-01-15', '2019-01-16', '2019-01-17', '2019-01-18', '2019-01-19', '2019-01-20', '2019-01-21', '2019-01-22', '2019-01-23', '2019-01-24', '2019-01-25', '2019-01-26', '2019-01-27', '2019-01-28', '2019-01-29', '2019-01-30', '2019-01-31','2019-02-01', '2019-02-02', '2019-02-03', '2019-02-04', '2019-02-05', '2019-02-06', '2019-02-07', '2019-02-08', '2019-02-09', '2019-02-10', '2019-02-11', '2019-02-12', '2019-02-13', '2019-02-14', '2019-02-15', '2019-02-16', '2019-02-17', '2019-02-18', '2019-02-19', '2019-02-20', '2019-02-21', '2019-02-22', '2019-02-23', '2019-02-24', '2019-02-25', '2019-02-26', '2019-02-27', '2019-02-28', '2019-03-01', '2019-03-02', '2019-03-03', '2019-03-04', '2019-03-05', '2019-03-06', '2019-03-07', '2019-03-08', '2019-03-09', '2019-03-10', '2019-03-11', '2019-03-12', '2019-03-13', '2019-03-14', '2019-03-15', '2019-03-16', '2019-03-17', '2019-03-18', '2019-03-19', '2019-03-20', '2019-03-21', '2019-03-22', '2019-03-23', '2019-03-24', '2019-03-25', '2019-03-26', '2019-03-27', '2019-03-28', '2019-03-29', '2019-03-30', '2019-03-31'],
      startTime: '',
      endTime: '',
      timeOption: [],
      tp95Option: [],
      tp99Option: [],
      succOption: [],
      apiTp95Option: [],
      apiTp99Option: [],
      optApiTp95Option: [],
      optApiTp99Option: []
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
          for (var i = 0, len = this.appkeyList.length; i < len; i++) {
            var oneAppkeyApiList = this.appkeyList[i]['apiList']
            console.log(oneAppkeyApiList, 111111)
            for (var j = 0, len2 = oneAppkeyApiList.length; j < len2; j++) {
              var apiName = oneAppkeyApiList[j]['api']
              this.apiLists.push(apiName)
              var isApiOptFlag = oneAppkeyApiList[j]['opt']
              if (isApiOptFlag) {
                this.optApiLists.push(apiName)
              }
            }
          }
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
          text: 'APPKEY_TP95'
        },
        tooltip: {
          trigger: 'axis'
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
          text: 'APPKEY_TP99'
        },
        tooltip: {
          trigger: 'axis'
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
          text: 'APPKEY_SUCCESSRATE'
        },
        tooltip: {
          trigger: 'axis'
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
    drawApiTP95: function () {
      this.handleLegend()
      let myChart = this.$echarts.init(this.$refs.api_tp95_chart)
      var option = {
        title: {
          text: 'API_TP95'
        },
        tooltip: {
          trigger: 'axis'
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
        series: this.apiTp95Option
      }
      myChart.setOption(option, true)
    },
    drawApiTP99: function () {
      this.handleLegend()
      let myChart = this.$echarts.init(this.$refs.api_tp99_chart)
      var option = {
        title: {
          text: 'API_TP99'
        },
        tooltip: {
          trigger: 'axis'
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
        series: this.apiTp99Option
      }
      myChart.setOption(option, true)
    },
    drawOptApiTP95: function () {
      let myChart = this.$echarts.init(this.$refs.opt_api_tp95_chart)
      var option = {
        title: {
          text: 'OPT_API_TP95'
        },
        tooltip: {
          trigger: 'axis'
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
        series: this.optApiTp95Option
      }
      myChart.setOption(option, true)
    },
    drawOptApiTP99: function () {
      let myChart = this.$echarts.init(this.$refs.opt_api_tp99_chart)
      var option = {
        title: {
          text: 'OPT_API_TP99'
        },
        tooltip: {
          trigger: 'axis'
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
        series: this.optApiTp99Option
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
        this.apiLists = []
        this.optApiLists = []
        for (var i = 0, len = this.appkeyList.length; i < len; i++) {
          var oneAppkeyApiList = this.appkeyList[i]['apiList']
          for (var j = 0, len2 = oneAppkeyApiList.length; j < len2; j++) {
            var apiName = oneAppkeyApiList[j]['api']
            this.apiLists.push(apiName)
            var isApiOptFlag = oneAppkeyApiList[j]['opt']
            if (isApiOptFlag) {
              this.optApiLists.push(apiName)
            }
          }
        }
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
    handleLegend: function () {
      this.apiLegend = this.apiLists
      this.optApiLegend = this.optApiLists
      var space = ['', '', '']
      this.apiLegend = space.concat(this.apiLegend)
      this.optApiLegend = space.concat(this.optApiLegend)
    },
    getAppkeyData: function () {
      return this.$axios.get('/api/getAppkeyOctoData', {
        params: {
          apartment: this.selectedApartment,
          startTime: this.startTime,
          endTime: this.endTime
        }
      })
    },
    getApiData: function () {
      return this.$axios.get('/api/getApiOctoData', {
        params: {
          apartment: this.selectedApartment,
          startTime: this.startTime,
          endTime: this.endTime
        }
      })
    },
    getOptApiData: function () {
      return this.$axios.get('/api/getOptApiOctoData', {
        params: {
          apartment: this.selectedApartment,
          startTime: this.startTime,
          endTime: this.endTime
        }
      })
    },
    calAppkeyData: function (response) {
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
    },
    calApiData: function (response) {
      this.apiTp95Option = []
      this.apiTp99Option = []
      var allOctoData = response.data
      console.log(allOctoData, 111111)
      var oneApiDataList = []
      for (var i = 0, len1 = this.apiLists.length; i < len1; i++) {
        var api = this.apiLists[i]
        oneApiDataList = allOctoData[api]
        var oneApiTP95List = []
        var oneApiTP99List = []
        for (var j = 0, len = oneApiDataList.length; j < len; j++) {
          oneApiTP95List.push(oneApiDataList[j].tp95)
          oneApiTP99List.push(oneApiDataList[j].tp99)
        }
        var apiTp95ChartData = {
          name: api,
          type: 'line',
          data: oneApiTP95List
        }
        var apiTp99ChartData = {
          name: api,
          type: 'line',
          data: oneApiTP99List
        }
        this.apiTp95Option.push(apiTp95ChartData)
        this.apiTp99Option.push(apiTp99ChartData)
      }
      console.log(this.apiTp95Option)
      this.drawApiTP95()
      this.drawApiTP99()
    },
    calOptApiData: function (response) {
      this.optApiTp95Option = []
      this.optApiTp99Option = []
      var allOctoData = response.data
      var oneOptApiDataList = []
      for (var i = 0, len1 = this.optApiLists.length; i < len1; i++) {
        var api = this.optApiLists[i]
        oneOptApiDataList = allOctoData[api]
        var oneOptApiTP95List = []
        var oneOptApiTP99List = []
        for (var j = 0, len = oneOptApiDataList.length; j < len; j++) {
          oneOptApiTP95List.push(oneOptApiDataList[j].tp95)
          oneOptApiTP99List.push(oneOptApiDataList[j].tp99)
        }
        var optApiTp95ChartData = {
          name: api,
          type: 'line',
          data: oneOptApiTP95List
        }
        var optApiTp99ChartData = {
          name: api,
          type: 'line',
          data: oneOptApiTP99List
        }
        this.optApiTp95Option.push(optApiTp95ChartData)
        this.optApiTp99Option.push(optApiTp99ChartData)
      }
      this.drawOptApiTP95()
      this.drawOptApiTP99()
    },
    confirmQuery: function () {
      this.$axios.all([this.getAppkeyData(), this.getApiData(), this.getOptApiData()])
        .then(this.$axios.spread((response1, response2, response3) => {
          this.timeOption = this.getAllDayInRange(this.startTime, this.endTime)
          this.calAppkeyData(response1)
          this.calApiData(response2)
          this.calOptApiData(response3)
        })).catch(function (response) {
          console.log(response)
        })
    }
  }
}
</script>

<style scoped>
.app_body {
  margin: 40px;
  padding: 20px;
  /*border-radius: 0 100px 100px 0;*/
  height: 100%;
  background-color: #ffffff;
  overflow: auto;
}
.chart {
  width: 500px;
  height: 300px;
  margin: 50px 50px;
  float: left;
}
select {
  width: 100px;
  height: 36px;
  margin: 20px;
}
button {
  width: 100px;
  height: 35px;
  background-color: #107957;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
  border: none;
  font-size: 14px;
  margin-left: 20px;
}
button:hover {
  opacity: 0.8;
}
.choose {
  width: 800px;
  margin: 20px auto;
}
</style>
