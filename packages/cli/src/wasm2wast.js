#!/usr/bin/env node
const { readFileSync } = require("fs");
const { decode } = require("@webassemblyjs/wasm-parser");
const { print } = require("@webassemblyjs/wast-printer");

function toArrayBuffer(buf) {
  return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
}

const filename = process.argv[2];

const buff = toArrayBuffer(readFileSync(filename, null));
const ast = decode(buff);

const wast = print(ast);

process.stdout.write(wast);
