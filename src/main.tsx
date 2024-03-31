import "@logseq/libs";

import React from "react";
import * as ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { AnkiFuriganaParser } from "./parsers/AnkiFuriganaParser";
import { ObsidianFuriganaParser } from "./parsers/ObsidianFuriganaParser";
import { logseq as PL } from "../package.json";
import { CommonParser } from "./parsers/CommonParser";

// @ts-expect-error
const css = (t, ...args) => String.raw(t, ...args);

async function main() {
  const root = ReactDOM.createRoot(document.getElementById("app")!);

  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );

  function createModel() {
    return {
      show() {
        logseq.showMainUI();
      },
    };
  }

  logseq.provideModel(createModel());
  logseq.setMainUIInlineStyle({
    zIndex: 11,
  });

  const openIconName = "template-plugin-open";

  logseq.provideStyle(css`
    .${openIconName} {
      opacity: 0.55;
      font-size: 20px;
      margin-top: 4px;
    }

    .${openIconName}:hover {
      opacity: 0.9;
    }
  `);

  function createRubySlashCommand (fp: CommonParser) {
    return logseq.Editor.registerSlashCommand(
      `${fp.slashCommandTitle} to ruby`,
      async ({pid, format, uuid}) => {
        const content = await logseq.Editor.getEditingBlockContent();
        const withFurigana = fp.toHtml(content);

        if (withFurigana) {
          const newContent = `<span>${withFurigana}</span>`
          // logseq.Editor.insertBlock(uuid, newContent);
          logseq.Editor.updateBlock(uuid, newContent);
        } else {
          logseq.UI.showMsg('No furigana detected', 'warning');
        }
      }
    )
  }

  const parsers = [ 
    new AnkiFuriganaParser(),
    new ObsidianFuriganaParser(),
  ]

  const observer = new MutationObserver((mutationList, observer) => {
    for (const m of mutationList) {
      for (const node of m.addedNodes) {
        if (node.nodeType === Node.ELEMENT_NODE) {
          const element = node as HTMLElement 

          for (const content of element.querySelectorAll('span.inline') as NodeListOf<HTMLElement>) {
            content.style.border = '1px solid red'
            for (const fp of parsers) {
              if (fp.hasFurigana(content.innerHTML)) {
                  fp.replaceHtml(content)
                  content.style.border = '1px solid green'
              }
            }
          }
        }
      }
    }
  })

  observer.observe(top!.document.body, {childList: true, subtree: true, })

  // TODO: Use also on block edited
  // logseq.App.onRouteChanged(async (e) => {
  //   console.log(e)

  //   const inlines = document.querySelectorAll("span.inline")
  //   for (const i of inlines) {
  //     console.log(`Setting up observer for ${i}`)
  //     mo.observe(i, { childList: true, subtree: true, attributes: true, })
  //   }

  //   const blocks = await logseq.Editor.getCurrentPageBlocksTree();
  //   for (const block of blocks) {
  //     if (/\.debug/.test(block.content)) {
  //       logseq.App.onBlockRendererSlotted(
  //         block.uuid,
  //         ({slot, ...rest}) => {
  //           console.log(`Slotted: ${slot} (${rest.content})`)
  //           logseq.provideUI({
  //             slot, 
  //             template: `
  //               <pre style="border: 1px solid red;">${JSON.stringify(block, null, 2)}</pre>
  //             `,
  //             reset: true,
  //           })
  //         }
  //       )
  //     }
  //   }

  //   return () => {
  //     console.log("Off hook")
  //   }
  // })

  console.info('logseq-furigana loaded');
}

logseq.ready(main).catch(console.error);
