<template>
  <el-dialog
    custom-class="bi-filter-number-dialog"
    @close="clearData"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :visible.sync="visible">
    <div slot="title" class="title">筛选器字段 [{{field.name}}]</div>

    <div class="container">
      <div class="tip">您要如何对[{{field.name}}]进行筛选？</div>
      <div class="content">
        <ul class="bi-ul">
          <li v-for="(group, index) in filterFields" :key="index" class="group">
            <ul class="bi-ul">
              <li v-for="(item, fieldIndex) in group" :key="fieldIndex" class="field-item" :class="{'active': selectObj === item, 'bold': item.bold}" @click="select(item)">
                <i class="el-icon-info"></i>{{item.name}}
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>

    <div slot="footer" class="dialog-footer">
      <el-button size="medium" @click="cancel">取 消</el-button>
      <el-button size="medium" type="primary" @click="confirm">下一步</el-button>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator'
import CONST from '../../const'
import { ICube, ICubeFilter } from '../../interface'
import { CubeModule } from '../../store/modules/cube'

@Component({
  name: 'filter-pre-dialog'
})
export default class extends Vue {
  @Prop() private showDialog!: boolean

  // 筛选字段
  @Prop() private field!: ICube

  // 筛选字段类型 默认number-数值类型  date-日期类型
  @Prop() private type!: string

  // 选中的筛选算法
  private selectObj: ICubeFilter = {} as ICubeFilter

   // 实际类型
  get realType(): string {
    if ([...Object.values(CONST.types.CUBE_TYPES)].includes(this.type)) {
      return this.type;
    } else {
      return [...Object.values(CONST.types.CUBE_TYPES)][0]
    }
  }

  get visible() {
    return this.showDialog;
  }

  set visible(value: boolean) {
    this.$emit('update:showDialog', value)
  }

  // 数值类型字段筛选项
  get filterFields(): any[][] {
    if (this.realType === 'number') {
      return CONST.filter.FILTER_NUMBER_ARRAY;
    } else if (this.realType === 'date') {
      return CONST.filter.FILTER_DATE_ARRAY
    }
    return CONST.filter.FILTER_NUMBER_ARRAY
  }

  // 选中计算方式
  private select(item: ICubeFilter) {
    this.selectObj = item
  }

  private cancel() {
    this.$emit('update:showDialog', false)
  }

  private confirm() {
    this.cancel()
    const curCube = this.$store.state.cube.curCube;
    curCube.filter = this.selectObj;
    CubeModule.updateCube(curCube);
    this.$emit('confirm', this.selectObj)
  }

  // 关闭dialog时重置data
  private clearData() {
    this.selectObj = {} as ICubeFilter
  }
}
</script>

<style lang="scss">
.bi-filter-number-dialog {
  width: 360px;

  .el-dialog__header {
    padding: 20px 20px 5px;
    border-bottom: 1px solid #888;
  }

  .el-dialog__body {
    padding: 10px 20px;
  }

  .title {
    text-align: left;
    @include user-select-none;
  }

  .container {
    text-align: left;

    .tip {
      margin-bottom: 5px;
    }
    
    .content {
      border: 1px solid #888;
      padding: 1px;

      .group {
        padding: 2px 0px;
        border-bottom: 1px solid #888;

        &:last-child {
          border: none;
          margin-bottom: 20px;
        }

        .field-item {
          padding: 3px 10px;
          border-radius: 3px;
          border: 1px solid transparent;
          @include user-select-none;

          &:hover {
            border-color: #b9d7fc;
            background: linear-gradient(#fff, #ecf5ff);
          }
          &.active {
            border-color: rgb(132,172,221);
            background: linear-gradient(#fff, #d0e6ff);
          }

          i {
            margin-right: 10px;
            color: $tagColor2;
          }
        }
      }
    }
  }
}
</style>
