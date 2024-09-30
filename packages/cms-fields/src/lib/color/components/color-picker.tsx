import { Fragment } from 'react'

import { RadioGroup } from '@peaks/common-ui/components/radio-group'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@peaks/common-ui/components/tabs'

import { themeColors } from '../utils/theme-colors'
import { CustomColorPicker } from './custom-color-picker'
import { ThemeColorRadio } from './theme-color-radio'
import type { ColorFieldValue } from './types'

export function ColorPicker({
  allowAlpha,
  disablePicker,
  value,
  onColorChange,
}: {
  allowAlpha?: boolean
  disablePicker?: boolean
  value?: ColorFieldValue | null
  onColorChange?: (color: ColorFieldValue) => void
}) {
  const handleCustomColorChange = ({ alpha, color, darkColor, darkMode }: Partial<ColorFieldValue>) => {
    onColorChange?.({ ...value, type: 'custom', alpha, color, darkColor, darkMode })
  }

  const handleThemeColorChange = (themeColor: string) => {
    onColorChange?.({ ...value, type: 'theme', themeColor })
  }

  return (
    <Tabs
      className="max-h-screen min-h-[320px] max-w-full fluid-w-[18rem,30rem]"
      defaultValue={value?.type ?? 'theme'}
      onValueChange={(type) => { onColorChange?.({ ...value, type: type as 'custom' | 'theme' }) }}
    >
      <TabsList className="grid h-auto w-full grid-cols-2 bg-[var(--theme-elevation-150)]">
        <TabsTrigger className="border-0 bg-transparent text-base" value="theme">
          主题颜色
        </TabsTrigger>

        <TabsTrigger
          className="border-0 bg-transparent text-base"
          disabled={disablePicker}
          value="custom"
        >
          自定义颜色
        </TabsTrigger>
      </TabsList>

      <TabsContent className="p-4" value="theme">
        <RadioGroup
          className="grid grid-cols-[auto_repeat(3,max-content)] gap-4"
          defaultValue="primary"
          value={value?.themeColor}
          onValueChange={handleThemeColorChange}
        >
          {themeColors.map(({ name, colors }) => (
            <Fragment key={name}>
              <span className="col-start-1 text-end text-muted-foreground">{name}</span>
              {colors.map(({ label, color, fg }) => (
                <ThemeColorRadio
                  key={color}
                  color={color}
                  foreground={fg}
                  label={label}
                />
              ))}
            </Fragment>
          ))}
        </RadioGroup>
      </TabsContent>

      <TabsContent className="px-[16px] py-[8px]" value="custom">
        <CustomColorPicker
          allowAlpha={allowAlpha}
          value={value}
          onChange={handleCustomColorChange}
        />
      </TabsContent>
    </Tabs>
  )
}
