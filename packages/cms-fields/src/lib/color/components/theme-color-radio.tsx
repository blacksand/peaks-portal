import { RadioGroupItem } from '@peaks/common-ui/components/radio-group'

import { ThemeColorBox } from './theme-color-box'

export interface ThemeColorCheckboxProps {
  label: string
  color: string
  foreground: string
}

export function ThemeColorRadio({ label, color, foreground }: ThemeColorCheckboxProps) {
  return (
    <label
      className="flex items-center space-x-2 text-base leading-none"
    >
      <RadioGroupItem
        className="size-[16px] border-solid [&_.lucide]:size-[10px]"
        value={color}
      />
      <span className="flex-1 text-center">{label}</span>
      <ThemeColorBox color={color} foreground={foreground} />
    </label>
  )
}
