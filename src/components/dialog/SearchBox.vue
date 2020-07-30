<template>
  <div class="bi-search-box">
    <div v-show="type !== chooseTypes[1]">
      <div class="search-box" :class="{'disabled': type === chooseTypes[2]}">
        <el-input 
          class="search-input"
          v-model="searchWords" 
          size="mini"
          placeholder="输入搜索文本"
          :disabled="type === chooseTypes[2]"
          clearable>
        </el-input>
        <el-scrollbar v-show="type === chooseTypes[0]" v-if="searchWords" class="result-container" :class="{'no-result': list.length === 0}">
          <span v-show="list.length === 0">无匹配项</span>
          <el-checkbox-group v-model="checkList" v-show="list.length > 0">
            <el-row v-for="item in list" :key="item.id" class="list-row">
              <el-checkbox :label="item.id">{{item.name}}</el-checkbox>
            </el-row>
          </el-checkbox-group>
        </el-scrollbar>
        <el-scrollbar class="list-container">
          <el-checkbox-group v-model="checkList" v-show="type === chooseTypes[0]">
            <el-row v-for="item in originList" :key="item.id" class="list-row">
              <el-checkbox :label="item.id">{{item.name}}</el-checkbox>
            </el-row>
          </el-checkbox-group>
        </el-scrollbar>
      </div>
      <div class="search-box-btn clearfix">
        <el-button type="primary" plain size="mini" @click="checkAll" 
          :disabled="type === chooseTypes[2]">全选
        </el-button>
        <el-button type="primary" plain size="mini" @click="clearAll"
          :disabled="type === chooseTypes[2]">清空
        </el-button>
        <el-checkbox class="float-right" v-model="isExclude"
          :disabled="type === chooseTypes[2]">排除
        </el-checkbox>
      </div>
    </div>
    <div v-show="type === chooseTypes[1]">
      <div class="search-box">
        <el-input 
          class="search-input"
          v-model="searchWords" 
          size="mini"
          placeholder="输入要搜索或添加的文本"
          clearable>
        </el-input>
        <el-scrollbar v-if="searchWords" class="result-container" :class="{'no-result': list.length === 0}">
          <span v-show="list.length === 0">无匹配项</span>
          <el-checkbox-group v-model="checkList" v-show="list.length > 0">
            <el-row v-for="item in list" :key="item.id" class="list-row">
              <el-checkbox :label="item.id">{{item.name}}</el-checkbox>
            </el-row>
          </el-checkbox-group>
        </el-scrollbar>
        <el-scrollbar class="list-container">
          <el-row v-for="(item, index) in checkObjList" :key="item.id" class="list-row custom-row">
            {{item.name}}
            <i class="el-icon-close" @click="clearItem(index)"></i>
          </el-row>
        </el-scrollbar>
      </div>
      <div class="search-box-btn clearfix">
        <el-button type="primary" plain size="mini" @click="clearAll"
          :disabled="checkObjList.length === 0">清除列表
        </el-button>
        <div class="float-right inline-block">
          <el-checkbox v-model="nullIsAll">为空时包含所有值
          </el-checkbox>
          <el-checkbox v-model="isExclude">排除
          </el-checkbox>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import CONST from '../../const';

@Component({
  name: 'search-box'
})
export default class extends Vue {
  // search-box显示类型
  @Prop() private type!: string

  // 字段在数据库中的所有值的集合
  @Prop() private originList!: any[]

  @Prop() private model!: any

  // 显示的字段值
  private list: any[] = []

  get checkList() {
    return this.model.checkList
  }
  set checkList(list: any[]) {
    const temp = {...this.model}
    temp.checkList = list
    this.$emit('update:model', temp)
  }

  get isExclude() {
    return this.model.isExclude
  }
  set isExclude(data: boolean) {
    const temp = {...this.model}
    temp.isExclude = data
    this.$emit('update:model', temp)
  }

  get nullIsAll() {
    return this.model.nullIsAll
  }
  set nullIsAll(data: boolean) {
    const temp = {...this.model}
    temp.nullIsAll = data
    this.$emit('update:model', temp)
  }

  get checkObjList(): any[] {
    return this.originList.filter((item) => {
      return this.checkList.includes(item.id)
    })
  }

  // 筛选列表关键字
  private searchWords: string = ''

  private chooseTypes: number[] = [...Object.values(CONST.types.CHOOSE_TYPES)]

  @Watch('searchWords')
  private onChangeSearch(nv: string) {
    this.list = this.originList.filter((item) => {
      return item.name.toString().toLowerCase().indexOf(nv) !== -1
    })
  }

  // 选中被筛选项
  private checkAll() {
    this.checkList = this.list.map((item) => {
      return item.id
    })
  }
  // 重置被筛选项中的选中项
  private clearAll() {
    for (let i = this.list.length - 1; i >= 0; i--) {
      const item = this.list[i]
      const index = this.checkList.indexOf(item.id)
      if (index > -1) {
        this.checkList.splice(index, 1)
      }
    }
  }

  // 删除指定选项
  private clearItem(index: number) {
    this.checkList.splice(index, 1);
  }

  // 重置参数
  public reset() {
    this.searchWords = ''
  }
}
</script>

<style lang="scss">
.bi-search-box {
  .search-box {
    margin: 20px 0;
    border: 1px solid #829b90;

    &.disabled {
      background: #f0f0f0;
    }

    .search-input>input {
      background: #ffffdc;
      border-radius: 0;
      border-left: none;
      border-top: none;
      border-right: none;
    }

    .list-container {
      height: 260px;
    }

    .result-container {
      height: 150px;
      background: #ffffdc;
      box-shadow: 0px 1px 2px 0px #aaa;

      &.no-result {
        height: 30px;
      }

      & + .list-container {
        height: 110px;
      }

      &.no-result + .list-container {
        height: 230px;
      }
    }

    .list-row {
      padding-left: 15px;

      &:hover {
        background: #f0f0f0;
      }

      &.custom-row {
        display: flex;
        align-items: center;
        position: relative;

        i {
          display: none;
          position: absolute;
          right: 10px;
          cursor: pointer;
        }
        &:hover i {
          display: block;
        }
      }
    }
  }

  .search-box-btn {
    margin-bottom: 20px;
  }
}
</style>
