import type { Plugin } from "unified";
import type { Root, ElementData } from "hast";
import { visit, type VisitorResult } from "unist-util-visit";

interface CodeElementData extends ElementData {
  meta?: string | null | undefined;
}

/**
 *
 * copy "code.data.meta" to "code.properties.metastring"
 *
 * use it before "rehype-raw" since "hast-util-raw" destroys the "code.data.meta"
 *
 */
const plugin: Plugin<void[], Root> = () => {
  return (tree: Root): undefined => {
    visit(tree, "element", function (code, index, parent): VisitorResult {
      if (!parent || index === undefined || code.tagName !== "code") {
        return;
      }

      if (parent.type !== "element" || parent.tagName !== "pre") {
        return;
      }

      code.properties.metastring = (code.data as CodeElementData)?.meta;
    });
  };
};

export default plugin;
