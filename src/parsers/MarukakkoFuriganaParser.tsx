import { SimpleRegexParser } from "./SimpleRegexParser";

export class MarukakkoFuriganaParser extends SimpleRegexParser {
    get configKey() : string {
        return "marukakko"
    }

    get description() : string {
        return "Uses Japanese round parenthesis `漢字（かんじ）`\n\
        Keep in mind that this is not the same as normal ASCII parentheses, you have to set the japanese input method"
    }

    get slashCommandTitle() : string {
        return "Marukakko Furigana (Japanese round parenthesis)"
    }

    get regex() : RegExp {
        return /(\p{Script_Extensions=Han}+)\u{ff08}(\S+)\u{ff09}/gmu
    }
}
