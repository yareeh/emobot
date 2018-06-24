require("dotenv").config()
import express from "express"
import fetch from "node-fetch"
import { create, unknowns } from "./emoji"
import Jimp from "jimp"

const PORT = process.env.PORT || 5000

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

app.post("/event", (req, res) => {
  // eslint-disable-next-line no-console
  console.log(JSON.stringify(req.body))

  const event = req.body.event

  switch (event.type) {
    case "url_verification":
      res.setHeader("Content-Type", "text/plain")
      res.send(event.challenge)
      break

    case "message":
      if (event.text && event.user && !event.subtype) {
        postMessage({ text: event.text }).then(() => {
          res.sendStatus(200)
        })
      } else {
        res.sendStatus(200)
      }
      break

    default:
      res.sendStatus(200)
  }
})

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))

function postMessage(message) {
  return fetch(process.env.WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(message)
  })
}
