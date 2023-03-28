/** 
 * 1. send the fastest group first
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
  let quickest = combinations[0]
  combinations.forEach((element, i) => {
    if (element.total < quickest) {
      index = i
    }
  });
  return combinations[index]
}

function travelAlone(to, from, traveler) {
  for (let i = 0; i < from.length; i++) {
    if (from[i] === traveler) {
      to.push(traveler);
      from.splice(i, 1);
      return traveler
    }
  }
}

function travelPair (from, to, pair) {
  for (let i = 0; i < from.length; i++) {
    if (from[i] === pair.traveler_one) {
      to.push(pair.traveler_one);
      from.splice(i, 1);
      break
    }
  }
  for (let i = 0; i < from.length; i++) {
    if (from[i] === pair.traveler_two) {
      to.push(pair.traveler_two);
      from.splice(i, 1);
      break
    }
  }
  return pair.total
}

function soloution () {
  let total_travel_time = 0
  const times = [1,2,5,10]
  const left_side = times
  const right_side = []
  
  let i = 0
  while (left_side.length > 0) {
    console.log('total_travel_time: ', total_travel_time)
    console.log('left side: ', JSON.stringify(left_side))
    console.log('right side: ', JSON.stringify(right_side))
    console.log('')

    let combinations = getCombinations(left_side)
    let quickestPair = findQuickestPair (combinations)
    total_travel_time += travelPair(left_side, right_side, quickestPair)
    console.log('total_travel_time: ', total_travel_time)
    console.log('left side: ', JSON.stringify(left_side))
    console.log('right side: ', JSON.stringify(right_side))
    console.log('')

    if (left_side.length > 0) {
      let fastest = findQuickest(right_side)
      total_travel_time += travelAlone(left_side, right_side, fastest)
      console.log('total_travel_time: ', total_travel_time)
      console.log('left side: ', JSON.stringify(left_side))
      console.log('right side: ', JSON.stringify(right_side))
      console.log('')
    }
   
    i++
  }

  console.log('all travellers passed')
  console.log('total time taken = ', total_travel_time)

}


// test solution is correct
soloution()