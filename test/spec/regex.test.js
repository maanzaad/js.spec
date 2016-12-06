import { expect } from 'chai'
import regex from '../../lib/spec/regex'
import { invalid } from '../../lib/symbols'
import { explainData } from '../../lib/util'

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

        it("works with bad inputs", () => {
            const re = regex(/a-z/)
            expect(re.conform(null)).to.equal(invalid)
            expect(re.conform(undefined)).to.equal(invalid)
            expect(re.conform(1)).to.equal(invalid)
            expect(re.conform([])).to.equal(invalid)
            expect(re.conform({})).to.equal(invalid)
            expect(re.conform("🔨")).to.equal(invalid)
            expect(re.conform(Symbol('a'))).to.equal(invalid)            
        })
    })

    describe("explain", () => {
        it("outputs expected data", () => {
            const re = regex(/a-z/)
            const problems = explainData(re, 'A')

            expect(problems).to.be.an("array").and.have.length(1)
            expect(problems).to.have.deep.property("[0].via")
                .that.deep.equals(["Regex(/a-z/)"])
            expect(problems).to.have.deep.property("[0].path")
                .that.deep.equals([])
            expect(problems).to.have.deep.property("[0].predicate")
                .that.is.a("function")
            expect(problems).to.have.deep.property("[0].value")
                .that.deep.equals("A")
        })
    })
})