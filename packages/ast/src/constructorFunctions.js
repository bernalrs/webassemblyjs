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
