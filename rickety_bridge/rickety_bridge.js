/** 
 * 1. you want to send the fastest group first
 * 2. send the slowest people together
 * 3. try send the fastest person alone back
 * 4. repeat until left side is empty
**/ 

function getCombinations (array) {
  return array.flatMap(
    (v, i) => array.slice(i+1).map( w => {
      return {
        text: v + ' ' + w,
        total: Math.max(v, w),
        traveler_one: v,
        traveler_two: w,
      }
    })
  );
}

function findQuickest (array) {
  return Math.min(...array)
}

function findQuickestPair (combinations) {
  let index = 0
  let quickest = combinations[0].quickest
  combinations.forEach((element, i) => {
    if (element.total < quickest) {
      index = i
    }
  });
  return combinations[index]
}

function travelAlone(to, from, traveler, total_travel_time) {
  console.log('travelAlone')
  console.log('left side: ', to)
  console.log('right side: ', from)
  for (let i = 0; i < from.length; i++) {
    console.log('in loop: : i=', i, ' traveler=', traveler)
    if (i === traveler) {
      to.push(traveler);
      from.splice(i, 1);
      // add time IF we remove an item
      total_travel_time += traveler
    }
  }
  console.log('left side: ', to)
  console.log('right side: ', from)
}

function travelPair (from, to, pair, total_travel_time) {
  console.log('travelPair')
  console.log('left side: ', from)
  console.log('right side: ', to)
  console.log('pair: ', pair)
  for (let i = 0; i < from.length; i++) {
    console.log('in loop: : i=', i, ' pair.traveler_one=', pair.traveler_one)
    if (i === pair.traveler_one) {
      to.push(to[i]);
      from.splice(pair.traveler_one, 1);
    }
  }
  for (let i = 0; i < from.length; i++) {
    console.log('in loop: : i=', i, ' pair.traveler_two=', pair.traveler_two)
    if (i === pair.traveler_two) {
      to.push(pair.traveler_two);
      from.splice(i, 1);
    }
  }
   // add time IF we remove an item
   total_travel_time += pair.total
   console.log('left side: ', from)
    console.log('right side: ', to)
}

function soloution () {
  const total_travel_time = 0
  const times = [1,2,5,10]
  const left_side = times
  const right_side = []
  
  // console.log('times: ', times)
  let i = 0
  while (left_side.length > 0 && i < 2) {
    console.log('loop: ', i)
    // step 1
    const combinations = getCombinations(left_side)
    // console.log('combinations: ', combinations)
    let quickestPair = findQuickestPair (combinations)
    // console.log('quickest pair: ', quickestPair)
    travelPair(left_side, right_side, quickestPair, total_travel_time)
    // console.log('total_travel_time: ', total_travel_time)
    const fastest = findQuickest(right_side)
    // console.log('fastest traveller: ', fastest)
    travelAlone(left_side, right_side, fastest, total_travel_time)
    // console.log('total_travel_time: ', total_travel_time)
    i++
  }
}


// test solution is correct
soloution()