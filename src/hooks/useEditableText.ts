import { Dispatch, SetStateAction, useState } from "react";

interface UseEditableText {
	inputValue: string;
	setInputValue: Dispatch<SetStateAction<string>>;
	isActive: boolean;
	toggleInput: () => void;
	resetInput: () => void;
}

export function useEditableText(defaultValue: string): UseEditableText {
	const [inputValue, setInputValue] = useState(defaultValue);
	const [isActive, setIsActive] = useState(false);

	const toggleInput = () => {
		setIsActive(!isActive);
	};

	const resetInput = () => {
		setIsActive(false);
		setInputValue("");
	};

	return { inputValue, setInputValue, isActive, toggleInput, resetInput };
}
