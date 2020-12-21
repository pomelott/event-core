
const argv = require("minimist")(process.argv);
console.log(argv)

test('test..', () => {
  expect("a").toBe("a");
});