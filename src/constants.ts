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

// Single regex pattern for all hex formats using alternation
export const HEX_PATTERN =
  /(?:\b0x([0-9A-Fa-f]{8})|(?:\b32'h)([0-9A-Fa-f]{8})|(?<![0-9])'h([0-9A-Fa-f]{8})|\b([0-9A-Fa-f]{8}))\b(?<!'h)/;
