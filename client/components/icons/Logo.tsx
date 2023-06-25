type LogoProps = {
  width: number
  height: number
  fill: string
}

export const Logo = (props: LogoProps) => (
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 192 192' {...props}>
    <path
      fillRule='evenodd'
      d='M46.747 153.6H21.12V38.4h21.463L95.6 75.78h.8l53.017-37.38h21.463v115.2h-25.627V70.624l-36.359 24.49V153.6H83.266V95.114l-36.519-24.49V153.6Z'
      clipRule='evenodd'
    />
  </svg>
)
