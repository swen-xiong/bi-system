<template>
  <div :style="{ cursor, userSelect}" class="vue-splitter-container clearfix" @mouseup="onMouseUp" @mousemove="onMouseMove">

    <pane ref="paneL" :className="paneClass" class="splitter-pane splitter-paneL" :split="split" :style="{ [type]: 'calc(' + percent +'% - 3px)'}" v-show="showPane.left">
      <slot name="paneL"></slot>
    </pane>

    <resizer :className="dividerClass" :style="{ [resizeType]: percent+'%'}" :split="split" @mousedown.native="onMouseDown" @click.native="onClick" v-show="showPane.left && showPane.right"></resizer>

    <pane ref="paneR" :className="paneClass" class="splitter-pane splitter-paneR" :split="split" :style="{ [type]: 'calc('+(100-percent)+'% - 3px)'}" v-show="showPane.right">
      <slot name="paneR"></slot>
    </pane>
    <div class="vue-splitter-container-mask" v-if="active"></div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch, Emit } from 'vue-property-decorator'
import Pane from './Pane.vue'
import Resizer from './Resizer.vue'

@Component({
  name: 'splitPane',
  components: {
    Pane,
    Resizer
  }
})
export default class SplitPane extends Vue {
  /**
   * resize pane 所能达到的最小比例
   */
  @Prop({
    type: Number,
    default: 10
  })
  public minPercent!: number;

  /**
   * resize pane 最小宽度或高度,小于该高度将不能resize
   */
  @Prop({
    type: Number,
    default: 0
  })
  public minSize!: number;

  /**
   * pane 初始默认显示的比例
   */
  @Prop({
    type: Number,
    default: 50
  })
  public defaultPercent!: number;

  /**
   * 标识split-pane是水平pane还是垂直pane
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
   * split-pane 子pane 应用的外部样式类
   */
  @Prop()
  public paneClass?: string;

  /**
   * split-pane 两个pane间的分割线 应用的外部样式类
   */
  @Prop()
  public dividerClass?: string;

  /**
   * 是否隐藏左（上）pane
   */
  @Prop()
  public hidePaneL?: boolean;

  /**
   * 是否隐藏右（下）pane
   */
  @Prop()
  public hidePaneR?: boolean;

  /**
   * pane 设置的属性值
   */
  @Prop()
  public paneAttrs?: string;

  /**
   * resize时蒙板mask是否显示
   */
  private active: boolean = false;

  /**
   * is resizing
   */
  private hasMoved: boolean = false;

  /**
   * paneL 相对父容器的占比
   */
  private percent: number = this.defaultPercent;

  /**
   * 计算类型 - 通过水平或垂直split判断将百分比样式应用至pane的width或height属性
   */
  private type: string = this.split === 'vertical' ? 'width' : 'height';

  /**
   * 计算类型 - 通过水平或垂直split判断应用将百分比样式至分割线的的left或top属性
   */
  private resizeType: string = this.split === 'vertical' ? 'left' : 'top';

  /**
   * 控制显示pane对象
   */
  private showPane: any = {
    left: true,
    right: true
  };

  /**
   * 计算值 通过active属性应用对应的样式
   */
  get userSelect(): string {
    return this.active ? 'none' : '';
  }

  /**
   * 计算值 通过active属性应用对应的样式
   */
  get cursor(): string {
    return this.active ? (this.split === 'vertical' ? 'col-resize' : 'row-resize') : '';
  }

  /**
   * 计算控制显示pane对象。
   * 新增计算属性是为了防止隐藏两个pane时重置对象时watch陷入死循环
   */
  get computedShowPane(): any {
    const temp = {
      left: !this.hidePaneL,
      right: !this.hidePaneR
    }
    if (this.hidePaneL && this.hidePaneR) {
      this.showPane = {
        left: true,
        right: true
      }
    } else {
      this.showPane = temp;
    }
    return {...temp};
  }

  /**
   * 监听显示对象变化，以此改变pane占比
   */
  @Watch('computedShowPane')
  private onShowPane(nv: any, ov: any): void {
    if (nv.left && nv.right) {
      this.percent = 50;
    } else if (nv.left) {
      this.percent = 100;
    } else if (nv.right) {
      this.percent = 0;
    } else {
      this.percent = 50;
    }
  }

  private mounted() {
    if (this.paneAttrs) {
      const attrs = this.paneAttrs.split(' ');
      attrs.forEach((attr) => {
        if (attr) {
          (this.$refs.paneL as any).$el.setAttribute(attr, '');
          (this.$refs.paneR as any).$el.setAttribute(attr, '');
        }
      })
    }
  }

  /**
   * 分割线点击时触发回调
   */
  private onClick(): void {
    if (!this.hasMoved) {
      this.percent = 50;
      this.$emit('resize', this.percent)
    }
  }

  private onMouseDown(): void {
    this.active = true
    this.hasMoved = false
  }

  private onMouseUp(): void {
    this.active = false
  }

  /**
   * resizing时计算pane占比，同时触发回调
   */
  private onMouseMove(e: MouseEvent | any): void {
    if (e.buttons === 0 || e.which === 0) {
      this.active = false
    }
    if (this.active) {
      let offset = 0
      let target = e.currentTarget
      if (this.split === 'vertical') {
        while (target) {
          offset += target.offsetLeft
          target = target.offsetParent
        }
      } else {
        while (target) {
          offset += target.offsetTop
          target = target.offsetParent
        }
      }
      const currentPage = this.split === 'vertical' ? e.pageX : e.pageY
      const targetOffset = this.split === 'vertical' ? e.currentTarget.offsetWidth : e.currentTarget.offsetHeight
      const height = currentPage - offset;
      const otherHeight = targetOffset - height;
      const percent = Math.floor((height / targetOffset) * 10000) / 100;
      // 变小的pane高度
      let minifyHeight = height;
      if (this.percent < percent) {
        minifyHeight = otherHeight;
      }
      const isChange = this.percent !== percent;

      if (percent > this.minPercent && percent < 100 - this.minPercent && height > this.minSize && otherHeight > this.minSize) {
        this.percent = percent
      }
      // 将宽或高变小的pane的大小作为emit的参数(这个pane即为子组件中的父容器,要在子组件中判断大小是否小于设定的最小值)
      this.$emit('resize', this.percent, minifyHeight, isChange)
      this.hasMoved = true;
    }
  }

  /**
   * 验证并重置宽高
   * 若缩放时两个pane存在size小于最小值,均分总size
   * @param {Number} size 两个pane的总高度或总宽度
   */
  private checkAndResetSize(size: number): void {
    if (this.minSize) {
      const leftSize = size * this.percent / 100;
      const rightSize = size * (100 - this.percent) / 100;
      if (leftSize < this.minSize || rightSize < this.minSize) {
        this.percent = 50;
      }
    }
  }

}
</script>

<style lang="scss" scoped>
.clearfix:after {
  visibility: hidden;
  display: block;
  font-size: 0;
  content: " ";
  clear: both;
  height: 0;
}
.vue-splitter-container {
  height: 100%;
  position: relative;
}
.vue-splitter-container-mask {
  z-index: 9999;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
</style>
