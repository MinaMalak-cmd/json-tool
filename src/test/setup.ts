import "@testing-library/jest-dom/vitest";
import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

// Ensure the DOM is reset between tests so component trees don't leak.
afterEach(() => {
  cleanup();
});

// jsdom does not implement the Clipboard API; provide a writable stub so
// copy-to-clipboard features can be tested deterministically.
if (!navigator.clipboard) {
  Object.defineProperty(navigator, "clipboard", {
    value: { writeText: () => Promise.resolve() },
    writable: true,
    configurable: true,
  });
}

// jsdom has no layout engine, so CodeMirror's measurement code throws when it
// calls getClientRects on a Range. Stub the geometry APIs it relies on; the
// editor still renders its DOM (which is what we assert against).
const emptyRect = {
  x: 0,
  y: 0,
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  width: 0,
  height: 0,
  toJSON: () => ({}),
} as DOMRect;

if (typeof Range !== "undefined") {
  Range.prototype.getClientRects = () =>
    ({ length: 0, item: () => null, [Symbol.iterator]: function* () {} }) as unknown as DOMRectList;
  Range.prototype.getBoundingClientRect = () => emptyRect;
}
