# rehype-code-meta

[![npm version][badge-npm-version]][url-npm-package]
[![npm downloads][badge-npm-download]][url-npm-package]
[![publish to npm][badge-publish-to-npm]][url-publish-github-actions]
[![code-coverage][badge-codecov]][url-codecov]
[![type-coverage][badge-type-coverage]][url-github-package]
[![typescript][badge-typescript]][url-typescript]
[![license][badge-license]][url-license]

This package is a **[unified][unified]** (**[rehype][rehype]**) plugin **to copy `code.data.meta` to `code.properties.metastring`**.

**[unified][unified]** is a project that transforms content with abstract syntax trees (ASTs) using the new parser **[micromark][micromark]**. **[remark][remark]** adds support for markdown to unified. **[mdast][mdast]** is the Markdown Abstract Syntax Tree (AST) which is a specification for representing markdown in a syntax tree. **[rehype][rehype]** is a tool that transforms HTML with plugins. **[hast][hast]** stands for HTML Abstract Syntax Tree (HAST) that rehype uses.

**This plugin finds the `<code>` elements in hast, and copies `code.data.meta` to `code.properties.metastring`.**

## When should I use this?

**`rehype-code-meta`** is useful if you use **[rehype-raw][rehype-raw]** (**[hast-util-raw][hast-util-raw]**) since it destroys `code.data.meta`. Use **`rehype-code-meta`** to copy `code.data.meta` to `code.properties.metastring` to preserve tha data before **`rehype-raw`** (**`hast-util-raw`**).

Some `rehype` plugins utilize `code.data.meta`. Since **`rehype-raw`** destroys it, that `rehype` plugins also utilize `code.properties.metastring` in case **`rehype-raw`** is in the plugin chain.

Don't forget to remove `code.properties.metastring` in the end. The `rehype` plugins that utilize `code.properties.metastring` already remove it in most cases, hence you don't need to do anything.

## Installation

This package is suitable for ESM only. In Node.js (version 16+), install with npm:

```bash
npm install rehype-code-meta
```

or

```bash
yarn add rehype-code-meta
```

## Usage

Say we have the following markdown file, `example.md`, and you want to add line numbering to the code via **`rehype-highlight-code-lines`**.

````markdown
```javascript showLineNumbers
const me = "ipikuka";
```
````

And our module, `example.js`, looks as follows:

```javascript
import { read } from "to-vfile";
import remark from "remark";
import gfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeCodeMeta from "rehype-code-meta";
import rehypeRaw from "rehype-raw";
import rehypeHighlightCodeLines from "rehype-highlight-code-lines";
import rehypeStringify from "rehype-stringify";

main();

async function main() {
  const file = await remark()
    .use(gfm)
    .use(remarkRehype)
    .use(rehypeCodeMeta)
    .use(rehypeRaw)
    .use(rehypeHighlightCodeLine)
    .process(await read("example.md"));

  console.log(String(file));
}
```

Now, running `node example.js` you see that the code lines are numbered thanks to **`rehype-code-meta`**. Otherwise, without **`rehype-code-meta`**, the **`rehype-highlight-code-lines`** can't find the information `showLineNumbers` in the `code.data.meta` due to **`rehype-raw`**.

## Options

There is no any option. It is opinionated. 

## Syntax tree

This plugin modifies the `hast` (HTML abstract syntax tree).

## Types

This package is fully typed with [TypeScript][url-typescript]. The plugin doesn't export any type.

## Compatibility

This plugin works with `rehype-parse` version 1+, `rehype-stringify` version 1+, `rehype` version 1+, and unified version `4+`.

## Security

Use of **`rehype-code-meta`** involves rehype (hast), but doesn't lead to cross-site scripting (XSS) attacks.

## My Plugins

I like to contribute the Unified / Remark / MDX ecosystem, so I recommend you to have a look my plugins.

### My Remark Plugins

- [`remark-flexible-code-titles`](https://www.npmjs.com/package/remark-flexible-code-titles)
  – Remark plugin to add titles or/and containers for the code blocks with customizable properties
- [`remark-flexible-containers`](https://www.npmjs.com/package/remark-flexible-containers)
  – Remark plugin to add custom containers with customizable properties in markdown
- [`remark-ins`](https://www.npmjs.com/package/remark-ins)
  – Remark plugin to add `ins` element in markdown
- [`remark-flexible-paragraphs`](https://www.npmjs.com/package/remark-flexible-paragraphs)
  – Remark plugin to add custom paragraphs with customizable properties in markdown
- [`remark-flexible-markers`](https://www.npmjs.com/package/remark-flexible-markers)
  – Remark plugin to add custom `mark` element with customizable properties in markdown
- [`remark-flexible-toc`](https://www.npmjs.com/package/remark-flexible-toc)
  – Remark plugin to expose the table of contents via `vfile.data` or via an option reference
- [`remark-mdx-remove-esm`](https://www.npmjs.com/package/remark-mdx-remove-esm)
  – Remark plugin to remove import and/or export statements (mdxjsEsm)

### My Rehype Plugins

- [`rehype-pre-language`](https://www.npmjs.com/package/rehype-pre-language)
  – Rehype plugin to add language information as a property to `pre` element
- [`rehype-highlight-code-lines`](https://www.npmjs.com/package/rehype-highlight-code-lines)
  – Rehype plugin to add line numbers to code blocks and allow highlighting of desired code lines
- [`rehype-code-meta`](https://www.npmjs.com/package/rehype-code-meta)
  – Rehype plugin to copy `code.data.meta` to `code.properties.metastring`
- [`rehype-image-toolkit`](https://www.npmjs.com/package/rehype-image-toolkit)
  – Rehype plugin to enhance Markdown image syntax `![]()` and Markdown/MDX media elements (`<img>`, `<audio>`, `<video>`) by auto-linking bracketed or parenthesized image URLs, wrapping them in `<figure>` with optional captions, unwrapping images/videos/audio from paragraph, parsing directives in title for styling and adding attributes, and dynamically converting images into `<video>` or `<audio>` elements based on file extension.
  
### My Recma Plugins

- [`recma-mdx-escape-missing-components`](https://www.npmjs.com/package/recma-mdx-escape-missing-components)
  – Recma plugin to set the default value `() => null` for the Components in MDX in case of missing or not provided so as not to throw an error
- [`recma-mdx-change-props`](https://www.npmjs.com/package/recma-mdx-change-props)
  – Recma plugin to change the `props` parameter into the `_props` in the `function _createMdxContent(props) {/* */}` in the compiled source in order to be able to use `{props.foo}` like expressions. It is useful for the `next-mdx-remote` or `next-mdx-remote-client` users in `nextjs` applications.
- [`recma-mdx-change-imports`](https://www.npmjs.com/package/recma-mdx-change-imports)
  – Recma plugin to convert import declarations for assets and media with relative links into variable declarations with string URLs, enabling direct asset URL resolution in compiled MDX.
- [`recma-mdx-import-media`](https://www.npmjs.com/package/recma-mdx-import-media)
  – Recma plugin to turn media relative paths into import declarations for both markdown and html syntax in MDX.
- [`recma-mdx-import-react`](https://www.npmjs.com/package/recma-mdx-import-react)
  – Recma plugin to ensure getting `React` instance from the arguments and to make the runtime props `{React, jsx, jsxs, jsxDev, Fragment}` is available in the dynamically imported components in the compiled source of MDX.
- [`recma-mdx-html-override`](https://www.npmjs.com/package/recma-mdx-html-override)
  – Recma plugin to allow selected raw HTML elements to be overridden via MDX components.
- [`recma-mdx-interpolate`](https://www.npmjs.com/package/recma-mdx-interpolate)
  – Recma plugin to enable interpolation of identifiers wrapped in curly braces within the `alt`, `src`, `href`, and `title` attributes of markdown link and image syntax in MDX.


## License

[MIT License](./LICENSE) © ipikuka

[unified]: https://github.com/unifiedjs/unified
[micromark]: https://github.com/micromark/micromark
[remark]: https://github.com/remarkjs/remark
[remarkplugins]: https://github.com/remarkjs/remark/blob/main/doc/plugins.md
[mdast]: https://github.com/syntax-tree/mdast
[rehype]: https://github.com/rehypejs/rehype
[rehypeplugins]: https://github.com/rehypejs/rehype/blob/main/doc/plugins.md
[hast]: https://github.com/syntax-tree/hast
[rehype-raw]: https://github.com/rehypejs/rehype-raw
[hast-util-raw]: https://github.com/syntax-tree/hast-util-raw

[badge-npm-version]: https://img.shields.io/npm/v/rehype-code-meta
[badge-npm-download]:https://img.shields.io/npm/dt/rehype-code-meta
[url-npm-package]: https://www.npmjs.com/package/rehype-code-meta
[url-github-package]: https://github.com/ipikuka/rehype-code-meta

[badge-license]: https://img.shields.io/github/license/ipikuka/rehype-code-meta
[url-license]: https://github.com/ipikuka/rehype-code-meta/blob/main/LICENSE

[badge-publish-to-npm]: https://github.com/ipikuka/rehype-code-meta/actions/workflows/publish.yml/badge.svg
[url-publish-github-actions]: https://github.com/ipikuka/rehype-code-meta/actions/workflows/publish.yml

[badge-typescript]: https://img.shields.io/npm/types/rehype-code-meta
[url-typescript]: https://www.typescriptlang.org/

[badge-codecov]: https://codecov.io/gh/ipikuka/rehype-code-meta/graph/badge.svg?token=tu0zMSRdrR
[url-codecov]: https://codecov.io/gh/ipikuka/rehype-code-meta

[badge-type-coverage]: https://img.shields.io/badge/dynamic/json.svg?label=type-coverage&prefix=%E2%89%A5&suffix=%&query=$.typeCoverage.atLeast&uri=https%3A%2F%2Fraw.githubusercontent.com%2Fipikuka%2Frehype-code-meta%2Fmaster%2Fpackage.json