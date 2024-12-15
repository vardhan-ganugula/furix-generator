'use client'
import axios from 'axios'
import React from 'react'
import markdownParser from '@/helpers/markdownParser'
function page() {
  const [state, setState] = React.useState('')
  async function getResponse () {
    const res = await axios.get('/api/v1/cold-emailing-ideas')
    const data = await res.data.answer
    parseDown(data)
  }
  async function parseDown(data: string) {
    const parsedData = await markdownParser(data);
    setState(parsedData)
  }
  return (
    <>
    
        <div>
          <button onClick={getResponse}>Get Response</button>
          <div dangerouslySetInnerHTML={{__html: state}}></div>
        </div>
    
    </>
  )
}

export default page