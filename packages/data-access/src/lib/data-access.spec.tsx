import { render } from '@testing-library/react'

import DataAccess from './data-access'

describe('dataAccess', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DataAccess />)
    expect(baseElement).toBeTruthy()
  })
})
