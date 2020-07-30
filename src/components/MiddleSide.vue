<template>
  <div class="bi-middle-side">
    <split-pane-custom split="horizontal" :min-size="200">
      <template slot="paneL">
        <split-pane-custom split="horizontal" pane-class="middle-pane-bg" :min-size="100">
          <div class="middle-block middle-page" slot="paneL" v-bi-drop="{cb: addPageCube}">
            <div class="block-header">
              <span>页面</span>
              <i class="el-icon-caret-bottom"></i>
            </div>
            <el-scrollbar class="block-content">
              <transition-group tag="ul" name="el-zoom-in-center" class="bi-ul">
                <li v-for="(item, index) in pageCubes" :key="item.id">
                  <div class="block-item-name">
                    <span>{{item.name}}</span>
                    <i class="el-icon-close" @click="removeCube(index, CUBE_CATEGORY.PAGES)"></i>
                  </div>
                </li>
              </transition-group>
            </el-scrollbar>
          </div>
          <div class="middle-block middle-filter" slot="paneR" v-bi-drop="{cb: addFilterCube}">
            <div class="block-header">
              <span>筛选器</span>
              <i class="el-icon-caret-bottom"></i>
            </div>
            <el-scrollbar class="block-content">
              <transition-group tag="ul" name="el-zoom-in-center" class="bi-ul">
                <li v-for="(item, index) in filterCubes" :key="item.id" class="filter">
                  <div class="block-item-name">
                    <span>{{item.name}}</span>
                    <i class="el-icon-close" @click="removeCube(index, CUBE_CATEGORY.FILTERS)"></i>
                  </div>
                </li>
              </transition-group>
            </el-scrollbar>
          </div>
        </split-pane-custom>
      </template>
      <template slot="paneR">
        <split-pane-custom split="horizontal" pane-class=" middle-pane-bg" :min-size="120">
          <div class="middle-block middle-sign" slot="paneL" v-bi-drop="{cb: addSignCube}">
            <div class="block-header">
              <span>标记</span>
              <i class="el-icon-caret-bottom"></i>
            </div>
            <el-scrollbar class="block-content">
              <transition-group tag="ul" name="el-zoom-in-center" class="bi-ul">
                <li v-for="(item, index) in signCubes" :key="item.id" class="sign">
                  <div class="block-item-name">
                    <span>{{item.name}}</span>
                    <i class="el-icon-close" @click="removeCube(index, CUBE_CATEGORY.SIGNS)"></i>
                  </div>
                </li>
              </transition-group>
            </el-scrollbar>
          </div>
          <div class="middle-block middle-measure" slot="paneR" v-bi-drop>
            <div class="block-header">
              <span>度量值</span>
              <i class="el-icon-caret-bottom"></i>
            </div>
          </div>
        </split-pane-custom>
      </template>
    </split-pane-custom>

    <filter-dialog :visible="showDialog" ref="filterDialog">
    </filter-dialog>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { ICube } from '../interface'
import { CubeModule } from '../store/modules/cube'
import CONST from '../const'
import FilterDialog from './dialog/FilterDialog.vue'

@Component({
  name: 'bi-middle-side',
  components: {
    'filter-dialog': FilterDialog
  }
})
export default class MiddleSide extends Vue {
  private CUBE_CATEGORY = CONST.cube.CUBE_CATEGORY
  private showDialog: boolean = false
  private showRange: boolean = false
  private showNormal: boolean = false

  private pageItems: any[] = [
    {id: '1001', type: 'number', name: '利润'},
    {id: '1002', type: 'number', name: '利润率'},
    {id: '1003', type: 'number', name: '折扣'},
    {id: '1004', type: 'integer', name: '数量'},
    {id: '1005', type: 'number', name: '销售额'},
    {id: '1006', type: 'datetime', name: '销售时间'},
    {id: '1007', type: 'date', name: '结算日期'},
    {id: '1008', type: 'string', name: '字符串'},
    {id: '1009', type: 'boolean', name: '是否盈利'},
  ]

  /**
   * 获取对应的cube
   */
  get curCube(): ICube {
    return this.$store.state.cube.curCube;
  }
  get pageCubes(): ICube[] {
    return this.$store.state.cube.pages;
  }
  get filterCubes(): ICube[] {
    return this.$store.state.cube.filters;
  }
  get signCubes(): ICube[] {
    return this.$store.state.cube.signs;
  }

  /**
   * 页面、筛选器、标记 cube增加或删除
   */
  private addPageCube() {
    CubeModule.addCube({
      cube: CubeModule.curCube,
      type: CONST.cube.CUBE_CATEGORY.PAGES
    })
  }
  private addFilterCube() {
    /**
     * TODO 判断cube是否为聚合字段，若是聚合字段，直接进行数值类型的范围选择
     * 若字段为非聚合数值类型字段或日期字段，先进行字段预筛选
     * 若字段为普通字段，则弹出普通字段的筛选
     */
    (this.$refs.filterDialog as any).showDialog()
    // this.showDialog = true;
    // this.showNormal = true;
    // CubeModule.addCube({
    //   cube: CubeModule.curCube,
    //   type: CONST.cube.CUBE_CATEGORY.FILTERS
    // })
  }
  private addSignCube() {
    CubeModule.addCube({
      cube: CubeModule.curCube,
      type: CONST.cube.CUBE_CATEGORY.SIGNS
    })
  }
  private removeCube(index: number, type: string) {
    CubeModule.removeCube({ index, type })
  }
}
</script>

<style lang="scss" scoped>
.bi-middle-side {
  height: 100%;
  font-size: 14px;
  background: #f7f7f7;

  .middle-block {
    padding: 8px;
    height: 100%;
    border: 1px solid $paneBorder;

    .block-header {
      @include flex-row(space-between);

      &>i {
        padding: 3px;

        &:hover {
          background: #eee;
        }
      }
    }

    .block-content {
      height: calc(100% - 25px);
      padding-top: 2px;

      ul>li {
        position: relative;
        padding: 0px 15px 0px 10px;
        border: 1px solid transparent;
        border-radius: 12px;
        width: calc(100% - 20px);
        background: $tagColor1;
        margin-bottom: 3px;

        &.filter,
        &.sign {
          background: $tagColor2;
        }

        .block-item-name {
          color: #fff;
          font-size: 12px;
          user-select: none;
          @include ellipsis-text;

          i {
            display: none;
            position: absolute;
            right: 5px;
            top: 50%;
            margin-top: -8px;
            font-size: 12px;
            color: #fff;
            width: 16px;
            height: 16px;
            line-height: 16px;
            text-align: center;
            border-radius: 8px;
            transform: scale(0.7);
            cursor: pointer;

            &:hover {
              background: $dangerColor;
            }
          }
        }

        &:hover {
          border-color: #000;

          .block-item-name i {
            display: block;
          }
        }
      }

    }
  }
}
</style>
