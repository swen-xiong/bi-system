<template>
  <el-container class="home">
    <el-header>
      <bi-toolbar></bi-toolbar>
    </el-header>
    <el-main>
      <split-pane-custom @resize="resize" :min-percent='10' :default-percent='12' :max-percent='30' split="vertical">
        <bi-left-side slot="paneL" :project-data="projectData"></bi-left-side>
        <template slot="paneR">
          <split-pane-custom split="vertical" :min-percent='10' :default-percent='13'>
            <bi-middle-side slot="paneL"></bi-middle-side>
            <template slot="paneR">
              <split-pane-custom split="horizontal" :min-percent='15' :default-percent='15' @resize="mainResize" ref="main" :min-size="76">
                <!-- <template slot="paneL">行列</template> -->
                <bi-main-header slot="paneL" ref="bi-main-header"></bi-main-header>
                <!-- <template slot="paneR">图表显示区域</template> -->
                <bi-main-container slot="paneR"></bi-main-container>
              </split-pane-custom>
            </template>
          </split-pane-custom>
        </template>
      </split-pane-custom>
    </el-main>
  </el-container>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch, Provide, Model, Emit } from 'vue-property-decorator'
import Toolbar from '../components/Toolbar.vue'
import LeftSide from '../components/LeftSide.vue'
import MiddleSide from '../components/MiddleSide.vue'
import MainHeader from '../components/MainHeader.vue';
import MainContainer from '../components/MainContainer.vue';

@Component({
  components: {
    'bi-toolbar': Toolbar,
    'bi-left-side': LeftSide,
    'bi-middle-side': MiddleSide,
    'bi-main-header': MainHeader,
    'bi-main-container': MainContainer
  }
})
export default class Home extends Vue {
  /** 项目信息 */
  private projectData: any = {};
  private mounted(): void {
    this.projectData = {
      name: '示例-超市',
      dimension: [
        {
          id: 1,
          name: '一级 1',
          children: [{
            id: 4,
            name: '二级 1-1',
            children: [{
              id: 9,
              name: '三级 1-1-1'
            }, {
              id: 10,
              name: '三级 1-1-2'
            }]
          }]
        }, {
          id: 2,
          name: '一级 2',
          children: [{
            id: 5,
            name: '二级 2-1'
          }, {
            id: 6,
            name: '二级 2-2'
          }]
        }, {
          id: 3,
          name: '一级 3',
          children: [{
            id: 7,
            name: '二级 3-1'
          }, {
            id: 8,
            name: '二级 3-2',
            children: [{
              id: 11,
              name: '三级 3-2-1三级 3-2-1三级 3-2-1三级 3-2-1三级 3-2-1三级 3-2-1三级 3-2-1三级 3-2-1'
            }, {
              id: 12,
              name: '三级 3-2-2'
            }, {
              id: 13,
              name: '三级 3-2-3'
            }]
          }]
        }
      ],
      measurement: [
        {id: '1001', type: 'number', name: '利润'},
        {id: '1002', type: 'number', name: '利润率'},
        {id: '1003', type: 'number', name: '折扣'},
        {id: '1004', type: 'integer', name: '数量'},
        {id: '1005', type: 'number', name: '销售额'},
        {id: '1006', type: 'datetime', name: '销售时间'},
        {id: '1007', type: 'date', name: '结算日期'},
        {id: '1008', type: 'string', name: '字符串'},
        {id: '1009', type: 'boolean', name: '是否盈利'},
      ],
      collection: [
        {id: '2001', name: '利润排名前列的客户'}
      ],
      parameters: [
        {id: '3001', type: 'number', name: '利润容器大小'},
        {id: '3002', type: 'number', name: '选择利润前多少名客户'}
      ]
    }
  }

  private resize(): void {
    console.log('resize')
  }

  private mainResize(percent: number, size: number, isChange: boolean): void {
    if (isChange) {
      (this.$refs['bi-main-header'] as any).$refs.rowColPane.checkAndResetSize(size);
    }
  }
}

</script>
<style lang="scss" scoped>
.home {
  height: 100%;
  padding-right: 15px;
  background: #f7f7f7;
  
  .el-header {
    padding: 0;
  }

  .el-main {
    padding: 0;
    overflow: hidden;
  }
}
</style>
