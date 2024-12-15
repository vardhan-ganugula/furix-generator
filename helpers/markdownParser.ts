import { marked } from 'marked';

export default function markdownParser(markdown: string) {
        return marked(markdown);

}