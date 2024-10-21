/* eslint-env jest */
const elaborate = require('./elaborate')

describe('elaborate()', () => {
  test('return "Hello World!', () => {
    const given = undefined;

    const expected = "Hello World!"

    const actual = elaborate()

    expect(actual).toEqual(expected)
  })
})