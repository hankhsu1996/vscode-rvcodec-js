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
import { InstructionDetails } from "./rvcodec-wrapper";

/**
 * Extract hex value from regex match, handling capture groups and underscores
 */
export function extractHexValue(match: RegExpMatchArray): string | undefined {
  return match
    .slice(1)
    .find((group) => group !== undefined)
    ?.replace(/_/g, "");
}

/**
 * Format instruction details as plain text for output channel
 */
export function formatPlainText(
  result: InstructionDetails,
  type: "Encoding" | "Decoding",
): string {
  const lines: string[] = [];
  const separator = "─".repeat(42);

  // Calculate the maximum label width for alignment
  const labels = ["Assembly", "Binary", "Hex", "Format", "ISA"];
  const maxLabelWidth = Math.max(...labels.map((l) => l.length));
  const labelPadding = maxLabelWidth + 2; // Add 2 spaces after label

  lines.push(`RISC-V Instruction ${type} Results`);
  lines.push(separator);
  lines.push(`${padLabel("Assembly", labelPadding)}${result.assembly}`);
  if (result.details.binary) {
    lines.push(`${padLabel("Binary", labelPadding)}${result.details.binary}`);
  }
  lines.push(`${padLabel("Hex", labelPadding)}${result.details.hex}`);
  if (result.details.format) {
    lines.push(`${padLabel("Format", labelPadding)}${result.details.format}`);
  }
  if (result.details.isa) {
    lines.push(`${padLabel("ISA", labelPadding)}${result.details.isa}`);
  }
  lines.push(separator);
  return lines.join("\n");
}

/**
 * Helper function to pad labels for alignment
 */
function padLabel(label: string, width: number): string {
  return label.padEnd(width, " ");
}

/**
 * Format instruction details as markdown for hover display
 */
export function formatMarkdown(
  result: InstructionDetails,
): vscode.MarkdownString[] {
  const codeContent = new vscode.MarkdownString();
  codeContent.appendCodeblock(result.assembly, "riscv");

  const descContent = new vscode.MarkdownString();

  // Build table rows
  const rows: string[] = [];
  rows.push("| | |"); // Empty header row required for table formatting
  rows.push("|:--|:--|"); // Left align columns
  if (result.details.binary) {
    rows.push(`| Binary | \`${result.details.binary}\` |`);
  }
  rows.push(`| Hex | \`${result.details.hex}\` |`);
  if (result.details.format) {
    rows.push(`| Format | ${result.details.format} |`);
  }
  if (result.details.isa) {
    rows.push(`| ISA | ${result.details.isa} |`);
  }

  descContent.appendMarkdown(rows.join("\n"));

  return [codeContent, descContent];
}
