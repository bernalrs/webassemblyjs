const fs = require("fs");
const prettier = require("prettier");
const definitions = require("../src/definitions");
const { params, iterateProps } = require("./util");

function generate() {
  const filename = "./src/types.js";

  let code = `
    // @flow
    /* eslint no-unused-vars: off */
  `;

  iterateProps(definitions, typeDefinition => {
    code += `
      type ${typeDefinition.name} = {
        ...BaseNode,
        type: "${typeDefinition.name}",
        ${params(typeDefinition.fields)}
      };
    `;
  });

  fs.writeFileSync(filename, prettier.format(code));
}

generate();
