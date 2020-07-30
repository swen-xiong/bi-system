<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
@import 'styles/reset.scss';
@import 'styles/global.scss';
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 100%;
  height: 100%;
}

/** el-scrollbar 样式重置 */
#app .el-scrollbar__wrap {
  overflow-x: hidden;

  .el-scrollbar__view {
    // height: 100%;
  }
}
</style>
