let nestedObject = {
  level: 'one',
  getLevel() {
    return this.level;
  },
  oneLevelDown: {
    level: 'two',
    getLevel() {
      return this.level;
    },
    getLevelArrow: () => {
      return this;
    },
  },
};

nestedObject.getLevel(); // 'one'
nestedObject.oneLevelDown.getLevel(); // 'two' ?
