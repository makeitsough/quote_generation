/** @format */

import { Inter } from 'next/font/google';
import { useEffect, useState } from 'react';

console.log(process.env.OPENAI_API_KEY);

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const [quote, setQuote] = useState('');

  useEffect(() => {
    fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: 'Say this is a test!' }],
        temperature: 0.7,
      }),
    })
      .then((response) => response.json())
      .then((data) => setQuote(data.choices[0].text))
      .catch((error) => console.error(error));
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p>{quote}</p>
    </main>
  );
}
