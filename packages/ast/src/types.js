// @flow
/* eslint no-unused-vars: off */

type Module = {
  ...BaseNode,
  type: "Module",
  id: ?string,
  fields: Array<Node>,
  metadata?: ModuleMetadata
};
