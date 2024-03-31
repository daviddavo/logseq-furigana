import { SimpleRegexParser } from "./SimpleRegexParser";

export class AnkiFuriganaParser extends SimpleRegexParser {
    get slashCommandTitle() : string {
        return "Anki furigana"
    }

    get regex() : RegExp {
        return /(\S+)\[(\S+)\]/gm
    }
}