<template>
  <el-dialog
    custom-class="bi-create-param-field"
    @open="initData"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :visible.sync="visible"
  >
    <div slot="title" class="title">创建参数</div>
    <el-form ref="paramForm" :model="paramField" :rules="rule" label-width="80px">
      <el-form-item label="名称" prop="name">
        <el-input v-model="paramField.name" placeholder="参数名称">
          <el-button slot="append" type="primary" size="small" @click="showDesc = !showDesc">{{showDesc ? '隐藏描述': '显示描述'}}</el-button>
        </el-input>
      </el-form-item>
      <el-collapse-transition>
        <el-form-item label="参数描述" v-show="showDesc">
          <el-input type="textarea" v-model="paramField.desc" :rows="3" placeholder="参数描述"></el-input>
        </el-form-item>
      </el-collapse-transition>
      <el-form-item label="数据类型" prop="type">
        <el-select v-model="paramField.type" @change="dataTypeChange">
          <el-option 
            v-for="(item, index) in dataTypeList" 
            :key="index" 
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="当前值" prop="curValue">
        <el-input-number
          :precision="2"
          :controls="false"
          v-show="paramField.type === dataTypeEnum.FLOAT" 
          v-model="paramField.curValue">
        </el-input-number>
        <el-input-number
          :precision="0"
          :controls="false"
          v-show="paramField.type === dataTypeEnum.INTEGER" 
          v-model="paramField.curValue">
        </el-input-number>
        <el-input
          type="text"
          v-show="paramField.type === dataTypeEnum.STRING" 
          v-model="paramField.curValue">
        </el-input>

        <el-radio-group v-model="paramField.curValue" v-show="paramField.type === dataTypeEnum.BOOLEAN">
          <el-radio :label="1">真</el-radio>
          <el-radio :label="0">假</el-radio>
        </el-radio-group>

        <el-date-picker
          v-if="paramField.type === dataTypeEnum.DATE"
          v-model="paramField.curValue"
          type="date"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          :editable="false"
          :clearable="false"
          placeholder="选择日期">
        </el-date-picker>

        <el-date-picker
          v-if="paramField.type === dataTypeEnum.DATETIME"
          v-model="paramField.curValue"
          type="datetime"
          :editable="false"
          :clearable="false"
          format="yyyy-MM-dd HH:mm:ss"
          value-format="yyyy-MM-dd HH:mm:ss"
          placeholder="选择时间">
        </el-date-picker>
      </el-form-item>
    </el-form>

    <div slot="footer" class="dialog-footer clearfix">
      <el-button size="medium" type="primary" @click="save" :disabled="!isFormValid">确定</el-button>
      <el-button size="medium" @click="visible = false">取 消</el-button>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import CONST from '../../const'
import moment from 'moment'

interface IParamField {
  name?: string
  desc?: string,
  type?: string | number,
  curValue?: string | number | boolean
}

const defaultParam: IParamField = {
  name: '参数1',
  desc: '',
  type: CONST.types.DataTypes.FLOAT,
  curValue: 1
}

@Component({
  name: 'create-param',
})
export default class extends Vue {
  @Prop() private showDialog!: boolean

  @Prop() private model!: IParamField

  private paramField: IParamField = defaultParam

  /** whether commit button disabled */
  private isFormValid: boolean = false

  /** Whether to display the parameter description input item */
  private showDesc: boolean = false

  /** form validate rule */
  private rule: any = {
    name: [
      { required: true, message: '请输入参数名称', trigger: 'blur' },
      { min: 2, max: 10, message: '参数名长度2-10字符', trigger: 'change' }
    ],
    type: [
      { required: true, message: '数据类型不能为空', trigger: 'change', type: 'number' },
    ],
    curValue: [
      { required: true, message: '参数当前值不能为空', trigger: ['blur', 'change']},
      // { validator: this.validateValue, trigger: ['blur', 'change'] }
    ]
  }

  /**
   * The validator of paramField.curValue
   * because the type of curValue may be number or string
   * Therefore, native verification rules cannot be used
   */
  private validateValue(rule: any, value: any, callback: Function) {
    if (value == null) {
      callback(new Error('参数当前值不能为空'))
    }
    callback()
  }

  /** data type */
  get dataTypeList(): Array<{ label: string, value: any }> {
    return CONST.types.dataTypeList
  }

  get dataTypeEnum(): any {
    return CONST.types.DataTypes
  }

  get visible() {
    return this.showDialog
  }

  set visible(value: boolean) {
    this.$emit('update:showDialog', value)
  }

  /** select change callback. Set curValue according to option's value */
  private dataTypeChange(value: any) {
    switch (value) {
      case CONST.types.DataTypes.FLOAT:
      case CONST.types.DataTypes.INTEGER:
      case CONST.types.DataTypes.STRING:
      case CONST.types.DataTypes.BOOLEAN:
        this.paramField.curValue = 1
        break
      case CONST.types.DataTypes.DATE:
      case CONST.types.DataTypes.DATETIME:
        this.paramField.curValue = moment().format('YYYY-MM-DD HH:mm:ss')
        break
    }
  }

  @Watch('paramField', { deep: true })
  private onParamformChange(nv: IParamField) {
    const paramForm = (this.$refs as any).paramForm
    if (paramForm) {
      paramForm.validate((valid: boolean) => {
        this.isFormValid = valid
      })
    } else {
      return false
    }
  }

  private save() {
    (this.$refs as any).paramForm.validate((valid: boolean) => {
      if (valid) {
        this.$emit('confirm', this.paramField)
        this.visible = false
      } else {
        this.$message({
          message: 'submit error',
          type: 'error'
        })
        return false
      }
    })
  }

  /**
   * initial data when dialog open
   */
  private initData() {
    this.paramField = { ...defaultParam, ...this.model }
    this.showDesc = !!this.paramField.desc
  }
}
</script>

<style lang="scss">
.bi-create-param-field {
  width: 550px;

  .el-dialog__header {
    border-bottom: 1px solid #ccc;
  }

  .el-dialog__body {
    padding: 20px 20px 0 20px;
  }

  .container {

  }
}
</style>
