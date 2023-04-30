import { Inter } from "next/font/google";
import { trpc } from "@/utils/trpc";
import { useState } from "react";
import Spinner from "@/components/Spinner";
import { MdOutlineContentCopy, MdCode } from "react-icons/md";
import { FaGithub } from "react-icons/fa";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Highlighter from "@/components/Highlighter";
const inter = Inter({ subsets: ["latin"] });
const initialTest = `Regular expressions, or regex, are a sequence of characters that define a search pattern. They are used to matching patterns in text data and are supported by many programming languages. Regular expressions can match single or multiple characters using quantifiers, groups of characters using character classes, and special characters called meta-characters. They can also capture groups of text data and replace text data using the "replace" function.

Regular expressions can be difficult to master, but they are an essential tool for text processing tasks. They can be used for tasks such as data cleaning, text mining, and natural language processing. Resources for learning regular expressions include online tutorials, books, and forums. With practice and patience, anyone can learn to use regular expressions to their full potential.`;

export default function Home() {
	const [testText, setTestText] = useState<string>(initialTest);
	const [testRegex, setTestRegex] = useState<string>("");

	const translateToRegex = trpc.translateToRegex.useMutation();
	const [natural, setNatual] = useState<string>("");

	const [isCopied, setIsCopied] = useState<boolean>(false);

	const handleGenerate = () => {
		translateToRegex.mutate(natural);
	};

	const handleTest = () => {
		if (!translateToRegex.data) return;

		setTestRegex(translateToRegex.data);
	};

	const handleCopy = () => {
		setIsCopied(true);

		setTimeout(() => {
			setIsCopied(false);
		}, 1500);
	};

	return (
		<main
			className={`flex min-h-screen flex-col items-center p-4 sm:p-14 lg:p-24 w-full  ${inter.className}`}
		>
			<div className="h-full w-full md:w-3/4  space-y-5">
				<div className="w-full p-2 flex justify-between items-center">
					<div className="flex flex-col space-y-1">
						<p className="font-bold text-xl">Regex Translate</p>
						<p className="font-bold text-md text-gray-600">
							Natural Languaje to Regex
						</p>
					</div>
					<div className="flex space-x-2">
						<a
							role="button"
							href="https://gabrielvalles.vercel.app"
							rel="noopener"
							target="_blank"
							className="rounded-xl py-2 px-4 border bg-zinc-800/40 border-zinc-800 text-lg"
						>
							<MdCode />
						</a>

						<a
							role="button"
							href="https://github.com/Gabo-div/regex-translator"
							rel="noopener"
							target="_blank"
							className="rounded-xl py-2 px-4 border bg-zinc-800/40 border-zinc-800 text-lg"
						>
							<FaGithub />
						</a>
					</div>
				</div>
				<div className="flex flex-row flex-wrap lg:flex-nowrap space-y-5 lg:space-y-0 lg:space-x-5">
					<div className="w-full lg:w-auto lg:grow flex flex-col bg-zinc-800/30 p-6 rounded-xl space-y-4">
						<p className="font-bold">Natural Language</p>
						<textarea
							value={natural}
							onChange={(e) => setNatual(e.target.value)}
							placeholder="e.g Match email address"
							className="resize-none h-32 w-full bg-zinc-800/40 border-neutral-800 border rounded-xl py-3 px-2 text-sm outline-0"
						/>
						<button
							onClick={handleGenerate}
							className="bg-blue-600 rounded-xl p-2"
						>
							Generate Regex
						</button>
					</div>

					<div className="w-full lg:w-auto lg:grow flex flex-col bg-zinc-800/30 p-6 rounded-xl space-y-4">
						<div className="flex flex-row space-x-2 items-center">
							<p className="font-bold">Regex</p>
							{translateToRegex.isLoading ? (
								<Spinner className="h-5" />
							) : null}
						</div>

						<textarea
							value={translateToRegex.data}
							readOnly
							placeholder="e.g Match email address"
							className="grow resize-none h-32 w-full bg-zinc-800/40 border-neutral-800 border rounded-xl py-3 px-2 text-sm outline-0 text-green-600/70"
						/>

						<div className="flex flex-row space-x-2 items-center">
							<CopyToClipboard
								text={translateToRegex.data ?? ""}
								onCopy={handleCopy}
							>
								<button
									disabled={!translateToRegex.data}
									className={`h-full rounded-xl py-2 px-4 border ${
										isCopied
											? "bg-green-700"
											: "bg-zinc-800/40"
									} border-zinc-800 text-lg disabled:text-gray-500`}
								>
									<MdOutlineContentCopy />
								</button>
							</CopyToClipboard>

							<button
								onClick={handleTest}
								className="h-full rounded-xl py-2 px-4 border bg-zinc-800/40 border-zinc-800 text-sm"
							>
								Test
							</button>
						</div>
					</div>
				</div>

				<div className="grow flex flex-col bg-zinc-800/30 p-6 rounded-xl space-y-4">
					<p className="font-bold">Test Regex</p>
					<input
						value={testRegex}
						onChange={(e) => setTestRegex(e.target.value)}
						placeholder="Write or generate a regex"
						type="text"
						className="text-green-600/70 w-full bg-zinc-800/40 border-neutral-800 border rounded-xl py-3 px-2 text-sm outline-0"
					/>
					<Highlighter
						pattern={testRegex}
						value={testText}
						onChange={(value) => setTestText(value)}
					/>
				</div>
			</div>
		</main>
	);
}
