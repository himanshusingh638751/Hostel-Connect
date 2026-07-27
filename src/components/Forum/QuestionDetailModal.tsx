import React, { useState } from 'react';
import {
  X,
  ThumbsUp,
  CheckCircle2,
  Send,
  UserCheck,
  Building2,
  Clock,
  Award,
  Sparkles,
  ShieldCheck,
  Phone
} from 'lucide-react';
import { ForumQuestion, ForumAnswer, User } from '../../types';

interface QuestionDetailModalProps {
  question: ForumQuestion | null;
  answers: ForumAnswer[];
  onClose: () => void;
  currentUser: User;
  onAddAnswer: (questionId: string, content: string) => void;
  onUpvoteQuestion: (questionId: string) => void;
  onUpvoteAnswer: (answerId: string) => void;
  onMarkBestAnswer: (questionId: string, answerId: string) => void;
}

export const QuestionDetailModal: React.FC<QuestionDetailModalProps> = ({
  question,
  answers,
  onClose,
  currentUser,
  onAddAnswer,
  onUpvoteQuestion,
  onUpvoteAnswer,
  onMarkBestAnswer
}) => {
  if (!question) return null;

  const [newAnswerText, setNewAnswerText] = useState('');

  const handlePostAnswer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAnswerText.trim()) return;
    onAddAnswer(question.id, newAnswerText.trim());
    setNewAnswerText('');
  };

  const isQuestionOwner = question.authorId === currentUser.id;
  const isUpvotedByMe = question.upvotedUserIds?.includes(currentUser.id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-white/80 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden my-8 text-slate-900 max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-white/90 sticky top-0 z-20">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span>Forum</span>
            <span>/</span>
            <span className="text-teal-600 font-semibold">{question.category}</span>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* Main Question Card */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <img
                  src={question.author.avatar}
                  alt={question.author.name}
                  className="w-10 h-10 rounded-full object-cover border border-slate-300"
                />
                <div>
                  <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                    {question.author.name}
                    <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-md">
                      {question.author.year}
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 flex flex-wrap items-center gap-2">
                    <span>{question.author.hostelBlock}, Room {question.author.roomNumber}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-teal-600">
                      <Phone className="w-3 h-3" />
                      {question.author.phone}
                    </span>
                  </div>
                </div>
              </div>

              <span className="text-xs text-slate-500 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {question.createdAt}
              </span>
            </div>

            <h1 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">{question.title}</h1>

            <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line bg-white/60 p-4 rounded-xl border border-slate-200">
              {question.content}
            </p>

            <div className="flex items-center justify-between pt-2 border-t border-slate-200">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onUpvoteQuestion(question.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    isUpvotedByMe
                      ? 'bg-teal-400 text-slate-900'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-600 border border-slate-300'
                  }`}
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>Upvote ({question.upvotes})</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                {question.solved && (
                  <span className="text-xs bg-indigo-600/10 text-indigo-600 border border-indigo-600/20 px-3 py-1 rounded-full font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" />
                    Solved
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Answers Thread Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-teal-600" />
              Senior Answers & Guidance ({answers.length})
            </h3>

            {answers.length === 0 ? (
              <div className="text-center py-8 bg-slate-50/40 rounded-2xl border border-slate-200/80 text-xs text-slate-500">
                No answers posted yet. Seniors will respond shortly!
              </div>
            ) : (
              <div className="space-y-4">
                {answers.map((ans) => {
                  const isAnswerUpvoted = ans.upvotedUserIds?.includes(currentUser.id);

                  return (
                    <div
                      key={ans.id}
                      className={`p-4 rounded-2xl border transition-all ${
                        ans.isBestAnswer
                          ? 'bg-emerald-950/20 border-indigo-600/40 shadow-lg shadow-indigo-600/5'
                          : ans.isSeniorAnswer
                          ? 'bg-slate-50/20 border-indigo-500/30'
                          : 'bg-slate-50 border-slate-200'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-3 mb-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={ans.author.avatar}
                            alt={ans.author.name}
                            className="w-8 h-8 rounded-full object-cover border border-slate-300"
                          />
                          <div>
                            <div className="font-bold text-slate-900 text-xs flex items-center gap-2">
                              {ans.author.name}
                              {ans.isSeniorAnswer && (
                                <span className="bg-slate-500/20 text-indigo-700 border border-indigo-500/30 text-[10px] px-2 py-0.2 rounded-full font-bold">
                                  Senior Mentor
                                </span>
                              )}
                              {ans.isBestAnswer && (
                                <span className="bg-indigo-600/10 text-indigo-600 border border-indigo-600/20 text-[10px] px-2 py-0.2 rounded-full font-bold flex items-center gap-1">
                                  <Award className="w-3 h-3" />
                                  Best Answer
                                </span>
                              )}
                            </div>
                            <div className="text-[10px] text-slate-500">
                              {ans.author.year} • Room {ans.author.roomNumber} ({ans.author.hostelBlock})
                            </div>
                          </div>
                        </div>

                        <span className="text-[10px] text-slate-500">{ans.createdAt}</span>
                      </div>

                      {/* Content */}
                      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed whitespace-pre-line pl-11">
                        {ans.content}
                      </p>

                      {/* Footer */}
                      <div className="pt-3 mt-3 border-t border-slate-200/80 flex items-center justify-between pl-11">
                        <button
                          onClick={() => onUpvoteAnswer(ans.id)}
                          className={`flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg transition-all ${
                            isAnswerUpvoted
                              ? 'bg-teal-400 text-slate-900 font-bold'
                              : 'text-slate-500 hover:text-slate-900 bg-white'
                          }`}
                        >
                          <ThumbsUp className="w-3.5 h-3.5" />
                          <span>Helpful ({ans.upvotes})</span>
                        </button>

                        {isQuestionOwner && !ans.isBestAnswer && (
                          <button
                            onClick={() => onMarkBestAnswer(question.id, ans.id)}
                            className="text-xs text-indigo-600 hover:underline flex items-center gap-1 font-semibold"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            Mark as Best Answer
                          </button>
                        )}
                      </div>

                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Add Answer Form */}
          <form onSubmit={handlePostAnswer} className="pt-4 border-t border-slate-200 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <label className="font-bold text-slate-800">Post Your Answer & Advice</label>
              <span className="text-slate-500">
                Answering as: <strong className="text-teal-700">{currentUser.name}</strong> ({currentUser.year})
              </span>
            </div>

            <textarea
              rows={3}
              placeholder="Share step-by-step guidance, exam tips, syllabus weightage, or offer to help in hostel..."
              value={newAnswerText}
              onChange={(e) => setNewAnswerText(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 rounded-2xl p-3 focus:outline-none focus:ring-2 focus:ring-teal-500/50"
            />

            <button
              type="submit"
              disabled={!newAnswerText.trim()}
              className="w-full bg-teal-400 hover:bg-teal-300 text-slate-900 font-bold py-3 rounded-2xl text-xs sm:text-sm transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              Submit Answer
            </button>
          </form>

        </div>

      </div>
    </div>
  );
};
