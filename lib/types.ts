export type Item = {
    id: number;
    name: string;
    tier: string;
    type: string;
    bulletPower: number;
    vitality: number;
    bonusHealth: number;
    spiritPower: number;
    ammoFlat: number;
    ammoPercentage: number;
    fireRate: number;
    meleeDamage: number;
    healthRegen: number;
    bulletLifesteal: number;
    spiritLifesteal: number;
    bulletShieldHealth: number;
    spiritShieldHealth: number;
    bulletResist: number;
    spiritResist: number;
    movementSpeed: number;
    sprintSpeed: number;
    bulletResistReduction: number;
    spiritResistReduction: number;
    conditional: string;
    active: string;
    passive: string;
};


export type Hero = {
    name: string;
    image: string;
  };

export type Heroes = {
  [key: number]: Hero;
}
