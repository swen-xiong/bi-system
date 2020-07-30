<template>
  <div class="bi-left-side">
    <el-tabs type="border-card" stretch>
      <el-tab-pane>
        <span slot="label">数据</span>
        <div class="data-container">
          <div class="data-name">
            <i class="el-icon-coin"></i>{{data.name}}
          </div>
          <div class="search-block" v-show="showSearchInput">
            <el-input 
              size="mini"
              v-model="keywords" 
              placeholder="搜索" 
              :suffix-icon="keywords ? '' : 'el-icon-search'" 
              @keyup.enter.native="searchKeywords"
              clearable>
            </el-input>
          </div>
          <!-- show-search 显示搜索框时增加属性，以控制样式 -->
          <div class="data-tree" :show-search="showSearchInput">
            <split-pane-custom split="horizontal" :min-percent='10' :default-percent='40'>
              <template slot="paneL">
                <div class="dimension-title">
                  <span>维度</span>
                  <div class="dimension-title-icon">
                    <i class="el-icon-s-grid"></i>
                    <i class="el-icon-search" @click="showSearch"></i>
                    <i class="el-icon-caret-bottom"></i>
                  </div>
                </div>
                <el-scrollbar class="dimension-next">
                  <el-tree
                    ref="tree"
                    class="dimension-next dimension-tree"
                    draggable
                    node-key="id"
                    empty-text="无匹配项"
                    icon-class=""
                    :filter-node-method="filterNode"
                    :props="{'label': 'name'}"
                    :data="data.dimension"
                    :default-expand-all="true"
                    :expand-on-click-node="false"
                    @node-drag-start="treeNodeDragStart"
                    @node-drag-end="treeNodeDragEnd"
                    >
                    <span class="custom-tree-node" slot-scope="{ node, data }">
                      <i :class="'node-type el-icon-s-promotion icon-' + data.type"></i>
                      <span class="node-item" v-bi-drag.stop="{value: data, cb: dragStart}">
                        <span>{{ node.label }}</span>
                        <i class="el-icon-caret-bottom global-caret"></i>
                      </span>
                    </span>
                  </el-tree>
                </el-scrollbar>
              </template>
              <template slot="paneR">
                <split-pane-custom split="horizontal" :min-percent='20' :default-percent='50'>
                  <template slot="paneL">
                    <div class="dimension-title">
                      <span>度量</span>
                    </div>
                    <el-scrollbar class="dimension-next">
                      <ul class="measure-list bi-ul">
                        <li v-for="item in data.measurement" :key="item.id">
                          <i class="el-icon-paperclip"></i>
                          <div class="measure-name" v-bi-drag="{value: item, cb: dragStart}">
                            <span>{{item.name}}</span>
                            <i class="el-icon-caret-bottom"></i>
                          </div>
                        </li>
                      </ul>
                    </el-scrollbar>
                  </template>
                  <template slot="paneR">
                    <split-pane-custom split="horizontal" :min-percent='20'>
                      <template slot="paneL">
                        <div class="dimension-title">
                          <span>集</span>
                        </div>
                        <el-scrollbar class="dimension-next">
                          <ul class="measure-list bi-ul">
                            <li v-for="item in data.collection" :key="item.id" class="collection-li">
                              <i class="el-icon-paperclip"></i>
                              <div class="measure-name" v-bi-drag="{value: item, cb: dragStart}">
                                <span>{{item.name}}</span>
                                <i class="el-icon-caret-bottom"></i>
                              </div>
                            </li>
                          </ul>
                        </el-scrollbar>
                      </template>
                      <template slot="paneR">
                        <div class="dimension-title">
                          <span>参数</span>
                        </div>
                        <el-scrollbar class="dimension-next">
                          <ul class="measure-list bi-ul">
                            <li v-for="item in data.parameters" :key="item.id" class="parameter-li">
                              <i class="el-icon-paperclip"></i>
                              <div class="measure-name">
                                <span>{{item.name}}</span>
                                <i class="el-icon-caret-bottom"></i>
                              </div>
                            </li>
                          </ul>
                        </el-scrollbar>
                      </template>
                    </split-pane-custom>
                  </template>
                </split-pane-custom>
              </template>
            </split-pane-custom>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="分析">
        <div class="analyze-container">

        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import store from '../store'
import { CubeModule } from '@/store/modules/cube';
import { treeNode } from 'element-ui/types/table';
import { TreeNode } from 'element-ui/types/tree';

@Component({
  name: 'bi-left-side'
})
export default class LeftSide extends Vue {
  @Prop()
  public projectData!: any;


  private data: any = this.projectData;

  /** 是否显示搜索 */
  private showSearchInput: boolean = false;

  /** 搜索关键字 */
  private keywords: string = '';

  @Watch('projectData')
  private watchData(nv: any, ov: any): void {
    this.data = nv;
  }

  @Watch('keywords')
  private watchKeywords() {
    this.searchKeywords();
  }

  /** 显示/隐藏搜索框 */
  private showSearch() {
    this.showSearchInput = !this.showSearchInput;
  }


  /** 提交搜索 */
  private searchKeywords() {
    console.log(this.keywords);
    (this.$refs.tree as any).filter(this.keywords);
  }

  private filterNode(value: any, data: any) {
    if (!value) { return true };
    return data.name.indexOf(value) !== -1;
  }

  /** 度量、集 drag-start回调 */
  private dragStart(item: any) {
    CubeModule.SET_CUR_CUBE(item);
  }

  private treeNodeDragStart(node: any, e: MouseEvent) {
    // const dropTargets = document.querySelectorAll('div[drop-target]');
    // for (const target of dropTargets) {
    //   target.classList.add('drop-target');
    // }
    // // 设置当前操作cube
    // this.dragStart(node.data);
  }

  private treeNodeDragEnd(draggingNode: any, dropNode: any, dropType: string, e: MouseEvent) {
    // const dropTargets = document.querySelectorAll('div[drop-target]');
    // for (const target of dropTargets) {
    //   target.classList.remove('drop-target');
    // }
  }

}
</script>

<style lang="scss">
/** tabs 高度及文字行高 */
$elTabItemHeight: 40px;

/** 数据库或项目名称 高度及文字行高 */
$dataNameHeight: 36px;

/** 维度-度量等标题高度或行高 */
$dimensionTitleHeight: 32px;

/** 垂直方向上的元素需要让出scrollbar的宽度  2px为scrollbar的right值 */
$scrollBarWidth: 6px + 2px;

/** 搜索区域高度 */
$searchHeight: 58px;

/** 度量/集/参数 主题色 */
$measurementColor: rgba(11, 126, 137, 0.71);
$collectionColor: rgba(24, 172, 165, 0.82);
$parameterColor: rgba(11, 126, 137, 0.71);

.bi-left-side {
  border: 1px solid $paneBorder;
  height: 100%;

  .dimension-title {
    width: 100%;
    background: #fff;
    font-size: 14px;
    height: $dimensionTitleHeight;
    line-height: $dimensionTitleHeight;
    box-shadow: 0px 3px 3px -3px rgba(204, 204, 204, .5);
    cursor: default;
    display: flex;
    justify-content: space-between;
    position: relative;
    z-index: 1;

    & + .dimension-next {
      height: calc(100% - #{$dimensionTitleHeight});
    }

    &>span {
      margin-left: 20px;
    }

    .dimension-title-icon {
      margin-right: 20px;

      &>i {
        padding: 3px;
        margin-right: 2px;
        cursor: pointer;

        &:hover {
          background: #ddd;
        }
      }
    }
  }

  .dimension-tree {

    .custom-tree-node {
      position: relative;
      width: calc(100% - 44px);
      // font-size: 14px;
      // color: #606266;
      // text-align: left;
      // border-radius: 12px;
      // padding: 0 16px 0 10px;
      // @include ellipsis-text;

      .node-item {
        position: relative;
        width: calc(100% - 20px);
        font-size: 14px;
        color: #606266;
        text-align: left;
        border-radius: 12px;
        margin-left: 20px;
        padding: 0 16px 0 10px;
        @include ellipsis-text;

        .global-caret {
          display: none;
        }

        &:hover {
          background: $tagColor3;

          .global-caret {
            display: block;
          }
        }
      }

      .node-type {
        position: absolute;
        left: 0;
        top: 0;
        display: inline-block;
        padding: 3px;
      }
    }
  }

  .el-tree {

    .el-tree-node__label {
      @include ellipsis-text;
      max-width: 100%;
    }
  }

  .el-tabs {
    height: 100%;
    border: none;
    // border-top: 1px solid $borderColor;
    box-sizing: border-box;
    box-shadow: none;

    .el-tabs__content {
      padding: 0;
      height: calc(100% - #{$elTabItemHeight});

      .el-tab-pane {
        height: 100%;
      }
    }

    .el-tabs__nav {

      .el-tabs__item {
        height: $elTabItemHeight;
        line-height: $elTabItemHeight;

        &:last-child {
          border-right: none;
        }
      }
    }
  }

  .data-container {
    height: 100%;

    .data-name {
      @include ellipsis-text;
      text-align: left;
      font-size: 14px;
      padding: 0 15px;
      cursor: default;
      height: $dataNameHeight;
      line-height: $dataNameHeight;
      border-bottom: 1px solid $borderColor;
      box-sizing: border-box;

      i {
        font-size: 16px;
        margin-right: 10px;
      }
    }

    .search-block {
      padding: 15px;
    }

    .data-tree {
      height: calc(100% - #{$dataNameHeight});
      margin-top: -1px;
      border-top: 1px solid $borderColor;

      &[show-search] {
        height: calc(100% - #{$dataNameHeight} - #{$searchHeight});
        margin-top: 0;
      }
    }

    .measure-list {
      cursor: default;

      &>li {
        font-size: 14px;
        padding: 2px 0 2px 20px;
        display: flex;
        align-items: center;

        &:first-child {
          margin-top: 5px;
        }

        &>i {
          margin-right: 5px;
          color: $measurementColor;
        }
        &.collection-li>i {
          color: $collectionColor;
        }
        &.parameter-li>i {
          color: $parameterColor;
        }

        .measure-name {
          padding: 0px 15px 0px 10px;
          border-radius: 12px;
          width: calc(100% - 50px);
          position: relative;
          @include ellipsis-text;

          span {
            user-select: none;
          }

          &>i {
            display: none;
            color: #fff;
            position: absolute;
            right: 5px;
            top: 50%;
            margin-top: -8px;
            cursor: pointer;
          }
        }

        &:hover {
          &.collection-li .measure-name {
            background: $collectionColor;
          }
          &.parameter-li .measure-name {
            background: $parameterColor;
          }
        }
        &:hover .measure-name {
          color: #fff;
          background: $measurementColor;

          &>i {
            display: inline-block;
          }
        }
      }
    }
  }

  .splitter-pane-resizer {
    background: #000;

    &.horizontal {
      border-color: #fff;
    }
  }
}
</style>
