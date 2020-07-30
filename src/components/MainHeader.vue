<template>
  <div class="bi-main-header">
    <split-pane-custom split="horizontal" :min-size="36" ref="rowColPane">
      <bi-tag-row-col slot="paneL" type="row" v-bi-drop="{cb: addRow}"></bi-tag-row-col>
      <bi-tag-row-col slot="paneR" type="col" v-bi-drop="{cb: addCol}"></bi-tag-row-col>
    </split-pane-custom>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { getModule } from 'vuex-module-decorators'
import TagRowCol from './TagRowCol.vue'
import { CubeModule } from '../store/modules/cube'

@Component({
  name: 'bi-main-header',
  components: {
    'bi-tag-row-col': TagRowCol
  }
})
export default class MainHeader extends Vue {
  /**
   * 添加行
   */
  private addRow(data: any) {
    CubeModule.addRowCube(data);
  }

  /**
   * 添加列
   */
  private addCol(data: any) {
    CubeModule.addColCube(data);
  }
}
</script>

<style lang="scss" scoped>
.bi-main-header {
  height: 100%;
  font-size: 14px;
}
</style>
