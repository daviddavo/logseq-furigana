# <img src="./logo.svg" style="height: .9em"> Logseq Furigana

![demo video](./demo.gif)

## Features

- **Slash command** to transcribe from Markdown Furigana to HTML Ruby tags
  - _/Anki Furigana to Ruby_: Parses furigana in Anki syntax `漢字[かんじ]`
  - _/Obsidian Furigana to Ruby_: Parses furigana in Obsidian Markdown syntax `{漢字|かん|じ}`
- (Upcomming): Render the markdown tags without editing your notes. Please make it possible by voting the relevant [Plugin API Feature Request](https://discuss.logseq.com/t/markdown-postprocessor-plugins-api/17334)

## How to develop
1. Clone the repository
2. Make sure you have pnpm installed, [install](https://pnpm.io/installation) if necessary 🛠
3. Execute `pnpm install` 📦
4. Execute `pnpm build` to build the plugin 🚧
5. Enable developer-mode in Logseq, go to plugins, select "Load unpacked plugin" 🔌
6. Select the directory of your plugin (not the `/dist`-directory, but the directory which includes your package.json) 📂
7. Enjoy! 🎉

## Acknowledgments
- Obsidian Furigana Parser based on the [obsidian-markdown-furigana](https://github.com/steven-kraft/obsidian-markdown-furigana) plugin
