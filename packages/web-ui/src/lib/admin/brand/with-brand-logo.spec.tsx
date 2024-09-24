import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { BrandLogo } from './brand-logo'
import { withBrandLogo } from './with-brand-logo'

describe('withBrandLogo', () => {
  it('renders BrandLogo with given title', () => {
    const title = 'Test Title'
    const Component = withBrandLogo(title)
    const { getByText } = render(<Component />)

    expect(getByText(title)).toBeInTheDocument()
  })

  it('assigns displayName correctly from BrandLogo', () => {
    const title = 'Test Title'
    const Component = withBrandLogo(title)

    expect(Component.displayName).toBe(BrandLogo.name || 'BrandLogo')
  })

  it('renders BrandLogo with an empty title', () => {
    const title = ''
    const Component = withBrandLogo(title)
    const { getByTestId } = render(<Component />)

    expect(getByTestId('logoText')).toBeInTheDocument()
  })

  it('handles undefined title gracefully', () => {
    const title = undefined
    const Component = withBrandLogo(title as never)
    const { container, getByTestId } = render(<Component />)

    expect(container).toBeInTheDocument()
    expect(getByTestId('logoText')).toBeEmptyDOMElement()
  })
})
