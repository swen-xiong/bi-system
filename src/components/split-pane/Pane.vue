<template>
  <div :class="classes">
    <!-- <el-scrollbar style="height:100%;"> -->
      <slot></slot>
    <!-- </el-scrollbar> -->
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({
  name: 'Pane'
})
export default class Pane extends Vue {
  /**
   * pane 应用的外部class
   */
  @Prop(String)
  public className!: string;

  /**
   * 标识该pane是水平pane还是垂直pane
   * 取值为：'vertical' / 'horizontal'
   */
  @Prop(String)
  public split!: string;

  /**
   * 应用的class
   */
  private classes: string = [this.split, this.className].join(' ');
}
</script>

<style lang="scss">
.split-pane {

  .el-scrollbar__view {
    height: 100%;
  }
}
.splitter-pane.vertical.splitter-paneL {
  position: absolute;
  left: 0px;
  height: 100%;
  // padding-right: 3px;
}
.splitter-pane.vertical.splitter-paneR {
  position: absolute;
  right: 0px;
  height: 100%;
  // padding-left: 3px;
}
.splitter-pane.horizontal.splitter-paneL {
  position: absolute;
  top: 0px;
  width: 100%;
}
.splitter-pane.horizontal.splitter-paneR {
  position: absolute;
  bottom: 0px;
  width: 100%;
  // padding-top: 3px;
}
</style>
