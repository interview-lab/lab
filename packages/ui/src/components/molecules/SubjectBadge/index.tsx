import { Badge, Icon, type IconName } from '@/components/atoms';
import { badgeStyle } from './subjectBadge.css';

type SubjectBadgeProps = {
	type:
		| 'os'
		| 'database'
		| 'network'
		| 'data-structure'
		| 'algorithm'
		| 'frontend'
		| 'backend';
};

const OPTIONS: Record<
	SubjectBadgeProps['type'],
	{ text: string; icon?: IconName }
> = {
	os: {
		text: 'OS',
		icon: 'IconCode',
	},
	database: {
		text: 'Database',
		icon: 'IconDatabase',
	},
	network: {
		text: 'Network',
		icon: 'IconNetwork',
	},
	'data-structure': {
		text: 'Data Structure',
		icon: 'IconDataStructure',
	},
	algorithm: {
		text: 'Algorithm',
	},
	frontend: {
		text: 'Frontend',
	},
	backend: {
		text: 'Backend',
	},
};

const SubjectBadge = ({ type }: SubjectBadgeProps) => {
	const option = OPTIONS[type];
	return (
		<Badge data-type={type} className={badgeStyle}>
			{option.icon && <Icon icon={option.icon} width={14} />}
			{option.text}
		</Badge>
	);
};

export default SubjectBadge;
