import { text } from 'payload/shared'

// Source: https://stackoverflow.com/a/8234912/2013580
const absoluteRegExp =
  /(?:[A-Za-z]{3,9}:(?:\/\/)?(?:[\w$&+,:;=-]+@)?[\d.A-Za-z-]+|(?:www.|[\w$&+,:;=-]+@)[\d.A-Za-z-]+)(?:\/[\w%+./~-]*)?\??[\w%&+.;=@-]*#?\w*/

/**
 * This regex checks for relative URLs starting with / or anchor links starting with # in a string. Tested for the following use cases:
 * - /privacy-policy
 * - /privacy-policy#primary-terms
 * - #primary-terms
 */
const relativeOrAnchorRegExp = /^[\w./\-]*(?:#\w[\w-]*)?$/

export const validateUrl: typeof text = async (value, options) => {
  const result = await text(value, options)

  if (result !== true) {
    return result
  }

  if (!value) {
    return true
  }

  if (absoluteRegExp.test(value)) {
    return true
  }

  if (relativeOrAnchorRegExp.test(value)) {
    return true
  }

  let url: URL | undefined

  try {
    url = new URL(value)
  }
  catch {
    // nothing
  }

  return url == null ? 'Invalid URL' : true
}
