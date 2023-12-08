type Project = {
  title: string
  description: string
  imgSrc: string
  href: string
}

type ProjectsData = {
  [locale: string]: Project[]
}

const projectsData: ProjectsData = {
  en: [
    {
      title: 'A Search Engine',
      description: `What if you could look up any information in the world? Webpages, images, videos
        and more. Google has many features to help you find exactly what you're looking
        for.`,
      imgSrc: '/static/images/google.png',
      href: 'https://www.google.com',
    },
    {
      title: 'The Time Machine',
      description: `Imagine being able to travel back in time or to the future. Simple turn the knob
        to the desired date and press "Go". No more worrying about lost keys or
        forgotten headphones with this simple yet affordable solution.`,
      imgSrc: '/static/images/time-machine.jpg',
      href: '/blog/posts/the-time-machine',
    },
  ],

  fr: [
    {
      title: 'Un moteur de recherche',
      description: `Et si vous pouviez rechercher n'importe quelle information dans le monde ? Pages Web, images, vidéos
        et plus. Google propose de nombreuses fonctionnalités pour vous aider à trouver exactement ce que vous cherchez.`,
      imgSrc: '/static/images/google.png',
      href: 'https://www.google.com',
    },
    {
      title: 'La Machine à remonter le temps',
      description: `Imaginez pouvoir voyager dans le temps ou vers le futur. Tournez simplement le bouton
        à la date souhaitée et appuyez sur "Go". Ne vous inquiétez plus des clés perdues ou
        écouteurs oubliés avec cette solution simple mais abordable.`,
      imgSrc: '/static/images/time-machine.jpg',
      href: '/blog/articles/la-machine-a-remonter-le-temps',
    },
  ],
}

export default projectsData
