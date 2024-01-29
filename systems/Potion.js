const BUBBLE_ANIMATIONS = [
  'bubble1',
  'bubble2',
  'bubble3',
];

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

class Potion {
  constructor(uuid, color, potency, renderSize) {
    this.uuid = uuid;
    this.color = color;
    this.potency = potency;
    this.renderSize = renderSize;
    this.potSize = this.calcPotSize();
    this.price = this.calcPrice();
  }

  get name() {
    return `${this.namedPotency()} ${this.colorName} Potion`;
  }

  get colorName() {
    return `${this.color.name.charAt(0).toUpperCase()}${this.color.name.substring(1)}`;
  }

  get idTag() {
    return `${uuid}-${namedPotency()}-${this.color}`;
  }

  namedPotency() {
    if (this.potency < 3) {
      return 'Weak';
    } else if (this.potency < 6) {
      return 'Medium';
    } else if (this.potency > 6) {
      return 'Strong';
    }
  }

  calcPrice() {
    // This is a placeholder and will eventually get more complicated.
    return this.potency * 10;
  }

  calcPotSize() {
    if (this.potency < 3) {
      return 1;
    } else if (this.potency < 6) {
      return 2;
    } else if (this.potency > 6) {
      return 3;
    }
  }

  imgSrc(renderSize) {
    let id = '00';
    if (!(renderSize > 3)) {
      id = this.color.ids[this.potSize - 1];
      console.log(this.potSize);
      if (id < 10) {
        id = `0${id}`
      }
    } 
      return `./images/${this.renderSize}x_${id}.png`;
  }

  renderPotionEle(renderSize) {
    const pot = document.createElement('img');
    pot.src = this.imgSrc(this.renderSize);
    pot.alt = this.name;
    pot.title = this.name;
    return pot;
  }

  // depriciated
  /*
  renderPotionEle() {
    const pot = document.createElement('div');
    pot.classList.add('potion');
    pot.classList.add(`${this.colorName}`);
    const potBotTop = document.createElement('span');
    potBotTop.classList.add('potion-bottle-top');
    const potBotStem = document.createElement('span');
    potBotStem.classList.add('potion-bottle-stem');
    const potBotBase = document.createElement('span');
    potBotBase.classList.add('potion-bottle-base');
  
    pot.appendChild(potBotTop);
    pot.appendChild(potBotStem);
    pot.appendChild(potBotBase);
  
    const potionuuid = document.createElement('span');
    potionuuid.setAttribute('id', `p-${this.uuid}`);
    const potionLiq = document.createElement('span');
    potionLiq.classList.add('potion-liquid');
    potionLiq.style.backgroundColor = this.color.basehex;
    const potLiqShadow = document.createElement('span');
    potLiqShadow.classList.add('potion-liquid-shadow');
    potLiqShadow.style.backgroundColor = this.color.shadowhex;
    const bubbleContainer = document.createElement('span');
    bubbleContainer.classList.add('bubble-container');
    const potLiqShine = document.createElement('potion-liquid-shine');
    potLiqShine.classList.add('potion-liquid-shine');
  
    const randBubbleCount = randomNumber(1, 6);
    for (let j = 0; j <= randBubbleCount; j++) {
      const randDelay = `${randomNumber(1, 3)}s`;
      const randDuration = `${randomNumber(2, 4)}s`;
      const randDimension = `${randomNumber(4, 10)}px`;
  
      const randVertical = randomNumber(3, 12);
  
      let newBubble = document.createElement('div');
      newBubble.className = 'bubble';
  
      newBubble.style.backgroundColor = this.color.shadowhex;
      newBubble.style.width = randDimension;
      newBubble.style.height = randDimension;
  
      newBubble.style.animationDelay = randDelay;
      newBubble.style.animationDuration = randDuration;
  
      newBubble.style.right = randVertical;
  
      newBubble.style.animationName = BUBBLE_ANIMATIONS[randomNumber(0, BUBBLE_ANIMATIONS.length - 1)];
  
      bubbleContainer.appendChild(newBubble);
    }
  
    potionLiq.appendChild(potLiqShadow);
    potionLiq.appendChild(bubbleContainer);
    potionLiq.appendChild(potLiqShine);
    
    potionuuid.appendChild(potionLiq);
    pot.appendChild(potionuuid);
  
    return pot;
  }
  */
}

function createPotion(reactants, uuid, imgSize) {
  return new Potion(uuid, generateColor(reactants), generatePotency(reactants), imgSize);
}
