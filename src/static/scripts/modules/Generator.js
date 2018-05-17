const Generator = {
  form: document.querySelector('[data-from]'),
  input: document.querySelector('[data-input]'),
  slider: document.querySelector('[data-slider]'),
  trackGen: document.querySelector('[data-track-gen]'),

  init() {
    this.render();
  },

  randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },

  randomArr(array) {
    return array[Math.floor(Math.random() * array.length)];
  },

  randomBool() {
    const returnVal = (Math.round(Math.random()) === 1);
    return returnVal;
  },

  initGen(inputVal, producerLevel) {
    Generator.trackGen.innerHTML = Generator.generateName(inputVal, producerLevel);
  },

  generateName(inputVal, producerLevel) {
    let item = '';
    let outputVal = '';

    const modifiers = ['v', 'switch', 'mixdown', 'final', 'actual final', 'master', 'edit'];
    const maxVersion = (producerLevel * 5);

    const states = ['new', 'diff', 'other', 'weird', 'next', 'changed'];
    const elements = ['snare', 'sub', 'vocal', 'perc', 'intro'];

    let i;
    for (i = 0; i < producerLevel; i += 1) {
      if (Generator.randomBool()) {
        // random modifier
        const modifier = Generator.randomArr(modifiers);
        // random version number between 1 and producerLevel x 5
        const version = Generator.randomInt(1, maxVersion);

        item = `${modifier}${version}`;
      } else {
        // random state
        const state = Generator.randomArr(states);
        // random element
        const element = Generator.randomArr(elements);
        // hyphen bool
        const underscore = (Generator.randomBool()) ? '_' : '';

        item = `${state}${underscore}${element}`;
      }

      if (Generator.randomBool()) {
        item = item.toUpperCase();
      }

      outputVal += `${item} `;
    }
    return `${inputVal} ${outputVal}`;
  },

  render() {
    if (this.form.length) {
      this.form.addEventListener('submit', () => this.initGen(this.input.value, this.slider.value), false);
    }
  }
};

export default Generator;
