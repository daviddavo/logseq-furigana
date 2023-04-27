import { CommonParser } from "./CommonParser";

export class AnkiFuriganaParser extends CommonParser {
    readonly ankiFuriganaRegex : RegExp = /(\S+)\[(\S+)\]/gm;

    get slashCommandTitle () {
        return 'Anki furigana';
    }

    toHtml(content: string) : string | null {
        if (this.ankiFuriganaRegex.test(content)) {
            return content.replace(this.ankiFuriganaRegex, this.furiganaHTMLTemplateSimple);
        }

        return null;
    }
}
