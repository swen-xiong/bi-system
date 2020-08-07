declare module '*.vue' {
  import Vue from 'vue';
  export default Vue;
}

declare module 'monaco-editor/esm/vs/basic-languages/sql/sql' {
  export const conf: any
  export const language: any
}
