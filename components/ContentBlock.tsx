import React from 'react';

interface Props {
  title: string;
  text: string;
}

export default function ContentBlock({ title, text }: Props) {
  return (
    <div className="max-w-2xl text-center p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <p className="text-lg">{text}</p>
    </div>
  );
}
