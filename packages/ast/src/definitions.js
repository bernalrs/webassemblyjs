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

defineType("LoopInstruction", {
  fields: {
    id: {
      constant: true,
      type: "string",
      value: "loop"
    },
    label: {
      maybe: true,
      type: "Identifier"
    },
    resulttype: {
      maybe: true,
      type: "Valtype"
    },
    instr: {
      array: true,
      type: "Instruction"
    }
  }
});

defineType("Instruction", {
  // TODO: ideally the naming of this type would be consistent across AST / Flow
  astTypeName: "Instr",
  flowTypeName: "GenericInstruction",
  fields: {
    id: {
      type: "string"
    },
    args: {
      array: true,
      type: "Expression",
      // TODO: should this be an optional property?
      default: "[]"
    },
    namedArgs: {
      optional: true,
      type: "Object",
      // TODO: should this be an optional property?
      default: "{}"
    }
  }
});

defineType("IfInstruction", {
  fields: {
    id: {
      constant: true,
      type: "string",
      value: "if"
    },
    testLabel: {
      comment: "only for WAST",
      type: "Identifier"
    },
    test: {
      array: true,
      type: "Instruction"
    },
    result: {
      maybe: true,
      type: "Valtype"
    },
    consequent: {
      array: true,
      type: "Instruction"
    },
    alternate: {
      array: true,
      type: "Instruction"
    }
  }
});

module.exports = definitions;
