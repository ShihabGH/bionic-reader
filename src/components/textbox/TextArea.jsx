import React, { useState } from 'react';
import axios from 'axios';
import './textarea.scss';

const TextareaComponent = () => {
  const [inputText, setInputText] = useState('');
  const [displayedText, setDisplayedText] = useState('');

  const handleInputChange = event => {
    setInputText(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const encodedParams = new URLSearchParams();
    encodedParams.set('content', inputText);
    encodedParams.set('response_type', 'html');
    encodedParams.set('request_type', 'html');
    encodedParams.set('fixation', '1');
    encodedParams.set('saccade', '10');

    const options = {
      method: 'POST',
      url: 'https://bionic-reading1.p.rapidapi.com/convert',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'X-RapidAPI-Key': '6f39753bd7msh189ff5c29f0bf09p11acecjsn013739bef035',
        'X-RapidAPI-Host': 'bionic-reading1.p.rapidapi.com'
      },
      data: encodedParams,
    };

    try {
      const response = await axios.request(options);
      setDisplayedText(response.data);
    } catch (error) {
      console.error(error);
      setDisplayedText('Error: Unable to fetch data');
    }
  };

  return (
    <div className='container'>
      <h1>Welcome to Bionic Reader</h1>
      <textarea 
        rows="20" cols="65"
        className='textarea'
        value={inputText} 
        onChange={handleInputChange}
        placeholder="Type here"
      />
      <button onClick={handleSubmit}>Submit</button>
      <div className='display_string' dangerouslySetInnerHTML={{ __html: displayedText }} />
    </div>
  );
};

export default TextareaComponent;
