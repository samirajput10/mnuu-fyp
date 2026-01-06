'use server';

import { generateImageAnalysis, GenerateImageAnalysisOutput } from '@/ai/flows/generate-image-analysis';
import { z } from 'zod';

export type FormState = {
  data: GenerateImageAnalysisOutput | null;
  error: string | null;
};

const imageSchema = z.object({
  photoDataUri: z.string().min(1, { message: 'Image is required.' }),
});

export async function analyzeSkinImage(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const validatedFields = imageSchema.safeParse({
    photoDataUri: formData.get('photoDataUri'),
  });

  if (!validatedFields.success) {
    return {
      data: null,
      error: 'Invalid image data provided. Please try uploading the image again.',
    };
  }
  
  if (!validatedFields.data.photoDataUri.startsWith('data:image')) {
    return {
      data: null,
      error: 'Invalid data URI. Please ensure you are uploading a valid image.'
    }
  }

  try {
    const result = await generateImageAnalysis({ photoDataUri: validatedFields.data.photoDataUri });
    if (!result || !result.analysisResults) {
        return { data: null, error: 'AI model returned an invalid response.' };
    }
    return { data: result, error: null };
  } catch (e) {
    console.error('Analysis Error:', e);
    const errorMessage = e instanceof Error ? e.message : 'An unexpected error occurred during analysis.';
    return {
      data: null,
      error: `Analysis failed: ${errorMessage}`,
    };
  }
}
