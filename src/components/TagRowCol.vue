<template>
  <div class="bi-tag-row-col">
    <el-row>
      <el-col v-if="type === 'row'" class="row-header clearfix">
        <i class="el-icon-notebook-2"></i>行
        <i class="el-icon-caret-bottom"></i>
      </el-col>
      <el-col v-if="type === 'col'" class="row-header col-header clearfix">
        <i class="el-icon-data-analysis"></i>列
        <i class="el-icon-caret-bottom"></i>
      </el-col>
      <el-col class="row-tags">
        <el-tag 
          size="mini"
          effect="dark"
          closable
          @close="remove(tag, index)"
          v-for="(tag, index) in tagList" 
          :key="tag.id">{{tag.name}}
        </el-tag>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { CubeModule } from '@/store/modules/cube'
import { DispatchOptions } from 'vuex';

@Component({
  name: 'bi-tag-row-col'
})
export default class TagRowCol extends Vue {
  /**
   * 标识行或列
   * 取值 'row' 或 'col'
   */
  @Prop({
    required: true,
    validator: (value) => {
      return ['row', 'col'].indexOf(value) >= 0;
    }
  })
  public type!: string;

  get tagList(): any[] {
    if (this.type === 'row') {
      return this.$store.state.cube.row
    } else {
      return this.$store.state.cube.col
    }
  }

  public remove(tag: any, index: number) {
    CubeModule.removeCube({index, type: this.type});
  }
}
</script>

<style lang="scss" scoped>
.bi-tag-row-col {
  height: 100%;
  font-size: 14px;
  background: #fff;
  border: 1px solid $paneBorder;

  .el-row {
    text-align: left;
    height: 100%;
  }

  .row-header {
    height: 100%;
    width: 150px;
    padding: 5px;
    line-height: 22px;
    border-right: 1px solid $borderColor;
    cursor: default;

    &>i:first-child {
      margin-right: 5px;
    }
    &>i:last-child {
      padding: 4px;
      cursor: pointer;
      display: none;
      float: right;
    }
    &:hover>i:last-child {
      display: inline-block;

      &:hover {
        background: $borderColor;
      }
    }
  }

  .row-tags {
    height: 100%;
    width: calc(100% - 150px);
    padding: 5px 10px;
  }

  .el-tag + .el-tag {
    margin-left: 10px;
  }
}
</style>
