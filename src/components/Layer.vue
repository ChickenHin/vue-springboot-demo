<template>
  <div>
    <div class="shade"></div>
    <div class="layer">
      <div class="layer-head"></div>
      <div class="layer-body" v-if="type == 1">
        <form>
          <label >请输入appkey</label>
          <input v-model="inputVal" />
        </form>
        <div class="btns">
          <button class="confirm-btn" @click="confirmAddAppkey()">确&nbsp;&nbsp;认</button>
          <button class="cancle-btn" @click="cancleAdd()">取&nbsp;&nbsp;消</button>
        </div>
      </div>
      <div class="layer-body" v-if="type == 2">
        <form >
          <label >请输入appkey</label>
          <input v-model="inputAppkey" />
          <label >请输入api</label>
          <input v-model="inputApi" />
          <label >是否待优化接口</label>
          <input type="radio" value="1" name="opt" @select="this.isOptApi = true"/>是
          <input type="radio" value="0" name="opt" @select="this.isOptApi = false"/>否
        </form>
        <div class="btns">
          <button class="confirm-btn" @click="confirmAddApi()">确&nbsp;&nbsp;认</button>
          <button class="cancle-btn" @click="cancleAdd()">取&nbsp;&nbsp;消</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return {
      inputVal: '',
      inputAppkey: '',
      inputApi: '',
      isOptApi: false
    }
  },
  props: {
    type: Number
  },
  mounted () {
    this.data = this.type
  },
  methods: {
    confirmAddAppkey: function () {
      this.$emit('confirmAdd', this.inputVal)
    },
    cancleAdd: function () {
      this.$emit('cancleAdd')
    },
    confirmAddApi: function () {
      let data = {'appkey': this.inputAppkey, 'api': this.inputApi, 'opt': this.isOptApi}
      this.$emit('confirmAdd', data)
    }
  }
}
</script>

<style scoped>
.shade {
  position: fixed;
  top: 0;
  left: 0;
  background-color: #333;
  width: 100%;
  height: 100%;
  z-index: 9999;
  opacity: 0.5;
}
.layer {
  background: #fff;
  border-radius: 4px;
  width: 400px;
  position: absolute;
  left: 50%;
  height: 200px;
  margin-left: -200px;
  z-index: 9999;
}
.layer-head {
  background: #f2f2f2;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  border-radius: 4px;
  font-size: 14px;
  height: 40px;
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
}
.layer-body {
  height: 160px;
  overflow: auto;
  width: 360px;
  padding: 0 20px;
}
form {
  margin-top: 20px;
}
input {
  width: 230px;
  height: 30px;
  border: 1px solid #000000;
  margin-left: 120px;
  margin-top: -20px;
}
button {
  width: 80px;
  height: 30px;
  background-color: #42b983;
  color: #000;
  border-radius: 5px;
  cursor: pointer;
  border: none;
  font-size: 14px;
}
button:hover {
  background-color: darkgoldenrod;
}
.btns {
  margin: 20px auto;
  width: 200px;
}
</style>
