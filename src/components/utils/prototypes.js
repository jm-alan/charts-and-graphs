/* eslint-disable no-extend-native */
Array.prototype.fillByGenerator = function (generator) {
  for (let i = 0; i < this.length; i++) this[i] = generator(i);
  return this;
};

Array.prototype.mapInPlace = function (cb) {
  for (let i = 0; i < this.length; i++) this[i] = cb(this[i], i, this);
};
