const fs = require("fs");
const prettier = require("prettier");
const definitions = require("../src/definitions");
const { typeSignature, mapProps, iterateProps } = require("./util");

function params(fields) {
  return mapProps(fields)
    .map(typeSignature)
    .join(",");
}

function generate() {
  const filename = "./src/types.js";

  let code = `
    // @flow
    /* eslint no-unused-vars: off */
  `;

  iterateProps(definitions, typeDef => {
    code += `
      type ${typeDef.flowTypeName || typeDef.name} = {
        ...${typeDef.extends || "BaseNode"},
        type: "${typeDef.astTypeName || typeDef.name}",
        ${params(typeDef.fields)}
      };
    `;
  });

  fs.writeFileSync(filename, prettier.format(code));
}

generate();
