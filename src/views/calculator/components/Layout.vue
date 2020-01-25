<template>
  <div class="layout">
    <div class="expression">
      <slot name="elements"/>
      <div>=</div>
      <slot name="result"/>
    </div>
    <div>Разрешённые операторы: +-*/</div>
    <button @click="$emit('setNewElement')">Добавить элемент</button>
    <button v-if="canRemove" @click="$emit('removeElement')">Удалить элемент</button>
  </div>
</template>
<script>
  export default {
    name: "calculator-layout",
    props: {
      canRemove: {
        type: Boolean,
        default: false,
      }
    }
  }
</script>
<style scoped lang="scss">
  .layout {
    margin: 20px auto;
    .expression {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 15px 0;
    }
    button {
      margin: 5px;
    }
  }
</style>