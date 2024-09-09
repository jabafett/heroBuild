import { useState } from 'react'
import { Item, Hero } from './types'
import { HeroList } from './heroes'


export function BuildUIutils() {
  const [selectedItems, setSelectedItems] = useState<Item[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null)
  const [selectedHero, setSelectedHero] = useState<Hero>(HeroList[0])

  const openItemSelection = (slotIndex: number) => {
    setSelectedSlot(slotIndex)
    setIsDialogOpen(true)
  }

  const addItemToSlot = (item: Item) => {
    if (selectedSlot !== null) {
      const newItems = [...selectedItems]
      newItems[selectedSlot] = item
      setSelectedItems(newItems)
      setIsDialogOpen(false)
    }
  }



  const toggleHero = () => {
    if (selectedHero.name === 'Pocket') {
      setSelectedHero(HeroList[1])
    } else {
      setSelectedHero(HeroList[0]);
    };
  }

  const calculateOffensiveStats = () => {
    return { bullet: selectedItems.reduce((sum, item) => item?.stat === 'Bullet' ? sum + item.value : sum, 0), spirit: selectedItems.reduce((sum, item) => item?.stat === 'Spirit' ? sum + item.value : sum, 0) }
  }
  const stats = calculateOffensiveStats()

  return {
    selectedItems,
    isDialogOpen,
    selectedSlot,
    selectedHero,
    openItemSelection,
    addItemToSlot,
    toggleHero,
    setIsDialogOpen,
    stats,
  }
}