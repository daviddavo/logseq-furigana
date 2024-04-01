export abstract class CommonParser {
    public abstract get configKey() : string
    public abstract get description() : string
    public abstract get slashCommandTitle() : string
    protected abstract toNode(text: Text) : Node

    // This commands should work both with Markdown and with HTML
    public abstract hasFurigana(content: string) : boolean

    public replaceHtml(node: ChildNode) {
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
}