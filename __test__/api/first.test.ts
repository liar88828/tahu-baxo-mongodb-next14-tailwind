import {describe, expect, it} from "vitest";

const math = (a: number, b: number) => {
  return a + b
}
describe('test', () => {
  it('can test math', () => {
    const testData = math(1, 2)
    // expect(testData).to(3)
    expect(testData).toEqual(3)
  })
})
