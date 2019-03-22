require("dotenv").config()
import "jest"
import fetch from "node-fetch"

describe("server", () => {
  it("should return challenge text", async () => {
    return fetch("http://localhost:5000/event", {
      method: "POST",
      body: JSON.stringify({
        token: process.env.AUTH_TOKEN,
        challenge: "3eZbrw1aBm2rZgRNFdxV2595E9CY3gmdALWMmHkvFXO7tYXAYM8P",
        event: { type: "url_verification" }
      }),
      headers: { "Content-Type": "application/json" }
    })
      .then(response => response.text())
      .then(text => {
        expect(text).toEqual(
          "3eZbrw1aBm2rZgRNFdxV2595E9CY3gmdALWMmHkvFXO7tYXAYM8P"
        )
      })
  })

  it("should return ok normally", async () => {
    return fetch("http://localhost:5000/event", {
      method: "POST",
      body: JSON.stringify({
        token: process.env.AUTH_TOKEN,
        challenge: "3eZbrw1aBm2rZgRNFdxV2595E9CY3gmdALWMmHkvFXO7tYXAYM8P",
        event: { type: "foo" }
      }),
      headers: { "Content-Type": "application/json" }
    })
      .then(response => response.text())
      .then(text => {
        expect(text).toEqual("OK")
      })
  })

  it("should fail without valid token", async () => {
    const res = await fetch("http://localhost:5000/event", {
      method: "POST",
      body: JSON.stringify({
        token: "process.env.AUTH_TOKEN",
        event: { type: "message", text: "FOO", user: "BAR" }
      }),
      headers: { "Content-Type": "application/json" }
    })
    expect(res.status).toEqual(401)
  })
})
