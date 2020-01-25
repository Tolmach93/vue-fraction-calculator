import Vue from 'vue';
import {calculateFractions} from '@/utils/fractions';
import {validateDenominator, validateNumerator, validateOperator} from "@/utils/validate";

let i = 0;

const createNewElement = (operator = null) => {
  return {
    id: i++,
    operator,
    numerator: null,
    denominator: null,
  }
};

export default {
  namespaced: true,
  state: {
    elements: [
      createNewElement("+"),
      createNewElement(),
    ],
  },
  mutations: {
    setNewElement(state) {
      state.elements.push(createNewElement());
    },
    removeElement(state) {
      state.elements.pop();
    },
    setPropsInElement(state, elementWithNewProps) {
      const element = state.elements.find(el => el.id === elementWithNewProps.id);
      Object.keys(elementWithNewProps).forEach(key => {
        Vue.set(element, key, elementWithNewProps[key]);
      })
    }
  },
  getters: {
    validateProps(state) {
      return state.elements
        .every(el =>
          validateOperator(el.operator) &&
          validateNumerator(el.numerator) &&
          validateDenominator(el.denominator))
    },
    result(state, getters) {
      if (!getters.validateProps) return null;
      return calculateFractions(state.elements.slice());
    }
  }
}