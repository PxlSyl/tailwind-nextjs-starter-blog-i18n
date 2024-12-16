import * as React from 'react'
import { useSpring, animated } from '@react-spring/web'

export const defaultProperties = {
  dark: {
    circle: {
      r: 9,
    },
    mask: {
      cx: '50%',
      cy: '23%',
    },
    svg: {
      transform: 'rotate(40deg)',
    },
    lines: {
      opacity: 0,
    },
  },
  light: {
    circle: {
      r: 5,
    },
    mask: {
      cx: '100%',
      cy: '0%',
    },
    svg: {
      transform: 'rotate(90deg)',
    },
    lines: {
      opacity: 1,
    },
  },
  springConfig: { mass: 4, tension: 250, friction: 35 },
}

let REACT_TOGGLE_DARK_MODE_GLOBAL_ID = 0

type SVGProps = Omit<React.HTMLAttributes<HTMLOrSVGElement>, 'onChange'>
export interface Props extends SVGProps {
  onChange: (checked: boolean) => void
  checked: boolean
  style?: React.CSSProperties
  size?: number | string
  animationProperties?: typeof defaultProperties
  moonColor?: string
  sunColor?: string
}

export const DarkModeSwitch: React.FC<Props> = ({
  onChange,
  checked = false,
  size = 24,
  animationProperties = defaultProperties,
  moonColor = 'white',
  sunColor = 'black',
  style,
  ...rest
}) => {
  const [id, setId] = React.useState(0)

  React.useEffect(() => {
    REACT_TOGGLE_DARK_MODE_GLOBAL_ID += 1
    setId(REACT_TOGGLE_DARK_MODE_GLOBAL_ID)
  }, [setId])

  const properties = React.useMemo(() => {
    if (animationProperties !== defaultProperties) {
      return Object.assign(defaultProperties, animationProperties)
    }
    return animationProperties
  }, [animationProperties])

  const { circle, svg, lines, mask } = properties[checked ? 'dark' : 'light']

  const svgContainerProps = useSpring({
    transform: svg.transform,
    config: animationProperties.springConfig,
  })
  
  const centerCircleProps = useSpring({
    r: circle.r,
    config: animationProperties.springConfig,
  })
  
  const maskedCircleProps = useSpring({
    cx: mask.cx,
    cy: mask.cy,
    config: animationProperties.springConfig,
  })
  
  const linesProps = useSpring({
    opacity: lines.opacity,
    config: animationProperties.springConfig,
  })

  const toggle = () => onChange(!checked)

  const uniqueMaskId = `circle-mask-${id}`

  const AnimatedSvg = animated('svg')
  const AnimatedCircle = animated('circle')
  const AnimatedG = animated('g')

  return (
    <div style={{ display: 'flex' }}>
      <AnimatedSvg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        color={checked ? moonColor : sunColor}
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke="currentColor"
        onClick={toggle}
        style={{
          cursor: 'pointer',
          ...svgContainerProps,
          ...style,
        }}
        {...rest}
      >
        <mask id={uniqueMaskId}>
          <rect x="0" y="0" width="100%" height="100%" fill="white" />
          <AnimatedCircle
            cx={maskedCircleProps.cx}
            cy={maskedCircleProps.cy}
            r="9"
            fill="black"
          />
        </mask>

        <AnimatedCircle
          cx="12"
          cy="12"
          r={centerCircleProps.r}
          fill={checked ? moonColor : sunColor}
          mask={`url(#${uniqueMaskId})`}
        />
        <AnimatedG style={{ opacity: linesProps.opacity }} stroke="currentColor">
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </AnimatedG>
      </AnimatedSvg>
    </div>
  )
}
