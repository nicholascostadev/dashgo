import { extendTheme, ThemeConfig } from '@chakra-ui/react';

const styles = {
	global: (props: any) => ({
		body: {
			bg: props.colorMode === 'dark' ? 'gray.900' : 'white',
			color: props.colorMode === 'dark' ? 'white' : 'gray.600',
		},
	}),
};

export const theme: ThemeConfig = extendTheme({
	initialColorMode: 'light',
	useSystemColorMode: false,
	colors: {
		gray: {
			'900': '#181b23',
			'800': '#1f2029',
			'700': '#353646',
			'600': '#4b4d63',
			'500': '#616480',
			'400': '#797d9a',
			'300': '#9699b0',
			'200': '#b3b5c9',
			'100': '#d1d2dc',
			'50': '#eeeef2',
		},
	},
	fonts: {
		heading: 'Roboto',
		body: 'Roboto',
	},
	styles,
});
