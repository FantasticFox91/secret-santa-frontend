<script setup>
const testing = resolveComponent('Testing');
const testing2 = resolveComponent('TestingAnother');

const components = {
  'testing': testing,
  'testing2': testing2
}
const currentComponent = ref('testing');

const test2 = (value) => {
  currentComponent.value = value;
}

</script>

<template>
  <h1>Dashboard</h1>
  <button @click="() => test2('testing')">Show 1</button>
  <button @click="() => test2('testing2')">Show 2</button>
  <component :is="components[currentComponent]" />
</template>
