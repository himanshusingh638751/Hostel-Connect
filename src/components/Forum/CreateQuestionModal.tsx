import React, { useState } from 'react';
import { X, HelpCircle, GraduationCap, Building2, AlertCircle } from 'lucide-react';
import { ForumCategory, ForumQuestion, User } from '../../types';

interface CreateQuestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User;
  onCreateQuestion: (newQ: Omit<ForumQuestion, 'id' | 'createdAt' | 'upvotes' | 'upvotedUserIds' | 'answersCount' | 'solved' | 'author' | 'authorId'>) => void;
}

const CATEGORIES: ForumCategory[] = [
  'Academics & Exams',
  'Lab & Project Guidance',
  'Hostel Life & Mess',
  'Placements & Internships',
  'Clubs & Sports',
  'General Guidance'
];

export const CreateQuestionModal: React.FC<CreateQuestionModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onCreateQuestion
}) => {
  if (!isOpen) return null;

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<ForumCategory>('Academics & Exams');
  const [targetYear, setTargetYear] = useState('1st Year');
  const [content, setContent] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Please enter a clear question title.');
      return;
    }
    if (!content.trim()) {
      setError('Please provide details about your question.');
      return;
    }

    const parsedTags = tagsInput
      .split(',')
      .map(t => t.trim().replace(/^#/, ''))
      .filter(Boolean);

    onCreateQuestion({
      title: title.trim(),
      category,
      targetYear,
      content: content.trim(),
      tags: parsedTags.length > 0 ? parsedTags : [category, targetYear, currentUser.hostelBlock]
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-white/80 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden my-8 text-slate-900">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-white/90">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-teal-500/10 text-teal-600 flex items-center justify-center font-bold">
              ❓
            </span>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Ask Hostel Seniors a Question</h2>
              <p className="text-xs text-slate-500">Get academic, exam, lab, and hostel advice</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
          {error && (
            <div className="p-3 bg-rose-500/10 border border-rose-500/30 text-rose-400 rounded-xl text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Question Title */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-600">Question Title *</label>
            <input
              type="text"
              placeholder="e.g. What are the key topics for 1st year Engineering Physics mid-sems?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-slate-100 border border-slate-300 text-sm text-slate-900 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-teal-500/50"
            />
          </div>

          {/* Category & Target Year */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-600">Category *</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as ForumCategory)}
                className="w-full bg-slate-100 border border-slate-300 text-sm text-slate-900 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-teal-500/50"
              >
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-600">Target Student Group *</label>
              <select
                value={targetYear}
                onChange={(e) => setTargetYear(e.target.value)}
                className="w-full bg-slate-100 border border-slate-300 text-sm text-slate-900 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-teal-500/50"
              >
                <option value="1st Year">1st Year Juniors</option>
                <option value="2nd Year">2nd Year Students</option>
                <option value="3rd Year">3rd Year Seniors</option>
                <option value="4th Year">4th Year Seniors</option>
                <option value="All Years">All Hostel Residents</option>
              </select>
            </div>
          </div>

          {/* Content Description */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-600">Detailed Description & Context *</label>
            <textarea
              rows={4}
              placeholder="Provide background: Which professor's course is this? Which lab section or hostel block? What specific help do you need?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full bg-slate-100 border border-slate-300 text-sm text-slate-900 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-teal-500/50"
            />
          </div>

          {/* Tags */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-600">Tags (comma separated)</label>
            <input
              type="text"
              placeholder="e.g. MidSems, PhysicsLab, C++, ExamTips"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              className="w-full bg-slate-100 border border-slate-300 text-xs text-slate-900 rounded-xl px-4 py-2"
            />
          </div>

          {/* User info preview */}
          <div className="p-3 bg-white/80 rounded-xl border border-slate-200 text-xs text-slate-600">
            Asking as <strong className="text-slate-900">{currentUser.name}</strong> ({currentUser.year} • {currentUser.hostelBlock})
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-teal-400 hover:bg-teal-300 text-slate-900 font-bold py-3.5 rounded-2xl text-sm transition-all shadow-lg shadow-teal-500/20"
          >
            Post Question to Seniors
          </button>
        </form>

      </div>
    </div>
  );
};
