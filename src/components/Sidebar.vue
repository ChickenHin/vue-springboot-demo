<template>
  <div>
    <ul>
      <li>
        <router-link to="/dataShow">数据展示</router-link>
      </li>
      <li>
        <router-link to="/configShow">配置查看</router-link>
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
  height: 100%;
  width: 120px;
  border: 1px solid #000;
  position: absolute;
  left: 0;
  top: 60px;
  margin-top: 20px;
  padding: 20px;
  margin-right: 20px;
}
ul {
  list-style: none;
  padding: 0 20px;
}
li {
  margin: 14px auto;
}
a {
  color: #36495d;
  text-decoration: none;
}

</style>
