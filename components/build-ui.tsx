'use client'


import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
import Image from 'next/image'
// import { Hero, Item } from '@/lib/types'
import { ItemsList } from '@/lib/items'
// import { HeroList } from '@/lib/heroes'
import { BuildUIutils } from '@/lib/BuildUIutils'


export default function BuildUi() {

  const {
    selectedItems,
    isDialogOpen,
    selectedHero,
    openItemSelection,
    addItemToSlot,
    toggleHero,
    setIsDialogOpen,
    stats,
  } = BuildUIutils()

  return (
      <div className="bg-gray-300 text-black min-h-screen w-full">
        <div className="w-full mx-auto p-4">
          <div className="flex justify-between items-start">
            <div className="flex items-center space-x-4">
              <div className="relative w-16 h-16 cursor-pointer hover:scale-110" onClick={toggleHero}>
                    <Image src={selectedHero.image} alt="Profile" width={64} height={60} className="rounded-full object-cover" />
              </div>
              <div>
                {selectedHero ? <p>{selectedHero.name}</p> : <Skeleton className="h-6 w-32 mb-2" /> }
                <Skeleton className="h-4 w-48" />
              </div>
            </div>
            <Skeleton className="h-8 w-24" />
          </div>
          
          <div className="max-w-[75%] mx-auto">
          <div className="bg-gray-200 rounded-sm">  
          <div className="grid grid-cols-1 md:grid-cols-[2fr,3fr,3fr] gap-4 m-4 pt-4">
            <div>
              <h2 className="text-lg font-semibold mb-2">Offensive</h2>
              <div className="flex items-center mb-2 gap-4">
                <span className="w-12">Bullet:</span>
                  <div className="h-full bg-orange-500 rounded" style={{ width: `${stats.bullet/1.75 + 5}%` }}><p className="text-center text-white text-xs">{stats.bullet}</p></div>
              </div>
              <div className="flex items-center mb-2 gap-4">
                <span className="w-12">Spirit:</span>
                  <div className="h-full bg-purple-500 rounded" style={{ width: `${stats.spirit/1.75 + 5}%` }}><p className="text-center text-white text-xs">{stats.spirit}</p></div>
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
          </div></div>
          <div className="bg-gray-200 rounded-lg p-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {['orange', 'green', 'purple', 'gray'].map((color, sectionIndex) => (
                <div key={color} className="grid grid-cols-2 gap-2">
                  {[...Array(4)].map((_, i) => {
                    const itemIndex = 24 + sectionIndex * 4 + i;
                    return (
                      <div
                        key={i}
                        className={`bg-${color}-500 rounded-md p-2 aspect-square relative group cursor-pointer hover:scale-105`}
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
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Select an Item</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4">
              {ItemsList.map((item) => (
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