import { UrlState } from '@/Context/Context';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { BarLoader } from 'react-spinners';

export default function Require_Auth({children}) {
    const navigate = useNavigate();

    const {isAuthenticated, loading} = UrlState();

    useEffect(()=>{
        if (!isAuthenticated && loading === false) {
            navigate('/auth');
        }
    },[isAuthenticated,loading]);

    if (loading) {
        return <BarLoader width={"100%"} color='#36d7d7'/>;
    }

    if (isAuthenticated) {
        return children;
    }

}
