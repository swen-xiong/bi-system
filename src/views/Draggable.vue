<template>
  <div class="bi-draggable">
    <div class="row">
      <div class="col-2">
        <button class="btn btn-secondary button" @click="sort">To original order</button>
      </div>

      <div class="col-6">
        <h3>Transition</h3>
        <draggable
          class="list-group"
          tag="ul"
          v-model="list"
          v-bind="dragOptions"
          @start="isDragging = true"
          @end="isDragging = false"
        >
          <transition-group type="transition" name="flip-list">
            <li class="list-group-item" v-for="element in list" :key="element.order">
              <i
                :class="
                element.fixed ? 'fa fa-anchor' : 'glyphicon glyphicon-pushpin'
              "
                @click="element.fixed = !element.fixed"
                aria-hidden="true"
              ></i>
              {{ element.name }}
            </li>
          </transition-group>
        </draggable>
      </div>

      <!-- <rawDisplayer class="col-3" :value="list" title="List" /> -->
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
const message = [
  'vue.draggable',
  'draggable',
  'component',
  'for',
  'vue.js 2.0',
  'based',
  'on',
  'Sortablejs'
]

@Component({
  name: 'DragDemo'
})
export default class DragDemo extends Vue {
  private list: any[] = message.map((name, index) => {
    return { name, order: index + 1 }
  })

  private isDragging: boolean = false;

  private dragOptions: any = {
    animation: 0,
    group: 'description',
    disabled: false,
    ghostClass: 'ghost'
  }

  public sort(): void {
    this.list = this.list.sort((a, b) => a.order - b.order);
  }
}
</script>
<style lang="scss" scoped>
.button {
  margin-top: 35px;
}
.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
.list-group {
  min-height: 20px;
}
.list-group-item {
  cursor: move;
}
.list-group-item i {
  cursor: pointer;
}
</style>

