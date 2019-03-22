import "jest"
import { getEmoji, unknowns } from "../src/emoji"

describe("getEmoji", () => {
  it("finds emoji", () => {
    expect(getEmoji(":joo:")).toEqual(["joo"])
    expect(getEmoji("asd :joo: asdsa")).toEqual(["joo"])
  })

  it("parses emoji parts", () => {
    expect(getEmoji(":joo-bar-foo:")).toEqual(["joo", "bar", "foo"])
    expect(getEmoji("asd :joo-asdf2-goo: asdsa")).toEqual([
      "joo",
      "asdf2",
      "goo"
    ])
  })

  it("returns null if nothing is found", () => {
    expect(getEmoji(":joo")).toEqual(null)
    expect(getEmoji("asd joo: asdsa")).toEqual(null)
  })
})

describe("unknowns", () => {
  it("finds unknown elements", () => {
    expect(unknowns(["hmm", "karhu", "foo", "bar", "allislost"])).toEqual([
      "hmm",
      "foo",
      "bar"
    ])
  })
})
