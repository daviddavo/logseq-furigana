import { SimpleRegexParser } from "./SimpleRegexParser";

export class SumitsukikakkoFuriganaParser extends SimpleRegexParser {
    get slashCommandTitle() : string {
        return "Sumitsukikakko furigana"
    }

    get regex() : RegExp {
        return /(\S+)\u{3010}(\S+)\u{3011}/gmu
    }
}
