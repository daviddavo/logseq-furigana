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
        // From https://github.com/steven-kraft/obsidian-markdown-furigana/blob/4c274274ea33feb826631a7d7b5c4bac28742346/main.ts#L4
        return /{((?:[\u2E80-\uA4CF\uFF00-\uFFEF])+)((?:\|[^ -\/{-~:-@\[-`]*)+)}/gm;
    }

    get slashCommandTitle(): string {
        return 'Obsidian furigana';
    }
}