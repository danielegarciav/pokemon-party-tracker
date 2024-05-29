export interface PokemonType {
  id: number;
  bgColor: string;
}

/**
 * Mapping of Pokemon types, by name, to their IDs and background colors.
 * Taken from table at: https://bulbapedia.bulbagarden.net/wiki/Type
 */
export const pokemonTypes: Record<string, PokemonType> = {
  normal: { id: 1, bgColor: '#959795' },
  fighting: { id: 2, bgColor: '#EF7E14' },
  flying: { id: 3, bgColor: '#81AEEC' },
  poison: { id: 4, bgColor: '#7F3CC4' },
  ground: { id: 5, bgColor: '#7F4B20' },
  rock: { id: 6, bgColor: '#A4A076' },
  bug: { id: 7, bgColor: '#879717' },
  ghost: { id: 8, bgColor: '#603B65' },
  steel: { id: 9, bgColor: '#6295AF' },
  fire: { id: 10, bgColor: '#D1382A' },
  water: { id: 11, bgColor: '#3D71EC' },
  grass: { id: 12, bgColor: '#4B9522' },
  electric: { id: 13, bgColor: '#F0BC0E' },
  psychic: { id: 14, bgColor: '#DB4870' },
  ice: { id: 15, bgColor: '#5CC3F1' },
  dragon: { id: 16, bgColor: '#4D53DD' },
  dark: { id: 17, bgColor: '#554445' },
  fairy: { id: 18, bgColor: '#DF6CED' },
  stellar: { id: 19, bgColor: '#415682' },
  unknown: { id: 10001, bgColor: '#679484' },
  shadow: { id: 10002, bgColor: '#000000' },
};

export const getTypeBgColor = (type: string) => pokemonTypes[type]?.bgColor ?? '#000000';
