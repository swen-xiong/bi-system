<template>
  <div :class="classes"></div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({
  name: 'Resizer'
})
export default class Resizer extends Vue {
  /**
   * 标识该pane是水平pane还是垂直pane
   * 取值为：'vertical' / 'horizontal'
   */
  @Prop({
    required: true,
    validator: (value) => {
      return ['vertical', 'horizontal'].indexOf(value) >= 0;
    }
  })
  public split!: string;

  /**
   * resizer 应用的外部class
   */
  @Prop() public className?: string;

  /**
   * 计算最终resizer应用的class
   */
  get classes(): string {
    return ['splitter-pane-resizer', this.split, this.className].join(' ');
  }
}
</script>

<style lang="scss" scoped>
.splitter-pane-resizer {
  -moz-box-sizing: border-box;
	-webkit-box-sizing: border-box;
	box-sizing: border-box;
	background: #000;
	position: absolute;
	opacity: .2;
	z-index: 1;
	-moz-background-clip: padding;
	-webkit-background-clip: padding;
  background-clip: padding-box;
  background: transparent;
  border: none;
}
.splitter-pane-resizer.horizontal {
  height: 7px;
	margin: -3px 0;
	border-top: 3px solid rgba(255, 255, 255, 0);
	border-bottom: 3px solid rgba(255, 255, 255, 0);
	cursor: row-resize;
	width: 100%;
}
.splitter-pane-resizer.vertical {
  width:7px;
	height: 100%;
	margin-left: -3px;
	border-left: 3px solid rgba(255, 255, 255, 0);
	border-right: 3px solid rgba(255, 255, 255, 0);
	cursor: col-resize;
}
</style>
