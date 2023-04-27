import "@logseq/libs";

import React from "react";
import * as ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { ankiFuriganaProcess } from "./AnkiFuriganaParser";
import { logseq as PL } from "../package.json";

// @ts-expect-error
const css = (t, ...args) => String.raw(t, ...args);

const pluginId = PL.id;

function main() {
  console.info(`#${pluginId}: MAIN`);
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

  logseq.App.registerUIItem("toolbar", {
    key: openIconName,
    template: `
      <div data-on-click="show" class="${openIconName}">⚙️</div>
    `,
  });

  logseq.Editor.registerSlashCommand(
    'Anki Furigana to ruby',
    async ({pid, format, uuid}) => {
      const content = await logseq.Editor.getEditingBlockContent();
      const withFurigana = ankiFuriganaProcess(content);

      if (withFurigana) {
        const newContent = `<span>${withFurigana}</span>`
        // logseq.Editor.insertBlock(uuid, newContent);
        logseq.Editor.updateBlock(uuid, newContent);
      } else {
        logseq.UI.showMsg('No furigana detected', 'warning');
      }
    })

  console.info('logseq-furigana loaded');
}

logseq.ready(main).catch(console.error);
