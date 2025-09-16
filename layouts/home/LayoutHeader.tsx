import React from 'react'

interface LayoutHeaderProps {
  title: string
  description?: string
}

const LayoutHeader: React.FC<LayoutHeaderProps> = ({ title, description }) => {
  return (
    <div className="space-y-2 pt-6 pb-8 md:space-y-5">
      <h1 className="text-heading-400 dark:text-heading-400 text-3xl leading-9 font-extrabold tracking-tight sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
        {title}
      </h1>
      {description ? (
        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">{description}</p>
      ) : null}
    </div>
  )
}

export default LayoutHeader
