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
import { login, signup } from '@/db/apiAuth'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { UrlState } from '@/Context/Context'


export default function Signup() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const longLink = searchParams.get('createNew')
    const [errors, setErrors] = useState([]);
    const [formdata, setFormdata] = useState({
      name:'',
        email:'',
        password:'',
        profile_pic:null,
    });

    const handleInputChange=(e)=>{
        const {name ,value, files} = e.target;
        setFormdata((prev) =>({
            ...prev,
            [name]:files ? files[0] : value,
        }))
    };

    const {data, loading, error, fn:fnSignup} = useFetch(signup, formdata) //fn:fnSignup is renaming the function fn which is of usefetch to fnlogin
    const {fetchUser} = UrlState()

    useEffect(()=>{
        // console.log(data);
        
        if(error === null && data){
            navigate(`/dashboard?${longLink ? `createNew=${longLink}`: ""}`);
            fetchUser()
        }
    }, [data, error]);

    const handleSignup = async (e)=>{
        setErrors([]);
        try {
            const schema = Yup.object().shape({
                name: Yup.string().required('Name is Required !'),
                email: Yup.string().email('Invalid Email !').required('Email is Required !'),
                password: Yup.string().min(6,'Password must be at least 6 characters.').required('Password is Required !'),
                profile_pic: Yup.mixed().required('Profile Picture is Required !'),
            });

            await schema.validate(formdata , {abortEarly:false})
            
            //api call
            await fnSignup()


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
                <CardTitle>Signup</CardTitle>
                <CardDescription>
                    Create a new account if you have&rsquo;t yet
                </CardDescription>
                {error && <Error message={error.message}/>}
            </CardHeader>
            <CardContent className='space-y-2'>
                <div className='space-y-1'>
                    <Input
                        type='name'
                        name='name'
                        placeholder='Enter name'
                        onChange = {handleInputChange}
                        />
                        {errors.name &&  <Error message={errors.name}/>}
                </div>
            
                <div className='space-y-1'>
                    <Input
                        type='email'
                        name='email'
                        placeholder='Enter email'
                        onChange = {handleInputChange}
                        />
                        {errors.email &&  <Error message={errors.email}/>}
                </div>
            
                <div className='space-y-1'>
                    <Input
                        type='password'
                        name='password'
                        placeholder='Enter password'
                        onChange = {handleInputChange}
                        />
                        {errors.password &&  <Error message={errors.password}/>}
                </div>

                <div className='space-y-1'>
                    <Input
                        type='file'
                        name='profile_pic'
                        accept= 'image/'
                        onChange = {handleInputChange}
                        />
                        {errors.profile_pic &&  <Error message={errors.profile_pic}/>}
                </div>
            </CardContent>
            <CardFooter>
                <Button
                    onClick = {handleSignup}
                >
                    {
                        loading?<BeatLoader size={10} color='#36d7b7'/> : 'Create Account' 
                    }
                </Button>
            </CardFooter>
        </Card>

    )
}
