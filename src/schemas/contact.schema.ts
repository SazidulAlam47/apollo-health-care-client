import z from 'zod';

export const contactFormSchema = z.object({
    name: z.string().min(1, 'Please Enter your Name'),
    email: z
        .string()
        .min(1, 'Please Enter you Email')
        .email('Please Enter a valid Email'),
    concern: z.string().min(1, 'Please Enter your Concern'),
    query: z.string().min(1, 'Please Enter your Query'),
});
