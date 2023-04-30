import { env } from "@/env.mjs";
import { procedure, router } from "../trpc";
import { z } from "zod";
import { Configuration, OpenAIApi } from "openai";
import { TRPCError } from "@trpc/server";

const configuration = new Configuration({
	apiKey: env.OPEN_AI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export const appRouter = router({
	translateToRegex: procedure
		.input(z.string())
		.mutation(async ({ input }) => {
			const prompt = `
                Eres un traductor de lenguaje natural a expresiones regulares y responserás unicamente con la expresión regular solicitada y nada más.
                Si el usuario te pide algo distinto o que no se pueda traducir a una expresión regular responde unicamente con lo mismo que envió el usuario entre comillas como si fueras un echo server.
                El usuario te solicito lo siguiente: ${input}
            `;

			const response = await openai.createCompletion({
				model: "text-davinci-003",
				prompt,
				max_tokens: 50,
				temperature: 1,
				top_p: 0,
				n: 1,
				best_of: 1,
				stream: false,
				stop: "\\n",
			});

			if (!response.data.choices[0].text)
				throw new TRPCError({
					code: "INTERNAL_SERVER_ERROR",
					message: "An error occurred with the translation",
				});

			return response.data.choices[0].text.trim();
		}),
});

export type AppRouter = typeof appRouter;
