import "jest"
import fetch from "node-fetch"

describe("server", () => {
  it("should return challenge text", async () => {
    return fetch("http://localhost:5000/event", {
      method: "POST",
      body: JSON.stringify({
        token: "Jhj5dZrVaK7ZwHHjRyZWjbDl",
        challenge: "3eZbrw1aBm2rZgRNFdxV2595E9CY3gmdALWMmHkvFXO7tYXAYM8P",
        type: "url_verification"
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
        token: "Jhj5dZrVaK7ZwHHjRyZWjbDl",
        challenge: "3eZbrw1aBm2rZgRNFdxV2595E9CY3gmdALWMmHkvFXO7tYXAYM8P",
        type: "foo"
      }),
      headers: { "Content-Type": "application/json" }
    })
      .then(response => response.text())
      .then(text => {
        expect(text).toEqual("OK")
      })
  })
})
