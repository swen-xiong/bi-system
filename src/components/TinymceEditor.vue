<template>
  <div class="tinymce-editor">
    <Editor v-model="tinymceHtml" :init="config" :disabled="disabled"></Editor>
  </div>
</template>

<script lang="ts">
import {
  Vue,

  Component,
  Prop,
  Watch,
  Provide,
  Model,
  Emit
} from 'vue-property-decorator'
import tinymce from 'tinymce'
import Editor from '@tinymce/tinymce-vue'
import 'tinymce/themes/modern/theme'
import 'tinymce/plugins/colorpicker'
import 'tinymce/plugins/textcolor'
import 'tinymce/plugins/fullpage'

@Component({
  components: {
    Editor
  }
})
export default class TinymceEditor extends Vue {
  @Prop({
    type: Object
  })
  public customConfig?: object
  @Prop({ type: Boolean, default: false }) public disabled: boolean = false

  @Model('change', { type: String, default: '' }) public model!: string
  private defaultConfig: object = {
    placeholder: '在这里输入内容',
    language_url: '/tinymce/zh_CN.js',
    language: 'zh_CN',
    skin_url: '/tinymce/skins/lightgray',
    // height: 300,
    toolbar:
      'fontselect | bold italic underline | fontsizeselect | forecolor | alignleft aligncenter alignright | undo redo | removeformat',
    font_formats: `微软雅黑=Microsoft YaHei,Helvetica Neue,PingFang SC,sans-serif;
                   苹果苹方=PingFang SC,Microsoft YaHei,sans-serif;
                   宋体=simsun,serif;Andale Mono=andale mono,times;
                   Arial=arial,helvetica,sans-serif;
                   Arial Black=arial black,avant garde;
                   Book Antiqua=book antiqua,palatino;
                   Comic Sans MS=comic sans ms,sans-serif;
                   Courier New=courier new,courier;
                   Georgia=georgia,palatino;
                   Helvetica=helvetica;
                   Impact=impact,chicago;
                   Symbol=symbol;
                   Tahoma=tahoma,arial,helvetica,sans-serif;
                   Terminal=terminal,monaco;
                   Times New Roman=times new roman,times;
                   Trebuchet MS=trebuchet ms,geneva;
                   Verdana=verdana,geneva;
                   Webdings=webdings;
                   Wingdings=wingdings,zapf dingbats`,
    fontsize_formats: '8px 9px 10px 11px 12px 14px 16px 18px 24px 36px 48px',
    formats: {
      // bold: {inline:'span', styles:{color:'#f00'} },
    },
    plugins: 'colorpicker textcolor fullpage',
    fullpage_default_font_family: 'Microsoft YaHei', // 默认字体
    fullpage_default_font_size: '14px', // 默认字号
    branding: false, // 隐藏右下角技术支持
    menubar: false, // 隐藏菜单栏
    elementpath: true, // 隐藏底栏元素路径
    resize: false, // true（仅允许改变高度）, false（完全不让你动）, 'both'（宽高都能改变，注意引号）
    setup: (editor: any) => {
      // editor.on('change', (event: MouseEvent) => {
      //   // console.log('editor change')
      //   // const selection = tinymce.activeEditor.selection;
      //   // console.log(selection.getRng(true).startOffset)
      // }),
      // editor.on('keyup', (event: KeyboardEvent) => {
      //   const selection = tinymce.activeEditor.selection
      //   const startContainer = selection.getRng(true).startContainer.textContent || ''
      //   const startOffset = selection.getRng(true).startOffset
      //   const lastInput = startContainer.substring(startContainer.length - 1)
      //   // var $ = tinymce.dom.DomQuery;
      //   // $('p').attr('attr', 'value').addClass('class');
      //   selection.setCursorLocation(selection.getNode(), 1)
      //   // console.log(lastInput)
      //   if (lastInput === '<') {
      //     // TODO show suggestions dropdown
      //   }
      // })
    }
  }
  private config: object = { ...this.defaultConfig, ...this.customConfig }
  private tinymceHtml: string = this.model

  /**
   * clear content
   */
  public clear(): void {
    this.tinymceHtml = ''
  }

  private mounted() {
    tinymce.init({})
  }

  @Emit('change')
  @Watch('tinymceHtml')
  private watchValue(nv: string, ov: string): void {
    // console.log(111)
  }
}
</script>
