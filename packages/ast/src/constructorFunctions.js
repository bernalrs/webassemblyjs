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

export function stringLiteral(value: string): StringLiteral {
  assert(typeof value === "string");

  const node: StringLiteral = {
    type: "StringLiteral",
    value
  };

  return node;
}

export function numberLiteral(value: number, raw: string): NumberLiteral {
  assert(typeof value === "number");

  assert(typeof raw === "string");

  const node: NumberLiteral = {
    type: "NumberLiteral",
    value,
    raw
  };

  return node;
}

export function longNumberLiteral(
  value: LongNumber,
  raw: string
): LongNumberLiteral {
  assert(typeof raw === "string");

  const node: LongNumberLiteral = {
    type: "LongNumberLiteral",
    value,
    raw
  };

  return node;
}

export function floatLiteral(
  value: number,
  nan?: boolean,
  inf?: boolean,
  raw: string
): FloatLiteral {
  assert(typeof value === "number");

  if (nan !== null && nan !== undefined) {
    assert(typeof nan === "boolean");
  }

  if (inf !== null && inf !== undefined) {
    assert(typeof inf === "boolean");
  }

  assert(typeof raw === "string");

  const node: FloatLiteral = {
    type: "FloatLiteral",
    value,
    raw
  };

  if (nan === true) {
    node.nan = true;
  }

  if (inf === true) {
    node.inf = true;
  }

  return node;
}

export function elem(
  table: Index,
  offset: Array<Instruction>,
  funcs: Array<Index>
): Elem {
  assert(typeof offset === "object" && typeof offset.length !== "undefined");

  assert(typeof funcs === "object" && typeof funcs.length !== "undefined");

  const node: Elem = {
    type: "Elem",
    table,
    offset,
    funcs
  };

  return node;
}

export function indexInFuncSection(index: Index): IndexInFuncSection {
  const node: IndexInFuncSection = {
    type: "IndexInFuncSection",
    index
  };

  return node;
}

export function valtypeLiteral(name: Valtype): ValtypeLiteral {
  const node: ValtypeLiteral = {
    type: "ValtypeLiteral",
    name
  };

  return node;
}

export function typeInstruction(
  id: ?Index,
  functype: Signature
): TypeInstruction {
  const node: TypeInstruction = {
    type: "TypeInstruction",
    id,
    functype
  };

  return node;
}

export function start(index: Index): Start {
  const node: Start = {
    type: "Start",
    index
  };

  return node;
}

export function globalType(
  valtype: Valtype,
  mutability: Mutability
): GlobalType {
  const node: GlobalType = {
    type: "GlobalType",
    valtype,
    mutability
  };

  return node;
}

export function leadingComment(value: string): LeadingComment {
  assert(typeof value === "string");

  const node: LeadingComment = {
    type: "LeadingComment",
    value
  };

  return node;
}

export function blockComment(value: string): BlockComment {
  assert(typeof value === "string");

  const node: BlockComment = {
    type: "BlockComment",
    value
  };

  return node;
}

export function data(
  memoryIndex: Memidx,
  offset: Instruction,
  init: ByteArray
): Data {
  const node: Data = {
    type: "Data",
    memoryIndex,
    offset,
    init
  };

  return node;
}

export function global(
  globalType: GlobalType,
  init: Array<Instruction>,
  name: ?Identifier
): Global {
  assert(typeof init === "object" && typeof init.length !== "undefined");

  const node: Global = {
    type: "Global",
    globalType,
    init,
    name
  };

  return node;
}
