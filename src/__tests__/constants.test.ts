/// <reference types="jest" />

import { HEX_PATTERN } from "../constants";

describe("HEX_PATTERN", () => {
  const validPatterns: string[] = [
    // Standard hex format
    "0x00000013",
    "0xFEDCBA98",
    // SystemVerilog format
    "32'h00000013",
    // Verilog format
    "'h00000013",
    // Plain hex
    "00000013",
    "FEDCBA98",
  ];

  const invalidPatterns: string[] = [
    // Wrong bit width
    "64'h00000013",
    "16'h00000013",
    // Wrong number of digits
    "0x0000001",
    "0x000000134",
    "32'h0000001",
    "32'h000000134",
    // Invalid characters
    "0x0000001G",
    "32'h0000001G",
    // Invalid formats
    "h00000013",
    "0h00000013",
    "x00000013",
  ];

  describe("valid patterns", () => {
    test.each(validPatterns)("should match %s", (pattern: string) => {
      const match = pattern.match(HEX_PATTERN);
      expect(match).not.toBeNull();
      // Check if one of the capture groups contains the hex value
      const hexValue = match
        ?.slice(1)
        .find((group: string | undefined) => group !== undefined);
      expect(hexValue).toMatch(/^[0-9A-Fa-f]{8}$/);
    });
  });

  describe("invalid patterns", () => {
    test.each(invalidPatterns)("should not match %s", (pattern: string) => {
      const match = pattern.match(HEX_PATTERN);
      expect(match).toBeNull();
    });
  });

  describe("capture groups", () => {
    test("should capture correct hex value from 0x format", () => {
      const match = "0x00000013".match(HEX_PATTERN);
      expect(match?.[1]).toBe("00000013");
    });

    test("should capture correct hex value from Verilog format with 32", () => {
      const match = "32'h00000013".match(HEX_PATTERN);
      expect(match?.[2]).toBe("00000013");
    });

    test("should capture correct hex value from Verilog format without 32", () => {
      const match = "'h00000013".match(HEX_PATTERN);
      expect(match?.[3]).toBe("00000013");
    });

    test("should capture correct hex value from plain format", () => {
      const match = "00000013".match(HEX_PATTERN);
      expect(match?.[4]).toBe("00000013");
    });
  });
});
