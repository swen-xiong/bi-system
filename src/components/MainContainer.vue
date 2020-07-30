<template>
  <div class="bi-main-container">
    <div class="sheet-name" @dblclick="change">
      <span v-html="sheetName"></span>
      <i class="el-icon-caret-bottom"></i>
    </div>
    <div class="table-content" :style="{height: 'calc(100% - ' + sheetNameHeight + 'px)'}">
      <div v-if="!showTable" class="place-pane">
        <div class="mask-top" v-bi-drop.bg="{cb: addRowCube}">在此处放置字段</div>
        <div class="mask-left" v-bi-drop.bg="{cb: addColCube}">在此处放置字段</div>
        <div class="mask-container" v-bi-drop.border="{cb: addCube}">在此处放置字段
        </div>
      </div>
      <vxe-table
        v-if="showTable"
        border
        stripe
        show-header-overflow
        show-overflow
        auto-resize
        height="auto"
        highlight-hover-row
        class="mytable-scrollbar"
        :data="tableData">
        <vxe-table-column type="seq" title="序号" width="60"></vxe-table-column>
        <vxe-table-column field="name" title="姓名" min-width="80"></vxe-table-column>
        <vxe-table-column field="gender" title="性别" min-width="60"></vxe-table-column>
        <vxe-table-column field="age" title="年龄" min-width="60"></vxe-table-column>
        <vxe-table-column field="address" title="居住地址" min-width="120"></vxe-table-column>
        <vxe-table-column field="name" title="姓名" min-width="80"></vxe-table-column>
        <vxe-table-column field="gender" title="性别" min-width="60"></vxe-table-column>
        <vxe-table-column field="age" title="年龄" min-width="60"></vxe-table-column>
        <vxe-table-column field="address" title="居住地址" min-width="120"></vxe-table-column>
        <vxe-table-column field="name" title="姓名" min-width="80"></vxe-table-column>
        <vxe-table-column field="gender" title="性别" min-width="60"></vxe-table-column>
        <vxe-table-column field="age" title="年龄" min-width="60"></vxe-table-column>
        <vxe-table-column field="address" title="居住地址" min-width="120"></vxe-table-column>
        <vxe-table-column field="name" title="姓名" min-width="80"></vxe-table-column>
        <vxe-table-column field="gender" title="性别" min-width="60"></vxe-table-column>
        <vxe-table-column field="age" title="年龄" min-width="60"></vxe-table-column>
        <vxe-table-column field="address" title="居住地址" min-width="120"></vxe-table-column>
        <vxe-table-column field="name" title="姓名" min-width="80"></vxe-table-column>
        <vxe-table-column field="gender" title="性别" min-width="60"></vxe-table-column>
        <vxe-table-column field="age" title="年龄" min-width="60"></vxe-table-column>
        <vxe-table-column field="address" title="居住地址" min-width="120"></vxe-table-column>
      </vxe-table>
    </div>

    <el-dialog
      custom-class="bi-sheet-name-dialog"
      destroy-on-close
      :visible.sync="showRename">
      <div slot="title" class="title">编辑标题</div>
      <tinymce-editor v-model="copySheetName" :custom-config="{height: 200}"></tinymce-editor>
      <div slot="footer" class="dialog-footer clearfix">
        <el-button size="medium" type="primary" plain style="float:left;" @click="copySheetName = sheetName">重置</el-button>
        <el-button size="medium" type="primary" @click="save">确定</el-button>
        <el-button size="medium" @click="showRename = false">取 消</el-button>
        <el-button size="medium" type="success" @click="confirm">应用</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import TinymceEditor from './TinymceEditor.vue'
import { ICube } from '../interface'
import { CubeModule } from '../store/modules/cube'

@Component({
  name: 'bi-main-container',
  components: {
    'tinymce-editor': TinymceEditor
  }
})
export default class MainContainer extends Vue {
  private sheetNameHeight: number = 0;
  private sheetName: string = '工作表名称'
  private copySheetName: string = this.sheetName
  private showRename: boolean = false
  private tableData: any[] = [
    {seq: '001', name: 'Tom', gender: 'male', age: 20, address: 'Los'},
    {seq: '002', name: 'Jerry', gender: 'male', age: 12, address: 'London'},
    {seq: '003', name: 'Jenny', gender: 'female', age: 21, address: 'Sydney'},
    {seq: '004', name: 'Lilei', gender: 'male', age: 20, address: 'Shanghai'},
    {seq: '005', name: 'Hanmeimei', gender: 'famale', age: 19, address: 'Tokyo'},
    {seq: '001', name: 'Tom', gender: 'male', age: 20, address: 'Los'},
    {seq: '002', name: 'Jerry', gender: 'male', age: 12, address: 'London'},
    {seq: '003', name: 'Jenny', gender: 'female', age: 21, address: 'Sydney'},
    {seq: '004', name: 'Lilei', gender: 'male', age: 20, address: 'Shanghai'},
    {seq: '005', name: 'Hanmeimei', gender: 'famale', age: 19, address: 'Tokyo'},
    {seq: '001', name: 'Tom', gender: 'male', age: 20, address: 'Los'},
    {seq: '002', name: 'Jerry', gender: 'male', age: 12, address: 'London'},
    {seq: '003', name: 'Jenny', gender: 'female', age: 21, address: 'Sydney'},
    {seq: '004', name: 'Lilei', gender: 'male', age: 20, address: 'Shanghai'},
    {seq: '005', name: 'Hanmeimei', gender: 'famale', age: 19, address: 'Tokyo'},
    {seq: '001', name: 'Tom', gender: 'male', age: 20, address: 'Los'},
    {seq: '002', name: 'Jerry', gender: 'male', age: 12, address: 'London'},
    {seq: '003', name: 'Jenny', gender: 'female', age: 21, address: 'Sydney'},
    {seq: '004', name: 'Lilei', gender: 'male', age: 20, address: 'Shanghai'},
    {seq: '005', name: 'Hanmeimei', gender: 'famale', age: 19, address: 'Tokyo'},
    {seq: '001', name: 'Tom', gender: 'male', age: 20, address: 'Los'},
    {seq: '002', name: 'Jerry', gender: 'male', age: 12, address: 'London'},
    {seq: '003', name: 'Jenny', gender: 'female', age: 21, address: 'Sydney'},
    {seq: '004', name: 'Lilei', gender: 'male', age: 20, address: 'Shanghai'},
    {seq: '005', name: 'Hanmeimei', gender: 'famale', age: 19, address: 'Tokyo'},
    {seq: '001', name: 'Tom', gender: 'male', age: 20, address: 'Los'},
    {seq: '002', name: 'Jerry', gender: 'male', age: 12, address: 'London'},
    {seq: '003', name: 'Jenny', gender: 'female', age: 21, address: 'Sydney'},
    {seq: '004', name: 'Lilei', gender: 'male', age: 20, address: 'Shanghai'},
    {seq: '005', name: 'Hanmeimei', gender: 'famale', age: 19, address: 'Tokyo'},
    {seq: '001', name: 'Tom', gender: 'male', age: 20, address: 'Los'},
    {seq: '002', name: 'Jerry', gender: 'male', age: 12, address: 'London'},
    {seq: '003', name: 'Jenny', gender: 'female', age: 21, address: 'Sydney'},
    {seq: '004', name: 'Lilei', gender: 'male', age: 20, address: 'Shanghai'},
    {seq: '005', name: 'Hanmeimei', gender: 'famale', age: 19, address: 'Tokyo'},
    {seq: '001', name: 'Tom', gender: 'male', age: 20, address: 'Los'},
    {seq: '002', name: 'Jerry', gender: 'male', age: 12, address: 'London'},
    {seq: '003', name: 'Jenny', gender: 'female', age: 21, address: 'Sydney'},
    {seq: '004', name: 'Lilei', gender: 'male', age: 20, address: 'Shanghai'},
    {seq: '005', name: 'Hanmeimei', gender: 'famale', age: 19, address: 'Tokyo'},
  ]

  get curCube(): ICube {
    return this.$store.state.cube.curCube
  }

  get rows(): ICube[] {
    return this.$store.state.cube.row
  }
  get cols(): ICube[] {
    return this.$store.state.cube.col
  }

  get showTable(): boolean {
    return (this.rows && this.rows.length > 0) || (this.cols && this.cols.length > 0)
  }

  private change(): void {
    this.showRename = true
    // this.sheetName = '构造函数为window.MutationObserver，它在监听到DOM中的改变并且一系列改变结束后触发回调函数。他与事件不同的是：它在DOM变化时，会记录每一个DOM的变化（为一个MutationRecord对象），到DOM变化结束时触发回调函数。DOM变化可能是一系列的（比如同时改变宽和高），那么这一系列的变化就会产生一个队列，这个队列会作为参数传递给回调函数。';
    // this.$nextTick(() => {
    //   this.calTableHeight();
    // })
  }

  /**
   * 编辑标题方法
   */
  private save() {
    this.confirm()
    this.showRename = false
  }
  private confirm() {
    this.sheetName = this.copySheetName
    this.$nextTick(() => {
      this.calTableHeight();
    })
  }

  private calTableHeight(): void {
    const sheetNameHeight = (this.$el.querySelector('.sheet-name') as any).offsetHeight;
    this.sheetNameHeight = sheetNameHeight;
  }

  private addCube() {
    // TODO 判断cube是维度还是度量
    // 维度作为行，度量作为列
  }

  private addRowCube() {
    CubeModule.addRowCube(this.curCube)
  }
  private addColCube() {
    CubeModule.addColCube(this.curCube)
  }

  private mounted() {
    this.calTableHeight();
  }
}
</script>

<style lang="scss">
.bi-main-container {
  height: 100%;
  padding: 5px 5px 30px 5px;
  background: #fff;
  border: 1px solid $paneBorder;

  .bi-sheet-name-dialog {
    width: 650px;

    .el-dialog__body {
      padding: 10px 20px;
    }
  }

  .sheet-name {
    margin-bottom: 10px;
    padding: 8px 15px 8px 5px;
    border: 1px solid transparent;
    text-align: left;
    position: relative;

    i {
      position: absolute;
      top: 8px;
      right: 5px;
      cursor: pointer;
      display: none;
    }

    &:hover {
      border-color: #aaa;

      i {
        display: inline-block;
      }
    }
  }

  .table-content {
    height: calc(100% - 100px);
    position: relative;

    .place-pane {
      height: 100%;
      position: relative;
    }

    .mask-top {
      position: absolute;
      top: 0;
      left: 150px;
      width: calc(100% - 150px);
      height: 80px;
      border-left: 1px solid $paneBorder;
      border-bottom: 1px solid $paneBorder;
      box-sizing: content-box;
      @include flex-center;
    }

    .mask-left {
      position: absolute;
      top: 80px;
      left: 0;
      width: 150px;
      height: calc(100% - 80px);
      border-top: 1px solid $paneBorder;
      border-right: 1px solid $paneBorder;
      box-sizing: content-box;
      @include flex-center;
    }

    .mask-container {
      position: absolute;
      top: 80px;
      left: 150px;
      width: calc(100% - 150px);
      height: calc(100% - 80px);
      @include flex-center;
    }
  }

  /*滚动条整体部分*/
  .mytable-scrollbar div::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }
  /*滚动条的轨道*/
  .mytable-scrollbar div::-webkit-scrollbar-track {
    background-color: #FFFFFF;
  }
  /*滚动条里面的小方块，能向上向下移动*/
  .mytable-scrollbar div::-webkit-scrollbar-thumb {
    background-color: #bfbfbf;
    border-radius: 5px;
    border: 1px solid #F1F1F1;
    box-shadow: inset 0 0 6px rgba(0,0,0,.3);
  }
  .mytable-scrollbar div::-webkit-scrollbar-thumb:hover {
    background-color: #A8A8A8;
  }
  .mytable-scrollbar div::-webkit-scrollbar-thumb:active {
    background-color: #787878;
  }
  /*边角，即两个滚动条的交汇处*/
  .mytable-scrollbar div::-webkit-scrollbar-corner {
    background-color: #FFFFFF;
  }
}
</style>
