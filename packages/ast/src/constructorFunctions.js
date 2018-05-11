// @flow

function assert(cond: boolean) {
  if (!cond) {
    throw new Error("assertion error");
  }
}

export function module(
  id: ?string,
  fields: Array<Node>,
  metadata?: ModuleMetadata
): Module {
  if (id !== null && id !== undefined) {
    assert(typeof id === "string");
  }

  assert(typeof fields === "object" && typeof fields.length !== "undefined");

  const node: Module = {
    type: "Module",
    id,
    fields
  };

  if (typeof metadata !== "undefined") {
    node.metadata = metadata;
  }

  return node;
}

export function moduleMetadata(
  sections: Array<SectionMetadata>,
  functionNames?: Array<FunctionNameMetadata>,
  localNames?: Array<ModuleMetadata>
): ModuleMetadata {
  assert(
    typeof sections === "object" && typeof sections.length !== "undefined"
  );

  assert(
    typeof functionNames === "object" &&
      typeof functionNames.length !== "undefined"
  );

  assert(
    typeof localNames === "object" && typeof localNames.length !== "undefined"
  );

  const node: ModuleMetadata = {
    type: "ModuleMetadata",
    sections
  };

  if (typeof functionNames !== "undefined" && functionNames.length > 0) {
    node.functionNames = functionNames;
  }

  if (typeof localNames !== "undefined" && localNames.length > 0) {
    node.localNames = localNames;
  }

  return node;
}

export function moduleNameMetadata(value: string): ModuleNameMetadata {
  assert(typeof value === "string");

  const node: ModuleNameMetadata = {
    type: "ModuleNameMetadata",
    value
  };

  return node;
}

export function functionNameMetadata(
  value: string,
  index: number
): FunctionNameMetadata {
  assert(typeof value === "string");

  assert(typeof index === "number");

  const node: FunctionNameMetadata = {
    type: "FunctionNameMetadata",
    value,
    index
  };

  return node;
}

export function localNameMetadata(
  value: string,
  localIndex: number,
  functionIndex: number
): LocalNameMetadata {
  assert(typeof value === "string");

  assert(typeof localIndex === "number");

  assert(typeof functionIndex === "number");

  const node: LocalNameMetadata = {
    type: "LocalNameMetadata",
    value,
    localIndex,
    functionIndex
  };

  return node;
}

export function binaryModule(id: ?string, blob: Array<string>): BinaryModule {
  if (id !== null && id !== undefined) {
    assert(typeof id === "string");
  }

  assert(typeof blob === "object" && typeof blob.length !== "undefined");

  const node: BinaryModule = {
    type: "BinaryModule",
    id,
    blob
  };

  return node;
}

export function quoteModule(id: ?string, string: Array<string>): QuoteModule {
  if (id !== null && id !== undefined) {
    assert(typeof id === "string");
  }

  assert(typeof string === "object" && typeof string.length !== "undefined");

  const node: QuoteModule = {
    type: "QuoteModule",
    id,
    string
  };

  return node;
}

export function sectionMetadata(
  section: SectionName,
  startOffset: number,
  size: NumberLiteral,
  vectorOfSize: NumberLiteral
): SectionMetadata {
  assert(typeof startOffset === "number");

  const node: SectionMetadata = {
    type: "SectionMetadata",
    section,
    startOffset,
    size,
    vectorOfSize
  };

  return node;
}

export function loopInstruction(
  label: ?Identifier,
  resulttype: ?Valtype,
  instr: Array<Instruction>
): LoopInstruction {
  assert(typeof instr === "object" && typeof instr.length !== "undefined");

  const node: LoopInstruction = {
    type: "LoopInstruction",
    id: "loop",
    label,
    resulttype,
    instr
  };

  return node;
}

export function instruction(
  id: string,
  args: Array<Expression> = [],
  namedArgs?: Object = {}
): GenericInstruction {
  assert(typeof id === "string");

  assert(typeof args === "object" && typeof args.length !== "undefined");

  const node: GenericInstruction = {
    type: "Instr",
    id,
    args
  };

  if (Object.keys(namedArgs).length !== 0) {
    node.namedArgs = namedArgs;
  }

  return node;
}

export function ifInstruction(
  testLabel: Identifier,
  test: Array<Instruction>,
  result: ?Valtype,
  consequent: Array<Instruction>,
  alternate: Array<Instruction>
): IfInstruction {
  assert(typeof test === "object" && typeof test.length !== "undefined");

  assert(
    typeof consequent === "object" && typeof consequent.length !== "undefined"
  );

  assert(
    typeof alternate === "object" && typeof alternate.length !== "undefined"
  );

  const node: IfInstruction = {
    type: "IfInstruction",
    id: "if",
    testLabel,
    test,
    result,
    consequent,
    alternate
  };

  return node;
}
