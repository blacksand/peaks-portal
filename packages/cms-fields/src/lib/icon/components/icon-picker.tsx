import ant from '@iconify-json/ant-design/info.json'
import game from '@iconify-json/game-icons/info.json'
import gis from '@iconify-json/gis/info.json'
import healthicons from '@iconify-json/healthicons/info.json'
import lineMd from '@iconify-json/line-md/info.json'
import lucide from '@iconify-json/lucide/info.json'
import map from '@iconify-json/map/info.json'
import mdi from '@iconify-json/mdi/info.json'
import medical from '@iconify-json/medical-icon/info.json'
import simpleIcons from '@iconify-json/simple-icons/info.json'
import solar from '@iconify-json/solar/info.json'
import svgSpinners from '@iconify-json/svg-spinners/info.json'
import twemoji from '@iconify-json/twemoji/info.json'
import type { IconifyIcon, IconifyJSON } from '@iconify/types'
import { parseIconSetAsync } from '@iconify/utils'
import { useEffect, useMemo, useState } from 'react'

import type { Icon, IconCollection, IconFieldValue, LoadedCollection } from '../field/types'
import { IconPickerHeader } from './icon-picker-header'
import { IconPickerList } from './icon-picker-list'

interface IconPickerProps {
  rtl?: boolean
  value: IconFieldValue | undefined
  onIconChange: (value: (IconFieldValue | undefined)) => void
}

const collections: IconCollection[] = [
  { ...mdi, load: () => import('@iconify-json/mdi') },
  { ...solar, load: () => import('@iconify-json/solar') },
  { ...lucide, load: () => import('@iconify-json/lucide') },
  { ...ant, load: () => import('@iconify-json/ant-design') },
  { ...lineMd, load: () => import('@iconify-json/line-md') },
  { ...svgSpinners, load: () => import('@iconify-json/svg-spinners') },
  { ...twemoji, load: () => import('@iconify-json/twemoji') },
  { ...simpleIcons, load: () => import('@iconify-json/simple-icons') },
  { ...gis, load: () => import('@iconify-json/gis') },
  { ...map, load: () => import('@iconify-json/map') },
  { ...game, load: () => import('@iconify-json/game-icons') },
  { ...healthicons, load: () => import('@iconify-json/healthicons') },
  { ...medical, load: () => import('@iconify-json/medical-icon') },
]

const loadedCollections: Record<string, LoadedCollection> = {}

async function loadIconsData(iconsJson: IconifyJSON) {
  const icons: Array<{ name: string, data: IconifyIcon }> = []

  await parseIconSetAsync(iconsJson, async (name, data) => {
    if (data) {
      icons.push({ name, data })
    }
  })

  return icons
}

export function IconPicker({ rtl = false, value, onIconChange }: IconPickerProps) {
  const [isLoading, setIsLoading] = useState(false)

  const [searchTerm, setSearchTerm] = useState('')

  const [currentCollection, setCurrentCollection] = useState(
    (value && collections.find(({ prefix }) => prefix === value.collection)) ?? collections[0]!,
  )
  const [icons, setIcons] = useState<Icon[]>(
    loadedCollections[currentCollection.prefix]?.icons ?? [],
  )

  const filteredIcons = useMemo(() => {
    return icons.filter(({ name }) => name.includes(searchTerm))
  }, [icons, searchTerm])

  const handleCollectionChange = async (selected: string) => {
    const collection = (collections.find(({ prefix }) => prefix === selected)) ?? collections[0]!

    if (collection !== currentCollection) {
      setCurrentCollection(collection)
    }

    if (!loadedCollections[collection.prefix] && !isLoading) {
      setIsLoading(true)

      const { icons: json, metadata } = await collection.load()
      const iconsData = await loadIconsData(json)
      loadedCollections[collection.prefix] = { icons: iconsData, metadata }

      setIsLoading(false)
    }

    setIcons(loadedCollections[collection.prefix]?.icons ?? [])
  }

  useEffect(() => {
    if (!loadedCollections[currentCollection.prefix]) {
      void handleCollectionChange(currentCollection.prefix)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const handleIconChange = (icon: Icon) => {
    onIconChange({ ...icon, collection: currentCollection.prefix })
  }

  return (
    <div className="flex flex-col overflow-hidden fluid-w-[320px,600px]">
      <IconPickerHeader
        collections={collections}
        isLoading={isLoading}
        rtl={rtl}
        searchTerm={searchTerm}
        selected={currentCollection.prefix}
        onCollectionChange={handleCollectionChange}
        onSearchTermChange={setSearchTerm}
      />

      <IconPickerList
        collection={currentCollection}
        icons={filteredIcons}
        onIconChange={handleIconChange}
      />
    </div>
  )
}
