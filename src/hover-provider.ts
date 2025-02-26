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
import { HEX_PATTERNS } from "./constants";
import { formatMarkdown } from "./utils";

export function registerHoverProvider() {
  return vscode.languages.registerHoverProvider(
    ["systemverilog", "verilog", "c", "cpp"],
    {
      async provideHover(
        document: vscode.TextDocument,
        position: vscode.Position,
      ) {
        // Check if hover is enabled in settings
        const config = vscode.workspace.getConfiguration("rvcodec-js");
        if (!config.get("enableHover")) {
          return;
        }

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
              return new vscode.Hover(formatMarkdown(decoded));
            } catch (error) {
              // Invalid instruction - no hover
              return;
            }
          }
        }
      },
    },
  );
}
