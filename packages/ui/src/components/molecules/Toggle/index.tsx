import clsx from 'clsx';
import {
	toggleButtonActiveStyle,
	toggleButtonStyle,
	toggleStyle,
} from './toggle.css';

export type ToggleItem<T = string> = {
	label: string;
	value: T;
};

type ToggleProps<T = string> = {
	items: readonly ToggleItem<T>[];
	selectedValue: T;
	onSelect: (value: T) => void;
};

const Toggle = <T,>({ items, selectedValue, onSelect }: ToggleProps<T>) => {
	return (
		<div className={toggleStyle}>
			{items.length > 0 &&
				items.map((item) => (
					<button
						key={item.label}
						type="button"
						onClick={() => onSelect(item.value)}
						className={clsx(
							toggleButtonStyle,
							item.value === selectedValue && toggleButtonActiveStyle,
						)}
					>
						{item.label}
					</button>
				))}
		</div>
	);
};

export default Toggle;
