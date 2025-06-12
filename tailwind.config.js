/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./app/**/*.{js,jsx}',
		'./components/**/*.{js,jsx}',
		'./pages/**/*.{js,jsx}',
	],
	theme: {
		extend: {
			colors: {
				backgroundDark: '#010f21',
                backgroundLight: '#591a9f',
				primary: '#fef7de',
				primaryHover: '#cbc6b2',
				secondary: '#eb567c',
				secondaryHover: '#bc4563',
				outline: '#eb567c',
			},
            fontFamily: {
			    heading: 'var(--font-orbitron)',
		    },
		},
	},
	plugins: [],
};