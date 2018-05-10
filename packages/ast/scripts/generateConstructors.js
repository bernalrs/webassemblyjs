const fs = require("fs");
const prettier = require("prettier");
const definitions = require("../src/definitions");
const { params, iterateProps, mapProps, filterProps } = require("./util");

const jsTypes = ["string", "number"];

function assertParamType({ array, name, type }) {
  if (array) {
    // TODO - assert contents of array?
    return `assert(typeof ${name} === "object" && typeof ${name}.length !== "undefined")\n`;
  } else {
    if (!jsTypes.includes(type)) {
      return "";
    }
    return `assert(typeof ${name} === "${type}")\n`;
  }
}

function assertParam(meta) {
  const paramAssertion = assertParamType(meta);
  if ((meta.maybe || meta.optional) && jsTypes.includes(meta.type)) {
    return `
      if (${meta.name} !== null && ${meta.name} !== undefined) {
        ${paramAssertion};
      }
    `;
  } else {
    return paramAssertion;
  }
}

function assertParams(fields) {
  return mapProps(fields)
    .map(assertParam)
    .join("\n");
}

function buildObject(typeDef) {
  const optionalField = meta => {
    if (meta.array) {
      // omit optional array properties if the constructor function was supplied
      // with an empty array
      return `
        if (typeof ${meta.name} !== "undefined" && ${meta.name}.length > 0) {
          node.${meta.name} = ${meta.name};
        }
      `;
    } else {
      return `
        if (typeof ${meta.name} !== "undefined") {
          node.${meta.name} = ${meta.name};
        }
      `;
    }
  };

  const fields = mapProps(typeDef.fields)
    .filter(f => !f.optional && !f.constant)
    .map(f => f.name);

  const constants = mapProps(typeDef.fields)
    .filter(f => f.constant)
    .map(f => `${f.name}: "${f.value}"`);

  return `
    const node: ${typeDef.name} = {
      type: "${typeDef.name}",
      ${constants.concat(fields).join(",")}
    }
    
    ${mapProps(typeDef.fields)
      .filter(f => f.optional)
      .map(optionalField)
      .join("")}
  `;
}

function lowerCamelCase(name) {
  return name.substring(0, 1).toLowerCase() + name.substring(1);
}

function generate() {
  const filename = "./src/constructorFunctions.js";

  let code = `
    // @flow

    function assert(cond: boolean) {
      if (!cond) {
        throw new Error("assertion error");
      }
    }
  `;

  iterateProps(definitions, typeDefinition => {
    code += `
    export function ${lowerCamelCase(typeDefinition.name)} (
      ${params(filterProps(typeDefinition.fields, f => !f.constant))}
    ): ${typeDefinition.name} {

      ${assertParams(filterProps(typeDefinition.fields, f => !f.constant))}
      ${buildObject(typeDefinition)} 

      return node;
    }
    `;
  });

  fs.writeFileSync(filename, prettier.format(code));
}

generate();
