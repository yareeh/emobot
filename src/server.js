import express from "express"

const PORT = process.env.PORT || 5000

const app = express()

app.get("/", (req, res) => res.send("Hello World!"))

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
