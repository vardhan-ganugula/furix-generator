'use client';
import React from 'react'
import {CreativeStory,EmailOutreachBloggers} from '@/actions/ai'
import markdownParser from '@/helpers/markdownParser'
import {PrepareEmail} from '@/helpers/aiHelpers'
import './styles.css'
import csvLoader from '@/helpers/csvLoader'
function page() {
  const [text, setText] = React.useState('');
  const [topic, setTopic] = React.useState('');
  const divRef = React.useRef(null);
  const handleGenerateText = async () => {
    try {
      const response = await EmailOutreachBloggers(topic);
      const reader = response.getReader();
      const decoder = new TextDecoder();
      let text = '';
      let done = false;
      while (!done){
        const {value, done: doneValue} = await reader.read();
        text += decoder.decode(value);
        done = doneValue; 
        setText(text);
      }
    } catch (error) {
      console.error('Error generating text:', error);
      setText('Error generating text ' + error);
    }
  }

  const tableToCSV = () => {
    PrepareEmail(divRef);
  };
  return (
    <div>
      
    <div ref={divRef}>
      <div dangerouslySetInnerHTML={{__html: text}} ref={divRef} >
      </div>
    </div>
      
      <input type="text" value={topic} onChange={(e) => setTopic(e.target.value)}/>
      <button onClick={handleGenerateText}>
        Generate Text
      </button>
      <button onClick={tableToCSV}>
        download
      </button>

    </div>
  )
}

export default page