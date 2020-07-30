<template>
  <el-dialog
    :custom-class="getDialogClass"
    @close="clearData"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :visible.sync="visible">
    <filter-pre-dialog
      :type="realType"
      :field="field"
      >
    </filter-pre-dialog>
  </el-dialog>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { ICube, ICubeFilter } from '../../interface'
import FilterPreDialog from './FilterPreDialog.vue';
/** 筛选器字段类型取值范围 */
const typeList = [
  'number',
  'date'
]

@Component({
  name: 'filter-dialog',
  components: {
    'filter-pre-dialog': FilterPreDialog
  }
})
export default class extends Vue {
  @Prop() private showDialog!: boolean

  // 筛选字段
  @Prop() private field!: ICube

  // 筛选字段类型 默认number-数值类型  date-日期类型
  @Prop() private type!: string

  // 选中的筛选算法
  private selectObj: ICubeFilter = {} as ICubeFilter

  get realType(): string {
    if (typeList.includes(this.type)) {
      return this.type;
    } else {
      return typeList[0]
    }
  }

  get visible() {
    return this.showDialog;
  }

  set visible(value: boolean) {
    this.$emit('update:showDialog', value)
  }

  private getDialogClass(): string {
    return 'bi-filter-number-dialog'
  }
}
</script>

<style lang="scss" scoped>
.filter-dialog {

}
</style>
