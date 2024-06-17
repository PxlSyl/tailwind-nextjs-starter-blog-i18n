'use client'

import projectsData from '@/data/projectsData'
import Card from '@/components/projectcard'
import { LocaleTypes } from '../i18n/settings'
import { useParams } from 'next/navigation'

const Project = () => {
  const locale = useParams()?.locale as LocaleTypes
  const projectArray = projectsData[locale]
  return (
    <>
      {projectArray.map((project) => (
        <Card
          key={project.title}
          title={project.title}
          description={project.description}
          imgSrc={project.imgSrc}
          href={project.href}
        />
      ))}
    </>
  )
}

export default Project
