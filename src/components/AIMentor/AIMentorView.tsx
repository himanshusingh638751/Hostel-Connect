import React, { useState } from 'react';
import {
  Bot,
  Sparkles,
  Send,
  HelpCircle,
  GraduationCap,
  BookOpen,
  DollarSign,
  ShieldCheck,
  Building2,
  RefreshCw
} from 'lucide-react';
import { User } from '../../types';

interface AIMentorViewProps {
  currentUser: User;
}

const SUGGESTED_PROMPTS = [
  {
    icon: '📚',
    title: 'Mid-Sem Exam Prep',
    prompt: 'How should I prepare for 1st Year Engineering Physics and Mathematics mid-sems? Which topics carry highest weightage?'
  },
  {
    icon: '🏷️',
    title: 'Marketplace Price Check',
    prompt: 'What is a fair second-hand price for a Casio FX-991EX ClassWiz calculator and a 21-speed bicycle in hostel?'
  },
  {
    icon: '🔬',
    title: 'Lab Viva Survival Tips',
    prompt: 'What are the top viva questions asked in Electrical and Mechanical Engineering labs?'
  },
  {
    icon: '🏢',
    title: 'Hostel Gate & Night Pass Rules',
    prompt: 'What are the hostel rules for late library studying during semester exam weeks?'
  }
];

export const AIMentorView: React.FC<AIMentorViewProps> = ({ currentUser }) => {
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'ai'; text: string; time: string }>>([
    {
      sender: 'ai',
      text: `👋 **Hello ${currentUser.name}! I am your Hostel Connect AI Advisor.**\n\nI can assist you with:\n- **Academic & Exam Tips:** Syllabus weightage, mid-sem study roadmaps, and previous year paper strategies.\n- **Marketplace Fair Price Check:** Valuation estimates for used textbooks, lab coats, calculators, and bicycles.\n- **Hostel Life Hacks:** Gate rules, mess voting, library passes, and lab viva preparation.\n\nHow can I help you today?`,
      time: 'Just now'
    }
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendQuery = async (queryText: string) => {
    if (!queryText.trim() || isLoading) return;

    const userMsg = { sender: 'user' as const, text: queryText.trim(), time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai-mentor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: queryText,
          context: `Student: ${currentUser.name}, Year: ${currentUser.year}, Hostel: ${currentUser.hostelBlock}`,
          userRole: currentUser.role
        })
      });

      const data = await response.json();
      const aiReply = data?.reply || "I apologize, I couldn't reach the server right now. Feel free to ask a 4th year senior on the Q&A Forum!";

      setMessages(prev => [...prev, {
        sender: 'ai',
        text: aiReply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } catch (err) {
      setMessages(prev => [...prev, {
        sender: 'ai',
        text: "I am having trouble connecting to the network right now. Please post your question on the Senior Q&A Forum!",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">

      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-50 via-white to-indigo-100 border border-indigo-500/20 p-6 sm:p-8 shadow-2xl">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-500/10 border border-indigo-500/30 text-indigo-700 text-xs font-semibold">
            <Bot className="w-3.5 h-3.5" />
            24/7 AI Hostel Advisor & Study Buddy
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Instant Guidance for <span className="text-indigo-400">Exams, Vivas & Used Item Pricing</span>
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed">
            Get instant AI answers tailored specifically to your college hostel curriculum, mid-sem preparation, and market valuation for second-hand gear.
          </p>
        </div>
      </div>

      {/* Suggested Prompt Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {SUGGESTED_PROMPTS.map((item, idx) => (
          <button
            key={idx}
            onClick={() => handleSendQuery(item.prompt)}
            className="p-4 rounded-2xl bg-white hover:bg-slate-100 border border-slate-200 hover:border-indigo-500/40 text-left transition-all space-y-2 group shadow-md"
          >
            <div className="flex items-center justify-between">
              <span className="text-2xl">{item.icon}</span>
              <Sparkles className="w-4 h-4 text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="font-bold text-slate-900 text-xs">{item.title}</div>
            <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">{item.prompt}</p>
          </button>
        ))}
      </div>

      {/* Chat Conversation Box */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden flex flex-col h-[520px]">
        <div className="p-4 border-b border-slate-200 bg-white/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-slate-500/20 border border-indigo-500/30 text-indigo-700 flex items-center justify-center font-bold">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-slate-900 text-xs flex items-center gap-2">
                Hostel Connect AI Mentor
                <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
              </div>
              <div className="text-[10px] text-slate-500">
                Tailored for {currentUser.year} • {currentUser.hostelBlock}
              </div>
            </div>
          </div>

          <button
            onClick={() => setMessages([{
              sender: 'ai',
              text: `👋 Chat reset! Ask me anything about mid-sems, lab coats, or hostel rules.`,
              time: 'Just now'
            }])}
            className="text-xs text-slate-500 hover:text-slate-900 flex items-center gap-1 bg-slate-100 px-2.5 py-1 rounded-lg"
          >
            <RefreshCw className="w-3 h-3" />
            Reset
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/30">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl p-4 text-xs sm:text-sm space-y-2 shadow ${
                  m.sender === 'user'
                    ? 'bg-indigo-600 text-white font-medium rounded-br-none'
                    : 'bg-slate-100 text-slate-900 rounded-bl-none border border-slate-300/80'
                }`}
              >
                <div className="whitespace-pre-line leading-relaxed">{m.text}</div>
                <div className="text-[10px] text-slate-500 text-right">{m.time}</div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-2 text-xs text-indigo-700 bg-slate-50/40 p-3 rounded-2xl border border-indigo-500/30 w-fit">
              <RefreshCw className="w-4 h-4 animate-spin text-indigo-400" />
              <span>AI Senior Mentor is analyzing your query...</span>
            </div>
          )}
        </div>

        {/* Input */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendQuery(inputQuery);
          }}
          className="p-3 bg-slate-50 border-t border-slate-200 flex items-center gap-2"
        >
          <input
            type="text"
            placeholder="Ask AI Mentor about mid-sems, lab viva, item pricing..."
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            disabled={isLoading}
            className="flex-1 bg-white border border-slate-200 text-xs sm:text-sm text-slate-900 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
          />
          <button
            type="submit"
            disabled={!inputQuery.trim() || isLoading}
            className="bg-slate-500 hover:bg-indigo-400 text-slate-900 p-3 rounded-2xl font-bold transition-all disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

      </div>

    </div>
  );
};
