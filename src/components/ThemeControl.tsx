import type { MouseEvent } from 'react'
import { Moon, Sun } from './icons'

export type SetTheme = (dark: boolean, e: MouseEvent<HTMLButtonElement>) => void

export default function ThemeControl({
  dark,
  onTheme,
  className = '',
}: {
  dark: boolean
  onTheme: SetTheme
  className?: string
}) {
  return (
    <div role='radiogroup' aria-label='Theme' data-theme-ctl='1' className={'theme ' + className}>
      <button
        role='radio'
        aria-checked={!dark}
        onClick={(e) => onTheme(false, e)}
        className='theme-opt theme-opt-light'
      >
        <Sun />
        Light
      </button>
      <span aria-hidden='true' className='theme-sep'>
        /
      </span>
      <button role='radio' aria-checked={dark} onClick={(e) => onTheme(true, e)} className='theme-opt theme-opt-dark'>
        <Moon />
        Dark
      </button>
    </div>
  )
}
