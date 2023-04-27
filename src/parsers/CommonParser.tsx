export abstract class CommonParser {
    readonly furiganaHTMLTemplateSimple : string = "<ruby>$1<rt>$2</ruby>";

    abstract get slashCommandTitle() : string;
    abstract toHtml(content: string) : string | null;

    fromHtml(content: string) : string | null {
        throw new Error('Not Implemented');
    }
}