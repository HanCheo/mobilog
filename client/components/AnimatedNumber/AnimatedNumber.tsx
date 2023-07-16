import dynamic from 'next/dynamic'
const AnimatedNumbers = dynamic(() => import('react-animated-numbers'), {
  ssr: false
})

type AnimateNumberProps = {
  num: number
  fontStyle?: React.CSSProperties
}

export const AnimatedNumber = ({ num, fontStyle }: AnimateNumberProps) => (
  <AnimatedNumbers
    includeComma
    fontStyle={fontStyle}
    animateToNumber={num}
    locale='en-US'
    configs={(_, index) => {
      return { mass: 1, tension: 130 * (index + 1), friction: 100 }
    }}
  />
)
