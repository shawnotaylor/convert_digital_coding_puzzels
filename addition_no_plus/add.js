function add_with_subtraction(a, b) {
  return -(-a) - (-b)
}

function bitwise_add (a, b) {
  while (1) { // :(
    // check for any carry
    let carry = a & b
    // addition without carry (XOR)
    a = a ^ b

    b = carry << 1
    if (b === 0) {
      break
    }
  }
  return a
}


console.log('5 + 7 expected to equal 12')
console.log('add_with_subtraction: 5 + 7 = ', add_with_subtraction(5, 7))

console.log('add_with_subtraction: 5 + 7 = ', bitwise_add(5, 7))
console.log('add_with_subtraction: 4 + 7 = ', bitwise_add(4, 7), 'expected: ', 4+7)
console.log('add_with_subtraction: 245 + 7 = ', bitwise_add(245, 7), 'expected: ', 245+7)
console.log('add_with_subtraction: 0 + 7 = ', bitwise_add(0, 7), 'expected: ', 0+7)
console.log('add_with_subtraction: 4 + 32 = ', bitwise_add(4, 32), 'expected: ', 4+32)
