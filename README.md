# json-parser-tool

A web-based tool for playing with JSON — validate, format (prettify), and minify JSON in your browser.

## Features

- **Validate** – instantly check whether your JSON is syntactically correct
- **Format** – prettify compact JSON with configurable indentation (2 spaces, 4 spaces, or tabs)
- **Minify** – strip all whitespace to produce the smallest possible JSON string
- **Copy** – copy the output to the clipboard with one click

## Usage

Open `index.html` in any modern browser – no build step required.

Alternatively, serve it locally with:

```bash
npm start   # requires Node.js; serves on http://localhost:3000
```

## Development

Install dev dependencies (Jest):

```bash
npm install
```

Run the test suite:

```bash
npm test
```

## Project structure

```
├── index.html          # Single-page web UI
├── src/
│   └── parser.js       # Core JSON utility functions (validate, format, minify, getKeys)
└── tests/
    └── parser.test.js  # Jest tests for parser.js
```