"use strict";

class Header {
  constructor(header, usings, model) {
    this.header = this._unpackHeader(header);
    this.usings = this._unpackUsings(usings);
    this.model = model;
  }

  format() {
    const header = this._chunk(this.header);
    const usings = this._chunk(this.usings);
    const model = this._chunk(this.model);
    const formattedHeader = this._merge(header, usings, model);
    return formattedHeader ? () => formattedHeader : "";
  }

  _chunk(part) {
    const chunk = `${part || ""}`;
    return !chunk ? "" : chunk.endsWith("\n") ? chunk : `${chunk}\n`;
  }

  _unpackHeader(header) {
    return typeof header === "function" ? header() : header;
  }

  _unpackUsings(usings) {
    return Array.isArray(usings)
      ? usings.reduce((concatenated, using) => `${concatenated}${using}\n`, "")
      : "";
  }

  _merge() {
    return [].join.call(arguments, "");
  }
}

module.exports = Header;
