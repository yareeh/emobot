import { marquee } from "./marquee"

require("dotenv").config()
import express from "express"
import fetch from "node-fetch"
import { create, emojis, getEmoji, unknowns } from "./emoji"
import Jimp from "jimp"

const PORT = process.env.PORT || 5000

const helpMessage = `Say emoji name and I try to create it. I know ${Object.keys(
  emojis
).join(", ")}. To teach me more plz halp at https://github.com/yareeh/emobot.`

const app = express()

app.use(express.json())

app.get("/emoji/:emojiName", (req, res) => {
  const emojiName = req.params.emojiName
  let emoji = emojiName.split("-")
  if (unknowns(emoji).length === 0) {
    res.header("Content-type", "image/png")
    return create(emoji).then(e => {
      e.getBuffer(Jimp.MIME_PNG, function(err, buffer) {
        res.set("Content-Type", Jimp.MIME_PNG)
        res.send(buffer)
      })
    })
  }
  res.sendStatus(400)
})

app.get("/marquee/:text1/:text2", (req, res) => {
  marquee(req.params.text1, req.params.text2).then(e => {
    res.set("Content-Type", Jimp.MIME_PNG)
    res.send(e.buffer)
  })
})

app.post("/event", (req, res) => {
  // eslint-disable-next-line no-console
  console.log(JSON.stringify(req.body))

  if (req.body.token !== process.env.AUTH_TOKEN) {
    return res.sendStatus(401)
  }

  const event = req.body.event

  switch (event.type) {
    case "url_verification":
      res.setHeader("Content-Type", "text/plain")
      return res.send(req.body.challenge)

    case "message":
      if (event.text && event.user && !event.subtype) {
        if (event.text.toLowerCase().includes("emobot help")) {
          return postMessage({
            text: helpMessage
          }).then(() => {
            res.sendStatus(200)
          })
        }

        if (event.text && event.text.startsWith("jaahas")) {
          const words = event.text.split(/\s+/)
          const text1 = words.length >= 2 ? words[1] : "jaa"
          const text2 =
            words.length >= 3 ? words[2] : words.length === 2 ? words[1] : "has"
          return postMessage({
            text: `${process.env.HEROKU_URL}/marquee/${text1}/${text2}`
          }).then(() => {
            res.sendStatus(200)
          })
        }

        const emoji = getEmoji(event.text)
        if (emoji && emoji.length > 0) {
          const us = unknowns(emoji)
          if (us.length === 0) {
            return postMessage({
              text: `${process.env.EMOJI_URL}/${emoji.join("-")}`
            }).then(() => {
              res.sendStatus(200)
            })
          }
        }
      }
      break
  }
  res.sendStatus(200)
})

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))

function postMessage(message) {
  let body = JSON.stringify(message)
  if (process.env.LOCAL) {
    // eslint-disable-next-line no-console
    console.log(body)
    return Promise.resolve()
  }
  return fetch(process.env.WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body
  })
}
