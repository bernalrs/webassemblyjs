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

defineType("ModuleNameMetadata", {
  fields: {
    value: {
      type: "string"
    }
  }
});

defineType("FunctionNameMetadata", {
  fields: {
    value: {
      type: "string"
    },
    index: {
      type: "number"
    }
  }
});

defineType("LocalNameMetadata", {
  fields: {
    value: {
      type: "string"
    },
    localIndex: {
      type: "number"
    },
    functionIndex: {
      type: "number"
    }
  }
});

defineType("BinaryModule", {
  fields: {
    id: {
      maybe: true,
      type: "string"
    },
    blob: {
      array: true,
      type: "string"
    }
  }
});

defineType("QuoteModule", {
  fields: {
    id: {
      maybe: true,
      type: "string"
    },
    string: {
      array: true,
      type: "string"
    }
  }
});

defineType("SectionMetadata", {
  fields: {
    section: {
      type: "SectionName"
    },
    startOffset: {
      type: "number"
    },
    size: {
      type: "NumberLiteral"
    },
    vectorOfSize: {
      comment: "Size of the vector in the section (if any)",
      type: "NumberLiteral"
    }
  }
});

module.exports = definitions;
