<template>
  <el-dialog
    custom-class="bi-filter-range-dialog"
    @open="initData"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :visible.sync="visible">
    <div slot="title" class="title">筛选器 [{{field.name}}]--{{numberFilter}}--{{dateFilter}}</div>

    <div class="container" v-if="realType === 'number'">
      <el-row class="range-types" type="flex" justify="space-between">
        <el-col 
          :span="6" 
          v-for="(item, index) in rangeTypes" 
          :key="index" 
          :class="{active: numberFilter.rangeType === item.value}"
          class="input-range-check-item"
          @click.native="checkRange(item)">
          <i class="el-icon-orange"></i>
          <span>{{item.name}}</span>
        </el-col>
      </el-row>
      <div class="content">
        <span class="tag-name">{{rangeItem.name}}</span>
        <el-radio-group v-model="numberFilter.specialValue" v-if="numberFilter.rangeType === 'special'" class="special-radio-group">
          <el-radio :label="0">Null 值</el-radio>
          <el-radio :label="1">非Null 值</el-radio>
          <el-radio :label="2">所有值</el-radio>
        </el-radio-group>
        <el-form v-else :model="numberFilter" label-width="80px" class="range-form">
          <el-form-item label="最小值">
            <el-input-number 
              v-model="numberFilter.min"
              size="mini" 
              :disabled="numberFilter.rangeType === 'more'"
              :precision="2" 
              :controls="false"
              label="最小值">
            </el-input-number>
          </el-form-item>
          <el-form-item  label="最大值">
            <el-input-number 
              v-model="numberFilter.max" 
              size="mini"
              :disabled="numberFilter.rangeType === 'less'"
              :precision="2" 
              :controls="false"
              label="最大值">
            </el-input-number>
          </el-form-item>
          <el-form-item label="显示">
            <el-select v-model="numberFilter.showType" placeholder="显示" size="small">
              <el-option label="仅相关值" :value="0"></el-option>
              <el-option label="数据库中所有值" :value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="">
            <el-checkbox label="包含Null值" v-model="numberFilter.containNull"></el-checkbox>
          </el-form-item>
        </el-form>
      </div>
    </div>

    <div class="container" v-if="realType === 'date'">
      <el-row class="range-types" type="flex" justify="space-between">
        <el-col 
          :span="6" 
          v-for="(item, index) in rangeTypes" 
          :key="index" 
          :class="{active: dateFilter.rangeType === item.value}"
          class="input-range-check-item"
          @click.native="checkRange(item)">
          <i class="el-icon-orange"></i>
          <span>{{item.name}}</span>
        </el-col>
      </el-row>
      <div class="content">
        <span class="tag-name">{{rangeItem.name}}</span>
        <el-radio-group v-model="dateFilter.specialValue" v-if="dateFilter.rangeType === 'special'" class="special-radio-group">
          <el-radio :label="0">空日期</el-radio>
          <el-radio :label="1">非空日期</el-radio>
          <el-radio :label="2">所有日期</el-radio>
        </el-radio-group>
        <div v-else-if="dateFilter.rangeType === 'relative'" class="relative-date">
          <div class="range-date-show">{{dateFilter.startDate}} 至 {{dateFilter.endDate}}</div>
          <el-radio-group v-model="relativeOptions.type" size="mini" class="relative-radio-group" @change="calRange">
            <el-radio-button label="year">年</el-radio-button>
            <el-radio-button label="quarter">季度</el-radio-button>
            <el-radio-button label="month">月</el-radio-button>
            <el-radio-button label="week">周</el-radio-button>
            <el-radio-button label="day">天</el-radio-button>
          </el-radio-group>
          <el-radio-group v-model="relativeOptions.relativeType" size="mini" class="relative-radio-group" @change="calRange">
            <el-radio :label="-1" style="width: 100px;">前一{{relativeOptions.type | dateText}}</el-radio>
            <el-radio :label="-2">
              前
              <el-input-number 
                v-model="relativeOptions.beforeValue" 
                controls-position="right" 
                size="mini" 
                @change="calRange"
                :disabled="relativeOptions.relativeType !== -2"
                :min="1">
              </el-input-number>
              {{relativeOptions.type | dateText}}
            </el-radio>
          </el-radio-group>
          <el-radio-group v-model="relativeOptions.relativeType" size="mini" class="relative-radio-group" @change="calRange">
            <el-radio :label="0" style="width: 100px;">锚点{{relativeOptions.type === 'day' ? '日期': relativeOptions.type | dateText}}</el-radio>
            <el-radio :label="2">
              后
              <el-input-number 
                v-model="relativeOptions.afterValue" 
                controls-position="right" 
                size="mini" 
                @change="calRange"
                :disabled="relativeOptions.relativeType !== 2"
                :min="1">
              </el-input-number>
              {{relativeOptions.type | dateText}}
            </el-radio>
          </el-radio-group>
          <el-radio-group v-model="relativeOptions.relativeType" size="mini" class="relative-radio-group" @change="calRange">
            <el-radio :label="1" style="width: 100px;">后一{{relativeOptions.type | dateText}}</el-radio>
            <el-radio :label="3" v-if="relativeOptions.type !== 'day'">锚定{{relativeOptions.type | dateText}}至今</el-radio>
          </el-radio-group>
          <el-checkbox v-model="relativeOptions.checkDate" class="block" style="margin-bottom:20px;" @change="calRange">
            锚点相对于
            <el-button type="info" size="small" plain disabled v-show="!relativeOptions.checkDate">今天</el-button>
            <el-date-picker
              v-model="relativeOptions.relativeDate"
              type="date"
              size="small"
              value-format="yyyy-MM-dd"
              style="width: 150px;"
              :clearable="false"
              :editable="false"
              @change="calRange"
              v-show="relativeOptions.checkDate"
              placeholder="锚点日期">
            </el-date-picker>
          </el-checkbox>
          <el-checkbox class="block" label="包含Null值" v-model="dateFilter.containNull"></el-checkbox>
        </div>
        <el-form v-else :model="dateFilter" label-width="80px" class="range-form">
          <el-form-item label="开始日期">
            <el-date-picker
              v-model="dateFilter.startDate"
              type="date"
              size="small"
              value-format="yyyy-MM-dd"
              :clearable="false"
              :editable="false"
              :disabled="dateFilter.rangeType === 'endDate'"
              @change="dateRangeChange"
              placeholder="开始日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item  label="结束日期">
            <el-date-picker
              v-model="dateFilter.endDate"
              type="date"
              size="small"
              value-format="yyyy-MM-dd"
              :clearable="false"
              :editable="false"
              :disabled="dateFilter.rangeType === 'startDate'"
              @change="dateRangeChange"
              placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="显示">
            <el-select v-model="dateFilter.showType" placeholder="显示" size="small">
              <el-option label="仅相关值" :value="0"></el-option>
              <el-option label="数据库中所有值" :value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="">
            <el-checkbox label="包含Null值" v-model="dateFilter.containNull"></el-checkbox>
          </el-form-item>
        </el-form>
      </div>
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
import { Vue, Component, Prop, Emit } from 'vue-property-decorator'
import { ICube, INumberFilter, ICubeFilter, IDateFilter } from '../../interface'
import { CubeModule } from '../../store/modules/cube'
import { cloneDeep } from 'lodash'
import moment, { DurationInputArg2 } from 'moment'
import { range } from 'xe-utils/methods'

/** 数值筛选器范围选项 */
const numberRangeTypes = [
  { name: '值范围', value: 'range'},
  { name: '至少', value: 'more'},
  { name: '至多', value: 'less'},
  { name: '特殊值', value: 'special'},
]

/** 日期筛选器范围选项 */
const dateRangeTypes = [
  { name: '相对日期', value: 'relative'},
  { name: '日期范围', value: 'range'},
  { name: '开始日期', value: 'startDate'},
  { name: '结束日期', value: 'endDate'},
  { name: '特殊值', value: 'special'}
]

/** 筛选器字段类型取值范围 */
const typeList = [
  'number',
  'date'
]

// 默认数值筛选对象
const defaultNumberFilter = {
  rangeType: 'range',
  min: undefined,
  max: undefined,
  showType: 0,
  containNull: false,
  specialValue: 2
}

// 默认日期筛选对象
const defaultDateFilter = {
  rangeType: 'range',
  startDate: '',
  endDate: '',
  showType: 0,
  containNull: false,
}

// 默认相对日期计算对象
const relativeOptions = {
  type: 'day',        // year-年  quarter-季度  month-月  week-周  day-天
  relativeType: 0,    // -2:前几年(月...)  -2:前一年(月...)  0:今年(月...)  1:后一年(月...)  2:后几年(月...)  3:锚点年(月...)至今
  beforeValue: 3,     // 前几年、月值  默认3表示前3年
  afterValue: 3,      // 后几年、月值  默认3表示后3年
  checkDate: false,   // 是否选择锚点日期，为否时，锚点日期为今天
  relativeDate: moment().format('YYYY-MM-DD') // 锚点日期
}

@Component({
  name: 'filter-range-dialog'
})
export default class extends Vue {
  @Prop() private showDialog!: boolean

  // 筛选字段
  @Prop() private field!: ICube

  // 筛选字段类型 默认number-数值类型  date-日期类型
  @Prop() private type!: string

  // 当前选中的筛选范围项
  private rangeItem: any = {};

  private numberFilter: INumberFilter = defaultNumberFilter

  private dateFilter: IDateFilter = defaultDateFilter

  // 相对日期配置项
  private relativeOptions: any = relativeOptions

  // 实际类型
  get realType(): string {
    if (typeList.includes(this.type)) {
      return this.type;
    } else {
      return typeList[0]
    }
  }

  // 实际类型对应的筛选范围项
  get rangeTypes(): any[] {
    if (this.realType === 'number') {
      return numberRangeTypes;
    } else if (this.realType === 'date') {
      return dateRangeTypes;
    }
    return numberRangeTypes;
  }

  get visible() {
    return this.showDialog;
  }

  set visible(value: boolean) {
    this.$emit('update:showDialog', value)
  }

  /**
   * 验证日期范围
   * 开始日期小于结束日期时，开始结束互换
   */
  private dateRangeChange() {
    if (moment(this.dateFilter.startDate).isAfter(this.dateFilter.endDate)) {
      const endDate = this.dateFilter.endDate;
      this.dateFilter.endDate = this.dateFilter.startDate;
      this.dateFilter.startDate = endDate;
    }
  }

  /**
   * 相对日期的计算
   */
  private calRange() {
    const {
      type,
      beforeValue,
      afterValue,
      checkDate,
      relativeDate
    } = this.relativeOptions;
    let relativeType = this.relativeOptions.relativeType;

    // 相对日期类型为‘天’且之前选择的相对类型为‘锚点日期至今’，重置相对类型为‘当天’
    if (type === 'day' && relativeType === 3) {
      this.relativeOptions.relativeType = relativeType = 0;
    }
    const date = checkDate ? moment(relativeDate) : moment();
    const format = 'YYYY-MM-DD';
    if (type === 'year' || type === 'month' || type === 'week' || type === 'day') {
      const operateStr = (type + 's') as string;    // momentjs functions parameter
      if (relativeType === 3) {
        this.dateFilter.startDate = date.clone().startOf(type).format(format);
        this.dateFilter.endDate = date.clone().format(format);
      } else if (relativeType === -1) {
        this.dateFilter.startDate = date.clone().subtract(1, operateStr as DurationInputArg2).startOf(type).format(format);
        this.dateFilter.endDate = date.clone().subtract(1, operateStr as DurationInputArg2).endOf(type).format(format);
      } else if (relativeType === -2) {
        this.dateFilter.startDate = date.clone().subtract(beforeValue - 1, operateStr as DurationInputArg2).startOf(type).format(format);
        this.dateFilter.endDate = date.clone().endOf(type).format(format);
      } else if (relativeType === 0) {
        this.dateFilter.startDate = date.clone().startOf(type).format(format);
        this.dateFilter.endDate = date.clone().endOf(type).format(format);
      } else if (relativeType === 1) {
        this.dateFilter.startDate = date.clone().add(1, operateStr as DurationInputArg2).startOf(type).format(format);
        this.dateFilter.endDate = date.clone().add(1, operateStr as DurationInputArg2).endOf(type).format(format);
      } else if (relativeType === 2) {
        this.dateFilter.startDate = date.clone().startOf(type).format(format);
        this.dateFilter.endDate = date.clone().add(afterValue - 1, operateStr as DurationInputArg2).endOf(type).format(format);
      }
    } else if (type === 'quarter') {
      const curQuarter = date.quarter();
      if (relativeType === 3) {
        this.dateFilter.startDate = moment().quarter(curQuarter).startOf('month').format(format);
        this.dateFilter.endDate = date.format(format);
      } else if (relativeType === -1) {
        const preQuarter = moment().quarter(curQuarter - 1)
        this.dateFilter.startDate = preQuarter.startOf('Q').format(format);
        this.dateFilter.endDate = preQuarter.endOf('Q').format(format);
      } else if (relativeType === -2) {
        this.dateFilter.startDate = moment().quarter(curQuarter - beforeValue + 1).startOf('Q').format(format);
        this.dateFilter.endDate = moment().quarter(curQuarter).endOf('Q').format(format);
      } else if (relativeType === 0) {
        this.dateFilter.startDate = moment().quarter(curQuarter).startOf('Q').format(format);
        this.dateFilter.endDate = moment().quarter(curQuarter).endOf('Q').format(format);
      } else if (relativeType === 1) {
        const nextQuarter = moment().quarter(curQuarter + 1)
        this.dateFilter.startDate = nextQuarter.startOf('Q').format(format);
        this.dateFilter.endDate = nextQuarter.endOf('Q').format(format);
      } else if (relativeType === 2) {
        this.dateFilter.startDate = moment().quarter(curQuarter).startOf('Q').format(format);
        this.dateFilter.endDate = moment().quarter(curQuarter + afterValue - 1).endOf('Q').format(format)
      }
    }
  }

  // 选中取值范围选项
  private checkRange(rangeItem: any) {
    this.rangeItem = rangeItem;
    if (this.realType === 'number') {
      this.numberFilter.rangeType = rangeItem.value;
    } else {
      this.dateFilter.rangeType = rangeItem.value;
      if (rangeItem.value === 'relative') {
        this.calRange();
      }
    }
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
    if (this.realType === 'number') {
      curCube.filter = {...curCube.filter, ...this.numberFilter}
    } else {
      curCube.filter = {...curCube.filter, ...this.dateFilter}
    }
    CubeModule.updateCube(curCube);
    this.$emit('confirm', this.realType === 'number' ? this.numberFilter : this.dateFilter)
  }

  // dialog open 初始化数据
  private initData() {
    if (this.realType === 'number') {
      this.rangeItem = numberRangeTypes[0];
      this.numberFilter = {
        ...defaultNumberFilter,
        ...{
          rangeType: this.rangeItem.value
        },
        ...cloneDeep(this.$store.state.cube.curCube.filter)
      }
    } else {
      this.rangeItem = dateRangeTypes[1];
      this.dateFilter = {
        ...defaultDateFilter,
        ...{
          rangeType: this.rangeItem.value
        },
        ...cloneDeep(this.$store.state.cube.curCube.filter)
      }
    }

    // TODO 获取该字段的在数据库的的最大值与最小值，作为选择范围的默认值
  }
}
</script>

<style lang="scss">
.bi-filter-range-dialog {
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

    .range-types {
      margin-bottom: 20px;

      .input-range-check-item {
        width: 135px;
        height: 70px;
        margin-right: 15px;
        font-size: 12px;
        border: 1px solid #a0a0a0;
        background: #dcdcdc;
        @include flex-center;
        flex-direction: column;
        user-select: none;

        &:hover,
        &.active {
          background: #cce5ff;
          border-color: #3399ff;
        }

        i {
          font-size: 20px;
          margin-bottom: 5px;
        }
      }
    }

    .content {
      padding: 20px 10px 10px 10px;
      position: relative;
      border: 1px solid #888;

      .tag-name {
        position: absolute;
        top: -10px;
        left: 10px;
        font-size: 12px;
        line-height: 20px;
        background: #fff;
        padding: 0 5px;
      }

      .relative-date {
        padding-left: 20px;
        padding-bottom: 20px;

        .range-date-show {
          margin-bottom: 20px;
        }

        .relative-radio-group {
          display: block;
          margin-bottom: 20px;

          .el-input-number {
            width: 80px;
          }
        }
      }

      .special-radio-group.el-radio-group {
        padding: 20px 0 0 20px;

        .el-radio {
          display: block;
          margin-bottom: 20px;
        }
      }

      .range-form {

        .el-input__inner {
          text-align: left;
        }
      }
    }
  }
}
</style>
