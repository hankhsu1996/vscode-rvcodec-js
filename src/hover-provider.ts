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
import { formatMarkdown } from "./utils";
import { ConfigurationService } from "./services/configuration";

export function registerHoverProvider() {
  return vscode.languages.registerHoverProvider("*", {
    async provideHover(
      document: vscode.TextDocument,
      position: vscode.Position,
    ) {
      // Check if hover is enabled in settings
      if (!ConfigurationService.isHoverEnabled) {
        return;
      }

      const line = document.lineAt(position).text;
      const wordRange = document.getWordRangeAtPosition(position);
      if (!wordRange) {
        return;
      }

      const match = line.match(HEX_PATTERN);
      if (match) {
        const word = line.slice(
          wordRange.start.character,
          wordRange.end.character,
        );
        // Check if the word at cursor is part of the matched hex pattern
        if (match[0].includes(word)) {
          // Find the first non-undefined capture group (the hex value)
          const hexValue = match
            .slice(1)
            .find((group) => group !== undefined)
            ?.replace(/_/g, "");
          if (!hexValue) return;

          try {
            const decoded = await RVCodecWrapper.decode(hexValue);
            return new vscode.Hover(formatMarkdown(decoded));
          } catch (error) {
            // Invalid instruction - no hover
            return;
          }
        }
      }
    },
  });
}
