<template>
  <div class="bi-monaco" ref="monaco">
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch, Prop } from 'vue-property-decorator'
import * as monaco from 'monaco-editor'

@Component({
  name: 'bi-monaco',
})
export default class extends Vue {

  // 配置项
  @Prop() private options?: any

  // whether editor is readonly or not
  @Prop() private readonly?: boolean

  // editor value
  @Prop() private model!: string

  private cursorPosition?: number
  private biEditor: any

  get value(): string {
    return this.model
  }

  set value(value: string) {
    this.$emit('update:model', value)
  }

  private mounted() {
    this.initMonaco();
  }

  // 初始化monaco
  public initMonaco() {
    if (!this.biEditor) {
      const options = {
        ...{
          language: 'sql',
          theme: 'vs-dark',
          value: this.value,
          wrappingIndent: 'indent'
          // readOnly: this.readonly
        },
        ...this.options
      }
      this.biEditor = monaco.editor.create(this.$refs.monaco as HTMLElement, options)

      // 监听变化
      this.biEditor.onDidChangeModelContent((e: any) => {
        this.cursorPosition = e.changes[0].rangeOffset; // 获取光标位置
        this.value = this.biEditor.getValue(); // 使value和其值保持一致
      })
    }
  }

  @Watch('value')
  public triggerSuggest(newVal: string) {
    // 当提示项非空时，触发提示，能够使提示项更新并显示
    if (newVal.length > 0) {
      this.biEditor.trigger('提示', 'editor.action.triggerSuggest', {});
      console.log(newVal)
    }
  }
}
</script>

<style lang="scss">
.bi-monaco {
  width: 500px;
  height: 260px;
}
</style>
