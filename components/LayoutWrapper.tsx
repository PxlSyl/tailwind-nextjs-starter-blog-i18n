import { Inter } from 'next/font/google'
import SectionContainer from './SectionContainer'
import Footer from './navigation/Footer'
import { ReactNode } from 'react'
import Header from './navigation/Header'

interface LayoutWrapperProps {
  children: ReactNode
}

const inter = Inter({
  subsets: ['latin'],
})

const LayoutWrapper = ({ children }: LayoutWrapperProps) => {
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
