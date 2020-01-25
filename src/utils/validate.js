export function validateOperator(operator) {
  return operator === '+' || operator === '-' || operator === '*' || operator === '/'
}

export function validateNumerator(numerator) {
  return +numerator > 0 || numerator === '0';
}

export function validateDenominator(denominator) {
  return denominator > 0;
}