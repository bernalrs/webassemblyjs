// @flow
/* eslint no-unused-vars: off */

type U32Literal = NumberLiteral;
type Byte = Number;

type NumericLiteral = FloatLiteral | NumberLiteral | LongNumberLiteral;

type SectionName =
  | "custom"
  | "type"
  | "import"
  | "func"
  | "table"
  | "memory"
  | "global"
  | "export"
  | "start"
  | "element"
  | "code"
  | "data";

type Typeidx = U32Literal;
type Funcidx = U32Literal;
type Tableidx = U32Literal;
type Memidx = U32Literal;
type Globalidx = U32Literal;
type Localidx = U32Literal;
type Labelidx = U32Literal;

type Index =
  | Typeidx
  | Funcidx
  | Tableidx
  | Memidx
  | Globalidx
  | Localidx
  | Labelidx
  | Identifier; // WAST shorthand

type Signature = {
  ...BaseNode,
  type: "Signature",
  params: Array<FuncParam>,
  results: Array<Valtype>
};

type SignatureOrTypeRef = Index | Signature;

type Valtype = "i32" | "i64" | "f32" | "f64" | "u32" | "label";
type Mutability = "const" | "var";
type InstructionType = "Instr" | ControlInstruction;
type ControlInstruction =
  | "CallInstruction"
  | "CallIndirectInstruction"
  | "BlockInstruction"
  | "LoopInstruction"
  | "IfInstruction";

type NodePath<T> = {
  node: T,
  parentPath: ?NodePath<Node>,

  replaceWith: Node => void,
  remove: () => void
};

type Node =
  | Program
  | FloatLiteral
  | ModuleMetadata
  | StringLiteral
  | NumberLiteral
  | LongNumberLiteral
  | Identifier
  | Module
  | SectionMetadata
  | FunctionNameMetadata
  | ModuleNameMetadata
  | Signature
  | LocalNameMetadata
  | BinaryModule
  | QuoteModule
  | Func
  | IfInstruction
  | TypeInstruction
  | LoopInstruction
  | BlockInstruction
  | CallInstruction
  | CallIndirectInstruction
  | ObjectInstruction
  | GenericInstruction
  | ModuleExport
  | Limit
  | FuncImportDescr
  | ModuleImport
  | Table
  | Memory
  | Data
  | Global
  | GlobalType
  | LeadingComment
  | BlockComment
  | ValtypeLiteral
  | Start
  | Elem
  | IndexInFuncSection;

type Expression =
  | Identifier
  | NumericLiteral
  | ValtypeLiteral
  | Instruction
  | StringLiteral;

type TableElementType = "anyfunc";

/**
 * AST types
 */

type LongNumber = {
  high: number,
  low: number
};

type Position = {
  line: number,
  column: number
};

type SourceLocation = {
  start: Position,
  end?: Position
};

type BaseNode = {
  type: string,
  loc?: ?SourceLocation,

  // Internal property
  _deleted?: ?boolean
};

type Program = {
  ...BaseNode,

  type: "Program",
  body: Array<Node>
};

/**
 * Concrete values
 */

type Identifier = {
  ...BaseNode,

  type: "Identifier",
  value: string,

  raw?: string
};

type FuncParam = {
  id: ?string,
  valtype: Valtype
};

type Func = {
  ...BaseNode,

  type: "Func",

  // Only in WAST
  name: ?Index,

  signature: SignatureOrTypeRef,

  body: Array<Instruction>,

  // Means that it has been imported from the outside js
  isExternal?: boolean,

  metadata?: {
    bodySize: number
  }
};

/**
 * Instructions
 */
type Instruction =
  | LoopInstruction
  | BlockInstruction
  | IfInstruction
  | CallInstruction
  | CallIndirectInstruction
  | GenericInstruction
  | ObjectInstruction;

type ObjectInstruction = {
  ...GenericInstruction,

  object: Valtype
};

type BlockInstruction = {
  ...BaseNode,

  type: "BlockInstruction",
  label: ?Identifier,
  instr: Array<Instruction>,
  result: ?Valtype
};

type CallInstruction = {
  ...BaseNode,

  type: "CallInstruction",
  index: Index,
  instrArgs?: Array<Expression> // only for WAST
};

type CallIndirectInstruction = {
  ...BaseNode,

  type: "CallIndirectInstruction",

  signature: SignatureOrTypeRef,

  intrs?: Array<Expression>,

  // WAT
  index?: Index
};

type ExportDescrType = "Func" | "Table" | "Memory" | "Global";

type ExportDescr = {
  ...BaseNode,

  type: "ModuleExportDescr",
  exportType: ExportDescrType,
  id: Index
};

type ModuleExport = {
  ...BaseNode,

  type: "ModuleExport",
  name: string,
  descr: ExportDescr
};

type Limit = {
  ...BaseNode,

  type: "Limit",
  min: number,
  max?: number
};

type FuncImportDescr = {
  ...BaseNode,

  type: "FuncImportDescr",
  id: Identifier,
  signature: Signature
};

type ImportDescr = FuncImportDescr | GlobalType | Memory | Table;

type ModuleImport = {
  ...BaseNode,

  type: "ModuleImport",
  module: string,
  name: string,
  descr: ImportDescr
};

type Table = {
  ...BaseNode,

  type: "Table",
  elementType: TableElementType,
  elements?: Array<Index>,
  limits: Limit,
  name: ?Identifier
};

type Memory = {
  ...BaseNode,

  type: "Memory",
  limits: Limit,
  id: ?Index
};

type ByteArray = {
  type: "Bytes",
  values: Array<Byte>
};

