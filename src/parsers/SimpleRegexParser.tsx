import { CommonParser } from "./CommonParser";

export abstract class SimpleRegexParser extends CommonParser {
    // The first group would be the kanji, and the second group the furigana
    abstract get regex() : RegExp;

    hasFurigana(content: string): boolean {
        return this.regex.test(content);
    }

    toNode(text: Text) : Node {
        let last = text
        console.log("Inside toNode" + text.textContent!)
        console.log(text.textContent!.match(this.regex))

        for (const match of text.textContent!.matchAll(this.regex)) {
            const furi = match[2].includes('|') ? match[2].split('|').slice(1) : [ match[2] ]
            const kanji = furi.length === 1 ? [match[1]] : match[1].split('')
            
            const ruby = document.createElement('ruby')
            kanji.forEach((k,i) => {
                ruby.appendChild(document.createTextNode(k));
                const rt = document.createElement('rt')
                rt.appendChild(document.createTextNode(furi[i]))
                ruby.appendChild(rt)
            })

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
