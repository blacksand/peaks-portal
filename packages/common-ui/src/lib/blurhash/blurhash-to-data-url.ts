/* eslint-disable ts/no-magic-numbers,unicorn/prefer-code-point */
import { decodeBlurHash as decode } from 'fast-blurhash'

const blurhashWhite = 'L1TSUA?bfQ?b~qj[fQj[fQfQfQfQ'

export function blurhashToDataUrl(hash: string | null | undefined, width = 32, height = 32): string | undefined {
  const pixels = decode(hash ?? blurhashWhite, width, height)
  return parsePixels(pixels, width, height)
}

// thanks to https://github.com/wheany/js-png-encoder
function parsePixels(pixels: Uint8ClampedArray, width: number, height: number) {
  const pixelsString = [...pixels].map((byte) => String.fromCharCode(byte)).join('')
  const pngString = generatePng(width, height, pixelsString)
  const dataURL = typeof Buffer === 'undefined'
    ? btoa(pngString)
    : Buffer.from(getPngArray(pngString)).toString('base64')
  return `data:image/png;base64,${dataURL}`
}

function getPngArray(pngString: string) {
  const pngArray = new Uint8Array(pngString.length)
  for (let index = 0; index < pngString.length; index++) {
    pngArray[index] = pngString.charCodeAt(index)
  }
  return pngArray
}

function generatePng(width: number, height: number, rgbaString: string) {
  const DEFLATE_METHOD = String.fromCharCode(0x78, 0x01)
  const CRC_TABLE: number[] = []
  const SIGNATURE = String.fromCharCode(137, 80, 78, 71, 13, 10, 26, 10)
  const NO_FILTER = String.fromCharCode(0)

  let n, c, k

  // make crc table
  for (n = 0; n < 256; n++) {
    c = n
    for (k = 0; k < 8; k++) {
      c = c & 1 ? 0xED_B8_83_20 ^ (c >>> 1) : c >>> 1
    }
    CRC_TABLE[n] = c
  }

  // Functions
  function inflateStore(data: string) {
    const MAX_STORE_LENGTH = 65_535
    let storeBuffer = ''
    let remaining
    let blockType

    for (let index = 0; index < data.length; index += MAX_STORE_LENGTH) {
      remaining = data.length - index
      blockType = ''

      if (remaining <= MAX_STORE_LENGTH) {
        blockType = String.fromCharCode(0x01)
      }
      else {
        remaining = MAX_STORE_LENGTH
        blockType = String.fromCharCode(0x00)
      }
      // little-endian
      storeBuffer += blockType + String.fromCharCode((remaining & 0xFF), (remaining & 0xFF_00) >>> 8)
      storeBuffer += String.fromCharCode(((~remaining) & 0xFF), ((~remaining) & 0xFF_00) >>> 8)

      storeBuffer += data.slice(index, remaining)
    }

    return storeBuffer
  }

  // eslint-disable-next-line unicorn/consistent-function-scoping
  function adler32(data: string) {
    const MOD_ADLER = 65_521
    let a = 1
    let b = 0

    for (let index = 0; index < data.length; index++) {
      a = (a + data.charCodeAt(index)) % MOD_ADLER
      b = (b + a) % MOD_ADLER
    }

    return (b << 16) | a
  }

  function updateCrc(CRC: number, buf: string) {
    let crcInput = CRC
    let b: number

    for (let index = 0; index < buf.length; index++) {
      b = buf.charCodeAt(index)
      crcInput = CRC_TABLE[(crcInput ^ b) & 0xFF]! ^ (crcInput >>> 8)
    }
    return crcInput
  }

  function crc(buf: string) {
    return updateCrc(0xFF_FF_FF_FF, buf) ^ 0xFF_FF_FF_FF
  }

  function dwordAsString(dword: number) {
    return String.fromCharCode(
      (dword & 0xFF_00_00_00) >>> 24,
      (dword & 0x00_FF_00_00) >>> 16,
      (dword & 0x00_00_FF_00) >>> 8, (
        dword & 0x00_00_00_FF),
    )
  }

  function createChunk(length: number, type: string, data: string) {
    const CRC = crc(type + data)

    return dwordAsString(length) +
      type +
      data +
      dwordAsString(CRC)
  }

  function createIHDR(incomingWidth: number, incomingHeight: number) {
    const IHDRdata =
      dwordAsString(incomingWidth) +
      dwordAsString(incomingHeight) +
      // bit depth
      String.fromCharCode(8) +
      // color type: 6=truecolor with alpha
      String.fromCharCode(6) +
      // compression method: 0=deflate, only allowed value
      String.fromCharCode(0) +
      // filtering: 0=adaptive, only allowed value
      String.fromCharCode(0) +
      // interlacing: 0=none
      String.fromCharCode(0)

    return createChunk(13, 'IHDR', IHDRdata)
  }

  // PNG creations

  const iend = createChunk(0, 'IEND', '')
  const ihdr = createIHDR(width, height)

  let scanLines = ''
  let scanLine: string

  for (let y = 0; y < rgbaString.length; y += width * 4) {
    scanLine = NO_FILTER
    if (Array.isArray(rgbaString)) {
      for (let x = 0; x < width * 4; x++) {
        scanLine += String.fromCharCode(rgbaString[y + x] & 0xFF)
      }
    }
    else {
      scanLine += rgbaString.slice(y, y + width * 4)
    }
    scanLines += scanLine
  }

  const compressedScanLines = DEFLATE_METHOD + inflateStore(scanLines) + dwordAsString(adler32(scanLines))
  const idat = createChunk(compressedScanLines.length, 'IDAT', compressedScanLines)

  return SIGNATURE + ihdr + idat + iend
}
