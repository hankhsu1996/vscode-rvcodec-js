# RISC-V Instruction Encoder/Decoder for VSCode

Instantly encode RISC-V assembly instructions and decode hexadecimal machine code right in your editor! Perfect for RISC-V development, education, debugging, or anyone working with RISC-V instructions.

## Features

### 💡 Inline Decoding
See assembly instructions next to hex values in real-time. Skips commented lines and supports all hex formats. Disabled by default, enable via `rvcodec-js.enableInlineDecoding`.

### 🔍 Hover to Decode
Hover over hex values to see assembly instruction, format, and ISA details. Supports standard hex and SystemVerilog formats. Disabled by default, enable via `rvcodec-js.enableHover`.

### ⚡ Quick Commands
Select text and right-click to:
- Encode: Assembly → hex, binary, and format details
- Decode: Hex → assembly, binary, and format details

## Settings

- `rvcodec-js.enableHover`: Enable/disable instruction decoding on hover (default: false)
- `rvcodec-js.enableInlineDecoding`: Enable/disable inline assembly decoding (default: false)
- `rvcodec-js.useAbiNames`: Use ABI names (a0, sp) instead of numeric (x10, x2) (default: false)

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
