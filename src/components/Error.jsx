import React from 'react'

export default function Error({message}) {
  return (
    <span className='text-sm text-red-400'>{message}</span>
  )
}
