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
        // Split by closing curly brace and trim each part
        let rules = cleanedText.split('}').map(part => part.trim());
        // Filter out empty rules
        rules = rules.filter(rule => rule);
        let formattedRules = rules.map(rule => {
            // If the rule starts with @media, keep it on the same line
            if (rule.startsWith('@media')) {
                const mediaContent = rule.split('{').map(part => part.trim()).join('{ ');
                return `${mediaContent} }`;
            }
            else if (rule.includes('{')) {
                return rule.trim().split('{').map(part => part.trim()).join('{ ').concat(' }');
            }
            else {
                return rule;
            }
        });
        return formattedRules.join('\n');
    }
    catch (error) {
        vscode.window.showErrorMessage('Error formatting CSS: ' + error);
        return text; // Return original text in case of error
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