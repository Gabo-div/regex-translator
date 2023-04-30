import { useState, useRef, useEffect } from "react";

interface Props {
	value: string;
	onChange: (value: string) => void;
	pattern: string;
}

const Highlighter = ({ value, onChange, pattern }: Props) => {
	const [isEditing, setIsEditing] = useState<boolean>(false);
	const textareaRef = useRef<HTMLTextAreaElement | null>(null);
	const [regex, setRegex] = useState<RegExp | null>(null);
	const [matches, setMatches] = useState<number>(0);

	const [elements, setElements] = useState<JSX.Element[]>([]);

	useEffect(() => {
		try {
			setRegex(pattern === "" ? null : new RegExp(`(${pattern})`, "g"));
		} catch (error) {
			setRegex(null);
		}
	}, [pattern]);

	useEffect(() => {
		setMatches(0);
		setElements(
			value.split("\n").map((line, li) => {
				if (line === "") return <br key={"line" + li} />;

				return (
					<p key={"line" + li}>
						{regex
							? line.split(regex).map((block, bi) => {
									const match = block.match(regex);

									if (match) {
										setMatches((m) => m + 1);
										return (
											<span
												key={"line" + li + "block" + bi}
												className="bg-green-600/40"
											>
												{block}
											</span>
										);
									}

									return (
										<span key={"line" + li + "block" + bi}>
											{block}
										</span>
									);
							  })
							: line}
					</p>
				);
			})
		);
	}, [value, regex]);

	const handleEdit = () => {
		setIsEditing(true);
		setTimeout(() => {
			if (!textareaRef.current) return;
			textareaRef.current.focus();
		}, 100);
	};

	return (
		<>
			{" "}
			<p
				className={`top-1 left-2  ${
					matches > 0 ? "text-green-600" : "text-red-600"
				}`}
			>
				{matches} matches
			</p>
			<div className="h-80 bg-zinc-800/40 border-neutral-800 border rounded-xl">
				<textarea
					value={value}
					onChange={(e) => onChange(e.target.value)}
					autoFocus
					ref={textareaRef}
					onBlur={() => setIsEditing(false)}
					className={`${
						isEditing ? "block" : "hidden"
					} resize-none bg-transparent h-full w-full py-3 px-2 text-md outline-0`}
				></textarea>

				<div
					onClick={handleEdit}
					className={`${
						!isEditing ? "block" : "hidden"
					}  overflow-auto h-full w-full py-3 px-2 text-md outline-0`}
				>
					{elements}
				</div>
			</div>
		</>
	);
};

export default Highlighter;
