declare module "rvcodecjs/core/Instruction.js" {
  export class Instruction {
    constructor(instruction: string, options?: { ABI?: boolean; ISA?: string });

    asm: string; // Assembly representation
    hex: string; // Hexadecimal representation
    bin: string; // Binary representation
    fmt: string; // Format (R-type, I-type, etc.)
    isa: string; // ISA type
    opcode: string; // Opcode
    rd: string; // Destination register
    imm: string; // Immediate value
    name: string; // Instruction name
  }
}
