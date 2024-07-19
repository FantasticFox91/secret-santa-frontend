<template>
  <div class="accordion" :class="{'accordion--open': isShown}">
    <div class="accordion__title" @click="toggleAccordion">
      <p class="accordion__toggler">{{ label }}</p>
      <div class="accordion__line"></div>
      <div class="accordion__icon"></div>
    </div>
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
  element.style.height = element.scrollHeight + 30 + 'px';
  element.style.paddingTop = '30px'
}

const beforeLeave = (el: Element) => {
  const element = el as HTMLElement;
  element.style.height = element.scrollHeight + 30 + 'px';
}

const leave = (el: Element) => {
  const element = el as HTMLElement;
  element.style.height = '0';
  element.style.paddingTop = '0'
}
</script>
