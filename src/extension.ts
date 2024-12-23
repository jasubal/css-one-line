import * as vscode from 'vscode';

function formatCss(text: string): string {
    try {
        // Remove comments
        let cleanedText = text.replace(/\/\*[\s\S]*?\*\//g, '');
        cleanedText = cleanedText.replace(/\/\/.*$/gm, '');

        // Convert multiple spaces and newlines to single spaces
        cleanedText = cleanedText.replace(/\s+/g, ' ');

        // Procesar media queries
        const mediaQueryRegex = /@media[^{]+{([^{}]|{[^{}]*})*}/g;
        const mediaQueries = cleanedText.match(mediaQueryRegex) || [];

        // Formatear media queries
        const formattedMediaQueries = mediaQueries.map(query => {
            // Obtener la declaración @media
            const mediaMatch = query.match(/@media[^{]+/);
            const mediaDeclaration = mediaMatch ? mediaMatch[0].trim() : '';

            // Obtener las reglas dentro del @media
            const rules = query.match(/[^{}]+{[^{}]+}/g) || [];
            const formattedRules = rules.map(rule =>
                rule.replace(/\s+/g, ' ')
                    .replace(/:\s+/g, ': ')
                    .replace(/,\s+/g, ', ')
                    .trim()
            );

            // Generar salida con cada regla en una línea
            return `${mediaDeclaration} {\n${formattedRules.join('\n')}\n}`;
        });

        // Procesar reglas normales
        let remainingText = cleanedText;
        mediaQueries.forEach(query => {
            remainingText = remainingText.replace(query, '');
        });

        const normalRules = remainingText
            .split('}')
            .map(rule => rule.trim())
            .filter(rule => rule)
            .map(rule => {
                if (!rule.includes('{')) return '';
                return `${rule.replace(/\s+/g, ' ')} }`;
            })
            .filter(rule => rule);

        return [...formattedMediaQueries, ...normalRules].join('\n');
    } catch (error) {
        console.error('Error formatting CSS:', error);
        return text;
    }
}

function formatDocument(editor: vscode.TextEditor) {
    const document = editor.document;
    const fullText = document.getText();
    const formattedText = formatCss(fullText);

    editor.edit(editBuilder => {
        const range = new vscode.Range(
            document.positionAt(0),
            document.positionAt(fullText.length)
        );
        editBuilder.replace(range, formattedText);
    });
}

function formatSelection(editor: vscode.TextEditor) {
     const selection = editor.selection;
     if (!selection.isEmpty) {
        const selectedText = editor.document.getText(selection);
         const formattedText = formatCss(selectedText);

         editor.edit(editBuilder => {
             editBuilder.replace(selection, formattedText);
         });
     }
}


export function activate(context: vscode.ExtensionContext) {

    let formatDocumentCommand = vscode.commands.registerTextEditorCommand('css-on-line.formatDocument', (editor) => {
        formatDocument(editor);
    });

     let formatSelectionCommand = vscode.commands.registerTextEditorCommand('css-on-line.formatSelection', (editor) => {
        formatSelection(editor);
    });


    context.subscriptions.push(formatDocumentCommand,formatSelectionCommand);

	console.log('Congratulations, your extension "css-one-line" is now active!');
}

export function deactivate() {}
