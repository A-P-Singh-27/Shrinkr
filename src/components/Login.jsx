import React, { useEffect, useState } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from './ui/input'
import { Button } from './ui/button'
import { BeatLoader } from 'react-spinners'
import Error from './Error'
import * as Yup from 'yup'
import {useFetch} from '@/hooks/use-fetch'
import { login } from '@/db/apiAuth'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { UrlState } from '@/Context/Context'


export default function Login() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const longLink = searchParams.get('createNew')
    const [errors, setErrors] = useState([]);
    const [formdata, setFormdata] = useState({
        email:'',
        password:''
    });

    const handleInputChange=(e)=>{
        const {name ,value} = e.target;
        setFormdata((prev) =>({
            ...prev,
            [name]:value,
        }))
    };

    const {data, loading, error, fn:fnlogin} = useFetch(login, formdata) //fn:fnlogin is renaming the function fn which is of usefetch to fnlogin
    const {fetchUser} = UrlState()

    useEffect(()=>{
        // console.log(data);
        
        if(error === null && data){
            navigate(`/dashboard?${longLink ? `createNew=${longLink}`: ""}`);
            fetchUser()
        }
    }, [data, error]);

    const handleLogin = async (e)=>{
        setErrors([]);
        try {
            const schema = Yup.object().shape({
                email: Yup.string().email('Invalid Email !').required('Email is Required !'),
                password: Yup.string().min(6,'Password must be at least 6 characters.').required('Password is Required !'),
            });

            await schema.validate(formdata , {abortEarly:false})

            //api call
            await fnlogin()


        } catch (e) {
            console.log(e?.inner);
            const newErrors = {};

            e?.inner?.forEach((err) => {
                newErrors[err.path] = err.message;
            });

            setErrors(newErrors)
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>
                    Login to your account if you have already one
                </CardDescription>
                {error && <Error message={error.message}/>}
            </CardHeader>
            <CardContent className='space-y-2'>
                <div className='space-y-1'>
                    <Input
                        type='email'
                        name='email'
                        placeholder='Enter email'
                        onChange = {handleInputChange}
                        />
                        {errors.email &&  <Error message={errors.email}/>}
                </div>
            </CardContent>
            <CardContent className='space-y-2'>
                <div className='space-y-1'>
                    <Input
                        type='password'
                        name='password'
                        placeholder='Enter password'
                        onChange = {handleInputChange}
                        />
                        {errors.password &&  <Error message={errors.password}/>}
                </div>
            </CardContent>
            <CardFooter>
                <Button
                    onClick = {handleLogin}
                >
                    {
                        loading?<BeatLoader size={10} color='#36d7b7'/> : 'Login' 
                    }
                </Button>
            </CardFooter>
        </Card>

    )
}
