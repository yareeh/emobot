import Jimp from "jimp"

export const emojis = {
  allislost: true,
  cry: true,
  emoji: true,
  finger: true,
  thinking: true,
  hug: true,
  intense: true,
  joy: true,
  karhu: true,
  laugh: true,
  ping: true,
  sheep: true,
  toast: true
}

export function getEmoji(s) {
  const match = s.match(/:[a-z\-0-9]+:/)
  if (match) {
    return match[0].replace(/:/g, "").split("-")
  }
  return null
}

export function unknowns(emoji) {
  return emoji.filter(e => !emojis[e])
}

export async function create(emoji) {
  const images = await Promise.all(emoji.map(e => Jimp.read(`images/${e}.png`)))
  return images.reduce((image, e) => {
    if (image) {
      return image.composite(e, 0, 0)
    }
    return e
  })
}
