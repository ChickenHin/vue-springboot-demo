<template>
  <div>
    <ul>
      <li>
        <router-link to="/dataShow">///&nbsp;&nbsp;数据展示</router-link>
      </li>
      <li>
        <router-link to="/configShow">///&nbsp;&nbsp;配置查看</router-link>
      </li>
      <li>
        <router-link to="/pullData">///&nbsp;&nbsp;数据拉取</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Sidebar'
}
</script>

<style scoped>
div {
  height: 110px;
  width: 500px;
  position: absolute;
  left: 160px;
  top: 0px;
}
ul {
  list-style: none;
}
li {
  color: #fff;
  height: 110px;
  width: 140px;
  border-radius: 8px;
  text-align: center;
  vertical-align: middle;
  float: left;
}
a {
  color: #fff;
  text-decoration: none;
  line-height: 110px;
  font-size: 18px;
}
</style>
