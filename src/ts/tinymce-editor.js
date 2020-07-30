"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var vue_property_decorator_1 = require("vue-property-decorator");
var tinymce = require("tinymce");
var tinymce_vue_1 = require("@tinymce/tinymce-vue");
require("tinymce/themes/modern/theme");
require("tinymce/plugins/colorpicker");
require("tinymce/plugins/textcolor");
require("tinymce/plugins/fullpage");
var defaultConfig = {
    placeholder: '在这里输入内容',
    language_url: '/tinymce/zh_CN.js',
    language: 'zh_CN',
    skin_url: '/tinymce/skins/lightgray',
    height: 300,
    toolbar: 'fontselect | bold italic underline | fontsizeselect | forecolor | alignleft aligncenter alignright | undo redo | removeformat',
    font_formats: "\u5FAE\u8F6F\u96C5\u9ED1=Microsoft YaHei,Helvetica Neue,PingFang SC,sans-serif;\n                  \u82F9\u679C\u82F9\u65B9=PingFang SC,Microsoft YaHei,sans-serif;\n                  \u5B8B\u4F53=simsun,serif;Andale Mono=andale mono,times;\n                  Arial=arial,helvetica,sans-serif;\n                  Arial Black=arial black,avant garde;\n                  Book Antiqua=book antiqua,palatino;\n                  Comic Sans MS=comic sans ms,sans-serif;\n                  Courier New=courier new,courier;\n                  Georgia=georgia,palatino;\n                  Helvetica=helvetica;\n                  Impact=impact,chicago;\n                  Symbol=symbol;\n                  Tahoma=tahoma,arial,helvetica,sans-serif;\n                  Terminal=terminal,monaco;\n                  Times New Roman=times new roman,times;\n                  Trebuchet MS=trebuchet ms,geneva;\n                  Verdana=verdana,geneva;\n                  Webdings=webdings;\n                  Wingdings=wingdings,zapf dingbats",
    fontsize_formats: '8px 9px 10px 11px 12px 14px 16px 18px 24px 36px 48px',
    formats: {
    // bold: {inline:'span', styles:{color:'#f00'} },
    },
    plugins: 'colorpicker textcolor fullpage',
    fullpage_default_font_family: 'Microsoft YaHei',
    fullpage_default_font_size: '14px',
    branding: false,
    menubar: false,
    elementpath: true,
    resize: false // true（仅允许改变高度）, false（完全不让你动）, 'both'（宽高都能改变，注意引号）
};
exports["default"] = vue_property_decorator_1.Vue.extend({
    components: {
        editor: tinymce_vue_1["default"]
    },
    props: {
        customConfig: {
            type: Object,
            "default": {}
        },
        disabled: {
            type: Boolean,
            "default": false
        }
    },
    data: function () {
        return {
            model: '',
            config: {},
            tinymceHtml: ''
        };
    },
    mounted: function () {
        console.log(77777);
        this.config = __assign(__assign({}, defaultConfig), this.customConfig);
        this.timymceHtml = this.model;
        tinymce.init({});
    }
});
