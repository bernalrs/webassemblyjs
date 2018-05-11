// @flow
/* eslint no-unused-vars: off */

type Module = {
  ...BaseNode,
  type: "Module",
  id: ?string,
  fields: Array<Node>,
  metadata?: ModuleMetadata
};

type ModuleMetadata = {
  ...BaseNode,
  type: "ModuleMetadata",
  sections: Array<SectionMetadata>,
  functionNames?: Array<FunctionNameMetadata>,
  localNames?: Array<ModuleMetadata>
};

type ModuleNameMetadata = {
  ...BaseNode,
  type: "ModuleNameMetadata",
  value: string
};

type FunctionNameMetadata = {
  ...BaseNode,
  type: "FunctionNameMetadata",
  value: string,
  index: number
};

type LocalNameMetadata = {
  ...BaseNode,
  type: "LocalNameMetadata",
  value: string,
  localIndex: number,
  functionIndex: number
};

type BinaryModule = {
  ...BaseNode,
  type: "BinaryModule",
  id: ?string,
  blob: Array<string>
};

type QuoteModule = {
  ...BaseNode,
  type: "QuoteModule",
  id: ?string,
  string: Array<string>
};

type SectionMetadata = {
  ...BaseNode,
  type: "SectionMetadata",
  section: SectionName,
  startOffset: number,
  size: NumberLiteral,
  vectorOfSize: NumberLiteral
};

type LoopInstruction = {
  ...BaseNode,
  type: "LoopInstruction",
  id: string,
  label: ?Identifier,
  resulttype: ?Valtype,
  instr: Array<Instruction>
};

type GenericInstruction = {
  ...BaseNode,
  type: "Instr",
  id: string,
  args: Array<Expression>,
  namedArgs?: Object
};

type IfInstruction = {
  ...BaseNode,
  type: "IfInstruction",
  id: string,
  testLabel: Identifier,
  test: Array<Instruction>,
  result: ?Valtype,
  consequent: Array<Instruction>,
  alternate: Array<Instruction>
};

type StringLiteral = {
  ...BaseNode,
  type: "StringLiteral",
  value: string
};

type NumberLiteral = {
  ...BaseNode,
  type: "NumberLiteral",
  value: number,
  raw: string
};

type LongNumberLiteral = {
  ...BaseNode,
  type: "LongNumberLiteral",
  value: LongNumber,
  raw: string
};

type FloatLiteral = {
  ...BaseNode,
  type: "FloatLiteral",
  value: number,
  nan?: boolean,
  inf?: boolean,
  raw: string
};

type Elem = {
  ...BaseNode,
  type: "Elem",
  table: Index,
  offset: Array<Instruction>,
  funcs: Array<Index>
};

type IndexInFuncSection = {
  ...BaseNode,
  type: "IndexInFuncSection",
  index: Index
};
