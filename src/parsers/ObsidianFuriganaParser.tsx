import { SimpleRegexParser } from "./SimpleRegexParser";

// Based on https://github.com/steven-kraft/obsidian-markdown-furigana
export class ObsidianFuriganaParser extends SimpleRegexParser {

    get regex() : RegExp {
        // From https://github.com/steven-kraft/obsidian-markdown-furigana/blob/4c274274ea33feb826631a7d7b5c4bac28742346/main.ts#L4
        return /{((?:[\u2E80-\uA4CF\uFF00-\uFFEF])+)((?:\|[^ -\/{-~:-@\[-`]*)+)}/gm;
    }

    get slashCommandTitle(): string {
        return 'Obsidian furigana';
    }

    toHtml(content: string): string {
        let m = this.regex.exec(content);
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

                const start = this.regex.lastIndex - m[0].length;
                const end = this.regex.lastIndex;
                content = content.substring(0, start) + ruby.outerHTML + content.substring(end);
                this.regex.lastIndex = start + ruby.outerHTML.length;
            }

            m = this.regex.exec(content);
        }

        return content;
    }
}