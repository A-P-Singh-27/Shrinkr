import React, { useEffect, useRef, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { UrlState } from '@/Context/Context'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from './ui/button';
import { Input } from './ui/input';
import Error from './Error';
import { Card } from './ui/card';
import * as yup from 'yup';
import { useFetch } from '@/hooks/use-fetch';
import { QRCode } from 'react-qrcode-logo';
import { createUrl } from '@/db/apiUrls';
import { BeatLoader } from 'react-spinners';


export default function CreateLink() {
    const { user } = UrlState();
    const navigate = useNavigate();
    const ref = useRef();
    const [searchParams, setSearchParams] = useSearchParams();
    const longLink = searchParams?.get('createNew');


    const [errors, setErrors] = useState();
    const [formValues, setFormValues] = useState({
        title: '',
        longUrl: longLink ? longLink : '',
        customUrl: '',
    });
    const { loading, error, data, fn: fnCreateUrl } = useFetch(createUrl, { ...formValues, user_id: user.id });

    const schema = yup.object().shape({
        title: yup.string().required('Title is required'),
        longUrl: yup.string()
            .url('Must be a valid URL')
            .required('long URL is required'),
        customUrl: yup.string(),
    });

    const handleChange = (e) => {
        setFormValues({
            ...formValues,
            [e.target.id]: e.target.value,
        })
    }

    useEffect(()=>{
        if (error === null && data) {
            navigate(`/link/${data[0].id}`)
        }
    },[error,data])

    
    const createNewUrl = async () => {
        setErrors([]);
        try {
            await schema.validate(formValues, { abortEarly: false });
            const canvas = ref.current.canvasRef.current;
            const blob = await new Promise((resolve) => canvas.toBlob(resolve));

            await fnCreateUrl(blob);
        } catch (e) {
            const newErrors = {};

            e?.inner?.forEach((err) => {
                newErrors[err.path] = err.message;
                console.log(err.message);
                
            });
            setErrors(newErrors);
        }
    }


    return (
        <Dialog defaultOpen={longLink}
            onOpenChange={(res) => {
                if (!res) {
                    setSearchParams({});
                }
            }}
        >
            <DialogTrigger>
                <Button className='bg-[#7c50f7] font-bold'>Create New Link</Button>
            </DialogTrigger>
            <DialogContent className='sm:max-w-md'>
                <DialogHeader>
                    <DialogTitle className='text-2xl font-bold '>Create New</DialogTitle>
                </DialogHeader>

                {formValues?.longUrl && <QRCode value={formValues?.longUrl} size={250} ref={ref} />}

                <Input
                    id='title'
                    placeholder="Short Link's Title"
                    value={formValues.title}
                    onChange={handleChange}
                />
                {error?.title && <Error message={error?.title} />}

                <Input
                    id='longUrl'
                    placeholder="Enter your Looong URL"
                    value={formValues.longUrl}
                    onChange={handleChange}
                />
                {error?.longUrl && <Error message={error?.longUrl} />}

                <div className='flex items-center gap-2'>
                    <Card className='p-2'>shrinkr.in</Card> /
                    <Input
                        id='customUrl'
                        placeholder="Custom Link's (optional)"
                        value={formValues.customUrl}
                        onChange={handleChange}
                    />
                </div>
                {error && <Error message={error?.message} />}
                <DialogFooter className='sm:justify-start'>
                    <Button disabled={loading} onClick={createNewUrl} className='bg-[#7c50f7]'>
                        {loading ? <BeatLoader size={10} color='white' /> : 'Create'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
