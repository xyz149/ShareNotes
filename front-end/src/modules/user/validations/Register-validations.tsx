import { z } from "zod";
export const registerSchema = z.object({
    name:z.string().min(3,'Name Must Be Atleast 3 Characters Long').max(10,'Name Must Be Less Than 10 Characters'),
    email:z.string().min(1,'Email Is Required').email('Please Enter Valid Email'),
    password:z.string().min(8,'Password Must Contain Atleast 8 Characters'),
});
export const loginSchema = z.object({
    email:z.string().min(1,'Email Is Required').email('Please Enter Valid Email'),
    password:z.string().min(8,'Password Must Contain Atleast 8 Characters'),
});
export type RegisterSchema=z.infer<typeof registerSchema>;
export type LoginSchema=z.infer<typeof loginSchema>;