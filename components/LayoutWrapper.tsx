import { Inter } from 'next/font/google'
import React, { type ReactNode } from 'react'
import SectionContainer from './SectionContainer'
import Footer from './navigation/Footer'
import Header from './navigation/Header'

interface LayoutWrapperProps {
  children: ReactNode
}

const inter = Inter({
  subsets: ['latin'],
})

const LayoutWrapper = ({ children }: LayoutWrapperProps): React.JSX.Element => {
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
