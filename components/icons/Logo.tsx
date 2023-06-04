type LogoProps = {
  width: number
  height: number
}

export const Logo = (props: LogoProps) => (
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 192 192' {...props}>
    <path d='M40 96v43h19v-30.5c0-16.8.4-30.5.8-30.5s6.6 3.9 13.7 8.7l13 8.8.3 21.7.2 21.8h19V95.3l13-8.6c7.1-4.8 13.2-8.7 13.5-8.7.3 0 .5 13.7.5 30.5V139h19V53h-15.5l-20 14c-11 7.7-20.5 13.8-21 13.6-.6-.2-9.7-6.5-20.4-14L55.6 53H40v43z' />
  </svg>
)
