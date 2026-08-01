import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync, readdirSync, renameSync, rmSync, statSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { extname, join, relative, resolve } from "node:path";

const root = resolve(process.argv[2] || "public");
const publishableExtensions = new Set([".png", ".jpg", ".jpeg", ".webp", ".mp4", ".mov", ".m4v"]);
const removedPngChunks = new Set(["tEXt", "zTXt", "iTXt", "eXIf", "tIME"]);

function walk(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? walk(path) : [path];
  });
}

function cleanPng(path) {
  const input = readFileSync(path);
  const chunks = [input.subarray(0, 8)];
  const removed = [];
  let offset = 8;

  while (offset + 12 <= input.length) {
    const length = input.readUInt32BE(offset);
    const end = offset + 12 + length;
    if (end > input.length) throw new Error(`Invalid PNG chunk length in ${path}`);
    const type = input.toString("ascii", offset + 4, offset + 8);
    if (removedPngChunks.has(type)) removed.push(type);
    else chunks.push(input.subarray(offset, end));
    offset = end;
    if (type === "IEND") break;
  }

  if (removed.length) writeFileSync(path, Buffer.concat(chunks));
  return removed;
}

function cleanJpeg(path) {
  const input = readFileSync(path);
  if (input[0] !== 0xff || input[1] !== 0xd8) throw new Error(`Invalid JPEG: ${path}`);
  const parts = [input.subarray(0, 2)];
  const removed = [];
  let offset = 2;

  while (offset < input.length) {
    if (input[offset] !== 0xff) {
      parts.push(input.subarray(offset));
      break;
    }
    const markerStart = offset;
    while (input[offset] === 0xff) offset += 1;
    const marker = input[offset++];
    if (marker === 0xd9) {
      parts.push(input.subarray(markerStart, offset));
      break;
    }
    if (marker === 0xda) {
      const length = input.readUInt16BE(offset);
      parts.push(input.subarray(markerStart, offset + length));
      parts.push(input.subarray(offset + length));
      break;
    }
    if (marker >= 0xd0 && marker <= 0xd7) {
      parts.push(input.subarray(markerStart, offset));
      continue;
    }
    const length = input.readUInt16BE(offset);
    const end = offset + length;
    const shouldRemove = marker === 0xe1 || marker === 0xed || marker === 0xfe;
    if (shouldRemove) removed.push(`0xFF${marker.toString(16).toUpperCase()}`);
    else parts.push(input.subarray(markerStart, end));
    offset = end;
  }

  if (removed.length) writeFileSync(path, Buffer.concat(parts));
  return removed;
}

function cleanWebp(path) {
  const input = readFileSync(path);
  if (input.toString("ascii", 0, 4) !== "RIFF" || input.toString("ascii", 8, 12) !== "WEBP") {
    throw new Error(`Invalid WebP: ${path}`);
  }
  const chunks = [];
  const removed = [];
  let offset = 12;
  while (offset + 8 <= input.length) {
    const type = input.toString("ascii", offset, offset + 4);
    const size = input.readUInt32LE(offset + 4);
    const paddedEnd = offset + 8 + size + (size % 2);
    if (paddedEnd > input.length) throw new Error(`Invalid WebP chunk length in ${path}`);
    if (type === "EXIF" || type === "XMP ") {
      removed.push(type.trim());
    } else {
      const chunk = Buffer.from(input.subarray(offset, paddedEnd));
      if (type === "VP8X" && size >= 1) chunk[8] &= ~0x0c;
      chunks.push(chunk);
    }
    offset = paddedEnd;
  }
  if (removed.length) {
    const body = Buffer.concat([Buffer.from("WEBP"), ...chunks]);
    const header = Buffer.alloc(8);
    header.write("RIFF", 0, "ascii");
    header.writeUInt32LE(body.length, 4);
    writeFileSync(path, Buffer.concat([header, body]));
  }
  return removed;
}

function cleanVideo(path) {
  const tempDirectory = mkdtempSync(join(tmpdir(), "iplusgor-metadata-"));
  const output = join(tempDirectory, `clean${extname(path)}`);
  try {
    execFileSync("ffmpeg", [
      "-hide_banner", "-loglevel", "error", "-y", "-i", path,
      "-map", "0", "-c", "copy", "-map_metadata", "-1", "-map_chapters", "-1",
      "-metadata", "encoder=", "-metadata:s:v:0", "handler_name=",
      "-metadata:s:a:0", "handler_name=", "-fflags", "+bitexact",
      "-movflags", "+faststart", output,
    ], { stdio: "inherit" });
    rmSync(path);
    renameSync(output, path);
  } finally {
    rmSync(tempDirectory, { recursive: true, force: true });
  }
  return ["container metadata"];
}

const files = walk(root).filter((path) => publishableExtensions.has(extname(path).toLowerCase()));
let changed = 0;
for (const path of files) {
  const extension = extname(path).toLowerCase();
  const before = statSync(path).size;
  let removed = [];
  if (extension === ".png") removed = cleanPng(path);
  else if (extension === ".jpg" || extension === ".jpeg") removed = cleanJpeg(path);
  else if (extension === ".webp") removed = cleanWebp(path);
  else removed = cleanVideo(path);
  const after = statSync(path).size;
  if (removed.length) changed += 1;
  console.log(`${relative(process.cwd(), path)} | ${removed.length ? `removed: ${removed.join(", ")}` : "already clean"} | ${before} -> ${after} bytes`);
}

console.log(`Checked ${files.length} publishable media files; cleaned ${changed}. Pixel data was not re-encoded.`);
