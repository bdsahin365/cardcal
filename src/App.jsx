import React, { useState, useEffect, useMemo, useContext } from 'react';

import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';

import { History, Settings, RotateCcw, X, Undo2, Sparkles, Wand2, Loader2, Shield } from 'lucide-react';



// --- Colors & Styles ---

const PLAYER_COLORS = [

  { name: 'Teal', bg: 'bg-teal-100', text: 'text-teal-900', border: 'border-teal-300', slider: 'accent-teal-600', sliderTrack: 'bg-teal-200' }, // Player 1

  { name: 'Lime', bg: 'bg-lime-100', text: 'text-lime-900', border: 'border-lime-300', slider: 'accent-lime-600', sliderTrack: 'bg-lime-200' }, // Player 2

  { name: 'Sky', bg: 'bg-sky-100', text: 'text-sky-900', border: 'border-sky-300', slider: 'accent-sky-600', sliderTrack: 'bg-sky-200' },   // Player 3

  { name: 'Rose', bg: 'bg-rose-100', text: 'text-rose-900', border: 'border-rose-300', slider: 'accent-rose-600', sliderTrack: 'bg-rose-200' }   // Player 4

];

const DEFAULT_TEAM_NAMES = [
  'পেটুক স্কোয়াড',
  'না পূর্ণ, না ফেরার',
  'সংগঠিত পাগল গ্রুপ',
  'মজুরি দাস',
  'গ্র্যান্ডমাদারস গিল্ড',
  'পাগল চিপমাঙ্কস',
  'খুব ভালো থাকতে ক্লান্ত',
  'এক্সেল মাস্টার্স',
  'Nerds এর পালক',
  'পারলে কল দিস',
  'কফি জম্বি',
  'বিয়ার নেই ভয় নেই',
  'পাগল বোম্বার',
  'Ass-Savers',
  'মাতাল ড্যামসেল',
  'বড় বিল',
  'অফিস পরী',
  'পাগল রেসার',
  'বুগার আর্মি',
  'থান্ডারিং মেন',
  'হা হা হি হি হিরোস',
  'খ্যাঁট খ্যাঁট ফাইটার্স',
  'ঢিসুম ঢিসুম ড্যাশার্স',
  'ঝুম ঝুম ঝুম উইনার্স',
  'ক্যা ক্যা ক্যা চ্যালেঞ্জার্স',
  'ভ্যা ভ্যা ভ্যা ভিক্টোরিয়াস',
  'ফোঁৎ ফোঁৎ ফোঁৎ ফাইটার্স',
  'ঘ্যাঁও ঘ্যাঁও ঘ্যাঁও গ্ল্যাডিয়েটরস',
  'ম্যাও ম্যাও ম্যাও মায়াবী',
  'কুউ কুউ কুউ কিলারস',
  'গোল দিলেই সেলফি',
  'অফসাইডে জীবন',
  'বুট ছাড়া বাটপার',
  'চায়ের টেবিল একাদশ',
  'বল পেলেই গোল নয়',
  'কিক দিয়ে কান ফাটায়',
  'জুতা খোঁজার টিম',
  'দৌড়াই কিন্তু গোল দেই না',
  'রান্নার রাজা',
  'বুরিটো ব্রাদার্স',
  'গপ্পো গ্যাং',
  'দাদাগিরি টিম',
  'রাত জাগা ক্লাব',
  'বেস্ট ফ্রেন্ডস ক্লাব',
  'পাকনামি পার্টি',
  'পাগলু সqaড',
  'টি ব্রেক টিম',
  'আড্ডাবাজ ভাইব্রেশন',
  'হাসতে হাসতে জীবন',
  'আষাঢ়ে গল্প গ্যাং',
  'কিং খেইপা',
  'বাজি মাত',
  'উল্টাপাল্টা স্কোয়াড',
  'অসংগত দল',
  'কপি পেস্ট বন্ধুরা',
  'বোকার দল',
  'পলাপান পার্টি',
  'চিরকুট চ্যাম্পিয়নস',
  'হুল্লোড় হিরোস',
  'কে বানালো ক্যান্টিন',
  'পাগল Buckeyes',
  'চিৎকার করা ভালুক',
  'বিশ্রী পুরুষ',
  'কিকার কিংস',
  'LOL কিংবদন্তি',
  'চারজন বাস্তব জোকার',
  'গিগল গীক্স',
  'চাকল চ্যাম্পিয়নস',
  'এলএমএও লীগ',
  'উইটি কমিটি',
  'মিথফুল ফোর',
  'স্নিকার স্কোয়াড',
  'দ্য চাকলহেডস',
  'জলি জেলিফিশ',
  'দ্য ক্রেজি কোকোনাটস',
  'ফাঙ্কি বানর',
  'গুফবল গ্যাং',
  'হাসিখুশি হেজহগস',
  'দ্য ফায়ার বলস',
  'কুয়ার্কি কোক্কাস',
  'টিম দন মিয়া',
  'টিম সোনা মিয়া',
  'টিম নিগার সুলতানা',
  'টিম কিমামা',
  'আপেল টিম',
  'চুপ্পু টিম',
  'টিম বাবু',
  'বাবলু জান টিম',
  'চিকা টিম',
  'চুক্কু টিম',
  'বল্টু টিম',
  'লালু টিম',
  'পুটলা টিম',
  'টিম পিংকি',
  'লিপি টিম',
  'পপি টিম',
  'ডলি টিম',
  'টিম পুতুল',
  'নুনু মিয়া টিম',
  'রোটর টিম',
  'টিম যুগল',
  'টিম বাসি',
  'পচা টিম',
  'দুদনাহার টিম',
  'গুলি টিম',
  'দুলা মিয়া টিম',
  'লাল মিয়া টিম',
  'লেবু টিম',
  'যত্রিক টিম',
  'সফেদা টিম',
  'রজ্জু টিম',
  'জুনি টিম',
  'মুলি টিম',
  'হন্না টিম',
  'টিম গোল',
  'টিম টুনু'
];

const TeamNamesContext = React.createContext(null);

const useTeamNames = () => {
  const context = useContext(TeamNamesContext);
  if (!context) {
    throw new Error('useTeamNames হুকটি অবশ্যই TeamNamesProvider এর মধ্যে ব্যবহার করতে হবে');
  }
  return context;
};

const toBanglaNumber = (value) => value.toString().replace(/[0-9]/g, (digit) => '০১২৩৪৫৬৭৮৯'[Number(digit)]);

const TeamNamesProvider = ({ children }) => {
  const [customTeamNames, setCustomTeamNames] = useState([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('customTeamNames');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          const sanitized = parsed
            .map(name => (typeof name === 'string' ? name.trim() : ''))
            .filter(Boolean);
          if (sanitized.length > 0) {
            setCustomTeamNames(sanitized);
          }
        }
      }
    } catch (error) {
      console.error('Failed to load team names from storage', error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('customTeamNames', JSON.stringify(customTeamNames));
    } catch (error) {
      console.error('Failed to save team names', error);
    }
  }, [customTeamNames]);

  const addTeamName = (name) => {
    setCustomTeamNames(prev => [...prev, name]);
  };

  const removeTeamName = (targetName) => {
    setCustomTeamNames(prev => prev.filter(name => name !== targetName));
  };

  const allTeamNames = useMemo(() => [...DEFAULT_TEAM_NAMES, ...customTeamNames], [customTeamNames]);

  const value = {
    customTeamNames,
    allTeamNames,
    addTeamName,
    removeTeamName,
  };

  return (
    <TeamNamesContext.Provider value={value}>
      {children}
    </TeamNamesContext.Provider>
  );
};



// --- API Logic ---

const apiKey = import.meta.env.VITE_OPENAI_API_KEY || "";



async function generateContent(prompt) {

  if (!apiKey) {

    console.warn("API Key missing");

    return null;

  }

  try {

    const response = await fetch(

      "https://api.openai.com/v1/chat/completions",

      {

        method: "POST",

        headers: { 

          "Content-Type": "application/json",

          "Authorization": `Bearer ${apiKey}`

        },

        body: JSON.stringify({

          model: "gpt-3.5-turbo",

          messages: [

            { role: "user", content: prompt }

          ],

          max_tokens: 150,

          temperature: 0.7

        }),

      }

    );

    const data = await response.json();

    if (!response.ok) {

      console.error("OpenAI API error:", data);

      return "Error: " + (data.error?.message || "Could not generate content.");

    }

    return data.choices?.[0]?.message?.content?.trim() || "Could not generate content.";

  } catch (error) {

    console.error("Error calling ChatGPT:", error);

    return "Error connecting to AI.";

  }

}



// --- Components ---



const Slider = ({ value, onChange, colorTheme }) => {

  // Range: -13 to +13

  const min = -13;

  const max = 13;

  

  // Calculate percentage for gradient background logic to visualize 0-center

  const percent = ((value - min) / (max - min)) * 100;

  

  return (

    <div className="w-full px-2 py-1 relative">

      {/* Ticks / Scale */}

      <div className="flex justify-between text-[10px] font-mono text-gray-400 mb-1 px-1 select-none">

        <span>-13</span>

        <span>-5</span>

        <span className="font-bold text-gray-500">0</span>

        <span>+5</span>

        <span>+13</span>

      </div>



      {/* Custom Range Input */}

      <div className="relative h-8 flex items-center">

         {/* Track Line */}

        <div className={`absolute w-full h-2 rounded-full ${colorTheme.sliderTrack} opacity-60`}></div>

        

        {/* Center Marker */}

        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-400 opacity-50 transform -translate-x-1/2 h-full z-0"></div>



        <input

          type="range"

          min={min}

          max={max}

          step={1}

          value={value}

          onChange={(e) => onChange(parseInt(e.target.value))}

          className={`w-full absolute z-10 opacity-0 cursor-pointer h-full`}

        />

        

        {/* Visual Thumb */}

        <div 

            className={`absolute h-8 w-8 bg-white rounded-full shadow-md border border-gray-200 flex items-center justify-center font-bold text-gray-700 text-sm pointer-events-none transition-all duration-75 ease-out`}

            style={{ left: `calc(${percent}% - 16px)` }} // -16px is half thumb width

        >

          {value > 0 ? `+${value}` : value}

        </div>

      </div>

      

      <div className="text-center mt-2 text-xs font-medium uppercase tracking-wide text-gray-500 opacity-80">

        {value === 0 ? 'কোন পরিবর্তন নেই' : 'পয়েন্ট সমন্বয় করুন'}

      </div>

    </div>

  );

};



const PlayerCard = ({ player, index, updateDelta, playerCount, onGenerateName }) => {

  const theme = PLAYER_COLORS[index % PLAYER_COLORS.length];

  const isTightLayout = playerCount > 2;



  return (

    <div className={`flex flex-col ${isTightLayout ? 'py-3' : 'py-6'} px-4 ${theme.bg} transition-all duration-300 relative overflow-hidden group`}>

      {/* Player Name & AI Generator */}

      <div className="flex items-center justify-center gap-2 mb-1 relative z-10">

        <h2 className={`font-bold ${theme.text} uppercase tracking-wider text-sm opacity-70`}>

          {player.name}

        </h2>

        <button 

          onClick={() => onGenerateName(player.id)}

          className={`p-1 rounded-full hover:bg-white/50 transition-colors ${theme.text} opacity-40 hover:opacity-100 group-hover:opacity-70`}

          title="র্যান্ডম দলের নাম"

        >

          <Wand2 size={12} />

        </button>

      </div>



      {/* Main Score */}

      <div className={`text-center font-black ${theme.text} ${isTightLayout ? 'text-5xl' : 'text-7xl'} transition-all leading-none relative z-10`}>

        {player.score}

      </div>

      

      <div className={`text-center text-xs font-medium ${theme.text} opacity-60 mb-2 relative z-10`}>

        মোট স্কোর

      </div>



      {/* Draft Value Preview */}

      <div className="h-8 flex items-center justify-center mb-2 relative z-10">

         {player.draftDelta !== 0 && (

             <span className={`font-bold text-xl ${player.draftDelta > 0 ? 'text-green-600' : 'text-red-500'}`}>

                 {player.draftDelta > 0 ? '▲' : '▼'} {Math.abs(player.draftDelta)}

             </span>

         )}

      </div>



      {/* Slider Control */}

      <div className="w-full max-w-xs mx-auto relative z-10">

        <Slider 

          value={player.draftDelta} 

          onChange={(val) => updateDelta(player.id, val)} 

          colorTheme={theme}

        />

      </div>

    </div>

  );

};



const Modal = ({ isOpen, onClose, title, children, icon: Icon }) => {

  if (!isOpen) return null;

  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">

      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col max-h-[80vh] animate-zoom-in">

        <div className="p-4 border-b flex justify-between items-center bg-gray-50">

          <div className="flex items-center gap-2">

             {Icon && <Icon size={18} className="text-teal-600" />}

             <h3 className="font-bold text-lg text-gray-800">{title}</h3>

          </div>

          <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors">

            <X size={20} className="text-gray-500" />

          </button>

        </div>

        <div className="overflow-y-auto p-4">

          {children}

        </div>

      </div>

    </div>

  );

};



function ScoreTracker() {

  const { allTeamNames } = useTeamNames();

  // --- State ---

  const [playerCount, setPlayerCount] = useState(2);

  const [players, setPlayers] = useState([

    { id: 1, name: `খেলোয়াড় ${toBanglaNumber(1)}`, score: 0, draftDelta: 0 },

    { id: 2, name: `খেলোয়াড় ${toBanglaNumber(2)}`, score: 0, draftDelta: 0 },

  ]);

  const [history, setHistory] = useState([]); // Array of past score states

  

  // Modal States

  const [showHistory, setShowHistory] = useState(false);

  const [showSettings, setShowSettings] = useState(false);

  const [showCommentary, setShowCommentary] = useState(false);

  
  // AI States

  const [commentaryText, setCommentaryText] = useState("");

  const [isGeneratingCommentary, setIsGeneratingCommentary] = useState(false);

  // --- Effects ---

  

  // Initialize players when count changes

  useEffect(() => {

    setPlayers(prev => {

      const newPlayers = [...prev];

      // Add players if needed

      if (newPlayers.length < playerCount) {

        for (let i = newPlayers.length; i < playerCount; i++) {

          newPlayers.push({ id: i + 1, name: `খেলোয়াড় ${toBanglaNumber(i + 1)}`, score: 0, draftDelta: 0 });

        }

      }

      // Remove players if needed

      else if (newPlayers.length > playerCount) {

        newPlayers.splice(playerCount);

      }

      return newPlayers;

    });

  }, [playerCount]);

  // --- Logic ---



  const updateDraftDelta = (id, delta) => {

    setPlayers(players.map(p => p.id === id ? { ...p, draftDelta: delta } : p));

  };



  const commitScores = () => {

    const hasChanges = players.some(p => p.draftDelta !== 0);

    if (!hasChanges) return;



    // Apply changes first so history reflects the new totals immediately

    const updatedPlayers = players.map(p => ({

      ...p,

      score: p.score + p.draftDelta,

      draftDelta: 0 // Reset slider

    }));



    const currentScoresSnapshot = updatedPlayers.map(p => ({

      id: p.id,

      score: p.score,

      name: p.name

    }));



    setPlayers(updatedPlayers);

    setHistory(prev => [...prev, { timestamp: new Date(), scores: currentScoresSnapshot }]);

  };



  const undoLastChange = () => {

    if (history.length === 0) return;



    const lastState = history[history.length - 1];

    const newHistory = history.slice(0, -1);



    setHistory(newHistory);

    setPlayers(players.map(p => {

      const historicPlayer = lastState.scores.find(h => h.id === p.id);

      return {

        ...p,

        score: historicPlayer ? historicPlayer.score : 0,

        draftDelta: 0

      };

    }));

  };



  const resetGame = () => {

    if(confirm("আপনি কি নিশ্চিত যে সব স্কোর শূন্য করতে চান?")) {

        setPlayers(players.map(p => ({ ...p, score: 0, draftDelta: 0 })));

        setHistory([]);

        setShowSettings(false);

    }

  };

  

  // --- Team Name Logic ---

  const assignRandomTeamName = (playerId) => {

    if (allTeamNames.length === 0) return;

    const randomName = allTeamNames[Math.floor(Math.random() * allTeamNames.length)];

    setPlayers(prev => prev.map(p => p.id === playerId ? { ...p, name: randomName } : p));

  };



  // --- AI Functions ---

  const generateCommentary = async () => {

    setIsGeneratingCommentary(true);

    setShowCommentary(true);

    setCommentaryText(""); // Clear previous

    

    const gameState = {

        currentScores: players.map(p => `${p.name}: ${p.score}`),

        historyCount: history.length,

        lastTurn: history.length > 0 ? history[history.length - 1].scores : "গেম শুরু"

    };



    const prompt = `You are an extremely excited, high-energy Bengali (Bangla) e-sports commentator. 

    Here is the current game state data: ${JSON.stringify(gameState)}.

    

    Write a short, 2-3 sentence 'live update' on the match entirely in Bangla. 

    - Mention who is winning.

    - If scores are close, hype up the tension.

    - If someone is dominating, mention that.

    - Use emojis. 

    - Keep it under 50 Bangla words.`;



    const text = await generateContent(prompt);

    setCommentaryText(text);

    setIsGeneratingCommentary(false);

  };



  const hasPendingChanges = players.some(p => p.draftDelta !== 0);



  return (

    <div className="h-screen w-full bg-gray-50 text-gray-800 font-sans flex flex-col overflow-hidden select-none">

      

      {/* Header */}

      <header className="flex-none h-14 bg-white border-b flex items-center justify-between px-4 shadow-sm z-20">

        <button 

            onClick={() => setShowHistory(true)}

            className="flex items-center gap-2 text-gray-600 hover:text-teal-600 transition-colors"

        >

          <History size={20} />

          <span className="text-sm font-semibold hidden sm:inline">ইতিহাস</span>

        </button>

        

        <div className="flex items-center gap-2">

             <div className="font-bold text-lg tracking-tight text-gray-800 hidden sm:block">স্কোর ট্র্যাকার</div>

             {/* AI Commentary Button */}

             <button 

                onClick={generateCommentary}

                className="flex items-center gap-1 px-3 py-1.5 bg-indigo-50 text-indigo-600 rounded-full text-xs font-bold hover:bg-indigo-100 transition-colors border border-indigo-200"

             >

                <Sparkles size={14} />

                ধারাভাষ্য

             </button>

        </div>

        

        <button 

            onClick={() => setShowSettings(true)}

            className="p-2 text-gray-600 hover:text-teal-600 transition-colors"

        >

          <Settings size={20} />

        </button>

      </header>



      {/* Main Game Area */}

      <main className="flex-grow flex flex-col overflow-y-auto">

        {/* Responsive Grid/Flex for Players */}

        <div className={`flex-grow grid ${playerCount === 2 ? 'grid-rows-2' : 'grid-cols-1 md:grid-cols-2'} divide-y md:divide-y-0 md:divide-x`}>

            {players.map((player, index) => (

                <PlayerCard 

                    key={player.id} 

                    player={player} 

                    index={index} 

                    updateDelta={updateDraftDelta}

                    playerCount={playerCount}

                    onGenerateName={assignRandomTeamName}

                />

            ))}

        </div>

      </main>



      {/* Footer Controls */}

      <footer className="flex-none bg-white p-4 pb-6 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] z-20 border-t border-gray-100 flex flex-col gap-3">

        

        {/* Main Commit Button */}

        <button 

            onClick={commitScores}

            disabled={!hasPendingChanges}

            className={`

                w-full py-4 rounded-xl text-lg font-bold tracking-wide shadow-lg transition-all transform active:scale-[0.98]

                ${hasPendingChanges 

                    ? 'bg-gray-800 text-white hover:bg-gray-900 shadow-gray-300/50' 

                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'}

            `}

        >

          {hasPendingChanges ? 'নতুন স্কোর সেট করুন' : 'আপডেট করতে স্লাইডার নাড়ুন'}

        </button>



      </footer>



      {/* --- Modals --- */}

      

      {/* AI Commentary Modal */}

      <Modal isOpen={showCommentary} onClose={() => setShowCommentary(false)} title="এআই ধারাভাষ্যকার" icon={Sparkles}>

         <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100 text-center min-h-[150px] flex flex-col items-center justify-center">

             {isGeneratingCommentary ? (

                 <div className="flex flex-col items-center gap-3 text-indigo-400 animate-pulse">

                     <Loader2 size={32} className="animate-spin" />

                    <span className="font-medium">ম্যাচ পর্যবেক্ষণ চলছে...</span>

                 </div>

             ) : (

                 <div className="text-indigo-900 font-medium text-lg leading-relaxed">

                     "{commentaryText}"

                 </div>

             )}

         </div>

         <div className="mt-4 flex justify-center">

            <button onClick={generateCommentary} className="text-sm text-indigo-600 hover:text-indigo-800 font-semibold flex items-center gap-1">

                <RotateCcw size={14} /> ধারাভাষ্য রিফ্রেশ করুন

             </button>

         </div>

      </Modal>



      {/* History Modal */}

      <Modal isOpen={showHistory} onClose={() => setShowHistory(false)} title="গেমের ইতিহাস" icon={History}>

        {history.length === 0 ? (

            <div className="text-center py-8 text-gray-400">

                এখনও কোনো ইতিহাস নেই। খেলা শুরু করুন!

            </div>

        ) : (

            <div className="max-h-[60vh] overflow-y-auto overflow-x-auto">

                <table className="w-full text-xs border-collapse">

                    <thead className="sticky top-0 bg-white z-10 border-b-2 border-gray-200">

                        <tr>

                            <th className="px-2 py-1.5 text-left text-[10px] font-semibold text-gray-500 font-mono w-16">

                                সময়

                            </th>

                            {history[0]?.scores.map((s, idx) => {

                                const theme = PLAYER_COLORS[idx % PLAYER_COLORS.length];

                                return (

                                    <th key={s.id} className={`px-2 py-1.5 text-center text-[11px] font-bold ${theme.text} ${theme.bg} border-l border-gray-200`}>

                                        {s.name.length > 10 ? s.name.substring(0, 10) + '...' : s.name}

                                    </th>

                                );

                            })}

                        </tr>

                    </thead>

                    <tbody>

                        {history.slice().reverse().map((entry, i) => {

                            const prevEntry = i < history.length - 1 ? history[history.length - 2 - i] : null;

                            return (

                                <tr key={i} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">

                                    <td className="px-2 py-1 text-[10px] text-gray-400 font-mono">

                                        {entry.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}

                                    </td>

                                    {entry.scores.map((s, idx) => {

                                        const prevScore = prevEntry?.scores.find(p => p.id === s.id)?.score ?? s.score;

                                        const delta = s.score - prevScore;

                                        const theme = PLAYER_COLORS[idx % PLAYER_COLORS.length];

                                        return (

                                            <td key={s.id} className={`px-2 py-1 text-center border-l border-gray-100`}>

                                                <div className="flex flex-col items-center gap-0.5">

                                                    <span className="font-bold text-gray-800 text-xs">

                                                        {s.score}

                                                    </span>

                                                    {delta !== 0 && i > 0 && (

                                                        <span className={`text-[9px] font-semibold ${delta > 0 ? 'text-green-600' : 'text-red-500'}`}>

                                                            {delta > 0 ? '+' : ''}{delta}

                                                        </span>

                                                    )}

                                                </div>

                                            </td>

                                        );

                                    })}

                                </tr>

                            );

                        })}

                    </tbody>

                </table>

            </div>

        )}

      </Modal>



      {/* Settings Modal */}

      <Modal isOpen={showSettings} onClose={() => setShowSettings(false)} title="সেটিংস" icon={Settings}>

        <div className="space-y-6">

            

            {/* Player Count Control */}

            <div>

                <label className="block text-sm font-semibold text-gray-700 mb-3">খেলোয়াড়ের সংখ্যা</label>

                <div className="flex bg-gray-100 p-1 rounded-xl">

                    {[2, 3, 4].map(num => (

                        <button

                            key={num}

                            onClick={() => setPlayerCount(num)}

                            className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${playerCount === num ? 'bg-white shadow text-teal-700' : 'text-gray-400 hover:text-gray-600'}`}

                        >

                            {toBanglaNumber(num)} জন খেলোয়াড়

                        </button>

                    ))}

                </div>

                <p className="text-xs text-gray-400 mt-2">খেলোয়াড় সংখ্যা বদলালেও খেলোয়াড় ১/২-এর স্কোর একই থাকবে।</p>

            </div>



            <div className="border-t pt-4">

                <button

                    onClick={undoLastChange}

                    disabled={history.length === 0}

                    className={`

                        w-full py-3 rounded-xl border-2 flex items-center justify-center gap-2 text-sm font-bold transition-colors

                        ${history.length > 0

                            ? 'border-gray-200 text-gray-600 hover:bg-gray-50'

                            : 'border-gray-100 text-gray-300 cursor-not-allowed'}

                    `}

                >

                    <Undo2 size={18} />

                    সর্বশেষ পরিবর্তন বাতিল

                </button>

            </div>



            <div className="border-t pt-4">

                <button 

                    onClick={resetGame}

                    className="w-full py-3 rounded-xl border-2 border-red-100 text-red-600 font-bold hover:bg-red-50 transition-colors flex items-center justify-center gap-2"

                >

                    <RotateCcw size={18} />

                    গেম রিসেট করুন

                </button>

            </div>

        </div>

      </Modal>



    </div>

  );

}



function AdminPage() {

  const navigate = useNavigate();

  const { customTeamNames, allTeamNames, addTeamName, removeTeamName } = useTeamNames();

  const [newTeamName, setNewTeamName] = useState('');

  const [nameError, setNameError] = useState('');



  const handleAddTeamName = () => {

    const trimmed = newTeamName.trim();

    if (!trimmed) {

      setNameError('একটি নাম লিখুন।');

      return;

    }

    const exists = allTeamNames.some(name => name.toLowerCase() === trimmed.toLowerCase());

    if (exists) {

      setNameError('এই নামটি ইতিমধ্যেই তালিকায় আছে।');

      return;

    }

    addTeamName(trimmed);

    setNewTeamName('');

    setNameError('');

  };



  const handleRemoveCustomName = (name) => {

    removeTeamName(name);

  };



  return (

    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">

      <div className="max-w-4xl mx-auto space-y-8">

        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div>

            <div className="flex items-center gap-2 text-teal-600 font-semibold uppercase text-xs tracking-[0.2em]">

              <Shield size={16} />

              অ্যাডমিন কনসোল

            </div>

            <h1 className="text-3xl font-black text-gray-900">টিম নাম ব্যবস্থাপক</h1>

            <p className="text-sm text-gray-500 mt-1">

              স্কোরবোর্ডের ম্যাজিক ওয়ান্ডের জন্য মজার দল নাম যোগ বা মুছুন।

            </p>

          </div>

          <button

            onClick={() => navigate('/')}

            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-white shadow-sm"

          >

            <Undo2 size={16} />

            গেমে ফিরে যান

          </button>

        </header>



        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">

          <h2 className="text-lg font-bold text-gray-800">নতুন দলের নাম যোগ করুন</h2>

          <div className="flex flex-col sm:flex-row gap-3">

            <input

              type="text"

              value={newTeamName}

              onChange={(e) => {

                setNewTeamName(e.target.value);

                if (nameError) setNameError('');

              }}

              placeholder="নতুন দলের নাম লিখুন"

              className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-200 bg-gray-50"

            />

            <button

              onClick={handleAddTeamName}

              className="px-5 py-3 bg-teal-600 text-white text-sm font-semibold rounded-xl hover:bg-teal-700 transition-colors"

            >

              তালিকায় যোগ করুন

            </button>

          </div>

          {nameError && <p className="text-xs text-red-500">{nameError}</p>}

          <p className="text-xs text-gray-400">টিপস: নাম ছোট, ঝরঝরে ও উত্তেজনাপূর্ণ রাখুন!</p>

        </section>



        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">

          <div className="flex items-center justify-between">

            <h2 className="text-lg font-bold text-gray-800">কাস্টম নাম ({customTeamNames.length})</h2>

            <span className="text-xs text-gray-400">{DEFAULT_TEAM_NAMES.length} টি ডিফল্ট নাম অন্তর্ভুক্ত</span>

          </div>

          {customTeamNames.length === 0 ? (

            <p className="text-sm text-gray-400 italic">এখনও কোনো কাস্টম নাম নেই। ডিফল্ট তালিকা ওভাররাইড করতে একটি যোগ করুন।</p>

          ) : (

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

              {customTeamNames.map(name => (

                <div key={name} className="flex items-center justify-between bg-gray-50 border border-gray-100 rounded-xl px-4 py-2">

                  <span className="text-sm font-medium text-gray-700">{name}</span>

                  <button

                    onClick={() => handleRemoveCustomName(name)}

                    className="text-xs text-red-500 font-semibold hover:text-red-600"

                  >

                    মুছুন

                  </button>

                </div>

              ))}

            </div>

          )}

        </section>



        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">

          <div className="flex items-center justify-between">

            <h2 className="text-lg font-bold text-gray-800">সকল উপলব্ধ নাম ({allTeamNames.length})</h2>

            <span className="text-xs text-gray-400">বর্ণানুক্রমে প্রদর্শিত</span>

          </div>

          <div className="max-h-[360px] overflow-y-auto pr-1">

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-600">

              {allTeamNames

                .slice()

                .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }))

                .map((name, idx) => (

                  <span key={`${name}-${idx}`} className="px-3 py-2 bg-gray-50 rounded-lg border border-gray-100">

                    {name}

                  </span>

                ))}

            </div>

          </div>

        </section>

      </div>

    </div>

  );

}



export default function App() {

  return (

    <TeamNamesProvider>

      <BrowserRouter>

        <Routes>

          <Route path="/" element={<ScoreTracker />} />

          <Route path="/admin" element={<AdminPage />} />

          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>

      </BrowserRouter>

    </TeamNamesProvider>

  );

}

