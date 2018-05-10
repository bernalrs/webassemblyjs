const definitions = {};

function defineType(typeName, metadata) {
  definitions[typeName] = metadata;
}

defineType("Module", {
  spec: {
    wasm:
      "https://webassembly.github.io/spec/core/binary/modules.html#binary-module",
    wat: "https://webassembly.github.io/spec/core/text/modules.html#text-module"
  },
  doc:
    "A module consists of a sequence of sections (termed fields in the text format).",
  fields: {
    id: {
      maybe: true,
      type: "string"
    },
    fields: {
      array: true,
      type: "Node"
    },
    metadata: {
      optional: true,
      type: "ModuleMetadata"
    }
  }
});

defineType("ModuleMetadata", {
  fields: {
    sections: {
      array: true,
      type: "SectionMetadata"
    },
    functionNames: {
      optional: true,
      array: true,
      type: "FunctionNameMetadata"
    },
    localNames: {
      optional: true,
      array: true,
      type: "ModuleMetadata"
    }
  }
});

module.exports = definitions;
