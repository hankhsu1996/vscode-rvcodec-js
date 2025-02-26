/**
 * RISC-V instruction encoder/decoder VSCode extension
 * Copyright (C) 2025 Shou-Li Hsu
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <https://www.gnu.org/licenses/>.
 *
 * The source code is available at: https://github.com/hankhsu1996/vscode-rvcodec-js
 */

import * as vscode from "vscode";
import { RVCodecWrapper } from "./rvcodec-wrapper";
import { HEX_PATTERN } from "./constants";
import { ConfigurationService } from "./services/configuration";
import { ErrorService } from "./services/error";
import { extractHexValue } from "./utils";

const inlineDecorationType = vscode.window.createTextEditorDecorationType({
  after: {
    margin: "0 0 0 1em",
    color: new vscode.ThemeColor("editorLineNumber.foreground"),
    fontStyle: "italic",
  },
});

export function registerInlineDecoder() {
  // Update decorations when the active editor changes
  vscode.window.onDidChangeActiveTextEditor((editor) => {
    if (editor) {
      updateDecorations(editor);
    }
  });

  // Update decorations when the document changes
  vscode.workspace.onDidChangeTextDocument((event) => {
    const editor = vscode.window.activeTextEditor;
    if (editor && event.document === editor.document) {
      updateDecorations(editor);
    }
  });

  // Initial update for the active editor
  if (vscode.window.activeTextEditor) {
    updateDecorations(vscode.window.activeTextEditor);
  }
}

async function updateDecorations(editor: vscode.TextEditor) {
  // Check if inline decoding is enabled in settings
  if (!ConfigurationService.isInlineDecodingEnabled) {
    return;
  }

  const decorations: vscode.DecorationOptions[] = [];
  const document = editor.document;

  for (let lineNum = 0; lineNum < document.lineCount; lineNum++) {
    const line = document.lineAt(lineNum);
    const text = line.text;

    // Skip if line already has a comment (C-style or assembly-style)
    if (text.match(/\/\/|#/)) {
      continue;
    }

    const matches = text.matchAll(new RegExp(HEX_PATTERN, "g"));
    for (const match of matches) {
      if (!match.index) continue;
      const hexValue = extractHexValue(match);
      if (!hexValue) continue;

      try {
        const decoded = await RVCodecWrapper.decode(hexValue);
        const range = new vscode.Range(
          lineNum,
          match.index,
          lineNum,
          match.index + match[0].length,
        );
        decorations.push({
          range,
          renderOptions: {
            after: {
              contentText: `${decoded.assembly}`,
            },
          },
        });
      } catch (error) {
        // Skip invalid instructions silently
        continue;
      }
    }
  }

  editor.setDecorations(inlineDecorationType, decorations);
}
