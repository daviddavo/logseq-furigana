export abstract class CommonParser {
    readonly furiganaHTMLTemplateSimple : string = "<ruby>$1<rt>$2</ruby>";
    readonly codeRegex : RegExp = /`.*?`/gm

    abstract get slashCommandTitle() : string;
    abstract toNode(text: Text) : Node

    // Both these commands should work both with Markdown and with HTML
    abstract toHtml(content: string) : string
    abstract hasFurigana(content: string) : boolean

    replaceHtml(node: ChildNode) {
        // Based on https://github.com/steven-kraft/obsidian-markdown-furigana/blob/f3a0bbbf6c28e9a3d0c18994a1f6c89365171ed2/main.ts#L39-L58
        if (['CODE', 'RUBY', 'A'].includes(node.nodeName)) {
            return
        }

        if (node.hasChildNodes()) {
            for (const child of node.childNodes) {
                this.replaceHtml(child)
            }
        } else {
            node.replaceWith(this.toNode(node as Text))
        }
    }

    fromHtml(content: string) : string | null {
        throw new Error('Not Implemented');
    }
}