<template>
  <div class="bi-filter-dialog">
    <filter-pre-dialog 
      :show-dialog.sync="showPre"
      :field="curCube"
      :type="curCube.type"
      @confirm="filterConfirm">
    </filter-pre-dialog>

    <filter-range-dialog 
      :show-dialog.sync="showRange"
      :field="curCube"
      :type="curCube.type"
      @confirm="filterRangeConfirm">
    </filter-range-dialog>

    <filter-normal-dialog 
      v-if="showNormal"
      :show-dialog.sync="showNormal"
      :field="curCube"
      :type="curCube.type"
      @confirm="filterNormalConfirm">
    </filter-normal-dialog>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import FilterPre from './FilterPre.vue'
import FilterRange from './FilterRange.vue'
import FilterNormal from './FilterNormal.vue'
import { ICube } from '../../interface'
import { CubeModule } from '../../store/modules/cube'
import CONST from '../../const'

@Component({
  name: 'filter-dialog',
  components: {
    'filter-pre-dialog': FilterPre,
    'filter-range-dialog': FilterRange,
    'filter-normal-dialog': FilterNormal
  }
})
export default class extends Vue {
  private showPre: boolean = false
  private showRange: boolean = false
  private showNormal: boolean = false

  /**
   * 获取对应的cube
   */
  get curCube(): ICube {
    return this.$store.state.cube.curCube;
  }

  /**
   * 初始化时判断显示哪个dialog
   * TODO 判断cube是否为聚合字段，若是聚合字段，直接进行数值类型的范围选择
   * 若字段为非聚合数值类型字段或日期字段，先进行字段预筛选
   * 若字段为普通字段，则弹出普通字段的筛选
   */
  public showDialog() {
    if (this.curCube.type === 'number' || this.curCube.type === 'date') {
      this.showPre = true
    } else {
      this.showNormal = true
    }
  }

  private filterConfirm(value: any) {
    console.log(value)
    this.showRange = true;
    // CubeModule.addCube({
    //   cube: CubeModule.curCube,
    //   type: CONST.cube.CUBE_CATEGORY.FILTERS
    // })
  }

  private filterRangeConfirm(value: any) {
    console.log(value)
    CubeModule.addCube({
      cube: CubeModule.curCube,
      type: CONST.cube.CUBE_CATEGORY.FILTERS
    })
  }

  private filterNormalConfirm(value: any) {
    console.log(value)
    // CubeModule.addCube({
    //   cube: CubeModule.curCube,
    //   type: CONST.cube.CUBE_CATEGORY.FILTERS
    // })
  }
}
</script>

<style lang="scss">
.bi-filter-dialog {

}
</style>
