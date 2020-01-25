<template>
  <calculator-layout @setNewElement="setNewElement" @removeElement="removeElement" :canRemove="elements.length > 2">
    <template slot="elements">
      <ElementFraction
        v-for="(element, index) in elements"
        :key="element.id"
        :element="element"
        :showOperator="index > 0"
        @setPropsInElement="setPropsInElement"/>
    </template>
    <CalculatorResult
      v-if="result"
      :result="result"
      slot="result"/>
    <Error v-else slot="result"/>
  </calculator-layout>
</template>
<script>

  import {createNamespacedHelpers} from 'vuex';

  import CalculatorLayout from "./components/Layout";
  import ElementFraction from "./components/ElementFraction";
  import CalculatorResult from "./components/Result";
  import Error from "./components/Error";

  const {mapState, mapGetters, mapMutations} = createNamespacedHelpers('calculator');

  export default {
    name: "calculator",
    components: {Error, CalculatorResult, ElementFraction, CalculatorLayout},
    computed: {
      ...mapState(['elements']),
      ...mapGetters(['validateProps', 'result']),
    },
    methods: {
      ...mapMutations(['setNewElement', 'removeElement', 'setPropsInElement'])
    }
  }
</script>