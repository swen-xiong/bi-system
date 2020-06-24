<template>
  <div class="home">
    <split-pane v-on:resize="resize" :min-percent='20' :default-percent='30' split="vertical">
      <template slot="paneL">
        
      </template>
      <template slot="paneR">
        <split-pane split="horizontal">
          <template slot="paneL">
           B
          </template>
          <template slot="paneR">
            C
          </template>
        </split-pane>
      </template>
    </split-pane>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch, Provide, Model, Emit } from 'vue-property-decorator';

@Component({})
export default class Home extends Vue {

  private myArray: any[] = [
    {name: '维度', id: 1111},
    {name: '指标', id: 222},
    {name: '分公司', id: 333},
  ]

  private drag: boolean = false;

  public resize(): void {
    console.log('resize')
  }
}

</script>
<style lang="scss" scoped>
.home {
  height: 100%;
}
</style>
