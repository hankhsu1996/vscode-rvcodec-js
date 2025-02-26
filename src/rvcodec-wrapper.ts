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
import { Instruction } from "rvcodecjs/core/Instruction.js";
import { ConfigurationService } from "./services/configuration";

export interface InstructionDetails {
  assembly: string;
  details: {
    hex: string;
    opcode: string;
    rd?: string;
    immediate?: string;
    format?: string;
    binary?: string;
    isa?: string;
  };
}

export class RVCodecWrapper {
  static async decode(hexInstruction: string): Promise<InstructionDetails> {
    try {
      const { Instruction } = await import("rvcodecjs/core/Instruction.js");
      const useAbiNames = ConfigurationService.useAbiNames;

      const inst = new Instruction(hexInstruction, { ABI: useAbiNames });

      return {
        assembly: inst.asm,
        details: {
          hex: inst.hex,
          opcode: inst.opcode,
          rd: inst.rd,
          immediate: inst.imm,
          format: inst.fmt,
          binary: inst.bin,
          isa: inst.isa,
        },
      };
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Invalid hexadecimal instruction: ${error.message}`);
      }
      throw new Error("Invalid hexadecimal instruction");
    }
  }

  static async encode(assembly: string): Promise<InstructionDetails> {
    if (!assembly || assembly.trim() === "") {
      throw new Error("Empty assembly instruction");
    }

    try {
      const { Instruction } = await import("rvcodecjs/core/Instruction.js");
      const useAbiNames = ConfigurationService.useAbiNames;

      // Clean up the input string
      const cleanAssembly = assembly.trim().toLowerCase();

      // Create a new instruction
      const inst = new Instruction(cleanAssembly, { ABI: useAbiNames });

      // Validate that we got a valid instruction
      if (!inst.asm || !inst.hex) {
        throw new Error("Invalid instruction format");
      }

      return {
        assembly: inst.asm,
        details: {
          hex: inst.hex,
          opcode: inst.opcode,
          rd: inst.rd,
          immediate: inst.imm,
          format: inst.fmt,
          binary: inst.bin,
          isa: inst.isa,
        },
      };
    } catch (error: unknown) {
      // Handle specific error messages from the encoder
      if (error instanceof Error) {
        const message = error.message;

        // Map common error patterns to user-friendly messages
        if (message.includes("Invalid mnemonic")) {
          throw new Error(`Unknown instruction: ${assembly}`);
        } else if (message.includes("Invalid register")) {
          throw new Error(`Invalid register in: ${assembly}`);
        } else if (message.includes("Register address out of range")) {
          throw new Error(`Register number must be 0-31 in: ${assembly}`);
        } else if (message.includes("Invalid immediate")) {
          throw new Error(`Invalid immediate value in: ${assembly}`);
        } else if (message.includes("Invalid CSR")) {
          throw new Error(`Invalid CSR name in: ${assembly}`);
        }

        // If it's some other error, just pass the message without the prefix
        throw new Error(message);
      }

      // For unknown error types
      throw new Error("Invalid instruction format");
    }
  }
}
