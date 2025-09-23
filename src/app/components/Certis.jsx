'use client';

import React from 'react';
import Image from 'next/image';

const certs = [
  {
    title: 'Crash Course on Python',
    img: '/pythoncert.png',
    link: 'https://www.coursera.org/account/accomplishments/verify/DHGSPUGQXRAA',
  },
  {
    title: 'Netflix Clone – Devtown',
    img: '/devtown.png',
    link: 'https://www.cert.devtown.in/verify/Z2vLEuG',
  },
  {
    title: 'HackerRank React (Basic)',
    img: '/reactcert.png',
    link: 'https://www.hackerrank.com/certificates/9dcb7bbc43df',
  },
];

export default function Certis() {
  const [active, setActive] = React.useState(certs[0]);

  return (
    <div className="flex flex-col md:flex-row gap-6 items-center max-w-6xl mx-auto p-6">
      {/* LEFT – certificate */}
      <div className="flex-1 flex justify-center">
        <a
          href={active.link}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full max-w-md"
        >
          <div className="overflow-hidden rounded-xl shadow-lg border border-slate-700">
            <Image
              src={active.img}
              alt={active.title}
              width={800}
              height={500}
              className="w-full h-auto object-contain"
              priority
            />
          </div>
          <h3 className="text-lg sm:text-xl font-semibold mt-3 text-center">
            {active.title}
          </h3>
        </a>
      </div>

      {/* RIGHT – list */}
      <ul className="flex-1 w-full md:w-auto space-y-3">
        {certs.map((c) => (
          <li
            key={c.title}
            onClick={() => setActive(c)}
            className={`p-3 rounded-lg cursor-pointer transition-colors duration-200 ${
              active.title === c.title
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            {c.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
