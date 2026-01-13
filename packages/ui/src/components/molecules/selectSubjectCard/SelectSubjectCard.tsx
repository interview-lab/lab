import clsx from 'clsx';
import { useState } from 'react';
import Icon from '@/components/atoms/Icon';
import SquareButton from '@/components/atoms/SquareButton';
import {
	checkIconStyle,
	containerStyle,
	descriptionStyle,
	selectedStyle,
	titleStyle,
} from './selectSubjectCard.css';
import { SUBJECT_OPTIONS, type SubjectKey } from './subjectOptions';

type SelectSubjectCardProps = {
	option: SubjectKey;
};

const SelectSubjectCard = ({ option }: SelectSubjectCardProps) => {
	const [isSelected, setIsSelected] = useState(false);
	const { icon, iconColor, title, description } = SUBJECT_OPTIONS[option];

	const handleClick = () => {
		setIsSelected((prev) => !prev);
	};

	return (
		<button
			type="button"
			className={clsx(containerStyle, isSelected && selectedStyle)}
			onClick={handleClick}
		>
			<SquareButton icon={icon} iconColor={iconColor} active={isSelected} />
			{isSelected && <Icon icon="IconCheckCircle" className={checkIconStyle} />}
			<h1 className={titleStyle}>{title}</h1>
			<span className={descriptionStyle}>{description}</span>
		</button>
	);
};

export default SelectSubjectCard;
