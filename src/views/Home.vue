<template>
  <div class="bi-home">
    <div class="aside">
      <router-link to="main" class="home-link">
        <i class="el-icon-magic-stick"></i>
      </router-link>
      <el-scrollbar class="aside-scroll">
        <div class="content">
          <div class="title">连接</div>
          <div class="connect-type">
            <div class="name">到文件</div>
            <ul class="nav">
              <li @click="handleUpload">Microsoft Excel</li>
              <li>文本文件</li>
              <li>JSON 文件</li>
              <li>Microsoft Access</li>
            </ul>
          </div>
          <div class="connect-type">
            <div class="name">到服务器</div>
            <ul class="nav">
              <li>Microsoft SQL Server</li>
              <li>MySQL</li>
              <li>Oracle</li>
            </ul>
          </div>
          <div class="connect-type">
            <div class="name">已保存数据源</div>
            <ul class="nav">
            </ul>
          </div>
        </div>
      </el-scrollbar>
    </div>
    <div class="main-container">
      <div class="title">打开</div>
      <input
        ref="excel-upload-input"
        class="excel-upload-input"
        type="file"
        accept=".xlsx, .xls"
        @change="handleClick"
      >
      <a class="open-a-btn" @click="handleUpload">打开工作簿</a>
    </div>
    <div class="mask" v-if="loading">
      <i class="el-icon-loading"></i>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import XLSX from 'xlsx'
import { SheetModule } from '@/store/modules/sheet'
import { getHeaderRow } from '@/utils/excel'

@Component({
  name: 'Home'
})
export default class extends Vue {
  private loading = false

  private excelData = {
    header: null,
    results: null
  }

  /** trigger upload */
  private handleUpload() {
    (this.$refs['excel-upload-input'] as HTMLInputElement).click()
  }

  /** get file and upload */
  private handleClick(e: MouseEvent) {
    const files = (e.target as HTMLInputElement).files
    if (files) {
      const rawFile = files[0] // only use files[0]
      this.upload(rawFile)
    }
  }

  /** upload Function */
  private upload(rawFile: File) {
    (this.$refs['excel-upload-input'] as HTMLInputElement).value = '' // Fixes can't select the same excel
    this.readerData(rawFile)
  }

  /** read file data */
  private readerData(rawFile: File) {
    this.loading = true
    const reader = new FileReader()
    reader.onload = (e) => {
      const data = (e.target as FileReader).result
      const workbook = XLSX.read(data, { type: 'array' })
      const firstSheetName = workbook.SheetNames[0]
      const worksheet = workbook.Sheets[firstSheetName]
      const header = getHeaderRow(worksheet)
      const results = XLSX.utils.sheet_to_json(worksheet)
      // const results = XLSX.utils.sheet_to_json(worksheet, {header: 1, raw: false})
      console.log(header, results)
      this.loading = false

      SheetModule.SET_SHEET({
        bookName: rawFile.name.split('.')[0],
        SheetNames: workbook.SheetNames,
        Sheets: workbook.Sheets,
        curSheet: worksheet,
        curSheetFormat: results,
        curSheetHeader: header
      })
      this.$router.push('/view')
    }
    reader.readAsArrayBuffer(rawFile)
  }
}
</script>

<style lang="scss" scoped>
.bi-home {
  height: 100%;
  position: relative;

  .aside {
    width: 250px;
    height: 100%;
    position: relative;
    background: #355c80;

    .home-link {
      display: block;
      width: 100%;
      height: 40px;
      background: #2d4e6c;
      color: #fff;
      padding: 5px;
      font-size: 28px;
      line-height: 28px;
  
      &:hover {
        background: #274560;
      }
    }

    .aside-scroll {
      position: absolute;
      top: 40px;
      bottom: 0;
      width: 100%;
      padding-top: 20px;
      padding-bottom: 20px;

      .content {
        color: #fff;
        padding: 0 10px 0 20px;

        .title {
          font-size: 28px;
          font-weight: bold;
          margin-bottom: 15px;
        }

        .connect-type {
          & + .connect-type {
            margin-top: 40px;
          }

          .name {
            color: #9aadbf;
            font-size: 16px;
            margin-bottom: 15px;
          }

          .nav {
            margin-left: 10px;
            
            &>li {
              padding: 5px;
              font-size: 14px;
              cursor: pointer;

              &:hover {
                background: #2d4e6c;
              }
            }
          }
        }
      }
    }
  }

  .main-container {
    position: absolute;
    left: 250px;
    right: 0;
    top: 0;
    height: 100%;
    padding: 60px 20px 20px 20px;
    background: #f8f8f8;

    .title {
      font-size: 28px;
    }

    .excel-upload-input {
      display: none;
      z-index: -9999;
    }

    .open-a-btn {
      display: block;
      margin-top: 10px;
      color: #ef8f8c;
      cursor: pointer;
      text-align: left;
      font-size: 14px;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  .mask {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.2);

    .el-icon-loading {
      font-size: 50px;
    }
  }
}
</style>