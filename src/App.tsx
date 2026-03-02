/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';

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
  const t = content[lang];

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
            <button className="bg-beze-accent text-beze-bg font-bold py-4 px-8 text-sm lg:text-base hover:bg-white hover:text-black transition-colors duration-300 uppercase tracking-wider">
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
|   > INITIALIZING CORE OVERRIDE...                 |
|   > BYPASSING LEGACY SYSTEMS...                   |
|   > DEPLOYING ENGINEERING SPECIAL FORCES...       |
|   > STATUS: LETHAL PRECISION                      |
|                                                   |
|   [████████████████████████████████████] 100%     |
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
          <a href="#" className="text-beze-text hover:text-beze-accent transition-none">Encrypted_Comms</a>
        </div>
        <div className="text-beze-accent mt-6 md:mt-0 font-mono text-sm">
          root@beze:~$ <span className="cursor-blink">█</span>
        </div>
      </footer>
    </div>
  );
}
