import { createGlobalTheme } from '@vanilla-extract/css';
import { pretendard } from './text.css';

export const vars = createGlobalTheme(':root', {
	color: {
		// Blue
		blue: '#137FEC',
		blueHover: '#1067C4',
		blueActive: '#0E5AAF',
		blueLight: '#92ADC9',
		blueDark: '#233648',
		blueGray: '#64748B',
		blueAlpha10: 'rgba(19, 127, 236, 0.1)',
		blueAlpha20: 'rgba(19, 127, 236, 0.2)',

		// Gray
		gray: '#4B5563',
		grayLight: '#E5E7EB',
		grayDark: '#374151',

		// Green
		green: '#0BDA5B',
		greenAlpha10: 'rgba(11, 218, 91, 0.1)',
		greenAlpha20: 'rgba(11, 218, 91, 0.2)',
		greenAlpha70: 'rgba(11, 218, 91, 0.7)',

		// Orange
		orange: '#F97316',
		orangeAlpha10: 'rgba(249, 115, 22, 0.1)',
		orangeAlpha20: 'rgba(249, 115, 22, 0.2)',
		orangeAlpha70: 'rgba(249, 115, 22, 0.7)',

		// Base
		black: '#1A2633',
		white: '#FFFFFF',

		border: {
			default: '#324D67',
			error: '#EF4444',
		},

		disabled: {
			text: '#9CA3AF',
			border: '#D1D5DB',
			background: '#F3F4F6',
		},
	},
	fontSize: {
		// Caption (12px Light)
		sizeXs: '12px',
		// Base2 (14px Regular), Base1 (14px Medium), Button2 (14px Bold)
		sizeSm: '14px',
		// Button1 (16px Bold), Subtitle (16px SemiBold)
		sizeBase: '16px',
		// Title3 (20px SemiBold)
		sizeXl: '20px',
		// Title1 (36px ExtraBold), Title2 (36px Bold)
		size4xl: '36px',
	},
	fontWeight: {
		light: '300',
		regular: '400',
		medium: '500',
		semibold: '600',
		bold: '700',
		extrabold: '800',
	},
	spacing: {
		'1': '4px',
		'2': '8px',
		'3': '12px',
		'4': '16px',
		'5': '20px',
		'6': '24px',
		'8': '32px',
		'10': '40px',
		'11': '44px',
		'12': '48px',
		'16': '64px',
	},
	radius: {
		sm: '4px',
		default: '8px',
		md: '12px',
		lg: '16px',
		xl: '20px',
		full: '9999px',
	},
	border: {
		width1: '1px solid',
		width2: '2px solid',
	},
	shadow: {
		sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
		md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
		lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
		xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
		input: {
			default:
				'0 1px 2px 0 rgba(0, 0, 0, 0.05), inset 0 0 0 1px #E2E8F0, inset 0 0 0 0 #FFFFFF',
		},
	},
	blur: {
		sm: '4px',
		md: '8px',
		lg: '12px',
	},
	z: {
		dropdown: '50',
		modal: '100',
		tooltip: '150',
	},
	font: {
		pretendard: pretendard,
	},
});
