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
