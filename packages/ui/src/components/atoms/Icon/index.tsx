import type { SVGProps } from 'react';
import * as Icons from '../../../assets/svgs';

export type IconName = keyof typeof Icons;

type IconProps = {
	icon: IconName;
} & SVGProps<SVGSVGElement>;

const Icon = ({ icon = 'IconBookMark', ...props }: IconProps) => {
	const IconComponent = Icons[icon];

	return <IconComponent {...props} />;
};

export default Icon;
