import { Inter } from 'next/font/google'
import SectionContainer from './SectionContainer'
import Footer from './Footer'
import { ReactNode } from 'react'
import Header from './Header'
import { LocaleTypes } from 'app/[locale]/i18n/settings'

interface Props {
  children: ReactNode
  params: { locale: LocaleTypes }
}

const inter = Inter({
  subsets: ['latin'],
})

const LayoutWrapper = ({ children, params: { locale } }: Props) => {
  return (
    <SectionContainer>
      <div className={`${inter.className} flex h-screen flex-col justify-between font-sans`}>
        <Header />
        <main className="mb-auto">{children}</main>
        <Footer />
      </div>
    </SectionContainer>
  )
}

export default LayoutWrapper
