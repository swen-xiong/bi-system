<template>
  <div class="bi-view">
    <split-pane-custom :min-percent='15' :default-percent='15' :max-percent='40' split="vertical">
      <div slot="paneL" class="view-aside">
        <div class="aside-header">
          <div class="book-name">{{bookName}}</div>
        </div>
        <div class="aside-content">
          <ul class="bi-ul">
            <li v-for="(name, index) in sheetNames" :key="name" class="flex" @dblclick="sheetIndex = index" :class="{'active': sheetIndex === index}">
              <div><i class="el-icon-date sheet-icon"></i>{{name}}</div>
              <i class="el-icon-s-grid view-data-icon"></i>
            </li>
          </ul>
        </div>
      </div>
      <div slot="paneR" style="height: 100%">
        <split-pane-custom :min-percent='15' :default-percent='15' :max-percent='40' split="horizontal">
          <template slot="paneL">
            <div class="sheet-info">
              <div class="name">{{sheetNames[sheetIndex]}}({{bookName}})</div>
            </div>
          </template>
          <template slot="paneR">
            <div class="sheet-operation"></div>
            <vxe-table
              v-if="sheet"
              border
              stripe
              show-header-overflow
              show-overflow
              auto-resize
              height="auto"
              highlight-hover-row
              class="mytable-scrollbar sheet-table"
              :data="sheet">
              <vxe-table-column v-for="item of header" :key="item" :title="item" :field="item" min-width="60"></vxe-table-column>
            </vxe-table>
          </template>
        </split-pane-custom>
      </div>
    </split-pane-custom>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import XLSX from 'xlsx'
import { SheetModule } from '@/store/modules/sheet'
import { getHeaderRow } from '@/utils/excel'

@Component({
  name: 'DataView'
})
export default class extends Vue {
  private sheetIndex: number = 0

  get bookName() {
    return SheetModule.bookName
  }
  get sheetNames() {
    return SheetModule.SheetNames
  }
  get header() {
    let worksheet = SheetModule.Sheets[SheetModule.SheetNames[this.sheetIndex]]
    return getHeaderRow(worksheet)
  }
  get sheet() {
    let worksheet = SheetModule.Sheets[SheetModule.SheetNames[this.sheetIndex]]
    return XLSX.utils.sheet_to_json(worksheet)
  }
}
</script>

<style lang="scss">
.bi-view {
  height: 100%;

  .splitter-pane-resizer.vertical {
    background: #000;
    width: 1px;
    border-width: 1px;
    margin: 0;
  }
  .splitter-pane-resizer.horizontal {
    background: #000;
    height: 1px;
    border-width: 1px;
    margin: 0;
  }

  .view-aside {
    height: 100%;
    font-size: 14px;
    background: #f7f7f7;

    .aside-header {
      padding: 20px;
      border-bottom: 1px solid $borderColor;

      .book-name {
        font-size: 16px;
      }
    }

    .aside-content {
      padding: 20px;
      border-bottom: 1px solid $borderColor;

      .bi-ul>li {
        padding: 5px;
        border: 1px solid transparent;
        @include flex-space-between;

        .sheet-icon {
          margin-right: 5px;
        }

        .view-data-icon {
          display: block;
          cursor: pointer;
          padding: 2px;
          border: 1px solid transparent;
          visibility: hidden;

          &:hover {
            background: #cce5ff;
            border-color: #3399ff;
          }
        }

        &:hover {
          background: #fff;
          border-color: #eee;

          .view-data-icon {
            visibility: visible;
          }
        }

        &.active {
          background: #fff;
          border-color: #eee;
        }
      }
    }
  }

  .splitter-pane.vertical.splitter-paneR {
    padding-bottom: 20px;
  }

  .sheet-info {
    height: 100%;
    padding: 20px;

    .name {
      font-size: 18px;
      font-weight: bold;
    }
  }
}
</style>