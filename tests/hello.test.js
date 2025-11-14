const test = require('node:test');
const assert = require('node:assert/strict');
const { emojis, randomEmoji, setupHelloButton } = require('../script');

function createMockButton() {
  const listeners = new Map();
  return {
    addEventListener(eventName, callback) {
      listeners.set(eventName, callback);
    },
    click() {
      const callback = listeners.get('click');
      if (callback) {
        callback({ type: 'click' });
      }
    },
  };
}

test('randomEmoji chooses a deterministic emoji when the RNG is fixed', () => {
  const emoji = randomEmoji(() => 0.5);
  const expected = emojis[Math.floor(0.5 * emojis.length)];
  assert.equal(emoji, expected);
});

test('setupHelloButton updates the output when the button is clicked', () => {
  const button = createMockButton();
  const output = { textContent: 'initial' };
  setupHelloButton({ button, output, randomFn: () => 0 });

  assert.equal(output.textContent, 'initial');
  button.click();
  assert.equal(output.textContent, `Hello! ${emojis[0]}`);
});
