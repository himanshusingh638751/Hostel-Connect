import React, { useState, useMemo } from 'react';
import {
  MessageSquare,
  ThumbsUp,
  CheckCircle2,
  PlusCircle,
  Tag,
  Clock,
  UserCheck,
  Building2,
  Sparkles,
  HelpCircle,
  GraduationCap
} from 'lucide-react';
import { ForumQuestion, ForumCategory, ForumAnswer, User } from '../../types';

interface ForumViewProps {
  questions: ForumQuestion[];
  answersMap: Record<string, ForumAnswer[]>;
  currentUser: User;
  onSelectQuestion: (question: ForumQuestion) => void;
  onOpenAskQuestion: () => void;
  onUpvoteQuestion: (questionId: string) => void;
  searchQuery: string;
}

const CATEGORIES: ForumCategory[] = [
  'Academics & Exams',
  'Lab & Project Guidance',
  'Hostel Life & Mess',
  'Placements & Internships',
  'Clubs & Sports',
  'General Guidance'
];

export const ForumView: React.FC<ForumViewProps> = ({
  questions,
  answersMap,
  currentUser,
  onSelectQuestion,
  onOpenAskQuestion,
  onUpvoteQuestion,
  searchQuery
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedTargetYear, setSelectedTargetYear] = useState<string>('All');
  const [solvedOnly, setSolvedOnly] = useState<boolean>(false);

  const filteredQuestions = useMemo(() => {
    return questions.filter((q) => {
      if (selectedCategory !== 'All' && q.category !== selectedCategory) return false;
      if (selectedTargetYear !== 'All' && q.targetYear && q.targetYear !== selectedTargetYear) return false;
      if (solvedOnly && !q.solved) return false;
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = q.title.toLowerCase().includes(query);
        const matchesContent = q.content.toLowerCase().includes(query);
        const matchesAuthor = q.author.name.toLowerCase().includes(query);
        const matchesTags = (q.tags || []).some(t => t.toLowerCase().includes(query));
        if (!matchesTitle && !matchesContent && !matchesAuthor && !matchesTags) {
          return false;
        }
      }
      return true;
    });
  }, [questions, selectedCategory, selectedTargetYear, solvedOnly, searchQuery]);

  return (
    <div className="space-y-6">

      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-teal-50 via-white to-emerald-50 border border-teal-200 p-6 sm:p-8 shadow-sm">
        <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-700 text-xs font-semibold">
            <GraduationCap className="w-3.5 h-3.5" />
            Junior–Senior Q&A & Mentorship Forum
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Ask Questions, Get Exam Advice & <span className="text-teal-600">Senior Guidance</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Connect directly with 3rd & 4th year hostel seniors. Ask about syllabus weightage, lab vivas, faculty preferences, hostel rules, or placement roadmaps.
          </p>
        </div>

        <button
          onClick={onOpenAskQuestion}
          className="mt-6 sm:mt-0 sm:absolute sm:right-8 sm:top-8 bg-teal-400 hover:bg-teal-300 text-slate-900 font-bold px-5 py-3 rounded-2xl text-sm flex items-center gap-2 shadow-lg shadow-teal-500/20 transition-all hover:scale-105 active:scale-95"
        >
          <PlusCircle className="w-5 h-5" />
          Ask Senior a Question
        </button>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        <button
          onClick={() => setSelectedCategory('All')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
            selectedCategory === 'All'
              ? 'bg-teal-400 text-slate-900 shadow-md'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70 border border-slate-300/60'
          }`}
        >
          All Topics ({questions.length})
        </button>
        {CATEGORIES.map((cat) => {
          const count = questions.filter(q => q.category === cat).length;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1.5 ${
                selectedCategory === cat
                  ? 'bg-teal-400 text-slate-900 font-semibold shadow-md'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70 border border-slate-300/60'
              }`}
            >
              <span>{cat}</span>
              {count > 0 && (
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${selectedCategory === cat ? 'bg-white/20 text-slate-900' : 'bg-slate-200 text-slate-600'}`}>
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Target Year & Solved Toggle Row */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white/80 p-3.5 rounded-2xl border border-slate-200 text-xs">
        <div className="flex items-center gap-2">
          <span className="text-slate-500">Target Student Year:</span>
          {['All', '1st Year', '2nd Year', '3rd Year', '4th Year'].map((yr) => (
            <button
              key={yr}
              onClick={() => setSelectedTargetYear(yr)}
              className={`px-3 py-1 rounded-lg font-medium transition-all ${
                selectedTargetYear === yr
                  ? 'bg-slate-200 text-teal-700 border border-teal-500/40'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {yr}
            </button>
          ))}
        </div>

        <button
          onClick={() => setSolvedOnly(!solvedOnly)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition-all ${
            solvedOnly
              ? 'bg-indigo-600/10 text-indigo-600 border-indigo-600/40 font-semibold'
              : 'bg-slate-100 text-slate-500 border-slate-300 hover:text-slate-800'
          }`}
        >
          <CheckCircle2 className="w-4 h-4 text-indigo-600" />
          <span>Solved by Seniors Only</span>
        </button>
      </div>

      {/* Questions List */}
      {filteredQuestions.length === 0 ? (
        <div className="text-center py-16 bg-slate-50/50 rounded-3xl border border-slate-200 space-y-4">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-slate-100 flex items-center justify-center text-slate-500">
            <HelpCircle className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-slate-900">No discussions found</h3>
            <p className="text-sm text-slate-500">Be the first junior to ask a senior in this category!</p>
          </div>
          <button
            onClick={onOpenAskQuestion}
            className="bg-teal-400 text-slate-900 font-bold px-4 py-2 rounded-xl text-xs hover:bg-teal-300"
          >
            Ask a Question Now
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredQuestions.map((q) => {
            const answers = answersMap[q.id] || [];
            const hasSeniorAnswer = answers.some(a => a.isSeniorAnswer);
            const isUpvotedByMe = q.upvotedUserIds?.includes(currentUser.id);

            return (
              <div
                key={q.id}
                className="bg-white rounded-2xl border border-slate-200 hover:border-teal-500/40 transition-all p-5 flex flex-col sm:flex-row gap-4 shadow-md group"
              >
                {/* Upvote side button */}
                <div className="flex sm:flex-col items-center justify-center gap-1.5 bg-slate-50/70 p-2.5 sm:px-3 sm:py-3 rounded-xl border border-slate-200 shrink-0 self-start">
                  <button
                    onClick={() => onUpvoteQuestion(q.id)}
                    className={`p-1.5 rounded-lg transition-colors ${
                      isUpvotedByMe ? 'bg-teal-400 text-slate-900' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                    title="Upvote this question"
                  >
                    <ThumbsUp className="w-4 h-4" />
                  </button>
                  <span className="text-xs font-extrabold text-slate-800">{q.upvotes}</span>
                </div>

                {/* Main Content */}
                <div className="flex-1 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <img
                        src={q.author.avatar}
                        alt={q.author.name}
                        className="w-6 h-6 rounded-full object-cover border border-slate-300"
                      />
                      <span className="text-xs font-bold text-slate-800">{q.author.name}</span>
                      <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-md border border-slate-300">
                        {q.author.year} • {q.author.hostelBlock}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-[11px]">
                      <span className="bg-teal-500/10 text-teal-700 border border-teal-500/30 px-2.5 py-0.5 rounded-full font-medium">
                        {q.category}
                      </span>
                      {q.solved && (
                        <span className="bg-indigo-600/10 text-indigo-600 border border-indigo-600/20 px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          Solved
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Title & Body */}
                  <h3
                    onClick={() => onSelectQuestion(q)}
                    className="text-base font-bold text-slate-900 group-hover:text-teal-700 cursor-pointer transition-colors leading-snug"
                  >
                    {q.title}
                  </h3>

                  <p
                    onClick={() => onSelectQuestion(q)}
                    className="text-xs text-slate-600 line-clamp-2 cursor-pointer leading-relaxed"
                  >
                    {q.content}
                  </p>

                  {/* Footer Stats & Senior Answer Indicator */}
                  <div className="pt-2 flex flex-wrap items-center justify-between gap-2 text-xs border-t border-slate-200/80">
                    <div className="flex items-center gap-3">
                      <span
                        onClick={() => onSelectQuestion(q)}
                        className="flex items-center gap-1.5 text-slate-500 hover:text-teal-700 cursor-pointer font-medium"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        {answers.length} Answers
                      </span>

                      {hasSeniorAnswer && (
                        <span className="text-[10px] bg-slate-500/10 text-indigo-700 border border-indigo-500/30 px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                          <UserCheck className="w-3 h-3" />
                          Senior Answered
                        </span>
                      )}
                    </div>

                    <span className="text-[11px] text-slate-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {q.createdAt}
                    </span>
                  </div>

                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
