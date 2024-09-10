import * as XLSX from 'xlsx';
import * as fs from 'fs';
import * as path from 'path';
import { Item} from '../lib/types'

// Define an interface for the raw data from the Excel sheet
interface RawItemData {
  Name: string;
  Tier: string;
  Description: string;
  Cost: number;
  'Spirit Power': number;
  'Bonus Health': number;
  'Weapon Damage': number;
  'Rarity Bonus Spirit Power': number;
  'Rarity Bonus Base Health': number;
  'Rarity Bonus Weapon Damage': number;
  'Conditional?': string; // yes or no
  'Active?': string; // yes or no
  'Passive?': string; // yes or no
  'Ammo (flat)': number;
  'Ammo (%)': number;
  'Fire Rate': number; // percentage
  'Melee Damage': number;
  'Health Regen': number;
  'Bullet Lifesteal': number;
  'Spirit Lifesteal': number;
  'Bullet Shield Health': number;
  'Spirit Shield Health': number;
  'Bullet Resist': number;
  'Spirit Resist': number;
  'Movement Speed (m/s)': number;
  'Sprint Speed (m/s)': number;
  'Bullet Resist Reduction': number;
  'Spirit Resist Reduction': number;

  // Add other properties as they appear in your Excel sheet
}


function extractItems(): Item[] {
  // Read the XLSX file
  const workbook = XLSX.readFile('./data/DeadlockDataPublic.xlsx');
  // Read Items sheet
  const sheet = workbook.Sheets['Items'];
  // Convert sheet to JSON
  const rawData = XLSX.utils.sheet_to_json<RawItemData>(sheet);
  // Process and map the data to Item objects
  const items: Item[] = rawData.map((row: RawItemData, index: number) => ({
    id: index,
    name: row.Name,
    tier: row.Tier,
    type: row['Rarity Bonus Spirit Power'] !== 0 ? "Spirit" : row['Rarity Bonus Weapon Damage'] !== 0 ? "Bullet" : "Vitality",
    bulletPower: (row['Rarity Bonus Weapon Damage'] + row['Weapon Damage']),
    vitality: row['Rarity Bonus Base Health'],
    bonusHealth: row['Bonus Health'],
    spiritPower: (row['Spirit Power'] + row['Rarity Bonus Spirit Power']),
    ammoFlat: row['Ammo (flat)'] >= 0 ? row['Ammo (flat)'] : 0,
    ammoPercentage: row['Ammo (%)'],
    fireRate: row['Fire Rate'],
    meleeDamage: row['Melee Damage'],
    healthRegen: row['Health Regen'],
    bulletLifesteal: row['Bullet Lifesteal'],
    spiritLifesteal: row['Spirit Lifesteal'],
    bulletShieldHealth: row['Bullet Shield Health'],
    spiritShieldHealth: row['Spirit Shield Health'],
    bulletResist: row['Bullet Resist'],
    spiritResist: row['Spirit Resist'],
    movementSpeed: row['Movement Speed (m/s)'],
    sprintSpeed: row['Sprint Speed (m/s)'],
    bulletResistReduction: row['Bullet Resist Reduction'],
    spiritResistReduction: row['Spirit Resist Reduction'],
    conditional: row['Conditional?'],
    active: row['Active?'],
    passive: row['Passive?'],
    // Add other stats as needed
  }));

  // console.log(items);

  return items;
}

// Extract items and write to file
const items = extractItems();
const outputPath = path.resolve(__dirname, '../lib/items.ts');
const fileContent = `
import { Item } from './types';

export const ItemsList: Item[] = ${JSON.stringify(items, null, 2)};
`;
fs.writeFileSync(outputPath, fileContent, 'utf8');
console.log(`Items data written to ${outputPath}`);
