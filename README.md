# RISC-V Instruction Encoder/Decoder for VSCode

Instantly encode RISC-V assembly instructions and decode hexadecimal machine code right in your editor! Perfect for RISC-V development, education, debugging, or anyone working with RISC-V instructions.

## Features

### 🔍 Hover to Decode
Hover over hexadecimal values to instantly see:
- Assembly instruction
- Binary representation
- Instruction format
- ISA type

Supports common hex formats:
```
0x00A02023    // Standard hex format
00A02023      // Plain hex
32'h00A02023  // Even works with SystemVerilog format!
```

The hover feature can be disabled in VSCode settings (`rvcodec-js.enableHover`).

### ⚡ Quick Encode
1. Select an assembly instruction
2. Right-click and choose "RISC-V: Encode Instruction" (or use Command Palette)
3. Get detailed encoding information:
   - Assembly representation
   - Binary format
   - Hexadecimal value
   - Instruction format
   - ISA type

## Examples

### Encoding
```
addi x15, x1, -50    // Add immediate value -50 to x1, store in x15
```
Results in:
```
Assembly: addi x15, x1, -50
Binary:   11111111110100001000011110010011
Hex:      ffd08793
Format:   I-type
ISA:      RV32I
```

### Decoding (via hover)
Hover over `0x00A02023` to see:
```
sw x0, 32(x0)    // Store word: mem[x0 + 32] = x0

💾 Binary: 00000000101000000010000000100011
🔢 Hexadecimal: 00a02023
🧩 Format: S-type
⚡ Instruction Set: RV32I
```

## Installation

1. Open VSCode
2. Go to Extensions (Ctrl+Shift+X)
3. Search for "RISC-V Encoder/Decoder"
4. Click Install

## Usage Tips

- Works in any text file - perfect for:
  - Writing assembly code
  - Debugging compiled programs
  - Teaching/learning RISC-V
  - Documentation
  - Code comments
- Supports standard RISC-V instructions (RV32I base + extensions)
- No setup needed - just install and start using

## License

GNU Affero General Public License v3 - see the [LICENSE](LICENSE) file for details

This extension uses [rvcodecjs](https://gitlab.com/luplab/rvcodecjs) which is licensed under GNU AGPL v3.

## Credits

- [rvcodecjs](https://gitlab.com/luplab/rvcodecjs) - RISC-V instruction encoding/decoding library by LupLab (GNU AGPL v3)
- Icon: [Programming language icons created by Freepik - Flaticon](https://www.flaticon.com/free-icons/programming-language)

## Contributing

Found a bug or have a suggestion? Please open an issue on [GitHub](https://github.com/hankhsu1996/vscode-rvcodec-js)!

---

Made with ❤️ for the RISC-V community. Happy coding!
