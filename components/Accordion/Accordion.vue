<template>
  <div class="accordion" :class="{'accordion--open': isShown}">
    <p class="accordion__toggler" @click="toggleAccordion">{{ label }}</p>
    <Transition @before-enter="beforeEnter" @enter="enter" @before-leave="beforeLeave" @leave="leave" name="accordion">
      <div class="accordion__body" v-show="isShown">
        <slot></slot>
      </div>
    </Transition>
  </div>
</template>

<script setup lang='ts'>
import './accordion.scss';

defineProps({
  label: String,
})

const isShown = ref(false);

const toggleAccordion = () => {
  isShown.value = !isShown.value;
}

const beforeEnter = (el: Element) => {
  const element = el as HTMLElement;
  element.style.height = '0';
}

const enter = (el: Element) => {
  const element = el as HTMLElement;
  element.style.height = element.scrollHeight + 'px';
  element.style.paddingTop = '30px'
}

const beforeLeave = (el: Element) => {
  const element = el as HTMLElement;
  element.style.height = element.scrollHeight + 'px';
}

const leave = (el: Element) => {
  const element = el as HTMLElement;
  element.style.height = '0';
  element.style.paddingTop = '0'
}
</script>
