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
import { HEX_PATTERN } from "../constants";
import { formatPlainText } from "../utils";
import { ErrorService } from "../services/error";
import { extractHexValue } from "../utils";

export async function showDetailsCommand() {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    return;
  }

  const selection = editor.selection;
  const text = editor.document.getText(selection);

  if (!text) {
    ErrorService.showInfo("Please select a RISC-V instruction or hex value");
    return;
  }

  // First try to decode if it's a hex value
  const match = text.trim().match(HEX_PATTERN);
  if (match) {
    const hexValue = extractHexValue(match);
    if (hexValue) {
      try {
        const decoded = await RVCodecWrapper.decode(hexValue);
        const outputChannel =
          vscode.window.createOutputChannel("RISC-V Details");
        outputChannel.clear();
        outputChannel.appendLine(formatPlainText(decoded, "Decoding"));
        outputChannel.show(true);
        return;
      } catch (error) {
        // If decoding fails, try encoding instead
      }
    }
  }

  // If not a hex value or decoding failed, try encoding
  try {
    const encoded = await RVCodecWrapper.encode(text.trim());
    const outputChannel = vscode.window.createOutputChannel("RISC-V Details");
    outputChannel.clear();
    outputChannel.appendLine(formatPlainText(encoded, "Encoding"));
    outputChannel.show(true);
  } catch (error) {
    ErrorService.handleError(error, "Failed to process instruction");
  }
}
