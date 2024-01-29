
class Color {
  constructor(name, purity, contains, basehex, shadowhex, ids) {
    this.name = name;
    this.purity = purity;
    this.contains = contains;

    // depriciated
    this.basehex = basehex;
    this.shadowhex = shadowhex;

    this.ids = ids
  }
}
const MAXPURITY = 5;

const white = new Color('white', 4, [], '#ebf2f2', '#b8bfbf', [14, 29, 44]);
const black = new Color('black', 1, [], '#453a42', '#1c1a1b', [13, 28, 43]);
const brown = new Color('brown', 1, [], '#73462a', '#452924', [12, 27, 42]);

const red = new Color('red', 3, [], '#e31235', '#8f136e', [0, 15, 30]);
const yellow = new Color('yellow', 3, [], '#e3d966', '#c28917', [2, 17, 32]);
const blue = new Color('blue', 3, [], '#2cbde6', '#2c50ab', [1, 16, 31]);

const orange = new Color('orange', 2, [red, yellow], '#eb790e', '#bf2c5c', [3, 18, 33]);
const green = new Color('green', 2, [yellow, blue], '#5ebd2f', '#308069', [4, 19, 34]);
const violet = new Color('violet', 2, [blue, red], '#a457d4', '#9c3582', [5, 20, 35]);

const yellowOrange = new Color('yellow-orange', 1, [orange, yellow], '#f7bd1e', '#d67d09', [6, 21, 36]);
const yellowGreen = new Color('yellow-green', 1, [green, yellow], '#bee026', '#6aba2d', [7, 22, 37]);
const blueGreen = new Color('blue-green', 1, [green, blue], '#2dd67c', '#20a181', [8, 23, 38]);
const blueViolet = new Color('blue-violet', 1, [violet, blue], '#532bcc', '#681a9c', [9, 24, 39]);
const redViolet = new Color('red-violet', 1, [violet, red], '#cc1bae', '#681a9c', [10, 25, 40]);
const redOrange = new Color('red-orange', 1, [orange, red], '#db5c0d', '#b3253f', [11, 26, 41]);

const COLORS = {
  white,
  black,
  brown,

  red,
  yellow,
  blue,

  orange,
  green,
  violet,

  yellowOrange,
  yellowGreen,
  blueGreen,
  blueViolet,
  redViolet,
  redOrange,
}


function generateColor(reactants) {
  /* FLATTEN COLORS */

  let baseColors = [];
  reactants.map(reactant => {
    for (let i = 0; i < reactant.potency; i++) {
      baseColors.push(reactant.color);
    }
  });

  let weightedColors = [];
  baseColors.map(color => {
    if (color.contains.length !== 0) {
      color.contains.map(innerColor => {
        if (innerColor.contains.length !== 0) {
          innerColor.contains.map(superColor => {
            weightedColors.push(superColor);
          })
        } else {
          weightedColors.push(innerColor);
        }
      });
    } else {
      weightedColors.push(color);
    }
  });

  const percentage = (amount, total) => {
    return (amount / total) * 100;
  }


  /* SELECT COLOR POOL */

  function randPercent() {
    return Math.floor(Math.random() * 100);
  }

  const orderedPure = weightedColors.sort((a, b) => {
    return a.purity + b.purity;
  });

  let colorPool = [];

  // By chance, weighted by purity, giving more possibility to least pure, possibility to pick a new color
  orderedPure.map(color => {
    const rand = randPercent();
    if (colorPool.length > 3) { return false }
    if (rand > percentage(color.purity, MAXPURITY)) {
      colorPool.push(color);
    }
  });

  if (colorPool.length === 0) { colorPool.push(orderedPure[0])};


  /* MIX COLOR POOL */
  //initalizing color, if color is not mixed
  let finalColor = colorPool[Math.floor(Math.random() * colorPool.length)];

  for (const color in COLORS) {
    const c = COLORS[color];
    let canDoChance = false;

    if (c.contains.length !== 0) {
      canDoChance = c.contains.every(innerColor => {
        if (innerColor.contains.length !== 0) {
          return innerColor.contains.every(superColor => {
            return colorPool.includes(superColor);
          })
        } else {
          return colorPool.includes(innerColor);
        }
      })
    }
    else {
      canDoChance = colorPool.includes(c);
    }

    const rand = randPercent();
    if (canDoChance && c.purity === 1 && rand > 20) {
      finalColor = c;
    } else if (canDoChance && c.purity === 2 && rand > 40) {
      finalColor = c
    } else if (canDoChance && rand > 95) {
      finalColor = c;
    }
  }

  return finalColor;
}



/* POTENCTY */

function generatePotency(reactants) {
  const prices = reactants.map(reactant => (reactant.potency));
  const sum = prices.reduce((a, b) => a + b);

  const rand = Math.floor(Math.random() * 5);
  const randSign = Math.floor(Math.random() * 2);

  if (randSign >= 2) {
    rand = -rand;
  }
  return (sum / reactants.length) + rand;
}
