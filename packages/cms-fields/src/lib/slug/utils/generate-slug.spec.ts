import { generateSlug } from './generate-slug'

describe('generateSlug', () => {
  // Happy path: valid string input
  it('should return a slug for a valid string input', () => {
    const result = generateSlug('Hello World!')
    expect(result).toBe('hello-world')
  })

  // Happy path: maintain the case
  it('should return a slug while maintaining case when specified', () => {
    const result = generateSlug('Hello World!', true)
    expect(result).toBe('Hello-World')
  })

  // Edge case: empty string input
  it('should return an empty string for an empty input', () => {
    const result = generateSlug('')
    expect(result).toBe('')
  })

  // Edge case: non-string input
  it('should return an empty string for a non-string input', () => {
    const result = generateSlug(123)
    expect(result).toBe('')
  })

  // Edge case: input with special characters
  it('should handle special characters in the input', () => {
    const result = generateSlug('This is a test! @2024')
    expect(result).toBe('this-is-a-test-2024')
  })

  // Edge case: input with multiple spaces
  it('should replace multiple spaces with a single hyphen', () => {
    const result = generateSlug('This    is   a test')
    expect(result).toBe('this-is-a-test')
  })
})
