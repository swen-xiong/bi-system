<template>
  <el-dialog
    custom-class="bi-computed-dialog"
    @open="initData"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :visible.sync="visible"
  >
    <div slot="title" class="title">计算字段</div>

    <div class="container">
      <el-col :span="12" class="editor-part">
        <div style="width:50%;">
          <el-input type="text" placeholder="输入计算字段名称" clearable size="mini" v-model="computedField.name"></el-input>
        </div>
        <div class="editor-container">
          <bi-monaco ref="biMonaco" :model.sync="computedField.sqlString" style="width:100%"></bi-monaco>
        </div>
        <div class="footer-btn">
          <el-button size="medium" type="primary" plain @click="confirm">应用</el-button>
          <el-button size="medium" type="primary" @click="confirm(true)">确定</el-button>
        </div>
      </el-col>
      <el-col :span="12" class="function-part">
        <el-col :span="9" style="height:100%;">
          <el-select v-model="selectType" size="mini" style="width:100%" @change="refreshList">
            <el-option
              v-for="item in sqlFunTypes"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-input
            size="mini"
            type="text"
            placeholder="输入搜索文本"
            v-model="searchWord"
            @input="refreshList"
            class="search-input"
            clearable
          ></el-input>
          <el-scrollbar class="func-list-container">
            <ul class="bi-ul">
              <li 
                v-for="(item) in sqlFuncList" 
                :key="item.name" 
                @click="curFunItem = item" 
                @dblclick="insertFunc(item)"
                :class="{'active': curFunItem.name === item.name}">
                {{item.name}}
              </li>
            </ul>
          </el-scrollbar>
        </el-col>
        <el-col :span="14" :offset="1">
          <el-scrollbar
            style="height:300px"
          >
            <div style="margin-right:10px;">
              <div class="func-expression">{{curFunItem.expression}}</div>
              <div class="func-description">{{curFunItem.description}}</div>
              <div class="func-example" v-show="curFunItem.example">示例：{{curFunItem.example}}</div>
            </div>
          </el-scrollbar>
        </el-col>
      </el-col>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import Monaco from '../Monaco.vue'
import CONST from '../../const'

interface IComputedField {
  name: string
  sqlString: string
}

@Component({
  name: 'computed-field-dialog',
  components: {
    'bi-monaco': Monaco
  }
})
export default class extends Vue {
  @Prop() private showDialog!: boolean

  @Prop() private model!: IComputedField

  private computedField = this.model || {}

  private selectType: any = CONST.types.SQL_FUN_TYPES.ALL

  private searchWord: string = ''

  private sqlFuncList: any[] = []

  private curFunItem: any = {}

  /** 获取sql内置方法类型 */
  get sqlFunTypes() {
    return CONST.sqlfun.funcTypes
  }

  get visible() {
    return this.showDialog
  }

  set visible(value: boolean) {
    this.$emit('update:showDialog', value)
  }

  /** get funcList filterBy selectType and searchWord */
  private refreshList() {
    let funcList = CONST.sqlfun.funcList
    if (this.selectType && this.selectType !== CONST.types.SQL_FUN_TYPES.ALL) {
      funcList = funcList.filter((item) => {
        return item.type === this.selectType
      })
    }
    if (this.searchWord) {
      funcList = funcList.filter((item) => {
        return item.name.toLowerCase().indexOf(this.searchWord.toLowerCase()) > -1
      })
    }
    if (funcList.length > 0) {
      this.curFunItem = funcList[0]
    }
    this.sqlFuncList = funcList
  }

  /**
   * insert function by dblclick function name
   * @param funcItem sql-function object
   */
  private insertFunc(funcItem: any) {
    const biMonaco = this.$refs.biMonaco as any
    biMonaco.insertContent(funcItem.name + '()')
  }

  private validField(): boolean {
    if (!this.computedField.name) {
      this.$message({
        message: '计算字段名称不能为空',
        type: 'error'
      })
      return false
    } else if (!this.computedField.sqlString) {
      this.$message({
        message: '计算字段sql语句不能为空',
        type: 'error'
      })
      return false
    }
    return true
  }

  private confirm(isClose: boolean) {
    if (this.validField()) {
      this.$emit('confirm', this.computedField)
      this.visible = !isClose
    }
  }

  private save() {
    if (this.validField()) {
      this.$emit('confirm', this.computedField)
      this.visible = false
    }
  }

  /**
   * initial data when dialog closing
   */
  private initData() {
    this.computedField = {} as IComputedField
    this.selectType = CONST.types.SQL_FUN_TYPES.ALL
    this.searchWord = ''
    this.curFunItem = {}
    this.refreshList()
  }
}
</script>

<style lang="scss">
.bi-computed-dialog {
  width: 960px;

  .el-dialog__body {
    padding: 0 0 0 20px;
  }

  .container {
    height: 380px;

    .editor-part {
      height: 100%;

      .editor-container {
        margin-top: 15px;
        border: 1px solid #ccc;
      }

      .footer-btn {
        text-align: right;
        margin: 20px 20px 0;
      }
    }

    .function-part {
      height: 100%;
      padding: 10px 10px 15px 15px;
      background: #f0f0f0;

      .search-input {
        margin-top: 10px;

        .el-input__inner {
          border-color: #aaa;
          border-radius: 0;
        }
      }

      .func-list-container {
        height: calc(100% - 70px);
        border: 1px solid #aaa;
        border-top: none;

        .el-scrollbar__view {
          height: 100%;
        }
      }

      .bi-ul {
        background: #fff;
        padding-top: 2px;
        min-height: 100%;

        &>li {
          padding: 1px 10px;
          cursor: pointer;
          user-select: none;

          &:hover {
            background: #eee;
          }

          &.active {
            background: #d6d6d6;
          }
        }
      }

      .func-expression {
        font-weight: bold;
      }
      .func-description {
        margin-top: 20px;
      }
      .func-example {
        white-space: pre-line;
        margin-top: 20px;
      }
    }
  }
}
</style>
