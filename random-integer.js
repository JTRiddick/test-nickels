
function randomInteger(d) {
  return Math.floor((Math.random()*d));
}

function rollDice(rolls,dice) {
  console.log("rolling ",rolls,dice);
  let arr = [];
  if (rolls > 1){
    for (var i = 0; i <= rolls; i++) {
      arr.push(randomInteger(dice));
    }
    console.log('rolls ', arr);
    return arr;
  } else{
    return randomInteger(dice);
  }
}

module.exports = rollDice;
