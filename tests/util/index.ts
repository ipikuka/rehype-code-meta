import { unified } from "unified";
import remarkParse from "remark-parse";
import rehypeParse from "rehype-parse";
import gfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw";
import rehypeHighlightCodeLines from "rehype-highlight-code-lines";
import rehypeStringify from "rehype-stringify";
import type { VFileCompatible, VFile } from "vfile";

import plugin from "../../src";

/**
 *
 * process without plugin from markdown source
 *
 */
export const processWithoutPlugin = async (content: VFileCompatible): Promise<VFile> => {
  return unified()
    .use(remarkParse)
    .use(gfm)
    .use(remarkRehype)
    .use(rehypeRaw)
    .use(rehypeHighlightCodeLines)
    .use(rehypeStringify)
    .process(content);
};

/**
 *
 * process with plugin from markdown source
 *
 */
export const processFromMarkdown = async (content: VFileCompatible): Promise<VFile> => {
  return unified()
    .use(remarkParse)
    .use(gfm)
    .use(remarkRehype)
    .use(plugin)
    .use(rehypeRaw)
    .use(rehypeHighlightCodeLines)
    .use(rehypeStringify)
    .process(content);
};

/**
 *
 * process with plugin from html source
 *
 */
export const processFromHtml = async (content: VFileCompatible): Promise<VFile> => {
  return unified()
    .use(rehypeParse, { fragment: true })
    .use(plugin)
    .use(rehypeRaw)
    .use(rehypeHighlightCodeLines)
    .use(rehypeStringify)
    .process(content);
};
