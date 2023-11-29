import type { Config } from 'tailwindcss';

const pokeTypes = [
	'bug',
	'dark',
	'dragon',
	'electric',
	'fairy',
	'fighting',
	'fire',
	'flying',
	'ghost',
	'grass',
	'ground',
	'ice',
	'normal',
	'poison',
	'psychic',
	'rock',
	'steel',
	'water'
];

const config: Config = {
	content: [
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}'
	],
	theme: {
		extend: {
			colors: {
				'bug': '#A8B820',
				'dark': '#705848',
				'dragon': '#7038F8',
				'electric': '#F8D030',
				'fairy': '#EE99AC',
				'fighting': '#C03028',
				'fire': '#F08030',
				'flying': '#A890F0',
				'ghost': '#705898',
				'grass': '#78C850',
				'ground': '#E0C068',
				'ice': '#98D8D8',
				'normal': '#A8A878',
				'poison': '#A040A0',
				'psychic': '#F85888',
				'rock': '#B8A038',
				'steel': '#B8B8D0',
				'water': '#6890F0',
				'bug-dark': '#6C7A18',
				'dark-dark': '#49392F',
				'dragon-dark': '#4924A1',
				'electric-dark': '#A1871F',
				'fairy-dark': '#9B6470',
				'fighting-dark': '#7D1F1A',
				'fire-dark': '#9C531F',
				'flying-dark': '#6D5E9C',
				'ghost-dark': '#493963',
				'grass-dark': '#4E8234',
				'ground-dark': '#927D44',
				'ice-dark': '#638D8D',
				'normal-dark': '#6D6D4E',
				'poison-dark': '#682A68',
				'psychic-dark': '#A13959',
				'rock-dark': '#786824',
				'steel-dark': '#787887',
				'water-dark': '#445E9C',
				'bug-accent': '#C6D16E',
				'dark-accent': '#A29288',
				'dragon-accent': '#A27DFA',
				'electric-accent': '#FAE078',
				'fairy-accent': '#F4BDC9',
				'fighting-accent': '#D67873',
				'fire-accent': '#F5AC78',
				'flying-accent': '#A890F0',
				'ghost-accent': '#A292BC',
				'grass-accent': '#A7DB8D',
				'ground-accent': '#EBD69D',
				'ice-accent': '#BCE6E6',
				'normal-accent': '#C6C6A7',
				'poison-accent': '#C183C1',
				'psychic-accent': '#FA92B2',
				'rock-accent': '#D1C17D',
				'steel-accent': '#D1D1E0',
				'water-accent': '#9DB7F5'
			}
		}
	},
	safelist: [
		...pokeTypes.map(type => `bg-${type}`),
		...pokeTypes.map(type => `bg-${type}-dark`),
		...pokeTypes.map(type => `bg-${type}-accent`),
		...pokeTypes.map(type => `text-${type}`),
		...pokeTypes.map(type => `text-${type}-dark`),
		...pokeTypes.map(type => `text-${type}-accent`),
		...pokeTypes.map(type => `border-${type}`),
		...pokeTypes.map(type => `border-${type}-dark`),
		...pokeTypes.map(type => `border-${type}-accent`),
		...pokeTypes.map(type => `hover:bg-${type}`),
		...pokeTypes.map(type => `hover:bg-${type}-dark`),
		...pokeTypes.map(type => `hover:bg-${type}-accent`)
	],
	plugins: [require('daisyui')],
	daisyui: {
		themes: ['cupcake']
	}
};
export default config;
