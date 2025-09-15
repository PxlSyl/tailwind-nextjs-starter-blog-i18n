import NextImage, { type ImageProps } from 'next/image'
import type { JSX } from 'react'

const Image = ({ ...rest }: ImageProps): JSX.Element => <NextImage {...rest} />

export default Image
