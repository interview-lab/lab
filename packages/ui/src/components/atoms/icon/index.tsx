import type { SVGProps } from 'react';
import * as Icons from '../../../assets/svgs';

type IconProps = {
	icon: keyof typeof Icons;
} & SVGProps<SVGSVGElement>;

const Icon = ({ icon = 'IconBookMark', ...props }: IconProps) => {
	const IconComponent = Icons[icon];

	return <IconComponent {...props} />;
};

export default Icon;
