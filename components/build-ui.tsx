'use client'

import { useState } from 'react'
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from 'next/image'
import { Hero, Item, Heroes } from '@/lib/types'
import { Items } from '@/lib/items'
import { HeroList } from '@/lib/heroes'


export default function BuildUi() {

  const [heroImage, setHeroImage] = useState<string | null>(null)
  const [selectedItems, setSelectedItems] = useState<Item[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null)
  const [selectedHero, setSelectedHero] = useState<keyof typeof HeroList>('pocket')


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
const calculateOffensiveStats = () => {
  const bullet = selectedItems.reduce((sum, item) => item?.stat === 'Bullet' ? sum + item.value : sum, 0)
  const spirit = selectedItems.reduce((sum, item) => item?.stat === 'Spirit' ? sum + item.value : sum, 0)
  return { bullet, spirit }
}

const { bullet, spirit } = calculateOffensiveStats()


const toggleHero = () => {
  setSelectedHero((prevHero) => (prevHero === 'pocket' ? 'paradox' : 'pocket'))
}
 


const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setHeroImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }


  return (
      <div className="bg-black-500 text-gray-300 p-10 min-h-screen w-full">
        <div className="w-full mx-auto">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center space-x-4">
              <div className="relative w-16 h-16" onClick={toggleHero}>
                    <Image src={HeroList[selectedHero].image} alt="Profile" width={64} height={60} className="rounded-full object-cover" />
                <Label htmlFor="profile-upload" className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-1 cursor-pointer">
                  +
                </Label>
                <Input id="profile-upload" type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
              </div>
              <div>
                {selectedHero ? <p>{HeroList[selectedHero].name}</p> : <Skeleton className="h-6 w-32 mb-2" /> }
                <Skeleton className="h-4 w-48" />
              </div>
            </div>
            <Skeleton className="h-8 w-24" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="pt-2">
              <h2 className="text-lg font-semibold mb-2">Offensive</h2>
              <div className="flex items-center mb-2 gap-4">
                <span className="w-12">Bullet:</span>
                  <div className="h-full bg-orange-500 rounded" style={{ width: `${bullet/1.75 + 5}%` }}><p className="text-left pl-2 text-white text-xs">{bullet}</p></div>
              </div>
              <div className="flex items-center mb-2 gap-4">
                <span className="w-12">Spirit:</span>
                  <div className="h-full bg-purple-500 rounded" style={{ width: `${spirit/1.75 + 5}%` }}><p className="text-center text-white text-xs">{spirit}</p></div>
              </div>
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-2">Defensive</h2>
              {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex items-center mb-2">
                    <Skeleton className="h-4 w-4 mr-2" />
                    <Skeleton className="h-4 w-full" />
                  </div>
              ))}
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-2">Misc.</h2>
              {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex items-center mb-2">
                    <Skeleton className="h-4 w-4 mr-2" />
                    <Skeleton className="h-4 w-full" />
                  </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pl-14 pr-14 pb-14 pt-14">
            {['orange', 'green', 'purple', 'gray'].map((color, sectionIndex) => (
              <div key={color} className="grid grid-cols-2 gap-2">
                {[...Array(4)].map((_, i) => {
                  const itemIndex = 24 + sectionIndex * 4 + i;
                  return (
                    <div
                      key={i}
                      className={`bg-${color}-500 rounded-md p-2 aspect-square relative group cursor-pointer`}
                      onClick={() => openItemSelection(itemIndex)}>
                      <div className="transition-all duration-300 group-hover:scale-105">
                        <div className={`h-2 w-full mb-1 bg-${color}-500`} />
                        <div className={`h-1 w-3/4 bg-${color}-500`} />
                        {selectedItems[itemIndex] && (
                          <div className="absolute inset-0 flex items-center justify-center text-xs text-center p-1 bg-black bg-opacity-50 text-white">
                            {selectedItems[itemIndex].name}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Select an Item</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4">
              {Items.map((item) => (
                  <Button key={item.id} onClick={() => addItemToSlot(item)} variant="outline">
                    {item.name}
                  </Button>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </div>
  )
}