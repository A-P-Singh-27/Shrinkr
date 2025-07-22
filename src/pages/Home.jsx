import { banner } from '@/assets/imagelinks'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useState } from 'react'
import Faqs from '@/components/Faqs'
import { useNavigate } from 'react-router-dom'


export default function Home() {
  const [longUrl, setLongUrl] = useState('');
  const navigate = useNavigate()

  const handleShorten = (e)=>{
    e.preventDefault();
    if (longUrl) {
      navigate(`/auth?createNew=${longUrl}`)
    }
  }

  return (
    <div className='flex flex-col items-center'>
      <h2 className='my-10 sm:my-16 text-3xl sm:text-6xl lg:text-7xl text-black text-center font-extrabold'>
        The only URL Shortener <br /> You&rsquo;ll ever need! 👇
      </h2>
      <form
      onSubmit={handleShorten} 
      className='sm:h-14 flex flex-col sm:flex-row w-full md:w-2/4 gap-2'>
        <Input
          type='url'
          value={longUrl}
          placeholder='Enter your loooong URL'
          onChange={(e) => setLongUrl(e.target.value)}
          className='h-full flex-1 py-4 px-4'
        />
        <Button 
        className='h-full' 
        type='submit' 
        variant='destructive'>Shorten! </Button>
      </form>
      <img src={banner} alt='banner' className='w-full my-11 md:px-11' />

      <Faqs />

    </div>
  )
}
