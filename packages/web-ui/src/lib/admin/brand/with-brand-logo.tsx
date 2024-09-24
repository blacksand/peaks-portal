import { BrandLogo } from './brand-logo'

export function withBrandLogo(title: string, width = 24, height = 24) {
  function WithBrandLogo() {
    return <BrandLogo title={title} height={height} width={width} />
  }

  WithBrandLogo.displayName = BrandLogo.name || 'BrandLogo'
  return WithBrandLogo
}
