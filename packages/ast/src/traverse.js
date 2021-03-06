// @flow

type Cb = (type: string, path: NodePath<Node>) => void;

const debug = require("debug")("ast:traverse");

function removeNodeInBody(node: Node, fromNode: Node) {
  switch (fromNode.type) {
    case "ModuleMetadata":
      fromNode.sections = fromNode.sections.filter(n => n !== node);
      break;

    case "Module":
      fromNode.fields = fromNode.fields.filter(n => n !== node);
      break;

    case "Program":
    case "Func":
      // $FlowIgnore it says References?
      fromNode.body = fromNode.body.filter(n => n !== node);
      break;

    default:
      throw new Error(
        "Unsupported operation: removing node of type: " + String(fromNode.type)
      );
  }
}

function createPath(node: Node, parentPath: ?NodePath<Node>): NodePath<Node> {
  function remove() {
    if (parentPath == null) {
      throw new Error("Can not remove root node");
    }

    const parentNode = parentPath.node;
    removeNodeInBody(node, parentNode);

    node._deleted = true;

    debug("delete path %s", node.type);
  }

  // TODO(sven): do it the good way, changing the node from the parent
  function replaceWith(newNode: Node) {
    // Remove all the keys first
    // $FlowIgnore
    Object.keys(node).forEach(k => delete node[k]);

    // $FlowIgnore
    Object.assign(node, newNode);
  }

  return {
    node,
    parentPath,

    replaceWith,
    remove
  };
}

// recursively walks the AST starting at the given node. The callback is invoked for
// and object that has a 'type' property.
function walk(node: Node, callback: Cb, parentPath: ?NodePath<Node>) {
  if (node._deleted === true) {
    return;
  }

  const path = createPath(node, parentPath);
  // $FlowIgnore
  callback(node.type, path);

  Object.keys(node).forEach((prop: string) => {
    const value = node[prop];
    if (value === null || value === undefined) {
      return;
    }
    const valueAsArray = Array.isArray(value) ? value : [value];
    valueAsArray.forEach(v => {
      if (typeof v.type === "string") {
        walk(v, callback, path);
      }
    });
  });
}

export function traverse(n: Node, visitors: Object) {
  const parentPath = null;

  walk(
    n,
    (type: string, path: NodePath<Node>) => {
      if (typeof visitors["Node"] === "function") {
        visitors["Node"](path);
      }

      if (typeof visitors[type] === "function") {
        visitors[type](path);
      }
    },
    parentPath
  );
}

export function traverseWithHooks(
  n: Node,
  visitors: Object,
  before: Cb,
  after: Cb
) {
  const parentPath = null;

  walk(
    n,
    (type: string, path: NodePath<Node>) => {
      if (typeof visitors[type] === "function") {
        before(type, path);
        visitors[type](path);
        after(type, path);
      }
    },
    parentPath
  );
}
