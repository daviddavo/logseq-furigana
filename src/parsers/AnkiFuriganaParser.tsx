import { SimpleRegexParser } from "./SimpleRegexParser";

export class AnkiFuriganaParser extends SimpleRegexParser {
    get regex() : RegExp {
        return /(\S+)\[(\S+)\]/gm
    }
}