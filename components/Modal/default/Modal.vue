<script setup>
import './modal.scss';
import { computed, watch} from 'vue';

const emits = defineEmits(['onShow', 'onClose'])
const props = defineProps({
  name: String,
})
const { $modals } = useNuxtApp();

const show = computed(() => {
  return $modals.active() == props.name;
});

const closeModal = () => {
  $modals.close();
}

watch(show, (newValue) => {
  if (newValue) {
    emits('onShow');
  } else {
    emits('onClose');
  }
})
</script>

<template>
  <Transition name="fade">
    <div class="modal" v-show="show">
      <div class="modal__overlay" @click="closeModal"></div>
      <div class="modal__content">
        <button
          class="modal__close-button"
          type="button"
          @click="closeModal"
        >
          <span class="visually-hidden"> Закрыть модалку </span>
        </button>
        <slot></slot>
      </div>
    </div>
  </Transition>
</template>
