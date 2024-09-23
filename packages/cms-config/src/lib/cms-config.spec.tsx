import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import CmsConfig from './cms-config'

describe('cmsConfig', () => {
  it('should render successfully', () => {
    render(<CmsConfig />)
    const title = screen.getByText('Welcome to CmsConfig!')
    expect(title).toHaveTextContent('Welcome to CmsConfig!')
  })
})
