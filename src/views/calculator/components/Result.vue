<template>
  <div class="result">
    <span class="operator" v-if="result.operator === '-'">-</span>
    <div class="fraction">
      <div>{{ result.numerator }}</div>
      <div class="line"></div>
      <div>{{ result.denominator }}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "calculator-result",
    props: {
      result: {
        type: Object,
        required: true,
      }
    }
  }
</script>
<style scoped lang="scss">
  .result {
    display: flex;
    align-items: center;
    .line {
      background: black;
      height: 1px;
    }
  }
</style>