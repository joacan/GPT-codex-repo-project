const emojis = [
  '😀',
  '😃',
  '😄',
  '😁',
  '😆',
  '😺',
  '🤗',
  '🥳',
  '🤩',
  '🤠',
  '🌞',
  '🌈',
];

function randomEmoji(randomFn = Math.random, collection = emojis) {
  if (!Array.isArray(collection) || collection.length === 0) {
    throw new Error('Emoji collection must contain at least one emoji.');
  }

  const value = randomFn();
  const normalized = value >= 1 ? value % 1 : value;
  const index = Math.floor(normalized * collection.length);
  return collection[index];
}

function setupHelloButton({ button, output, randomFn = Math.random } = {}) {
  if (!button || typeof button.addEventListener !== 'function') {
    throw new Error('A valid button element is required.');
  }

  if (!output) {
    throw new Error('A valid output element is required.');
  }

  const handler = () => {
    output.textContent = `Hello! ${randomEmoji(randomFn)}`;
  };

  button.addEventListener('click', handler);
  return handler;
}

function init(doc = typeof document !== 'undefined' ? document : null, randomFn = Math.random) {
  if (!doc) {
    return null;
  }

  const button = doc.getElementById('helloButton');
  const output = doc.getElementById('output');

  if (!button || !output) {
    return null;
  }

  return setupHelloButton({ button, output, randomFn });
}

const HelloApp = { emojis, randomEmoji, setupHelloButton, init };

if (typeof module !== 'undefined' && module.exports) {
  module.exports = HelloApp;
}

if (typeof window !== 'undefined') {
  window.HelloApp = HelloApp;
}

if (typeof document !== 'undefined') {
  const ready = () => HelloApp.init(document);
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready, { once: true });
  } else {
    ready();
  }
}
