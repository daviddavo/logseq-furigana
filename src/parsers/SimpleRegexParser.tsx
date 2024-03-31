import { CommonParser } from "./CommonParser";

export abstract class SimpleRegexParser extends CommonParser {
    // The first group would be the kanji, and the second group the furigana
    abstract get regex() : RegExp;

    get slashCommandTitle () {
        return 'Anki furigana';
    }

    hasFurigana(content: string): boolean {
        return this.regex.test(content);
    }

    toNode(text: Text) : Node {
        console.log("Inside toNode: " + text.textContent!)
        console.log(text.textContent!.match(this.regex))
        let last = text

        for (const match of text.textContent!.matchAll(this.regex) ) {
            console.log(match)
            const kanji = match[1]
            const furi = match[2]

            // Create the ruby
            const ruby = document.createElement('ruby')
            // ruby.appendChild(document.createTextNode("Holi?"))
            ruby.innerHTML = `${kanji}<rt>${furi}</rt>`

            // Replace it
            const start = last.textContent!.indexOf(match[0])
            const end = match[0].length

            const toReplace = last.splitText(start)

            last = toReplace.splitText(end)
            toReplace.replaceWith(ruby)
            console.log(ruby)
            console.log(start)
            console.log(end)
            console.log(toReplace)
            console.log(last)
            console.log(text)
        }

        return text
    }

    toHtml(content: string) : string {
        return content.replace(this.regex, this.furiganaHTMLTemplateSimple);
    }
}
