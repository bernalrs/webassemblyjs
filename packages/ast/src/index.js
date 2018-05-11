// @flow

import { signatures } from "./signatures";
export {
  module,
  moduleMetadata,
  functionNameMetadata,
  moduleNameMetadata,
  localNameMetadata,
  quoteModule,
  binaryModule,
  sectionMetadata,
  loopInstruction,
  instruction,
  ifInstruction,
  longNumberLiteral,
  stringLiteral,
  floatLiteral
} from "./constructorFunctions";

// TODO: this is only being aliased to avid a naming collision with the current numberLiteral constructor
// function. Ideally, the numberLiteral function would be renamed to indicate that it is a utility function
// with additional business logic
import {
  longNumberLiteral,
  floatLiteral,
  numberLiteral as numberLiteralConstructor
} from "./constructorFunctions";

const {
  parse32F,
  parse64F,
  parse32I,
  parse64I,
  parseU32,
  isNanLiteral,
  isInfLiteral
} = require("@webassemblyjs/wast-parser/lib/number-literals");

function assert(cond: boolean) {
  if (!cond) {
    throw new Error("assertion error");
  }
}

export function signature(object: string, name: string): SignatureMap {
  let opcodeName = name;
  if (object !== undefined && object !== "") {
    opcodeName = object + "." + name;
  }
  const sign = signatures[opcodeName];
  if (sign == undefined) {
    // TODO: Uncomment this when br_table and others has been done
    //throw new Error("Invalid opcode: "+opcodeName);
    return [object, object];
  }

  return sign[0];
}

export function identifier(value: string): Identifier {
  return {
    type: "Identifier",
    value
  };
}

export function valtype(name: Valtype): ValtypeLiteral {
  return {
    type: "ValtypeLiteral",
    name
  };
}

export function program(body: Array<Node>): Program {
  return {
    type: "Program",
    body
  };
}

export function moduleExport(
  name: string,
  exportType: ExportDescrType,
  id: Index
): ModuleExport {
  return {
    type: "ModuleExport",
    name,
    descr: {
      type: "ModuleExportDescr",
      exportType,
      id
    }
  };
}

export function functionSignature(
  params: Array<FuncParam>,
  results: Array<Valtype>
): Signature {
  return {
    type: "Signature",
    params,
    results
  };
}

export function func(
  name: ?Index,
  params: Array<FuncParam>,
  results: Array<Valtype>,
  body: Array<Instruction>
): Func {
  assert(typeof params === "object" && typeof params.length !== "undefined");
  assert(typeof results === "object" && typeof results.length !== "undefined");
  assert(typeof body === "object" && typeof body.length !== "undefined");
  assert(typeof name !== "string");

  return {
    type: "Func",
    name,
    signature: functionSignature(params, results),
    body
  };
}

export function funcWithTypeRef(
  name: ?Index,
  typeRef: Index,
  body: Array<Instruction>
): Func {
  assert(typeof body === "object" && typeof body.length !== "undefined");
  assert(typeof name !== "string");

  return {
    type: "Func",
    name,
    signature: typeRef,
    body
  };
}

export function objectInstruction(
  id: string,
  object: Valtype,
  args: Array<Expression> = [],
  namedArgs: Object = {}
): ObjectInstruction {
  assert(typeof args === "object" && typeof args.length !== "undefined");
  assert(typeof object === "string");

  const n: ObjectInstruction = {
    type: "Instr",
    id,
    object,
    args
  };

  if (Object.keys(namedArgs).length !== 0) {
    n.namedArgs = namedArgs;
  }

  return n;
}

export function blockInstruction(
  label: Identifier,
  instr: Array<Instruction>,
  result: ?Valtype
): BlockInstruction {
  assert(typeof label !== "undefined");
  assert(typeof label.type === "string");
  assert(typeof instr === "object" && typeof instr.length !== "undefined");

  return {
    type: "BlockInstruction",
    id: "block",
    label,
    instr,
    result
  };
}

export function numberLiteral(
  rawValue: number | string,
  instructionType: Valtype = "i32"
): NumericLiteral {
  const original = rawValue;

  // Remove numeric separators _
  if (typeof rawValue === "string") {
    rawValue = rawValue.replace(/_/g, "");
  }

  if (typeof rawValue === "number") {
    return numberLiteralConstructor(rawValue, String(original));
  } else {
    switch (instructionType) {
      case "i32": {
        return numberLiteralConstructor(parse32I(rawValue), String(original));
      }
      case "u32": {
        return numberLiteralConstructor(parseU32(rawValue), String(original));
      }
      case "i64": {
        return longNumberLiteral(parse64I(rawValue), String(original));
      }
      case "f32": {
        return floatLiteral(
          parse32F(rawValue),
          isNanLiteral(rawValue),
          isInfLiteral(rawValue),
          String(original)
        );
      }
      // f64
      default: {
        return floatLiteral(
          parse64F(rawValue),
          isNanLiteral(rawValue),
          isInfLiteral(rawValue),
          String(original)
        );
      }
    }
  }
}

export function getUniqueNameGenerator(): string => string {
  const inc = {};
  return function(prefix: string = "temp"): string {
    if (!(prefix in inc)) {
      inc[prefix] = 0;
    } else {
      inc[prefix] = inc[prefix] + 1;
    }
    return prefix + "_" + inc[prefix];
  };
}

export function callInstruction(
  index: Index,
  instrArgs?: Array<Expression>
): CallInstruction {
  assert(typeof index.type === "string");

  const n: CallInstruction = {
    type: "CallInstruction",
    id: "call",
    index
  };

  if (typeof instrArgs === "object") {
    n.instrArgs = instrArgs;
  }

  return n;
}

/**
 * Decorators
 */

export function withLoc(n: Node, end: Position, start: Position): Node {
  const loc = {
    start,
    end
  };

  n.loc = loc;

  return n;
}

export function withRaw(n: Node, raw: string): Node {
  // $FlowIgnore
  n.raw = raw;

  return n;
}

/**
 * Import
 */

export function moduleImport(
  module: string,
  name: string,
  descr: ImportDescr
): ModuleImport {
  return {
    type: "ModuleImport",
    module,
    name,
    descr
  };
}

export function globalImportDescr(
  valtype: Valtype,
  mutability: Mutability
): GlobalType {
  return {
    type: "GlobalType",

    valtype,
    mutability
  };
}

export function funcParam(valtype: Valtype, id: ?string): FuncParam {
  return {
    id,
    valtype
  };
}

export function funcImportDescr(
  id: Identifier,
  params: Array<FuncParam> = [],
  results: Array<Valtype> = []
): FuncImportDescr {
  assert(typeof params === "object" && typeof params.length !== "undefined");
  assert(typeof results === "object" && typeof results.length !== "undefined");

  return {
    type: "FuncImportDescr",
    id,
    signature: functionSignature(params, results)
  };
}

export function table(
  elementType: TableElementType,
  limits: Limit,
  name: ?Identifier,
  elements?: Array<Index>
): Table {
  const n: Table = {
    type: "Table",
    elementType,
    limits,
    name
  };

  if (typeof elements === "object") {
    n.elements = elements;
  }

  return n;
}

export function limits(min: number, max?: number): Limit {
  assert(typeof min === "number");

  if (typeof max !== "undefined") {
    assert(typeof max === "number");
  }

  return {
    type: "Limit",
    min,
    max
  };
}

export function memory(limits: Limit, id: ?Index): Memory {
  return {
    type: "Memory",
    limits,
    id
  };
}

export function data(
  memoryIndex: Memidx,
  offset: Instruction,
  init: ByteArray
): Data {
  return {
    type: "Data",
    memoryIndex,
    offset,
    init
  };
}

export function global(
  globalType: GlobalType,
  init: Array<Instruction>,
  name: ?Identifier
): Global {
  return {
    type: "Global",
    globalType,
    init,
    name
  };
}

export function globalType(
  valtype: Valtype,
  mutability: Mutability
): GlobalType {
  return {
    type: "GlobalType",
    valtype,
    mutability
  };
}

export function byteArray(values: Array<Byte>): ByteArray {
  return {
    type: "Bytes",
    values
  };
}

export function leadingComment(value: string): LeadingComment {
  return {
    type: "LeadingComment",
    value
  };
}

export function blockComment(value: string): BlockComment {
  return {
    type: "BlockComment",
    value
  };
}

export function indexLiteral(value: number | string): Index {
  // $FlowIgnore
  const x: NumberLiteral = numberLiteral(value, "u32");

  return x;
}

export function memIndexLiteral(value: number): Memidx {
  // $FlowIgnore
  const x: U32Literal = numberLiteral(value, "u32");
  return x;
}

export function typeInstructionFunc(
  params: Array<FuncParam> = [],
  results: Array<Valtype> = [],
  id: ?Index
): TypeInstruction {
  return {
    type: "TypeInstruction",
    id,
    functype: functionSignature(params, results)
  };
}

export function callIndirectInstruction(
  params: Array<FuncParam>,
  results: Array<Valtype>,
  intrs: Array<Expression>
): CallIndirectInstruction {
  return {
    type: "CallIndirectInstruction",
    signature: functionSignature(params, results),
    intrs
  };
}

export function callIndirectInstructionWithTypeRef(
  typeRef: Index,
  intrs: Array<Expression>
): CallIndirectInstruction {
  return {
    type: "CallIndirectInstruction",
    signature: typeRef,
    intrs
  };
}

export function start(index: Index): Start {
  return {
    type: "Start",
    index
  };
}

export function elem(
  table: Index = indexLiteral(0),
  offset: Array<Instruction>,
  funcs: Array<Index>
): Elem {
  return {
    type: "Elem",
    table,
    offset,
    funcs
  };
}

export function indexInFuncSection(index: Index): IndexInFuncSection {
  return {
    type: "IndexInFuncSection",
    index
  };
}

export function isAnonymous(ident: Identifier): boolean {
  return ident.raw === "";
}

export { traverse, traverseWithHooks } from "./traverse";
export { signatures } from "./signatures";
export {
  isInstruction,
  getSectionMetadata,
  sortSectionMetadata,
  orderedInsertNode,
  assertHasLoc,
  getEndOfSection,
  shiftSection,
  shiftLoc
} from "./utils";
export { cloneNode } from "./clone";
