import { useRef } from "react";
import styles from "./EditableLabel.module.scss";

interface EditableLabelProps {
	active: boolean;
	value: string;
	children: React.ReactNode;
	inputType?: string;
	placeholder?: string;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
	onBlur?: () => void;
}

//@todo Evol : When toggle component to input the cursor is where the user cliqued (and not at end of input value)

function EditableLabel({
	active,
	value,
	children,
	inputType,
	placeholder,
	onChange,
	onSubmit,
	onBlur,
}: EditableLabelProps) {
	const inputRef = useRef<HTMLInputElement>(null);

	return active ? (
		<form className={styles.form} onSubmit={onSubmit}>
			<input
				autoFocus
				ref={inputRef}
				value={value}
				onChange={onChange}
				onBlur={onBlur}
				placeholder={placeholder ?? undefined}
				className={`${styles.input} ${
					inputType ? styles[inputType] : ""
				}`}
			/>
		</form>
	) : (
		children
	);
}

export default EditableLabel;
