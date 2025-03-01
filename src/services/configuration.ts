/**
 * RISC-V instruction encoder/decoder VSCode extension
 * Copyright (C) 2024 Shou-Li Hsu
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

export class ConfigurationService {
  private static readonly SECTION = "rvcodec-js";

  private static getConfiguration() {
    return vscode.workspace.getConfiguration(this.SECTION);
  }

  static get isHoverEnabled(): boolean {
    return this.getConfiguration().get<boolean>("enableHover") ?? false;
  }

  static get isInlineDecodingEnabled(): boolean {
    return (
      this.getConfiguration().get<boolean>("enableInlineDecoding") ?? false
    );
  }

  static get useAbiNames(): boolean {
    return this.getConfiguration().get<boolean>("useAbiNames") ?? false;
  }
}
