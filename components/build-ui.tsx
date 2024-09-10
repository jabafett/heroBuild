'use client'


import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
import Image from 'next/image'
// import { Hero, Item } from '@/lib/types'
import { Card, CardContent } from "@/components/ui/card"
// import { ItemsList } from '@/lib/items'
import { HeroList } from '@/lib/heroes'
import { BuildUIutils } from '@/lib/BuildUIutils'


export default function BuildUi() {



  const {
    selectedItems,
    isDialogOpen,
    selectedHero,
    isHeroDialogOpen,
    setIsHeroDialogOpen,
    setSelectedHero,
    setSelectedItems,
    setIsDialogOpen,
    handleOpenItemSelection,
    addItemToSlot,
    heroStats,
    filteredItems,
    filterType,
    setFilterType,
    filterTier,
    setFilterTier,
  } = BuildUIutils()

  return (
      <div className="bg-gray-300 text-black min-h-screen w-full">
        <div className="w-full mx-auto p-4">
          <div className="flex justify-between items-start">
            <div className="flex items-center space-x-4">
              <div className="relative w-16 h-16 cursor-pointer hover:scale-110" onClick={() => setIsHeroDialogOpen(true)}>
                    <Image src={HeroList[selectedHero].image} alt="Profile" width={64} height={60} className="rounded-full object-cover" />
              </div>
              <div>
                {selectedHero ? <p>{HeroList[selectedHero].name}</p> : <Skeleton className="h-6 w-32 mb-2" /> }
                <Skeleton className="h-4 w-48" />
              </div>
            </div>
            <Skeleton className="h-8 w-24" />
          </div>
          
          <div className="max-w-[75%] mx-auto">
          <div className="bg-gray-200 rounded-sm">  
          <div className="grid grid-cols-1 md:grid-cols-[2fr,3fr,3fr] gap-4 m-4 pt-4">
            <div>
              <h2 className="text-lg font-semibold mb-2">Main Stats</h2>
              <div className="flex items-center mb-2 gap-4">
                <span className="w-12">Bullet:</span>
                  <div className="h-full bg-orange-500 rounded" style={{ width: `${heroStats.bulletPower + 5}%` }}><p className="text-center text-white text-xs">{heroStats.bulletPower * 100}</p></div>
              </div>
              <div className="flex items-center mb-2 gap-4">
                <span className="w-12">Spirit:</span>
                  <div className="h-full bg-purple-500 rounded" style={{ width: `${heroStats.spiritPower/1.75 + 5}%` }}><p className="text-center text-white text-xs">{heroStats.spiritPower}</p></div>
              </div>
              <div className="flex items-center mb-2 gap-4">
                <span className="w-12">Health:</span>
                  <div className="h-full bg-green-500 rounded" style={{ width: `${heroStats.vitality * 100 + 5}%` }}><p className="text-center text-white text-xs">{heroStats.vitality * 100 | 0}</p></div>
              </div>
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-2">Damage</h2>
              {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex items-center mb-2">
                    <Skeleton className="h-4 w-4 mr-2" />
                    <Skeleton className="h-4 w-full" />
                  </div>
              ))}
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-2">Vitality</h2>
              {[...Array(5)].map((_, i) => (
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
                        onClick={() => handleOpenItemSelection(itemIndex, color)}>
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
          {filterType === 'gray' && filterTier == null ? (
            <div className="flex flex-col space-y-2">
              {['T1', 'T2', 'T3', 'T4'].map(tier => (
                <Button key={tier} onClick={() => setFilterTier(tier)} variant="outline">
                  {tier}
                </Button>
              ))}
            </div>
          ) : filterType === 'gray' ? (
            <div className="flex flex-col space-y-2">
              {['orange', 'green', 'purple'].map(type => (
                <Button key={type} onClick={() => setFilterType(type)} variant="outline">{type}</Button>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {filteredItems.map((item) => (
                <Button key={item.id} onClick={() => addItemToSlot(item)} variant="outline">
                  {item.name}
                </Button>
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>

        <Dialog open={isHeroDialogOpen} onOpenChange={setIsHeroDialogOpen}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Select a Hero</DialogTitle>
    </DialogHeader>
    <div className="grid grid-cols-2 gap-4">
      {Object.entries(HeroList).map(([id, hero]) => (
        <Card key={id} className="cursor-pointer" onClick={() => {
          setSelectedHero(Number(id));
          setSelectedItems([]);
          setIsHeroDialogOpen(false);
        }}>
          <CardContent className="flex flex-col items-center p-4">
            <Image src={hero.image} alt={hero.name} width={64} height={64} className="rounded-full mb-2" />
            <p>{hero.name}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  </DialogContent>
</Dialog>
      </div>
  )
}