'use client'

import AudioPlayer from 'react-h5-audio-player'
import 'react-h5-audio-player/lib/styles.css'
// import 'react-h5-audio-player/lib/styles.less' Use LESS
// import 'react-h5-audio-player/src/styles.scss' Use SASS

type AudioplayerProps = {
  src: string
}

const Audioplayer = ({ src }: AudioplayerProps) => {
  return (
    <div>
      <AudioPlayer className="rounded-md" src={src} />
    </div>
  )
}

export default Audioplayer
