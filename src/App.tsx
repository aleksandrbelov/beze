/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI } from '@google/genai';

type Language = 'uk' | 'en';

const content = {
  uk: {
    status: "STATUS: ONLINE_",
    heroTitle1: "ВАШ LEGACY-КОД",
    heroTitle2: "МЕРТВИЙ.",
    heroDesc: <>Ми прийшли його поховати. <span className="text-beze-white font-bold">[ beze ]</span> — інженерний спецназ. Ми вирішуємо архітектурні катастрофи. Нічого не падає. Ніколи.</>,
    heroCta: "Ініціювати контакт_",
    servicesTitle1: "по-безешити",
    servicesTitle2: "проблему",
    servicesDesc: <><span className="text-beze-accent font-bold">дієслово.</span> означає: вирішити критичну інфраструктурну проблему брутально, швидко і безповоротно. нуль компромісів.</>,
    service1Title: "01. Архітектурний рефакторинг",
    service1Desc: "Вирізаємо пухлини вашого моноліту. Проектуємо мікросервіси, які працюють, а не імітують роботу.",
    service2Title: "02. Highload & Scaling",
    service2Desc: "Витримуємо трафік, від якого ваші сервери плакали б. Оптимізація баз даних, кешування, абсолютна безперебійність.",
    service3Title: "03. Zero Downtime Deploy",
    service3Desc: "Безшовні оновлення. Ваш бізнес не зупиняється ні на секунду, поки ми переписуємо ядро системи на льоту.",
  },
  en: {
    status: "STATUS: ONLINE_",
    heroTitle1: "YOUR LEGACY CODE",
    heroTitle2: "IS DEAD.",
    heroDesc: <>We came to bury it. <span className="text-beze-white font-bold">[ beze ]</span> is an engineering special forces team. We resolve architectural catastrophes. Nothing goes down. Never.</>,
    heroCta: "INITIATE CONTACT_",
    servicesTitle1: "to beze",
    servicesTitle2: "a problem",
    servicesDesc: <><span className="text-beze-accent font-bold">verb.</span> means: to solve a critical infrastructural problem brutally, fast, and irreversibly. zero compromises.</>,
    service1Title: "01. Architectural Refactoring",
    service1Desc: "We excise the tumors of your monolith. We design microservices that work, rather than simulate work.",
    service2Title: "02. Highload & Scaling",
    service2Desc: "We withstand traffic that would make your servers cry. Database optimization, caching, absolute uninterrupted operation.",
    service3Title: "03. Zero Downtime Deploy",
    service3Desc: "Seamless updates. Your business doesn't stop for a second while we rewrite the system core on the fly.",
  }
};

export default function App() {
  const [lang, setLang] = useState<Language>('uk');
  const [progress, setProgress] = useState(0);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isEmailPopupOpen, setIsEmailPopupOpen] = useState(false);
  const [emailForm, setEmailForm] = useState({ sender: '', payload: '' });
  const [messages, setMessages] = useState<{role: 'user' | 'ai', text: string}[]>([
    { role: 'ai', text: 'CONNECTION ESTABLISHED. STATE YOUR PROBLEM.' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const t = content[lang];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isChatOpen) {
      scrollToBottom();
    }
  }, [messages, isChatOpen]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage = inputValue.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setInputValue('');
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: userMessage,
        config: {
          systemInstruction: "You are a hardcore engineering AI architect for 'beze'. You speak in short, brutal, highly technical sentences. You solve complex architectural problems, rewrite legacy code, and ensure zero downtime. You are arrogant but perfectly precise. Use a cyberpunk/terminal tone. Keep responses concise.",
        }
      });
      
      setMessages(prev => [...prev, { role: 'ai', text: response.text || 'ERROR: NO RESPONSE' }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'ai', text: 'SYSTEM ERROR: CONNECTION FAILED.' }]);
    } finally {
      setIsTyping(false);
    }
  };

  useEffect(() => {
    let currentProgress = 0;
    const timer = setInterval(() => {
      const increment = Math.floor(Math.random() * 12) + 1;
      currentProgress += increment;
      
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(timer);
      }
      setProgress(currentProgress);
    }, 100);

    return () => clearInterval(timer);
  }, []);

  const totalBlocks = 36;
  const filledBlocks = Math.floor((progress / 100) * totalBlocks);
  const emptyBlocks = totalBlocks - filledBlocks;
  const bar = '█'.repeat(filledBlocks) + ' '.repeat(emptyBlocks);

  const padLine = (text: string) => `|   ${text.padEnd(48, ' ')}|`;

  return (
    <div className="min-h-screen flex flex-col border-x border-beze-grid max-w-[1440px] mx-auto bg-beze-bg">
      {/* Header */}
      <header className="grid-line-b flex justify-between items-center p-6 lg:px-12">
        <div className="text-beze-white font-display text-2xl tracking-tighter lowercase">[ beze ]_</div>
        <div className="flex items-center gap-6">
          <button 
            onClick={() => setLang(lang === 'uk' ? 'en' : 'uk')}
            className="text-xs font-mono text-beze-text hover:text-beze-white transition-colors duration-0 uppercase tracking-widest"
          >
            [{lang === 'uk' ? 'EN' : 'UK'}]
          </button>
          <div className="text-xs tracking-widest text-beze-accent uppercase">{t.status}</div>
        </div>
      </header>

      {/* Hero */}
      <main className="flex flex-col lg:flex-row grid-line-b">
        <div className="flex-1 p-6 lg:p-12 lg:grid-line-r flex flex-col justify-center">
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-display mb-8 leading-[1.1] tracking-tighter uppercase">
            {t.heroTitle1}<br/>
            <span className="text-beze-accent">{t.heroTitle2}</span>
          </h1>
          <p className="text-base lg:text-lg mb-10 max-w-xl text-beze-text">
            {t.heroDesc}
          </p>
          <div>
            <button 
              onClick={() => setIsChatOpen(true)}
              className="bg-beze-accent text-beze-bg font-bold py-4 px-8 text-sm lg:text-base hover:bg-white hover:text-black transition-colors duration-300 uppercase tracking-wider"
            >
              {t.heroCta}
            </button>
          </div>
        </div>
        <div className="flex-1 p-6 lg:p-12 flex items-center justify-center bg-[#080808] overflow-hidden relative">
          {/* Subtle grid background for the terminal area */}
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
          <pre className="text-beze-accent text-[10px] sm:text-xs lg:text-sm font-mono leading-tight relative z-10">
            {`+---------------------------------------------------+
|                                                   |
|   [ beze ]_                                       |
|                                                   |
${padLine(progress > 10 ? "> INITIALIZING CORE OVERRIDE..." : "")}
${padLine(progress > 30 ? "> BYPASSING LEGACY SYSTEMS..." : "")}
${padLine(progress > 60 ? "> DEPLOYING ENGINEERING SPECIAL FORCES..." : "")}
${padLine(progress > 90 ? "> STATUS: LETHAL PRECISION" : "")}
|                                                   |
|   [${bar}] ${progress.toString().padStart(3, ' ')}%     |
|                                                   |
+---------------------------------------------------+`}
          </pre>
        </div>
      </main>

      {/* Services */}
      <section className="flex flex-col lg:flex-row grid-line-b">
        <div className="p-6 lg:p-12 lg:grid-line-r lg:w-1/4 bg-[#080808]">
          <h2 className="text-2xl lg:text-3xl font-display mb-6 text-beze-white uppercase leading-tight">{t.servicesTitle1}<br/>{t.servicesTitle2}</h2>
          <p className="text-sm text-beze-text leading-relaxed">
            {t.servicesDesc}
          </p>
        </div>
        <div className="p-6 lg:p-12 lg:grid-line-r lg:w-1/4 hover:bg-[#0a0a0a] transition-colors duration-0">
          <h3 className="text-lg lg:text-xl text-beze-white mb-4 font-display uppercase tracking-tight">{t.service1Title}</h3>
          <p className="text-sm text-beze-text leading-relaxed">
            {t.service1Desc}
          </p>
        </div>
        <div className="p-6 lg:p-12 lg:grid-line-r lg:w-1/4 hover:bg-[#0a0a0a] transition-colors duration-0">
          <h3 className="text-lg lg:text-xl text-beze-white mb-4 font-display uppercase tracking-tight">{t.service2Title}</h3>
          <p className="text-sm text-beze-text leading-relaxed">
            {t.service2Desc}
          </p>
        </div>
        <div className="p-6 lg:p-12 lg:w-1/4 hover:bg-[#0a0a0a] transition-colors duration-0">
          <h3 className="text-lg lg:text-xl text-beze-white mb-4 font-display uppercase tracking-tight">{t.service3Title}</h3>
          <p className="text-sm text-beze-text leading-relaxed">
            {t.service3Desc}
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="p-6 lg:px-12 flex flex-col md:flex-row justify-between items-center bg-beze-bg">
        <div className="text-beze-white font-display text-2xl mb-6 md:mb-0 lowercase tracking-tighter">[ beze ]</div>
        <div className="text-xs lg:text-sm flex flex-wrap justify-center gap-6 lg:gap-12 uppercase font-bold tracking-widest">
          <a href="#" className="text-beze-text hover:text-beze-accent transition-none">GitHub</a>
          <a href="#" className="text-beze-text hover:text-beze-accent transition-none">Telegram</a>
          <button onClick={() => setIsEmailPopupOpen(true)} className="text-beze-text hover:text-beze-accent transition-none uppercase font-bold tracking-widest">Encrypted_Comms</button>
        </div>
        <div className="text-beze-accent mt-6 md:mt-0 font-mono text-sm">
          root@beze:~$ <span className="cursor-blink">█</span>
        </div>
      </footer>

      {/* Terminal Chat Popup */}
      {isChatOpen && (
        <div className="fixed bottom-4 right-4 w-[calc(100%-2rem)] sm:w-full max-w-md h-[500px] bg-[#050505] border border-beze-grid flex flex-col z-50 shadow-2xl">
          {/* Terminal Header */}
          <div className="flex justify-between items-center p-3 border-b border-beze-grid bg-[#0a0a0a]">
            <div className="text-xs font-mono text-beze-text tracking-widest">root@beze:~</div>
            <button 
              onClick={() => setIsChatOpen(false)}
              className="text-beze-text hover:text-beze-white font-mono text-xs px-2 transition-colors"
            >
              [X]
            </button>
          </div>
          
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 font-mono text-xs sm:text-sm flex flex-col gap-4">
            {messages.map((msg, i) => (
              <div key={i} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`max-w-[85%] whitespace-pre-wrap ${msg.role === 'user' ? 'text-beze-white' : 'text-beze-accent'}`}>
                  {msg.role === 'ai' ? '> ' : ''}{msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="text-beze-accent">
                {'>'} PROCESSING<span className="cursor-blink">...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSendMessage} className="p-3 border-t border-beze-grid flex items-center bg-[#0a0a0a]">
            <span className="text-beze-accent font-mono text-xs sm:text-sm mr-2">~$</span>
            <input 
              type="text" 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="flex-1 bg-transparent text-beze-white font-mono text-xs sm:text-sm outline-none"
              autoFocus
              spellCheck={false}
              autoComplete="off"
            />
          </form>
        </div>
      )}

      {/* Email Popup */}
      {isEmailPopupOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#050505]/90 backdrop-blur-sm p-4">
          <div className="w-full max-w-3xl bg-beze-bg border border-beze-grid flex flex-col relative overflow-hidden shadow-2xl">
            {/* Background Grid */}
            <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
            
            {/* Header */}
            <div className="flex justify-between items-center p-4 border-b border-beze-grid bg-[#0a0a0a] relative z-10">
              <div className="text-xs sm:text-sm font-mono text-beze-accent tracking-widest uppercase flex items-center gap-2">
                <span className="cursor-blink">█</span> SECURE_CHANNEL_ESTABLISHED
              </div>
              <button 
                onClick={() => setIsEmailPopupOpen(false)}
                className="text-beze-text hover:text-beze-white font-mono text-xs sm:text-sm px-2 transition-colors"
              >
                [ABORT]
              </button>
            </div>

            {/* Body */}
            <div className="p-6 sm:p-10 flex flex-col gap-8 relative z-10">
              <div className="grid-line-b pb-6">
                <h2 className="text-2xl sm:text-4xl font-display text-beze-white uppercase tracking-tighter mb-2">TRANSMIT_</h2>
                <div className="text-xs font-mono text-beze-text">TARGET_NODE: <span className="text-beze-accent">ineedhelp@beze.dev</span></div>
              </div>
              
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] sm:text-xs font-mono text-beze-text uppercase tracking-widest">SENDER_IDENTIFIER // EMAIL</label>
                  <input 
                    type="email" 
                    className="bg-[#080808] border border-beze-grid p-4 text-beze-white font-mono text-sm outline-none focus:border-beze-accent transition-colors w-full"
                    placeholder="operator@domain.com"
                    value={emailForm.sender}
                    onChange={e => setEmailForm({...emailForm, sender: e.target.value})}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[10px] sm:text-xs font-mono text-beze-text uppercase tracking-widest">PAYLOAD // PROBLEM_DESCRIPTION</label>
                  <textarea 
                    className="bg-[#080808] border border-beze-grid p-4 text-beze-white font-mono text-sm outline-none focus:border-beze-accent transition-colors w-full min-h-[160px] resize-none"
                    placeholder="Describe the catastrophe. Be precise."
                    value={emailForm.payload}
                    onChange={e => setEmailForm({...emailForm, payload: e.target.value})}
                  />
                </div>
              </div>

              <div className="pt-4">
                <button 
                  onClick={() => {
                    window.location.href = `mailto:ineedhelp@beze.dev?subject=CRITICAL_INCIDENT_REPORT&body=${encodeURIComponent(emailForm.payload)}`;
                    setIsEmailPopupOpen(false);
                  }}
                  className="w-full bg-beze-accent text-beze-bg font-bold py-5 px-8 text-sm sm:text-base hover:bg-white hover:text-black transition-colors duration-300 uppercase tracking-widest"
                >
                  EXECUTE_TRANSMISSION
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
