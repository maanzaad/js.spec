import { expect } from 'chai'
import regex from '../../lib/spec/regex'
import { invalid } from '../../lib/symbols'

describe("regex", () => {
    describe("conform", () => {
        describe("works with js regular expressions", () => {
            it("/a-z/ [matching]", () => {
                const re = regex(/[a-z]/)
                "abcdefghijklmnopqrstuvwxyz".split("").forEach(letter => {
                    expect(re.conform(letter)).to.equal(letter)
                })
            })

            it("/A-Z/ [non-matching]", () => {
                const re = regex(/[A-Z]/)
                "abcdefghijklmnopqrstuvwxyz".split("").forEach(letter => {
                    expect(re.conform(letter)).to.equal(invalid)
                })
            })
        })
    })
})