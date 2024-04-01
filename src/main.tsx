import "@logseq/libs";

import React from "react";
import * as ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { AnkiFuriganaParser } from "./parsers/AnkiFuriganaParser";
import { ObsidianFuriganaParser } from "./parsers/ObsidianFuriganaParser";
import { MarukakkoFuriganaParser } from "./parsers/MarukakkoFuriganaParser";
import { CommonParser } from "./parsers/CommonParser";
import { SumitsukikakkoFuriganaParser } from "./parsers/SumitsukikakkoFuriganaParser";
import { SettingSchemaDesc } from "@logseq/libs/dist/LSPlugin";

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

        if (fp.hasFurigana(content)) {
          const aux = document.createElement('span')
          aux.innerHTML = content;
          fp.replaceHtml(aux);

          logseq.Editor.updateBlock(uuid, aux.innerHTML);
        } else {
          logseq.UI.showMsg('No furigana detected', 'warning');
        }
      }
    )
  }

  const parsers = [ 
    new AnkiFuriganaParser(),
    new ObsidianFuriganaParser(),
    new MarukakkoFuriganaParser(),
    new SumitsukikakkoFuriganaParser(),
  ]

  // https://logseq.github.io/plugins/types/SettingSchemaDesc.html
  const settings : SettingSchemaDesc [] = [{
    key: `notice`,
    type: 'heading',
    title: 'Notice!',
    description: `You might need to reload the page (click on another page 
      and then back) so the config takes effect`,
    default: true,
  }]

  for (const fp of parsers) {
    settings.push({
      key: `parser-${fp.configKey}-header`,
      type: 'heading',
      title: `${fp.slashCommandTitle} configuration`,
      description: fp.description,
      default: null,
    })
    settings.push({
      key: `parser-${fp.configKey}-enabled`,
      type: "boolean",
      title: '',
      description: `Check every block for furigana with this parser and display
        it, without changing your notes`,
      default: true,
    })
  }

  logseq.useSettingsSchema(settings)

  parsers.map(createRubySlashCommand)

  const observer = new MutationObserver((mutationList, observer) => {
    const enabledParsers = parsers.filter((p) => logseq.settings![`parser-${p.configKey}-enabled`] )

    for (const m of mutationList) {
      for (const node of m.addedNodes) {
        if (node.nodeType === Node.ELEMENT_NODE) {
          const element = node as HTMLElement 

          for (const content of element.querySelectorAll('div.block-content') as NodeListOf<HTMLElement>) {
            // content.style.border = '1px solid red'
            for (const fp of enabledParsers) {
              if (fp.hasFurigana(content.innerHTML)) {
                fp.replaceHtml(content)
                // content.style.border = '1px solid green'
              }
            }
          }
        }
      }
    }
  })

  observer.observe(top!.document.body, {childList: true, subtree: true, })

  console.info('logseq-furigana loaded');
}

logseq.ready(main).catch(console.error);
