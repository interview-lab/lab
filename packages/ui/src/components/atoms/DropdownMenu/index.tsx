import clsx from 'clsx';
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
	defaultValue = '',
	onSelect,
	...props
}: DropdownMenuProps) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const [isOpen, setIsOpen] = useState(false);
	const [selectedItem, setSelectedItem] = useState<DropdownMenuItem>({
		label: defaultLabel,
		value: defaultValue,
	});

	useClickOutside(containerRef, () => {
		setIsOpen(false);
	});

	const handleToggle = () => {
		setIsOpen((openState) => !openState);
	};

	const handleSelect = (item: DropdownMenuItem) => {
		setSelectedItem(item);
		setIsOpen(false);
		onSelect?.(item);
	};

	return (
		<div
			ref={containerRef}
			className={clsx(containerStyle, className)}
			{...props}
		>
			<button
				type="button"
				className={clsx(buttonStyle, isOpen && activeButtonStyle)}
				onClick={handleToggle}
			>
				<span>{selectedItem.label}</span>
				<Icon icon="IconOpen" />
			</button>
			{isOpen && (
				<div className={menuStyle}>
					{items.map((item) => (
						<button
							type="button"
							key={item.value}
							className={clsx(
								menuItemStyle,
								selectedItem.value === item.value && activeMenuItemStyle,
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
