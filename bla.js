function bla(a, b) {
  return {
    a: function() {
      return a;
    },
    b: function() {
      return b;
    },
    sum: function() {
      return a + b;
    }
  };
}
module.exports = bla;