<template>
  <div class="bi-monaco" ref="monaco">
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch, Prop } from 'vue-property-decorator'
import * as monaco from 'monaco-editor'
import { language as sqlLanguage } from 'monaco-editor/esm/vs/basic-languages/sql/sql'
import { ModalController } from 'vxe-table'

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

  get monacoInstance() {
    return {...monaco}
  }

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
          theme: 'sqlField',
          value: this.value,
          wrappingIndent: 'indent',
          lineNumbers: 'off',     // does not render lineNumber
          // readOnly: this.readonly
        },
        ...this.options
      }

      // console.log(monaco.languages.completionlist.suggestions)

      this.monacoInstance.languages.registerCompletionItemProvider('sql', {
        provideCompletionItems(model, position) {
          // let textUntilPosition = model.getValueInRange({startLineNumber: 1, startColumn: 1, endLineNumber: position.lineNumber, endColumn: position.column});
          // let match = textUntilPosition.match(/"dependencies"\s*:\s*\{\s*("[^"]*"\s*:\s*"[^"]*"\s*,\s*)*([^"]*)?$/);
          // if (!match) {
          //     return { suggestions: [] };
          // }
          // var word = model.getWordUntilPosition(position);
          // var range = {
          //     startLineNumber: position.lineNumber,
          //     endLineNumber: position.lineNumber,
          //     startColumn: word.startColumn,
          //     endColumn: word.endColumn
          // };
          return {
            suggestions: [
              {
                label: 'a利润',
                kind: monaco.languages.CompletionItemKind.Snippet,
                insertText: '[利润]'
              }, {
                label: 'b利润率',
                kind: monaco.languages.CompletionItemKind.Reference,
                insertText: '[利润率]'
              }, {
                label: 'c客户名称',
                kind: monaco.languages.CompletionItemKind.Text,
                insertText: '[客户名称]'
              }
            ] as any
          }
        },
        triggerCharacters: ['[']
      })

      /**
       * Set the theme style of cubename
       */
      const languageDef = { ...sqlLanguage }
      try {
        languageDef.tokenizer.root.splice(0, 0, [/\[\S+\]/, { token: 'custom-info' }])
      } catch (error) {
        console.error(error.message)
      }
      monaco.languages.setMonarchTokensProvider('sql', languageDef as any)
      monaco.editor.defineTheme('sqlField', {
        base: 'vs',
        inherit: true,
        rules: [
          { token: 'custom-info', foreground: 'b69606', fontStyle: 'bold' }
        ]
      } as any)

      this.biEditor = this.monacoInstance.editor.create(this.$refs.monaco as HTMLElement, options)
      // 监听变化
      this.biEditor.onDidChangeModelContent((e: any) => {
        this.cursorPosition = e.changes[0].rangeOffset; // 获取光标位置
        this.value = this.biEditor.getValue(); // 使value和其值保持一致
      })
    }
  }

  /**
   * insert content
   * @param text The text to replace with. This can be null to emulate a simple delete.
   */
  public insertContent(text: string) {
    if (this.biEditor) {
      const selection = this.biEditor.getSelection()
      const range = new monaco.Range(selection.startLineNumber, selection.startColumn, selection.endLineNumber, selection.endColumn)
      const op = {range, text, forceMoveMarkers: true}
      this.biEditor.executeEdits('insert', [op])

      // set cursor in parentheses
      const position = this.biEditor.getPosition()
      this.biEditor.setPosition({
        column: position.column - 1,
        lineNumber: position.lineNumber
      })

      this.biEditor.focus()
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
