import { SimpleRegexParser } from "./SimpleRegexParser";

export class MarukakkoFuriganaParser extends SimpleRegexParser {
    get slashCommandTitle() : string {
        return "Marukakko Furigana (Japanese round parenthesis)"
    }

    get regex() : RegExp {
        return /(\S+)\u{ff08}(\S+)\u{ff09}/gmu
    }
}