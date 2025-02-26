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
import { RVCodecWrapper } from "../rvcodec-wrapper";
import { HEX_PATTERNS } from "../constants";
import { formatPlainText } from "../utils";

export async function decodeCommand() {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    return;
  }

  const selection = editor.selection;
  const text = editor.document.getText(selection);

  if (!text) {
    vscode.window.showInformationMessage(
      "Please select a hexadecimal instruction to decode",
    );
    return;
  }

  // Extract hex value from various formats
  let hexValue = text.trim();
  for (const pattern of HEX_PATTERNS) {
    const match = hexValue.match(pattern);
    if (match) {
      hexValue = match[1];
      break;
    }
  }

  try {
    const decoded = await RVCodecWrapper.decode(hexValue);
    const outputChannel = vscode.window.createOutputChannel("RISC-V Decoder");
    outputChannel.clear();
    outputChannel.appendLine(formatPlainText(decoded, "Decoding"));
    outputChannel.show(true);
  } catch (error) {
    if (error instanceof Error) {
      vscode.window.showErrorMessage(
        `Failed to decode instruction: ${error.message}`,
      );
    }
  }
}
