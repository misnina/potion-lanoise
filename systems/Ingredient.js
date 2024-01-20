class Ingredient {
  constructor(id, name, color, potency) {
    this.id = id;
    this.name = name;
    this.color = color;
    this.potency = potency;

    this.owned = 0;
    this._URL = this.makeURL(id);
    this._element = this.element;
  }

  add(amount) {
    this.owned = this.owned + amount;
    this.rerenderElement();
  }

  remove(amount) {
    this.owned = this.owned - amount;
    this.rerenderElement();
  }

  get idTag() {
    return `${this.name}-${this.id}`;
  }

  makeURL() {
    return `url(./images/${this.id}.png)`;
  }

  displayItemElement() {
    console.log(this.owned);
    const displayDigit = this.owned < 10 ? `0${this.owned}` : `${this.owned}`;

    const item = document.createElement('div');
    item.classList.add('ingredient');
    item.style.background = this._URL;
    item.setAttribute('id', this.idTag);

    const amountIndicator = document.createElement('div');
    amountIndicator.classList.add('badge');
    amountIndicator.innerHTML = displayDigit;
    item.appendChild(amountIndicator);

    return item;
  }

  rerenderElement() {
    this._element = this.displayItemElement(this.name);
  }

  get element() {
    return this.displayItemElement(this.name);
  }

  renderItem(container) {
    const existingItem = document.getElementById(this.idTag);
    if (existingItem) {
      existingItem.remove();
    }

    container.appendChild(this._element);
  }
}

/* Ingredients */

const woolsworth = new Ingredient(1, 'Woolsworth', COLORS.orange, 1);
const breth = new Ingredient(2, 'Breth', COLORS.yellow , 3);
const dragonEgg = new Ingredient(3, 'Dragon Egg', COLORS.green, 5);
const zoruScale = new Ingredient(4, 'Zoru Scale', COLORS.blueGreen, 1);
const cirtBerry = new Ingredient(5, 'Cirt Berry', COLORS.yellowOrange, 1);

const ITEMS = {
  woolsworth,
  breth,
  dragonEgg,
  zoruScale,
  cirtBerry,
};