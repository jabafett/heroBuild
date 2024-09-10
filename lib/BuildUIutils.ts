import { useState } from 'react'
import { Item } from './types'
import { ItemsList } from './items'

export function BuildUIutils() {
  const [selectedItems, setSelectedItems] = useState<Item[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isHeroDialogOpen, setIsHeroDialogOpen] = useState(false)
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null)
  const [selectedHero, setSelectedHero] = useState<number>(1)
  const [filterType, setFilterType] = useState<string | null>(null);
  const [filterTier, setFilterTier] = useState<string | null>(null);

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


  const handleOpenItemSelection = (slotIndex: number, type: string) => {
    setFilterType(type);
    setFilterTier(null);
    openItemSelection(slotIndex);
  };

  const filteredItems = ItemsList.filter((item: Item) => {
    if (filterType === 'gray') {
      return filterTier ? item.tier === filterTier : true;
    }
    const typeMap: { [key: string]: string } = {
      orange: 'bullet',
      green: 'vitality',
      purple: 'spirit'
    };
    return item.type.toLowerCase() === typeMap[filterType ? filterType : 'none'];
  });

  const calculateHeroStats = () => {
    return { 
      bulletPower: selectedItems.reduce((sum, item) => sum + (item?.bulletPower || 0), 0),
      spiritPower: selectedItems.reduce((sum, item) => sum + (item?.spiritPower || 0), 0),
      vitality: selectedItems.reduce((sum, item) => sum + (item?.vitality || 0), 0),
      bonusHealth: selectedItems.reduce((sum, item) => sum + (item?.bonusHealth || 0), 0),
      ammoFlat: selectedItems.reduce((sum, item) => sum + (item?.ammoFlat || 0), 0),
      ammoPercentage: selectedItems.reduce((sum, item) => sum + (item?.ammoPercentage || 0), 0),
      fireRate: selectedItems.reduce((sum, item) => sum + (item?.fireRate || 0), 0),
      meleeDamage: selectedItems.reduce((sum, item) => sum + (item?.meleeDamage || 0), 0),
      healthRegen: selectedItems.reduce((sum, item) => sum + (item?.healthRegen || 0), 0),
      bulletLifesteal: selectedItems.reduce((sum, item) => sum + (item?.bulletLifesteal || 0), 0),
      spiritLifesteal: selectedItems.reduce((sum, item) => sum + (item?.spiritLifesteal || 0), 0),
      bulletShieldHealth: selectedItems.reduce((sum, item) => sum + (item?.bulletShieldHealth || 0), 0),
      spiritShieldHealth: selectedItems.reduce((sum, item) => sum + (item?.spiritShieldHealth || 0), 0),
      bulletResist: selectedItems.reduce((sum, item) => sum + (item?.bulletResist || 0), 0),
      spiritResist: selectedItems.reduce((sum, item) => sum + (item?.spiritResist || 0), 0),
      movementSpeed: selectedItems.reduce((sum, item) => sum + (item?.movementSpeed || 0), 0),
      sprintSpeed: selectedItems.reduce((sum, item) => sum + (item?.sprintSpeed || 0), 0),
      bulletResistReduction: selectedItems.reduce((sum, item) => sum + (item?.bulletResistReduction || 0), 0),
      spiritResistReduction: selectedItems.reduce((sum, item) => sum + (item?.spiritResistReduction || 0), 0),
    }
  }
  const heroStats = calculateHeroStats()

  return {
    selectedItems,
    isDialogOpen,
    selectedSlot,
    selectedHero,
    isHeroDialogOpen,
    setIsHeroDialogOpen,
    setSelectedHero,
    setSelectedItems,
    setIsDialogOpen,
    openItemSelection,
    addItemToSlot,
    handleOpenItemSelection,
    heroStats,
    filteredItems,
    filterType,
    setFilterType,
    filterTier,
    setFilterTier,
  }
}