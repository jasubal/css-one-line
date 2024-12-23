"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = __importStar(require("vscode"));
function formatCss(text) {
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
            const formattedRules = rules.map(rule => rule.replace(/\s+/g, ' ')
                .replace(/:\s+/g, ': ')
                .replace(/,\s+/g, ', ')
                .trim());
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
            if (!rule.includes('{'))
                return '';
            return `${rule.replace(/\s+/g, ' ')} }`;
        })
            .filter(rule => rule);
        return [...formattedMediaQueries, ...normalRules].join('\n');
    }
    catch (error) {
        console.error('Error formatting CSS:', error);
        return text;
    }
}
function formatDocument(editor) {
    const document = editor.document;
    const fullText = document.getText();
    const formattedText = formatCss(fullText);
    editor.edit(editBuilder => {
        const range = new vscode.Range(document.positionAt(0), document.positionAt(fullText.length));
        editBuilder.replace(range, formattedText);
    });
}
function formatSelection(editor) {
    const selection = editor.selection;
    if (!selection.isEmpty) {
        const selectedText = editor.document.getText(selection);
        const formattedText = formatCss(selectedText);
        editor.edit(editBuilder => {
            editBuilder.replace(selection, formattedText);
        });
    }
}
function activate(context) {
    let formatDocumentCommand = vscode.commands.registerTextEditorCommand('css-on-line.formatDocument', (editor) => {
        formatDocument(editor);
    });
    let formatSelectionCommand = vscode.commands.registerTextEditorCommand('css-on-line.formatSelection', (editor) => {
        formatSelection(editor);
    });
    context.subscriptions.push(formatDocumentCommand, formatSelectionCommand);
    console.log('Congratulations, your extension "css-one-line" is now active!');
}
function deactivate() { }
//# sourceMappingURL=extension.js.map