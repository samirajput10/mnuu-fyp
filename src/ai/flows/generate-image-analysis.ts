'use server';

/**
 * @fileOverview An AI agent that analyzes an uploaded skin image and provides a confidence-based analysis of potential skin conditions.
 *
 * - generateImageAnalysis - A function that handles the skin image analysis process.
 * - GenerateImageAnalysisInput - The input type for the generateImageAnalysis function.
 * - GenerateImageAnalysisOutput - The return type for the generateImageAnalysis function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateImageAnalysisInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      'A photo of the skin area to be analyzed, as a data URI that must include a MIME type and use Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.' // shorter line
    ),
});
export type GenerateImageAnalysisInput = z.infer<typeof GenerateImageAnalysisInputSchema>;

const GenerateImageAnalysisOutputSchema = z.object({
  analysisResults: z.array(
    z.object({
      condition: z.string().describe('The potential skin condition identified.'),
      confidence: z.number().describe('The confidence score for the identified condition (0-1).'),
      reasoning: z.string().describe('The reasoning behind the prediction, based on image analysis and skin condition database comparison.'),
    })
  ).describe('An array of analysis results, each containing a potential skin condition, confidence score, and reasoning.'),
});
export type GenerateImageAnalysisOutput = z.infer<typeof GenerateImageAnalysisOutputSchema>;

export async function generateImageAnalysis(input: GenerateImageAnalysisInput): Promise<GenerateImageAnalysisOutput> {
  return generateImageAnalysisFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateImageAnalysisPrompt',
  input: {schema: GenerateImageAnalysisInputSchema},
  output: {schema: GenerateImageAnalysisOutputSchema},
  prompt: `You are an AI expert in analyzing skin images to identify potential skin conditions.

You will analyze the uploaded skin image, comparing it against a database of known skin conditions and images.

Based on this comparison, you will provide a confidence-based analysis of potential conditions, along with reasoning for each prediction.

Ensure that the confidence score is a number between 0 and 1.

Here is the skin image to analyze:
{{media url=photoDataUri}}

Return the analysis in the following JSON format:
{
  "analysisResults": [
    {
      "condition": "The potential skin condition identified",
      "confidence": "The confidence score for the identified condition (0-1)",
      "reasoning": "The reasoning behind the prediction, based on image analysis and skin condition database comparison"
    }
  ]
}
`,
});

const generateImageAnalysisFlow = ai.defineFlow(
  {
    name: 'generateImageAnalysisFlow',
    inputSchema: GenerateImageAnalysisInputSchema,
    outputSchema: GenerateImageAnalysisOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
