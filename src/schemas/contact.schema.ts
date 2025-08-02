import z from 'zod';

export const contactFormSchema = z.object({
    name: z
        .string({ required_error: 'Please Enter your Name' })
        .min(1, 'Please Enter your Name'),
    email: z
        .string({ required_error: 'Please Enter your Email' })
        .min(1, 'Please Enter your Email')
        .email('Please Enter a valid Email'),
    concern: z
        .string({ required_error: 'Please Enter your Concern' })
        .min(1, 'Please Enter your Concern'),
    query: z
        .string({ required_error: 'Please Enter your Query' })
        .min(1, 'Please Enter your Query'),
});
