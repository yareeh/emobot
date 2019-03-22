import Jimp from "jimp"

const { GifCodec, GifFrame } = require("gifwrap")

export async function marquee(text1, text2) {
  const frames = []

  const font = await Jimp.loadFont(Jimp.FONT_SANS_64_BLACK)
  const width1 = Jimp.measureText(font, text1)
  const width2 = Jimp.measureText(font, text2)
  const maxWidth = Math.max(width1, width2)

  for (let x = 0; x * 20 < maxWidth; x++) {
    const f = new GifFrame(128, 128, 0xffffffff)
    const image = new Jimp(1, 1, 0) // any Jimp
    image.bitmap = f.bitmap

    image.print(font, x * 20, 0, text1)
    image.print(font, x * 20 - width1 - 20, 0, text1)
    image.print(font, 128 - (x * 20 * width2) / width1, 64, text2)
    image.print(font, 108 - width2 - (x * 20 * width2) / width1, 64, text2)
    frames.push(f)
  }

  const codec = new GifCodec()
  return codec.encodeGif(frames)
}
