import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../validations/Register-validations";
import { doLogin } from "../api/User-Api";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Frown } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/modules/shared/components/Header";

const Login=()=>{
    const [message,setMessage]=useState('');
    const navigate=useNavigate();
    const [status,setStatus]=useState(false);
    const {register,handleSubmit,formState:{errors}} = useForm({
            resolver:zodResolver(loginSchema),
            defaultValues:{
                email:'',
                password:''
            }
    });
    const alertJSX= <div>
                        <Alert variant="destructive">
                            <Frown/>
                            <AlertTitle>Login Status</AlertTitle>
                            <AlertDescription>{message}</AlertDescription>
                        </Alert>
                    </div>;
    const mySubmit= async(userObject:unknown)=>{
        try{
            const result = await doLogin(userObject);
            console.log('Result',result);
            if(result.data.message  && result.data.message.startsWith('Welcome')){
                setStatus(false);
                console.log(result.data.message);
                navigate('/upload'); 
            }
            else{
                setStatus(true);
                setMessage('Unable To Login Please Try Again')
                console.log(result.data.message);
            }
        }
        catch(err){
            console.log('Login Fails ',err);
        }
    }
    return(
        <>
        <Header/>
        <br />
        <br />
        <Card className="w-full max-w-md mx-auto">
            <CardHeader>
                <CardTitle className="space-y-1 text-center">Login Here</CardTitle>
                <CardDescription className="text-center">Notes Sharing App Login Form</CardDescription>
            </CardHeader>
            <CardContent>
                {status && alertJSX}
                <form onSubmit={handleSubmit(mySubmit)}>
                    <div className="flex flex-col gap-6">
                        <div className="grid w-full max-w-sm items-center gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input {...register('email')} type="email" id="email" placeholder="Email" />
                            <span className="text-red-500">{errors.email && errors.email.message}</span>
                        </div>
                        <div className="grid w-full max-w-sm items-center gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input {...register('password')} type="password" id="password" placeholder="Password" />
                            <span className="text-red-500">{errors.password && errors.password.message}</span>
                        </div>
                        <div className="grid w-full max-w-sm items-center gap-2">
                            <Button>Login</Button>
                        </div>
                    </div>
                </form>
            </CardContent>
        </Card>
        </>
    )
}
export default Login;