<template>
    <div>
        {{ msg }}
        <tinymce-editor v-model="msg" :custom-config="config" :disabled="disabled" @change="change" ref="editor"></tinymce-editor>
        <button @click="clear">清空内容</button>
        <button @click="disabled = true">禁用</button>
    </div>
</template>

<script>
import TinymceEditor from '../components/TinymceEditor';
export default {
    components: {
        TinymceEditor
    },
    data() {
        return {
            msg: 'Welcome to Use Tinymce Editor',
            disabled: false,
            config: {}
        };
    },
    methods: {
        // 鼠标单击的事件
        onClick(e, editor) {
            console.log('Element clicked');
            console.log(e);
            console.log(editor);
        },
        // 清空内容
        clear() {
            this.$refs.editor.clear();
        },

        change(value) {
            console.log('change');
        }
    }
};
</script>

<style scoped>
</style>