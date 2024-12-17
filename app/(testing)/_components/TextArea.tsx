'use client'
import React from 'react'

function TextArea({}) {
    const [text, setText] = React.useState('');
  return (
    <textarea value={text} onChange={(e) => setText(e.target.value)}>

    </textarea>
  )
}

export default TextArea