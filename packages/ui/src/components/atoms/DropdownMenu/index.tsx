import { mergeClassnames } from '@interview-lab/shared';
import type { HTMLAttributes } from 'react';
import { useRef, useState } from 'react';
import Icon from '@/components/atoms/Icon';
import useClickOutside from '@/hooks/useClickOutside';
import {
	activeButtonStyle,
	activeMenuItemStyle,
	buttonStyle,
	containerStyle,
	menuItemStyle,
	menuStyle,
} from './dropdownMenu.css';

export type DropdownMenuItem = {
	label: string;
	value: string;
};

export type DropdownMenuProps = HTMLAttributes<HTMLDivElement> & {
	items: DropdownMenuItem[];
	defaultLabel?: string;
	defaultValue?: string;
	onSelect?: (item: DropdownMenuItem) => void;
};

const DropdownMenu = ({
	className,
	items,
	defaultLabel = '모든 카테고리',
	defaultValue,
	onSelect,
	...props
}: DropdownMenuProps) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const [isOpen, setIsOpen] = useState(false);
	const [selectedValue, setSelectedValue] = useState<string | null>(
		defaultValue ?? null,
	);

	useClickOutside(containerRef, () => {
		setIsOpen(false);
	});

	const allItems: DropdownMenuItem[] = [
		{ label: defaultLabel, value: '' },
		...items,
	];

	const selectedItem = allItems.find((item) => item.value === selectedValue);
	const displayLabel = selectedItem?.label ?? defaultLabel;

	const handleToggle = () => {
		setIsOpen(!isOpen);
	};

	const handleSelect = (item: DropdownMenuItem) => {
		setSelectedValue(item.value);
		setIsOpen(false);
		onSelect?.(item);
	};

	return (
		<div
			ref={containerRef}
			className={mergeClassnames(containerStyle, className)}
			{...props}
		>
			<button
				type="button"
				className={mergeClassnames(
					buttonStyle,
					isOpen ? activeButtonStyle : undefined,
				)}
				onClick={handleToggle}
			>
				<p>{displayLabel}</p>
				<Icon icon="IconOpen" />
			</button>
			{isOpen && (
				<div className={menuStyle}>
					{allItems.map((item) => (
						<button
							type="button"
							key={item.value}
							className={mergeClassnames(
								menuItemStyle,
								selectedValue === item.value ? activeMenuItemStyle : undefined,
							)}
							onClick={() => handleSelect(item)}
						>
							{item.label}
						</button>
					))}
				</div>
			)}
		</div>
	);
};

export default DropdownMenu;
