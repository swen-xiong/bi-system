import { DirectiveOptions } from 'vue'
import store from '@/store'

/**
 * 获取所有接收拖拽元素的容器，容器包含属性'drop-target'
 */
function getDropTarget(): NodeListOf<Element> {
  return document.querySelectorAll('div[drop-target]');
}

/**
 * drop 指令
 */
export const biDrop: DirectiveOptions = {
  bind(el, binding) {
    el.setAttribute('drop-target', '');
    const caret = document.createElement('a');

    el.addEventListener('dragover', (e) => {
      caret.className = 'drag-caret';
      el.appendChild(caret);
      if (binding.modifiers.bg) {
        el.classList.add('drop-bg');
      }
      if (binding.modifiers.border) {
        el.classList.add('drop-border');
      }
      e.preventDefault();
    })

    el.addEventListener('dragleave', (e) => {
      if (el.contains(caret)) {
        el.removeChild(caret);
      }
      if (el.classList.contains('drop-bg')) {
        el.classList.remove('drop-bg');
      }
      if (el.classList.contains('drop-border')) {
        el.classList.remove('drop-border');
      }
    })

    el.addEventListener('drop', (e) => {
      const curCube = store.state.cube.curCube;
      if (el.contains(caret)) {
        el.removeChild(caret);
      }
      console.log('drop', curCube);
      if (binding.value && binding.value.cb && typeof binding.value.cb === 'function' && curCube) {
        binding.value.cb(curCube);
      }
    })
  }
}

/**
 * drag 指令
 */
export const biDrag: DirectiveOptions = {
  bind(el, binding) {
    el.setAttribute('draggable', 'true');
    const dropTargets = getDropTarget();
    // 是否阻止事件冒泡
    const stop = binding.modifiers.stop;

    el.addEventListener('dragstart', (e) => {
      for (const target of dropTargets) {
        target.classList.add('drop-target');
      }
      if (binding.value && binding.value.cb && typeof binding.value.cb === 'function') {
        binding.value.cb(binding.value.value)
      }
      if (stop) {
        e.stopPropagation();
      }
    })

    el.addEventListener('dragend', (e) => {
      for (const target of dropTargets) {
        target.classList.remove('drop-target');
      }
    })
  }
}

