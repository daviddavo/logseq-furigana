import { SimpleRegexParser } from "./SimpleRegexParser";

export class AnkiFuriganaParser extends SimpleRegexParser {
    get configKey() : string {
        return "anki"
    }

    get description() : string {
        return "Uses Anki's syntax for furigana: `漢字[かんじ]`"
    }

    get slashCommandTitle() : string {
        return "Anki furigana"
    }

    get regex() : RegExp {
        return /(\p{Script_Extensions=Han}+)\[(\S+)\]/gmu
    }
}