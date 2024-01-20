//Test potion creation
function testPotions() {
  for (let i = 0; i < 50; i++) {
    const test = createPotion([woolsworth, cirtBerry, zoruScale, dragonEgg], i);
    document.querySelector('#potion-container').appendChild(test.renderPotionEle());
  }
}

/* Selectors */
const ingredientContainer = document.querySelector('#ingredient-container');
const potionContainer = document.querySelector('#potion-container');

/* Game Start Ingredients */
const startingIngredients = [
  ITEMS.woolsworth,
  ITEMS.zoruScale,
  ITEMS.cirtBerry
]

ITEMS.woolsworth.add(5);
ITEMS.zoruScale.add(1);
ITEMS.cirtBerry.add(3);

function renderIngredients(ingredients) {
  // This is not actually sorting, return to later
  const orderedIngredients = ingredients.sort((a, b) => {
    return a.id + b.id;
  });
  console.log(orderedIngredients);
  for (let i = 0; i < orderedIngredients.length; i++) {
    orderedIngredients[i].renderItem(ingredientContainer);
  }
}

renderIngredients(startingIngredients);

const modalBg = document.querySelector('.modal');
const info = document.querySelector('#information');
const infoButton = document.querySelector('#modal-button');

infoButton.addEventListener('click', () => {
  modalBg.style.display = 'flex';
  info.style.display = 'block';
});

window.addEventListener('click', (evt) => {
  if (evt.target === modalBg) {
    modalBg.style.display = 'none';
    info.style.display = 'none';
  }
})