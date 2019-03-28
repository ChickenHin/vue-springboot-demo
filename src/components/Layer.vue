<template>
  <div>
    <div class="shade"></div>
    <div class="layer">
      <div class="layer-head"></div>
      <div class="layer-body" v-if="type == 1">
        <form>
          <label>请输入appkey</label>
          <textarea v-model="inputVal" placeholder="请输入appkey，可输入多个，用英文逗号隔开"/>
        </form>
        <div class="btns">
          <button class="confirm-btn" @click="confirmAddAppkey()">确&nbsp;&nbsp;认</button>
          <button class="cancle-btn" @click="cancleAdd()">取&nbsp;&nbsp;消</button>
        </div>
      </div>
      <div class="layer-body" v-if="type == 2">
        <label>请输入appkey</label>
        <input v-model="inputAppkey" class="text_input"/>
        <label>请输入api</label>
        <input v-model="inputApi" class="text_input"/>
        <form class="radio_form">
          <p>是否待优化接口</p>
          <div class="radio_div">
            <label class="radio_label">
              <input type="radio" value="1" name="opt" @select="this.isOptApi = true" class="radio_input"/>是
            </label>
            <label class="radio_label">
              <input type="radio" value="0" name="opt" @select="this.isOptApi = false" class="radio_input"/>否
            </label>
          </div>
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
  width: 480px;
  position: absolute;
  left: 50%;
  height: 300px;
  margin-left: -240px;
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
.radio_form {
  position: relative;
}
.radio_div {
  position: absolute;
  top: 0;
  left: 140px;
}
.layer-body {
  height: 260px;
  overflow: auto;
  width: 400px;
  margin: 0 40px;
}
.text_input {
  width: 390px;
  height: 30px;
  margin: 10px auto;
}
button {
  width: 80px;
  height: 30px;
  background-color: #107957;
  border-radius: 5px;
  cursor: pointer;
  border: none;
  color: #ffffff;
  font-size: 14px;
}
button:hover {
  opacity: 0.8;
}
.btns {
  margin: 20px auto;
  width: 200px;
}
.btns button:nth-child(2) {
  margin-left: 20px;
}
textarea {
  width: 394px;
  height: 80px;
  margin-top: 20px;
}
p {
  margin: 0;
}
</style>
