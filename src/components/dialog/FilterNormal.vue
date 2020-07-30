<template>
  <el-dialog
    custom-class="bi-filter-normal-dialog"
    @open="initData"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :visible.sync="visible">
    <div slot="title" class="title">筛选器 [{{field.name}}{{(field.filter && field.filter.name) || ''}}]---{{limit.formula}}</div>

    <div class="container">
      <el-tabs type="card" v-model="tabName">
        <el-tab-pane label="常规" name="normal" class="normal-pane">
          <el-row type="flex" justify="space-between" align="middle">
            <el-radio-group v-model="normal.chooseType" @change="resetSearchBox">
              <el-radio :label="chooseTypes[0]">从列表中选择</el-radio>
              <el-radio :label="chooseTypes[1]">自定义值列表</el-radio>
              <el-radio :label="chooseTypes[2]">使用全部</el-radio>
            </el-radio-group>
            <el-select v-model="normal.showType" placeholder="显示" size="mini" style="max-width:135px;">
              <el-option label="仅相关值" :value="0"></el-option>
              <el-option label="数据库中所有值" :value="1"></el-option>
            </el-select>
          </el-row>
          <search-box ref="searchBox" :type="normal.chooseType" :origin-list="originList" :model.sync="normal">
          </search-box>
          <div class="outline">
            <span class="outline-text">摘要{{normal.checkList}}</span>
            <ul class="bi-ul">
              <li>
                <label>字段：</label>
                <span>[{{field.name}}{{(field.filter && field.filter.name) || ''}}]</span>
              </li>
              <li>
                <label>所选内容：</label>
                <span v-if="normal.chooseType === chooseTypes[0]">
                  <span>{{normal.isExclude ? '排除了' : '选择了'}}</span>
                  {{normal.checkList ? normal.checkList.length: 0}} 个值(共{{originList.length}}个)
                </span>
                <span v-if="normal.chooseType === chooseTypes[1]">
                  <span v-if="normal.nullIsAll && normal.checkList.length === 0">选择了所有值</span>
                  <span v-else>
                    <span>{{normal.isExclude ? '排除了' : '选择了'}}</span>
                    {{normal.checkList ? normal.checkList.length: 0}} 个值(共{{originList.length}}个)
                  </span>
                </span>
                <span v-if="normal.chooseType === chooseTypes[2]">全部</span>
              </li>
              <li>
                <label>通配符：</label>
                <span>全部</span>
              </li>
              <li>
                <label>条件：</label>
                <span>无</span>
              </li>
              <li>
                <label>限制：</label>
                <span>无</span>
              </li>
            </ul>
          </div>
          <el-checkbox v-if="type === 'date'" v-model="normal.checkNew">打开工作簿时筛选到最新日期值</el-checkbox>
        </el-tab-pane>
        <el-tab-pane label="通配符" name="wildcard" class="wildcard-pane" v-if="field.type !== 'date'">
          <el-row type="flex" justify="space-between">
            <el-col>匹配值：</el-col>
            <el-col :span="4">
              <el-checkbox v-model="wildcard.isExclude">排除</el-checkbox>
            </el-col>
          </el-row>
          <el-input class="wildcard-input" v-model="wildcard.characters" placeholder="通配符" clearable size="small"></el-input>
          <el-radio-group v-model="wildcard.matchRule">
            <el-radio class="wildcard-radio" v-for="(rule, index) in matchRules" :key="index" :label="rule.value">{{rule.name}}</el-radio>
          </el-radio-group>
          <el-row>
            <el-checkbox v-model="wildcard.nullIsAll">为空时包括所有值</el-checkbox>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="条件" name="condition" class="condition-pane">
          <el-radio-group v-model="condition.type">
            <el-radio :label="0" class="block">无</el-radio>
            <el-radio :label="1" class="block">按字段</el-radio>
            <el-row :gutter="10" class="radio-row">
              <el-col :span="12">
                <el-select v-model="condition.fieldId" filterable size="mini" :disabled="condition.type !== 1">
                  <el-option v-for="field in fields" :key="field.id" :label="field.name" :value="field.id"></el-option>
                </el-select>
              </el-col>
              <el-col :span="12">
                <el-select v-model="condition.filterFun" size="mini" :disabled="condition.type !== 1">
                  <el-option label="计数" :value="1"></el-option>
                  <el-option label="计数(不同)" :value="2"></el-option>
                  <el-option label="最小值" :value="3"></el-option>
                  <el-option label="最大值" :value="4"></el-option>
                </el-select>
              </el-col>
            </el-row>
            <el-row :gutter="10" class="radio-row">
              <el-col :span="6">
                <el-select v-model="condition.filterType" size="mini" :disabled="condition.type !== 1">
                  <el-option label="=" :value="1"></el-option>
                  <el-option label="<>" :value="2"></el-option>
                  <el-option label="<" :value="3"></el-option>
                  <el-option label="<=" :value="4"></el-option>
                  <el-option label=">" :value="5"></el-option>
                  <el-option label=">=" :value="6"></el-option>
                </el-select>
              </el-col>
              <el-col :span="8">
                <el-input v-model="condition.filterValue" size="mini" :disabled="condition.type !== 1"></el-input>
              </el-col>
            </el-row>
            <div class="condition-range">
              <span class="outline-text">值范围</span>
              <el-row class="radio-row" type="flex" align="middle">
                <el-col :span="4">最小值</el-col>
                <el-col :span="16">
                  <el-input-number v-model="condition.filterMin" :controls="false" size="mini" :disabled="condition.type !== 1"></el-input-number>
                </el-col>
                <el-col :span="4">
                  <el-button type="primary" plain size="mini" @click="loadMinMax" :disabled="condition.type !== 1">加载</el-button>
                </el-col>
              </el-row>
              <el-row class="radio-row" type="flex" align="middle">
                <el-col :span="4">最大值</el-col>
                <el-col :span="16">
                  <el-input-number v-model="condition.filterMax" :controls="false" size="mini" :disabled="condition.type !== 1"></el-input-number>
                </el-col>
              </el-row>
            </div>
            <el-radio :label="2" class="block">按公式</el-radio>
            <el-row class="radio-row">
              <el-input type="textarea" rows="15" v-model="condition.formula" :disabled="condition.type !== 2"></el-input>
            </el-row>
          </el-radio-group>
        </el-tab-pane>
        <el-tab-pane label="顶部" name="limit" class="limit-pane">
          <el-radio-group v-model="limit.type">
            <el-radio :label="0" class="block">无</el-radio>
            <el-radio :label="1" class="block">按字段</el-radio>
            <el-row :gutter="10" class="radio-row">
              <el-col :span="8">
                <el-select v-model="limit.filterType" filterable size="mini" :disabled="limit.type !== 1">
                  <el-option label="顶部" :value="1"></el-option>
                  <el-option label="底部" :value="2"></el-option>
                </el-select>
              </el-col>
              <el-col :span="12">
                <el-input v-model="limit.filterValue" size="mini" :disabled="limit.type !== 1"></el-input>
              </el-col>
            </el-row>
            <el-row :gutter="10" class="radio-row">
              <el-col :span="12">
                <el-select v-model="limit.fieldId" filterable size="mini" :disabled="limit.type !== 1">
                  <el-option v-for="field in fields" :key="field.id" :label="field.name" :value="field.id"></el-option>
                </el-select>
              </el-col>
              <el-col :span="12">
                <el-select v-model="limit.filterFun" size="mini" :disabled="limit.type !== 1">
                  <el-option label="计数" :value="1"></el-option>
                  <el-option label="计数(不同)" :value="2"></el-option>
                  <el-option label="最小值" :value="3"></el-option>
                  <el-option label="最大值" :value="4"></el-option>
                </el-select>
              </el-col>
            </el-row>
            <el-radio :label="2" class="block" style="margin-top:15px;">按公式</el-radio>
            <el-row :gutter="10" class="radio-row">
              <el-col :span="8">
                <el-select v-model="limit.formulaType" filterable size="mini" :disabled="limit.type !== 2">
                  <el-option label="顶部" :value="1"></el-option>
                  <el-option label="底部" :value="2"></el-option>
                </el-select>
              </el-col>
              <el-col :span="12">
                <el-input v-model="limit.formulaValue" size="mini" :disabled="limit.type !== 2"></el-input>
              </el-col>
            </el-row>
            <el-row class="radio-row">
              <!-- <el-input type="textarea" rows="15" v-model="limit.formula" :disabled="limit.type !== 2"></el-input> -->
              <bi-monaco v-if="tabName === 'limit'" :readonly="limit.type !== 2" :model.sync="limit.formula"></bi-monaco>
            </el-row>
          </el-radio-group>
        </el-tab-pane>
      </el-tabs>
    </div>

    <div slot="footer" class="dialog-footer clearfix">
      <el-button size="medium" type="primary" plain style="float:left;" @click="initData">重置</el-button>
      <el-button size="medium" type="primary" @click="save">确定</el-button>
      <el-button size="medium" @click="cancel">取 消</el-button>
      <el-button size="medium" type="success" @click="confirm">应用</el-button>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from 'vue-property-decorator'
import CONST from '../../const'
import { ICube, ICommonFilter, INormal, IWildcard, ICondition, ILimit } from '../../interface'
import Monaco from '../Monaco.vue'
import { CubeModule } from '../../store/modules/cube'
import SearchBox from './SearchBox.vue'
import faker from 'faker'

const defaultFilter: ICommonFilter = {
  normal: {
    checkList: [],
    showType: CONST.types.SHOW_TYPES.RELATIVE,
    chooseType: [...Object.values(CONST.types.CHOOSE_TYPES)][0],
    isExclude: false,
    nullIsAll: true
  },
  wildcard: {
    isExclude: false,
    characters: '',
    matchRule: 0,
    nullIsAll: true
  },
  condition: {
    type: 0,
    fieldId: '',
    filterFun: '',
    filterType: '',
    filterValue: 0,
    filterMin: undefined,
    filterMax: undefined,
    formula: ''
  },
  limit: {
    type: 0,
    fieldId: '',
    filterFun: '',
    filterType: '',
    filterValue: 10,
    formula: '',
    formulaType: '',
    formulaValue: 10,
  }
}

@Component({
  name: 'filter-range-dialog',
  components: {
    'search-box': SearchBox,
    'bi-monaco': Monaco
  }
})
export default class extends Vue {
  @Prop() private showDialog!: boolean

  // 筛选字段
  @Prop() private field!: ICube

  // 筛选字段类型 默认number-数值类型  date-日期类型
  @Prop() private type!: string

  // tabs标签绑定model
  private tabName: string = 'normal'

  // 字段选择类型
  private chooseTypes: number[] = [...Object.values(CONST.types.CHOOSE_TYPES)]

  // 字段在数据库中的所有值的集合
  private originList: any[] = []

  // 保存筛选条件对象
  // private filter: any = defaultFilter
  private normal: INormal = defaultFilter.normal
  private wildcard: IWildcard = defaultFilter.wildcard
  private condition: ICondition = defaultFilter.condition
  private limit: ILimit = defaultFilter.limit

  // 匹配规则
  get matchRules(): any[] {
    return CONST.filter.MATCH_RULES
  }

  // 表所有字段
  private fields: any[] = []

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

  // 获取所有字段
  private getFields() {
    this.fields = []
    for (let i = 0; i < 20; i++) {
      const field = {
        id: i,
        name: faker.name.jobTitle()
      }
      this.fields.push(field)
    }
  }

  // 根据所选字段获取该字段在数据库中所有值的最大最小值
  private loadMinMax() {
    this.condition.filterMin = faker.random.number({ min: -200, max: 100 })
    this.condition.filterMax = faker.random.number({ min: 100, max: 500 })
  }

  // 关闭dialog
  private cancel() {
    this.$emit('update:showDialog', false)
  }

  // 保存
  private save() {
    this.confirm();
    this.cancel();
  }

  // 应用
  private confirm() {
    this.cancel()
    const curCube = this.$store.state.cube.curCube;
    const filter = {
      normal: this.normal,
      wildcard: this.wildcard,
      condition: this.condition,
      limit: this.limit
    }
    curCube.filter = {...curCube.filter, ...filter}
    CubeModule.updateCube(curCube);
    this.$emit('confirm', filter)
  }

  // dialog open 初始化数据
  private initData() {
    this.originList = []
    for (let i = 1; i <= 31; i++) {
      this.originList.push({id: i, name: i.toString()})
    }
    this.normal = { ...defaultFilter.normal }
    this.wildcard = { ...defaultFilter.wildcard }
    this.condition = { ...defaultFilter.condition }
    this.limit = { ...defaultFilter.limit }
    this.normal.chooseType = CONST.types.CHOOSE_TYPES.FROM_LIST
    this.resetSearchBox()
    this.getFields()
    this.tabName = 'normal' // tabs默认选中第一个选项卡
    // TODO 获取该字段的在数据库中的所有值的集合
  }

  // 重置子组件searchBox参数
  private resetSearchBox() {
    if (this.$refs.searchBox) {
      (this.$refs.searchBox as any).reset()
    }
  }

  private mounted() {
    this.initData()
  }
}
</script>

<style lang="scss">
.bi-filter-normal-dialog {
  width: 600px;

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

    .el-tabs__header {
      margin-bottom: 0;
    }

    .el-tabs__content {
      border: 1px solid #e4e7ed;
      border-top: none;
      padding: 15px;
      min-height: 400px;
    }

    .radio-row {
      padding-left: 25px;

      &:first-child {
        margin-top: 10px;
      }
      
      & + .radio-row {
        margin-top: 10px;
      }
    }

    .normal-pane {
      .outline {
        position: relative;
        border: 1px solid #d5dfe5;
        border-radius: 4px;
        padding: 15px 10px 10px;
  
        .outline-text {
          position: absolute;
          top: -11px;
          left: 8px;
          line-height: 22px;
          padding: 0 2px;
          background: #fff;
        }
  
        .bi-ul>li {
          & + li {
            margin-top: 10px;
          }
  
          label {
            width: 80px;
            display: inline-block;
          }
        }
      }
    }

    .wildcard-pane {

      .wildcard-input {
        margin: 15px 0;
      }
      .wildcard-radio {
        display: block;
        margin-bottom: 15px;

        &:last-child {
          margin-bottom: 20px;
        }
      }
    }

    .condition-pane,
    .limit-pane {
      .el-radio {
        margin-bottom: 10px;
      }
      .condition-range {
        position: relative;
        border: 1px solid #d5dfe5;
        border-radius: 4px;
        padding: 15px 10px 10px;
        margin: 20px 0 20px 25px;
        font-size: 12px;
  
        .outline-text {
          position: absolute;
          top: -11px;
          left: 8px;
          line-height: 22px;
          padding: 0 2px;
          background: #fff;
        }
      }
    }
  }
}
</style>
