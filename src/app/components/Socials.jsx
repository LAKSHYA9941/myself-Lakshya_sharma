"use client";
import React, { useState } from "react";
import styled from "styled-components";
import Image from 'next/image';
import Link from "next/link";
const Button = () => {
  const [toast, setToast] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText("lakshyasharma.9.0.1.2.3@gmail.com");
    setToast(true);
    setTimeout(() => setToast(false), 1500);
  };

  return (
    <StyledWrapper>
      {/* Toast */}
      {toast && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50">
          Copied!
        </div>
      )}

      <div className="social-links">
        {/* Gmail */}

        <Link
          href="mailto:lakshya@example.com"
          target="_blank"
          rel="noopener noreferrer"
        >
            <div id="gmail" className="social-btn flex-center" onClick={copyEmail}>
              <Image src="/gmailicon.svg" height={24} width={24} alt="Gmail" />
              <span>Gmail</span>
            </div>
          
        </Link>


        {/* LinkedIn */}
        <div
          id="linkedin"
          className="social-btn flex-center"
          onClick={() => window.open("https://linkedin.com/in/lakshya-sharma-35817926a", "_blank")}
        >
          <svg viewBox="0 0 24 24" height={24} width={24}>
            <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
          </svg>
          <span>LinkedIn</span>
        </div>

        {/* GitHub */}
        <div
          id="github"
          className="social-btn flex-center"
          onClick={() => window.open("https://x.com/Lakshya_sh28", "_blank")}
        >
          <svg viewBox="0 0 24 24" height={24} width={24} fill="currentColor">
            <path d="M14.258 10.145 23.176 0h-2.113l-7.747 8.82L7.133 0H0l9.352 13.328L0 24h2.113l8.176-9.32 6.513 9.32H24L14.258 10.145Zm-2.438 2.845-.69-.98-8.24-11.693h3.553l6.652 9.456.69.98 8.443 12.008h-3.553l-6.855-9.771Z" />
          </svg>
          <span>Twitter/X</span>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .social-links,
  .flex-center {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .social-btn {
    cursor: pointer;
    height: 50px;
    width: 50px;
    font-family: 'Titillium Web', sans-serif;
    color: #333;
    border-radius: 10px;
    box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.1);
    background: white;
    margin: 5px;
    transition: 0.3s;
    justify-content: center;
  }

  .social-btn svg {
    height: 24px;
    width: 24px;
  }

  .social-btn span {
    width: 0px;
    overflow: hidden;
    transition: 0.3s;
    text-align: center;
    margin-left: 5px;
  }

  .social-btn:hover {
    width: 150px;
    border-radius: 5px;
  }

  .social-btn:hover span {
    padding: 2px;
    width: 80px;
  }

  /* icon colors */
  #linkedin svg { fill: #0e76a8; }
  #github svg   { fill: #333; }

  /* toast */
  .fixed {
    position: fixed;
    top: 1rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: 999;
  }
`;

export default Button;