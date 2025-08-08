import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../validations/Register-validations";
import { doRegister } from "../api/User-Api";
import { useNavigate } from "react-router-dom";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Frown } from "lucide-react";
import { useState } from "react";
import Header from "@/modules/shared/components/Header";

const Register=()=>{
    const [message,setMessage]=useState('');
    const [status,setStatus]=useState(false);
    const navigate=useNavigate();
    const {register,handleSubmit,formState:{errors}} = useForm({
        resolver:zodResolver(registerSchema),
        defaultValues:{
            name:'',
            email:'',
            password:''
        }
    });
    const alertJSX= <div>
                        <Alert variant="destructive">
                            <Frown/>
                            <AlertTitle>Registration Status</AlertTitle>
                            <AlertDescription>{message}</AlertDescription>
                        </Alert>
                    </div>;
    const registerSubmit= async (userData:unknown)=>{
        console.log('Form Submit', userData);
        try{
            const result = await doRegister(userData);
            console.log('Result',result);
            if(result.data.message){
                setStatus(false);
                navigate('/login');
            }
            else{
                setStatus(true);
                setMessage('Unable To Register Please Try Again')
                // navigate('/register');
            }
        }
        catch(err:any){
            setStatus(true);
            setMessage(err.response.data.message);
            console.log('Registration Failed', err);
        }
    }
    return(
        <>
        <Header/>
        <br />
        <br />
        <Card className="w-full max-w-md mx-auto">
            <CardHeader>
                <CardTitle className="space-y-1 text-center">Register Here</CardTitle>
                <CardDescription className="text-center">Notes Sharing App Registration Form</CardDescription>
            </CardHeader>
            <CardContent>
                {status && alertJSX}
                <form onSubmit={handleSubmit(registerSubmit)}>
                    <div className="flex flex-col gap-6">
                        <div className="grid w-full max-w-sm items-center gap-2">
                            <Label htmlFor="name">User Name</Label>
                            <Input {...register('name')} type="text" id="name" placeholder="User Name"/>
                            <span className="text-red-500">{errors.name && errors.name.message}</span>
                        </div>
                        <div className="grid w-full max-w-sm items-center gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input {...register('email')} type="email" id="email" placeholder="Email"/>
                            <span className="text-red-500">{errors.email && errors.email.message}</span>
                        </div>
                        <div className="grid w-full max-w-sm items-center gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input {...register('password')} type="password" id="password" placeholder="Password"/>
                            <span className="text-red-500">{errors.password && errors.password.message}</span>
                        </div>
                        <div className="grid w-full max-w-sm items-center gap-2">
                            <Button>Register</Button>
                        </div>
                    </div>
                </form>
            </CardContent>
        </Card>
        </>
    ) 
}
export default Register;