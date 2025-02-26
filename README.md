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

## Settings

- `rvcodec-js.enableHover`: Enable/disable instruction decoding on hover
- `rvcodec-js.useAbiNames`: Use ABI names (a0, sp) instead of numeric (x10, x2)

## Installation

1. Open VSCode
2. Go to Extensions (Ctrl+Shift+X)
3. Search for "RISC-V Encoder/Decoder"
4. Click Install

## License

This project is licensed under GNU Affero General Public License v3 - see the [LICENSE](LICENSE) file for details.

## Credits

- Built with [rvcodecjs](https://gitlab.com/luplab/rvcodecjs) by LupLab (GNU AGPL v3)
- Icon from [Flaticon](https://www.flaticon.com/free-icons/programming-language) by Freepik

## Contributing

Found a bug or have a suggestion? Please open an issue on [GitHub](https://github.com/hankhsu1996/vscode-rvcodec-js)!

---

Made with ❤️ for the RISC-V community. Happy coding!
