import { SimpleRegexParser } from "./SimpleRegexParser";

// Based on https://github.com/steven-kraft/obsidian-markdown-furigana
export class ObsidianFuriganaParser extends SimpleRegexParser {
    get configKey() : string {
        return "obsidian"
    }

    get description() : string {
        return "Uses a syntax like [Obsidian's furigana](https://github.com/steven-kraft/obsidian-markdown-furigana) plugin: `{漢字|かんじ}` or `{漢字|かん|じ}`"
    }

    get regex() : RegExp {
        // Based on https://github.com/steven-kraft/obsidian-markdown-furigana/blob/4c274274ea33feb826631a7d7b5c4bac28742346/main.ts#L4
        // Modified to not include | on the second matching group
        return /\{(\p{Script_Extensions=Han}+)\|([^-\/{-~:-@\[-`]*(?:\|[^-\/{-~:-@\[-`]*)*)\}/gmu
    }

    get slashCommandTitle(): string {
        return 'Obsidian furigana';
    }
}