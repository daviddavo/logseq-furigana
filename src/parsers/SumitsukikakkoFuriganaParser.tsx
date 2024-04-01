import { SimpleRegexParser } from "./SimpleRegexParser";

export class SumitsukikakkoFuriganaParser extends SimpleRegexParser {
    get configKey() : string {
        return "sumitsukikakko"
    }

    get description() : string {
        return "Uses Japanese filled brackets `漢字【かんじ】`"
    }

    get slashCommandTitle() : string {
        return "Sumitsukikakko furigana"
    }

    get regex() : RegExp {
        return /(\p{Script_Extensions=Han}+)\u{3010}(\S+)\u{3011}/gmu
    }
}
