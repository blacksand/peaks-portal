import { MainLayout } from '@peaks/web-ui/layout'
import type { LayoutProps } from '@peaks/web-ui/layout'

export default async function Layout({ children }: LayoutProps) {
  // const session = await getSession()
  // const clientSession = makeClientSession(session)
  // const actions = [setClientSession(clientSession)]

  return (
    <MainLayout>
      {/* <ActionDispatcher actions={actions} /> */}
      {children}
    </MainLayout>
  )
}
