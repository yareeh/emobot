require("dotenv").config()
import express from "express"
import fetch from "node-fetch"

const PORT = process.env.PORT || 5000

const app = express()

app.use(express.json())

app.get("/", (req, res) => res.send("Hello World!"))

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
      // postMessage({ text: event.text ? event.text : "lol" }).then(() =>
      //   res.sendStatus(200)
      // )
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
