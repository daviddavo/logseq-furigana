import { CommonParser } from "./CommonParser";

// Based on https://github.com/steven-kraft/obsidian-markdown-furigana
export class ObsidianFuriganaParser extends CommonParser {
    // From https://github.com/steven-kraft/obsidian-markdown-furigana/blob/4c274274ea33feb826631a7d7b5c4bac28742346/main.ts#L4
    readonly obsidianFuriganaRegex : RegExp = /{((?:[\u2E80-\uA4CF\uFF00-\uFFEF])+)((?:\|[^ -\/{-~:-@\[-`]*)+)}/gm;

    get slashCommandTitle(): string {
        return 'Obsidian furigana';
    }

    hasFurigana(content: string): boolean {
        return this.obsidianFuriganaRegex.test(content);
    }

    toNode(text: Text): Node {
        throw new Error('Not Implemented');
    }

    toHtml(content: string): string {
        let m = this.obsidianFuriganaRegex.exec(content);
        while (m) {
            const furi = m[2].split('|').slice(1); // First element is always empty
            const kanji = furi.length === 1 ? [m[1]] : m[1].split('');

            if (furi.length == kanji.length) {
                const ruby = document.createElement('ruby');

                kanji.forEach((k,i) => {
                    ruby.appendChild(document.createTextNode(k));
                    const rt = document.createElement('rt');
                    rt.appendChild(document.createTextNode(furi[i]));
                    ruby.appendChild(rt);
                })

                const start = this.obsidianFuriganaRegex.lastIndex - m[0].length;
                const end = this.obsidianFuriganaRegex.lastIndex;
                content = content.substring(0, start) + ruby.outerHTML + content.substring(end);
                this.obsidianFuriganaRegex.lastIndex = start + ruby.outerHTML.length;
            }

            m = this.obsidianFuriganaRegex.exec(content);
        }

        return content;
    }
}