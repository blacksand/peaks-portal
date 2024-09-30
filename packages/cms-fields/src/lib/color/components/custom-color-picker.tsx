import { extend } from 'colord'
import namesPlugin from 'colord/plugins/names'
import { Checkbox } from 'packages/common-ui/src/lib/components/checkbox'
import { HexAlphaColorPicker, HexColorInput, HexColorPicker } from 'react-colorful'

import { Input } from '@peaks/common-ui/components/input'
import { Label } from '@peaks/common-ui/components/label'
import { cn } from '@peaks/common-utils'

import type { ColorFieldValue } from './types'

extend([namesPlugin])

interface CustomColorPickerProps {
  allowAlpha?: boolean
  className?: string
  color?: string
  darkColor?: string
  darkMode?: boolean
  value?: ColorFieldValue | null

  onChange?: (value: Partial<ColorFieldValue>) => void
}

// const defaultColor = '#ffffff'

export function CustomColorPicker({
  allowAlpha,
  className,
  value,
  onChange,
}: CustomColorPickerProps) {
  const alpha = value?.alpha ?? allowAlpha
  const Picker = alpha ? HexAlphaColorPicker : HexColorPicker

  // const colorHex = useMemo(() => {
  //   if (!value?.color) {
  //     return defaultColor
  //   }
  //
  //   const color = colord(value?.color)
  //   return color.isValid() ? color.toHex() : defaultColor
  // }, [value?.color])
  //
  // const darkColorHex = useMemo(() => {
  //   if (!value?.darkColor) {
  //     return defaultColor
  //   }
  //
  //   const color = colord(value?.darkColor)
  //   return color.isValid() ? color.toHex() : defaultColor
  // }, [value?.darkColor])

  const handleValueChange = (input: Partial<ColorFieldValue>) => {
    onChange?.({ ...value, ...input })
  }

  const handleColorChange = (key: 'color' | 'darkColor') => (color: string) => {
    if (value?.[key] !== color) {
      onChange?.({ ...value, [key]: color })
    }
  }

  return (
    <div className={cn('grid w-full grid-cols-2 gap-8', className)}>
      <Label className="flex items-center gap-2 text-base">
        <Checkbox
          className="size-[20px] border-solid"
          checked={alpha}
          disabled={!allowAlpha}
          onCheckedChange={(state) => handleValueChange({ alpha: !!state })}
        />
        <span className="cursor-pointer text-base">使用 Alpha 通道</span>
      </Label>

      <Label className="flex items-center gap-2 text-base">
        <Checkbox
          className="size-[20px] border-solid"
          checked={value?.darkMode}
          onCheckedChange={(state) => handleValueChange({ darkMode: !!state })}
        />
        <span className="cursor-pointer text-base">深色主题单独设置</span>
      </Label>

      <div className={cn('space-y-4', value?.darkMode || 'col-span-full')}>
        <Picker
          className="[&.react-colorful]:w-full"
          color={value?.color}
          onChange={handleColorChange('color')}
        />
        <div className="flex items-center gap-2 overflow-hidden">
          <div className="border border-solid p-4" style={{ backgroundColor: value?.color }} />
          <Input className="bg-[var(--theme-input-bg)] text-base" asChild>
            <HexColorInput
              className="flex-1 border-solid border-[var(--theme-elevation-250)]"
              alpha={allowAlpha}
              color={value?.color}
              prefixed
              onChange={handleColorChange('color')}
            />
          </Input>
        </div>
      </div>

      {value?.darkMode ? (
        <div className="space-y-4">
          <Picker
            className="[&.react-colorful]:w-full"
            color={value?.darkColor}
            onChange={handleColorChange('darkColor')}
          />
          <div className="flex items-center gap-2 overflow-hidden">
            <div className="border border-solid p-4" style={{ backgroundColor: value?.darkColor }} />
            <Input className="bg-transparent text-base" asChild>
              <HexColorInput
                className="flex-1 border border-solid bg-input p-2"
                alpha={allowAlpha}
                color={value?.darkColor}
                prefixed
                onChange={handleColorChange('darkColor')}
              />
            </Input>
          </div>
        </div>
      ) : null}
    </div>
  )
}
