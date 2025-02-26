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

// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { RVCodecWrapper } from "./rvcodec-wrapper";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "rvcodec-js" is now active!');

  // Register encode command
  const encodeCommand = vscode.commands.registerCommand(
    "rvcodec-js.encode",
    async () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        return;
      }

      const selection = editor.selection;
      const text = editor.document.getText(selection);

      if (!text) {
        vscode.window.showInformationMessage(
          "Please select a RISC-V assembly instruction to encode",
        );
        return;
      }

      try {
        const encoded = await RVCodecWrapper.encode(text.trim());

        // Create output channel if it doesn't exist
        const outputChannel =
          vscode.window.createOutputChannel("RISC-V Encoder");

        // Show the results
        outputChannel.clear();
        outputChannel.appendLine("RISC-V Instruction Encoding Results:");
        outputChannel.appendLine("─".repeat(40));
        outputChannel.appendLine(`Assembly: ${encoded.assembly}`);
        if (encoded.details.binary) {
          outputChannel.appendLine(`Binary:   ${encoded.details.binary}`);
        }
        outputChannel.appendLine(`Hex:      ${encoded.details.hex}`);
        if (encoded.details.format) {
          outputChannel.appendLine(`Format:   ${encoded.details.format}`);
        }
        if (encoded.details.isa) {
          outputChannel.appendLine(`ISA:      ${encoded.details.isa}`);
        }
        outputChannel.appendLine("─".repeat(40));

        // Show the output channel
        outputChannel.show(true);
      } catch (error) {
        if (error instanceof Error) {
          vscode.window.showErrorMessage(
            `Failed to encode instruction: ${error.message}`,
          );
        }
      }
    },
  );

  // Regex patterns for different hex formats
  const HEX_PATTERNS = [
    /\b0x([0-9A-Fa-f]{8})\b/, // Standard hex (0x...)
    /32'h([0-9A-Fa-f]{8})\b/, // Verilog format
    /'h([0-9A-Fa-f]{8})\b/, // SystemVerilog format
  ];

  const hoverProvider = vscode.languages.registerHoverProvider(
    ["systemverilog", "verilog", "c", "cpp"],
    {
      async provideHover(
        document: vscode.TextDocument,
        position: vscode.Position,
      ) {
        const line = document.lineAt(position).text;
        const wordRange = document.getWordRangeAtPosition(position);
        if (!wordRange) {
          return;
        }

        // Try each hex pattern
        for (const pattern of HEX_PATTERNS) {
          const match = line.match(pattern);
          if (
            match &&
            line
              .slice(wordRange.start.character, wordRange.end.character)
              .includes(match[1])
          ) {
            try {
              const decoded = await RVCodecWrapper.decode(match[1]);

              // Part 1: Assembly with syntax highlighting
              const codeContent = new vscode.MarkdownString();
              codeContent.appendCodeblock(decoded.assembly, "riscv");

              // Part 2: All other details
              const descContent = new vscode.MarkdownString();
              if (decoded.details.binary) {
                descContent.appendMarkdown(
                  `**💾 Binary:** ${decoded.details.binary}  \n\n`,
                );
              }
              descContent.appendMarkdown(
                `**🔢 Hexadecimal:** ${decoded.details.hex}  \n\n`,
              );
              if (decoded.details.format) {
                descContent.appendMarkdown(
                  `**🧩 Format:** ${decoded.details.format}  \n\n`,
                );
              }
              if (decoded.details.isa) {
                descContent.appendMarkdown(
                  `**⚡ Instruction Set:** ${decoded.details.isa}`,
                );
              }

              return new vscode.Hover([codeContent, descContent]);
            } catch (error) {
              // Invalid instruction - no hover
              return;
            }
          }
        }
      },
    },
  );

  context.subscriptions.push(encodeCommand);
  context.subscriptions.push(hoverProvider);
}

// This method is called when your extension is deactivated
export function deactivate() {}
