// The idea is to make a function/class that turns every
// {kanjis}[{furigana}] instance into <ruby>{kanjis}<rt>{furigana}</ruby>
// Idea: regex -> /\s?(\w+)\[(\w+)\]

const ankiFuriganaRegex = /(\S+)\[(\S+)\]/g;
const ankiFuriganaTemplate = "<ruby>$1<rt>$2</ruby>"

// TODO: use something "more powerful" than regex
export function ankiFuriganaProcess(content: string): string | null {
    if (ankiFuriganaRegex.test(content)) {
        return content.replace(ankiFuriganaRegex, ankiFuriganaTemplate);
    }

    return null;
}
