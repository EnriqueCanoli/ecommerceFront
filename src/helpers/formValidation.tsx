import { LoginErrorsProps, LoginProps, RegisterErrorsProps, RegisterProps } from "@/types";

export function validateLogin(values: LoginProps){
    let errors: LoginErrorsProps = {}

    if(!values.email) errors.email = "Email is required"
    else if (!/\S+@\S+\.\S+/.test(values.email)) errors.email = "Email is invalid";
    if(!values.password) errors.password = "Password is required"

    return errors;
}

export function validateRegister(values: RegisterProps){
    let errors:  RegisterErrorsProps = {}

    if(!values.email) errors.email = "Email is required"
    else if (!/\S+@\S+\.\S+/.test(values.email)) errors.email = "Email is invalid";
    if(!values.password) errors.password = "Passowrd is required"
    if(!values.address) errors.address = "Address is required"
    if(!values.phone) errors.phone = "Phone is required"
    if(!values.name) errors.name = "Name is required"

    return errors;
}