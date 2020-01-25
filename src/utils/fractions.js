export function NOD(elemenst) {
  let n = elemenst.length,
    x = Math.abs(elemenst[0]);
  for (let i = 1; i < n; i++){
    let y = Math.abs(elemenst[ i ]);
    while (x && y) {
      x > y ? x %= y : y %= x;
    }
    x += y;
  }
  return x;
}

export function NOK(elemenst){
  let n = elemenst.length,
    a = Math.abs(elemenst[0]);
  for (let i = 1; i < n; i++) {
    let b = Math.abs(elemenst[ i ]),
      c = a;
    while (a && b) {
      a > b ? a %= b : b %= a;
    }
    a = Math.abs(c*elemenst[ i ])/(a+b);
  }
  return a;
}

export const reduceFraction = ({numerator, denominator}) => {
  const divider = NOD([numerator, denominator]);
  numerator = numerator / divider;
  denominator = denominator / divider;
  return {numerator, denominator};
};

export const calculateTwoFractions = (elA, elB) => {
  const elResult = {
    operator: elA.operator
  };
  if (elB.operator === '*') {
    elResult.numerator = elA.numerator * elB.numerator;
    elResult.denominator = elA.denominator * elB.denominator;
  } else if (elB.operator === '/'){
    elResult.numerator = elA.numerator * elB.denominator;
    elResult.denominator = elA.denominator * elB.numerator;
  } else {
    elResult.denominator = NOK([elA.denominator, elB.denominator]);
    elA.numerator = elA.numerator * elResult.denominator / elA.denominator;
    elB.numerator = elB.numerator * elResult.denominator / elB.denominator;
    if (elA.operator === '-') elA.numerator = elA.numerator * -1;
    if (elB.operator === '-') elB.numerator = elB.numerator * -1;
    elResult.numerator = elA.numerator + elB.numerator;
    elResult.operator = elResult.numerator < 0 ? '-' : '+';
    elResult.numerator = Math.abs(elResult.numerator);
  }
  const reducedFraction = reduceFraction(elResult);
  elResult.numerator = reducedFraction.numerator;
  elResult.denominator = reducedFraction.denominator;
  return elResult;
};

export const calculateFractions = (elements) => {
  let currentElIndex;
  while (elements.some((el, index) => {
    currentElIndex = index;
    return el.operator === '*' || el.operator === '/';
  })) {// Первым циклом резолвим всё умножение и деление
    // У первой дроби оператор всегда +, поэтому можем спокойно брать предыдущий элемент
    const prevElIndex = currentElIndex - 1;
    const elResult = calculateTwoFractions({...elements[prevElIndex]}, {...elements[currentElIndex]});
    elements.splice(prevElIndex, 2, elResult)
  }
  while (elements.length > 1) {
    const elResult = calculateTwoFractions({...elements[0]}, {...elements[1]});
    elements.splice(0, 2, elResult)
  }
  return elements[0];
};