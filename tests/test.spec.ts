import { describe, it, expect } from "vitest";
import dedent from "dedent";
import * as prettier from "prettier";

import { processFromMarkdown, processFromHtml, processWithoutPlugin } from "./util/index";

describe("reyhpe-pre-language", () => {
  // ******************************************
  it("effectless for inline codes", async () => {
    const html = String(await processFromMarkdown("`Hi`"));

    expect(await prettier.format(html, { parser: "mdx" })).toMatchInlineSnapshot(`
      "<p>
        <code>Hi</code>
      </p>
      "
    `);
  });

  // ******************************************
  it("with language and without code.data.meta", async () => {
    const input = dedent`
      \`\`\`javascript
      console.log("ipikuka");
      \`\`\`
    `;

    const html = String(await processFromMarkdown(input));

    expect(await prettier.format(html, { parser: "mdx" })).toMatchInlineSnapshot(`
      "<pre>
        <code class="language-javascript">console.log("ipikuka");</code>
      </pre>
      "
    `);
  });

  // ******************************************
  it("with language and with code.data.meta", async () => {
    const input = dedent`
      \`\`\`javascript showLineNumbers
      console.log("ipikuka");
      \`\`\`
    `;

    const html1 = String(await processWithoutPlugin(input));

    expect(await prettier.format(html1, { parser: "mdx" })).toMatchInlineSnapshot(`
      "<pre>
        <code class="language-javascript">console.log("ipikuka");</code>
      </pre>
      "
    `);

    const html2 = String(await processFromMarkdown(input));

    expect(await prettier.format(html2, { parser: "mdx" })).toMatchInlineSnapshot(`
      "<pre>
        <code class="language-javascript">
          <span class="code-line numbered-code-line" data-line-number="1">
            console.log("ipikuka");
          </span>
        </code>
      </pre>
      "
    `);
  });

  it("work with html source, should affectless", async () => {
    const input = dedent`
      <pre><code class="language-js">console.log("ipikuka");</code></pre>
    `;

    const html = String(await processFromHtml(input));

    expect(await prettier.format(html, { parser: "mdx" })).toMatchInlineSnapshot(`
      "<pre>
        <code class="language-js">console.log("ipikuka");</code>
      </pre>
      "
    `);
  });
});
