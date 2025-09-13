import { defineCollection, z } from 'astro:content';

const quizCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        description: z.string(),
        difficulty: z.enum(['easy', 'challenging', 'advanced']),
        category: z.string(),
        timeLimit: z.number().optional(),
        questions: z.array(z.object({
            question: z.string(),
            options: z.array(z.string()),
            correctAnswer: z.number(),
            explanation: z.string().optional(),
            points: z.number().default(1)
        }))
    })
});

export const collections = {
    quizzes: quizCollection
};