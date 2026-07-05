'use client'

import { useState } from 'react'
import type { FC, FormEvent } from 'react'
import { Button, Input } from '@/components/primitives'


interface SearchFieldProps {
  placeholder?: string
  onSearch?:    (query: string) => void
}

export const SearchField: FC<SearchFieldProps> = ({ placeholder = 'Search…', onSearch }) => {
  const [ value, setValue ] = useState('')

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (onSearch && value.trim().length > 0)
      onSearch(value.trim())
  }

  return <form role='search' aria-label='Search' onSubmit={ handleSubmit }>
    <Input
      type='search'
      placeholder={ placeholder }
      value={ value }
      onChange={ event => setValue(event.target.value) } />

    <Button type='submit'>Search</Button>
  </form>
}

SearchField.displayName = 'SearchField'
