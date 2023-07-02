import { FC } from 'react'
import { TypeAnimation } from 'react-type-animation'

type TextTypeAnimatorProps = {
  className: string
  sequence: Array<string | number>
}

export const TextTypeAnimator: FC<TextTypeAnimatorProps> = ({
  className,
  sequence
}: TextTypeAnimatorProps) => {
  return (
    <TypeAnimation
      className={className}
      sequence={sequence}
      wrapper='span'
      speed={50}
      repeat={Infinity}
    />
  )
}
