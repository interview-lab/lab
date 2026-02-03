import { vars } from '@interview-lab/ui/theme';
import { globalStyle, style } from '@vanilla-extract/css';

export const pageStyle = style({
	display: 'flex',
	width: '100%',
	height: '100%',
});

export const sideBarStyle = style({
	height: '100%',
	width: 256,
	padding: vars.spacing['6'],
	backgroundColor: '#F8FAFC',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
});

globalStyle(`${sideBarStyle} > button`, {
	backgroundColor: '#F1F5F9',
	alignSelf: 'stretch',
	position: 'relative',
});

globalStyle(`${sideBarStyle} > button:hover`, {
	backgroundColor: '#E2E8F0',
});

globalStyle(`${sideBarStyle} > button > svg`, {
	position: 'absolute',
	right: vars.spacing['3'],
	top: '50%',
	transform: 'translateY(-50%)',
});

export const sideBarContentStyle = style({
	display: 'flex',
	flexDirection: 'column',
	width: '100%',
	flex: 1,
});

export const sideBarHeadingStyle = style({
	display: 'flex',
	alignItems: 'center',
	gap: vars.spacing['3'],
	alignSelf: 'flex-start',
	marginBottom: vars.spacing['8'],
});

globalStyle(`${sideBarHeadingStyle} h1`, {
	fontSize: 18,
	fontWeight: vars.fontWeight.bold,
	letterSpacing: -0.45,
});

export const progressSectionStyle = style({
	width: '100%',
});

globalStyle(`${progressSectionStyle} > p:first-child`, {
	fontSize: 14,
	fontWeight: vars.fontWeight.semibold,
	color: vars.color.gray,
	letterSpacing: 0.7,
	marginBottom: vars.spacing['4'],
});

export const progressContainerStyle = style({
	height: '100%',
	display: 'flex',
	flexDirection: 'column',
});

globalStyle(`${progressContainerStyle} > div`, {
	display: 'flex',
});

globalStyle(`${progressContainerStyle} > div > div:last-child`, {
	paddingBlock: vars.spacing['2'],
});

globalStyle(`${progressContainerStyle} > div p:first-child`, {
	fontSize: vars.fontSize.sizeSm,
	fontWeight: vars.fontWeight.bold,
});

globalStyle(`${progressContainerStyle} > div p:last-child`, {
	fontSize: vars.fontSize.sizeXs,
	fontWeight: vars.fontWeight.medium,
	color: vars.color.grayDark,
});

globalStyle(`${progressContainerStyle} > div[data-status="IN_PROGRESS"] p`, {
	color: vars.color.blue,
});

globalStyle(`${progressContainerStyle} > div[data-status="NOT_STARTED"] p`, {
	color: '#94A3B8',
	fontWeight: vars.fontWeight.medium,
});

export const lineContainerStyle = style({
	width: 36,
	height: '100%',
	display: 'grid',
	placeItems: 'center',
});

export const lineBackgroundStyle = style({
	gridArea: '1 / 1',
	height: '100%',
	width: 3,
	backgroundColor: vars.color.grayLight,
});

export const lineStyle = style({
	gridArea: '1 / 1',
	alignSelf: 'start',
	height: 0,
	width: 3,
	backgroundColor: vars.color.blue,
	transition: 'height 0.3s ease-in-out',
});

export const lineActiveStyle = style({
	transitionDelay: '0.3s',
	height: '50%',
});

export const lineCompletedStyle = style({
	height: '100%',
});

globalStyle(`${progressContainerStyle} > div:first-child ${lineStyle}`, {
	borderTopRightRadius: 1.5,
	borderTopLeftRadius: 1.5,
});

globalStyle(`${progressContainerStyle} > div:last-child ${lineStyle}`, {
	borderBottomRightRadius: 1.5,
	borderBottomLeftRadius: 1.5,
});

globalStyle(
	`${progressContainerStyle} > div:first-child ${lineBackgroundStyle}`,
	{
		borderTopRightRadius: 1.5,
		borderTopLeftRadius: 1.5,
	},
);

globalStyle(`${progressContainerStyle} > div:last-child ${lineStyle}`, {
	borderBottomRightRadius: 1.5,
	borderBottomLeftRadius: 1.5,
});

globalStyle(
	`${progressContainerStyle} > div:last-child ${lineBackgroundStyle}`,
	{
		borderBottomRightRadius: 1.5,
		borderBottomLeftRadius: 1.5,
	},
);

export const questionNumberStyle = style({
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	gridArea: '1 / 1',
	fontSize: vars.fontSize.sizeXs,
	fontWeight: vars.fontWeight.bold,
	color: vars.color.gray,
	width: 20,
	height: 20,
	borderRadius: 10,
	backgroundColor: '#F8FAFC',
	border: `2px solid ${vars.color.grayLight}`,

	selectors: {
		[`${progressContainerStyle} > div[data-status="COMPLETED"] &`]: {
			border: 'none',
			backgroundColor: vars.color.blue,
			color: vars.color.white,
		},
		[`${progressContainerStyle} > div[data-status="IN_PROGRESS"] &`]: {
			border: 'none',
			backgroundColor: vars.color.blue,
			color: vars.color.white,
		},
	},
});

globalStyle(`${questionNumberStyle} svg`, {
	width: 16,
	height: 16,
});

export const iconStyle = style({
	position: 'relative',
	width: 14,
	height: 14,
	borderRadius: 7,
	border: `2px solid ${vars.color.white}`,

	'::after': {
		position: 'absolute',
		content: '',
		width: 5,
		height: 5,
		borderRadius: 5,
		backgroundColor: vars.color.white,
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
	},
});
