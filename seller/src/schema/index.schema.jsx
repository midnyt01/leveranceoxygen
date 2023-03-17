import * as Yup from 'yup';

export const LoginSchema = Yup.object({
    PhoneNumber: Yup.string().max(25).required("Please enter your phone number"),
    Password: Yup.string().min(6).required("please enter your password")
})