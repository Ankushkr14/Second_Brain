import z from 'zod';

export const signupValidation = z.object({
    firstname: z.string().min(1),
    lastname: z.string().min(1),
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, "Password should have 8 characters."),
    confirmPassword: z.string().min(8,"Password should have 8 characters.")
}).refine((data)=>data.confirmPassword===data.password);

export type signupProfile = z.infer<typeof signupValidation>;

export const signinValidation = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(8,"Password should have 8 characters.")
})

export type signinProfile = z.infer<typeof signinValidation>;

export const contentValidation = z.object({
    type: z.string(),
    link: z.string(),
    title: z.string().min(1, "Title is needed"),
    tags: z.array(z.string()).min(1,'At least 1 tag is needed'),
})

export type contentType = z.infer<typeof contentValidation>;