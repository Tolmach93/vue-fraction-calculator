<template>
  <div class="element">
    <input
      class="field"
      :class="{error: !validateOperator(element.operator)}"
      v-if="showOperator"
      :value="element.operator"
      @input="$emit('setPropsInElement', {id: element.id, operator: $event.target.value})"/>
    <div class="fraction">
      <input
        class="field"
        :class="{error: !validateNumerator(element.numerator)}"
        :value="element.numerator"
        @input="$emit('setPropsInElement', {id: element.id, numerator: $event.target.value})"/>
      <div class="line"></div>
      <input
        class="field"
        :class="{error: !validateDenominator(element.denominator)}"
        :value="element.denominator"
        @input="$emit('setPropsInElement', {id: element.id, denominator: $event.target.value})"/>
    </div>
  </div>
</template>

<script>

  import {validateDenominator, validateNumerator, validateOperator} from "@/utils/validate";

  export default {
    name: "element-fraction",
    props: {
      element: {
        type: Object,
        required: true,
      },
      showOperator: {
        type: Boolean,
        default: true
      }
    },
    methods: {
      validateDenominator,
      validateNumerator,
      validateOperator
    }
  }
</script>
<style scoped lang="scss">
  .element {
    display: flex;
    align-items: center;
    .field {
      width: 30px;
      height: 30px;
      box-sizing: border-box;
      text-align: center;
      margin: 2px;

      &.error {
        border-color: red;
      }
    }
    .line{
      background: black;
      height: 1px;
    }
  }
</style>