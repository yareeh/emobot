import express from "express"

const PORT = process.env.PORT || 5000

const app = express()

app.use(express.json())

app.get("/", (req, res) => res.send("Hello World!"))

app.post("/event", (req, res) => {
  // eslint-disable-next-line no-console
  console.log(JSON.stringify(req.body))
  if (req.body.type === "url_verification") {
    res.setHeader("Content-Type", "text/plain")
    res.send(req.body.challenge)
  } else {
    res.sendStatus(200)
  }
})

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
