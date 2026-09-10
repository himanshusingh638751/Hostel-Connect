/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { MarketplaceView } from './components/Marketplace/MarketplaceView';
import { ItemDetailModal } from './components/Marketplace/ItemDetailModal';
import { CreateListingModal } from './components/Marketplace/CreateListingModal';
import { ForumView } from './components/Forum/ForumView';
import { QuestionDetailModal } from './components/Forum/QuestionDetailModal';
import { CreateQuestionModal } from './components/Forum/CreateQuestionModal';
import { NoticeBoardView } from './components/NoticeBoard/NoticeBoardView';
import { SeniorsDirectoryView } from './components/Seniors/SeniorsDirectoryView';
import { ChatView } from './components/Messages/ChatView';
import { ProfileView } from './components/Profile/ProfileView';
import { NotificationDropdown } from './components/Notifications/NotificationDropdown';
import { UserSwitcherModal } from './components/Auth/UserSwitcherModal';
import { LoginView } from './components/Auth/LoginView';

import { supabase } from './lib/supabase';
import {
  SAMPLE_USERS,
  INITIAL_MARKETPLACE_ITEMS,
  INITIAL_FORUM_QUESTIONS,
  INITIAL_FORUM_ANSWERS,
  INITIAL_NOTICES,
  INITIAL_CONVERSATIONS,
  INITIAL_MESSAGES,
  INITIAL_REVIEWS,
  INITIAL_MENTOR_REVIEWS,
  INITIAL_NOTIFICATIONS
} from './data/initialData';
import {
  User,
  MarketplaceItem,
  ForumQuestion,
  ForumAnswer,
  Notice,
  Conversation,
  ChatMessage,
  SellerReview,
  Notification,
  MentorReview
} from './types';

export default function App() {
  // Persistence state
  const [allUsers, setAllUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('hc_users_v2');
    if (saved && saved !== 'undefined') {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {
        console.warn('Failed to parse hc_users_v2');
      }
    }
    return SAMPLE_USERS;
  });
      const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = sessionStorage.getItem('hc_current_user_v2');
    if (saved && saved !== 'undefined') {
      try {
        const parsed = JSON.parse(saved);
        if (parsed) return parsed;
      } catch (e) {
        console.warn('Failed to parse hc_current_user_v2');
      }
    }
    return null;
  });
  const [items, setItems] = useState<MarketplaceItem[]>(() => {
    const saved = localStorage.getItem('hc_items_v5');
    if (saved && saved !== 'undefined') {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {
        console.warn('Failed to parse hc_items_v5');
      }
    }
    return INITIAL_MARKETPLACE_ITEMS;
  });

  const [questions, setQuestions] = useState<ForumQuestion[]>(() => {
    const saved = localStorage.getItem('hc_questions');
    if (saved && saved !== 'undefined') {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {
        console.warn('Failed to parse hc_questions');
      }
    }
    return INITIAL_FORUM_QUESTIONS;
  });

  const [answersMap, setAnswersMap] = useState<Record<string, ForumAnswer[]>>(() => {
    const saved = localStorage.getItem('hc_answers');
    if (saved && saved !== 'undefined') {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object' && Object.keys(parsed).length > 0) return parsed;
      } catch (e) {
        console.warn('Failed to parse hc_answers');
      }
    }
    return INITIAL_FORUM_ANSWERS;
  });

  const [notices, setNotices] = useState<Notice[]>(() => {
    const saved = localStorage.getItem('hc_notices');
    if (saved && saved !== 'undefined') {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {
        console.warn('Failed to parse hc_notices');
      }
    }
    return INITIAL_NOTICES;
  });

  const [conversations, setConversations] = useState<Conversation[]>(() => {
    const saved = localStorage.getItem('hc_conversations');
    if (saved && saved !== 'undefined') {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {
        console.warn('Failed to parse hc_conversations');
      }
    }
    return INITIAL_CONVERSATIONS;
  });

  const [messagesMap, setMessagesMap] = useState<Record<string, ChatMessage[]>>(() => {
    const saved = localStorage.getItem('hc_messages');
    if (saved && saved !== 'undefined') {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object' && Object.keys(parsed).length > 0) return parsed;
      } catch (e) {
        console.warn('Failed to parse hc_messages');
      }
    }
    return INITIAL_MESSAGES;
  });

  const [reviews, setReviews] = useState<SellerReview[]>(() => {
    const saved = localStorage.getItem('hc_reviews');
    if (saved && saved !== 'undefined') {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {
        console.warn('Failed to parse hc_reviews');
      }
    }
    return INITIAL_REVIEWS;
  });

  const [mentorReviews, setMentorReviews] = useState<MentorReview[]>(() => {
    const saved = localStorage.getItem('hc_mentor_reviews');
    if (saved && saved !== 'undefined') {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {
        console.warn('Failed to parse hc_mentor_reviews');
      }
    }
    return INITIAL_MENTOR_REVIEWS;
  });

  const [notifications, setNotifications] = useState<Notification[]>(() => {
    const saved = localStorage.getItem('hc_notifications');
    if (saved && saved !== 'undefined') {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {
        console.warn('Failed to parse hc_notifications');
      }
    }
    return INITIAL_NOTIFICATIONS;
  });

  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('hc_wishlist');
    if (saved && saved !== 'undefined') {
      try {
        const parsed = JSON.parse(saved);
        if (parsed) return parsed;
      } catch (e) {
        console.warn('Failed to parse ' + 'hc_wishlist');
      }
    }
    return ['item_1', 'item_3'];
  });

  // Navigation & Filter states
  const [activeTab, setActiveTab] = useState<string>('marketplace');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Dark mode
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('hc_dark_mode');
    if (saved !== null) return JSON.parse(saved);
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    localStorage.setItem('hc_dark_mode', JSON.stringify(isDarkMode));
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Modals state
  const [selectedItemForDetail, setSelectedItemForDetail] = useState<MarketplaceItem | null>(null);
  const [selectedQuestionForDetail, setSelectedQuestionForDetail] = useState<ForumQuestion | null>(null);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(conversations[0]?.id || null);

  const [showCreateListingModal, setShowCreateListingModal] = useState<boolean>(false);
  const [showCreateQuestionModal, setShowCreateQuestionModal] = useState<boolean>(false);
  const [showUserSwitcherModal, setShowUserSwitcherModal] = useState<boolean>(false);
  const [showNotificationsDropdown, setShowNotificationsDropdown] = useState<boolean>(false);

  // Sync state changes to localStorage
  const safeSetStorage = (key: string, data: any) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.warn(`Storage quota exceeded for ${key}. Try clearing browser data or using smaller images.`);
      if (e instanceof DOMException && e.name === 'QuotaExceededError') {
        alert('Storage quota exceeded! The image you uploaded might be too large. Please use a smaller image or an image URL.');
      }
    }
  };

  useEffect(() => { safeSetStorage('hc_users_v2', allUsers); }, [allUsers]);
  useEffect(() => { safeSetStorage('hc_current_user_v2', currentUser); }, [currentUser]);
  useEffect(() => { safeSetStorage('hc_items_v5', items); }, [items]);
  useEffect(() => { safeSetStorage('hc_questions', questions); }, [questions]);
  useEffect(() => { safeSetStorage('hc_answers', answersMap); }, [answersMap]);
  useEffect(() => { safeSetStorage('hc_notices', notices); }, [notices]);
  useEffect(() => { safeSetStorage('hc_conversations', conversations); }, [conversations]);
  useEffect(() => { safeSetStorage('hc_messages', messagesMap); }, [messagesMap]);
  useEffect(() => { safeSetStorage('hc_reviews', reviews); }, [reviews]);
  useEffect(() => { safeSetStorage('hc_mentor_reviews', mentorReviews); }, [mentorReviews]);
  useEffect(() => { safeSetStorage('hc_notifications', notifications); }, [notifications]);
  useEffect(() => { safeSetStorage('hc_wishlist', wishlistIds); }, [wishlistIds]);

  // Handler: Rate Mentor
  const handleRateMentor = (mentorId: string, rating: number, testimonial: string) => {
    const newReview: MentorReview = {
      id: `mrev_${Date.now()}`,
      mentorId,
      menteeId: currentUser.id,
      mentee: currentUser,
      rating,
      testimonial,
      createdAt: 'Just now'
    };
    
    setMentorReviews(prev => [newReview, ...prev]);
    
    // Send notification to the mentor
    const notif: Notification = {
      id: `notif_${Date.now()}`,
      userId: mentorId,
      title: 'New Mentorship Rating',
      message: `${currentUser.name} rated you ${rating} stars as a mentor!`,
      type: 'notice',
      createdAt: 'Just now',
      read: false,
      linkTab: 'seniors'
    };
    setNotifications(prev => [notif, ...prev]);
  };

  // Handler: Toggle Wishlist
  const handleToggleWishlist = (itemId: string) => {
    setWishlistIds(prev => 
      prev.includes(itemId) ? prev.filter(id => id !== itemId) : [...prev, itemId]
    );
  };

  // Handler: Start Chat with Seller
  const handleStartChatWithSeller = (seller: User, item?: MarketplaceItem) => {
    if (seller.id === currentUser.id) return; // Cannot chat with yourself

    // Look for existing conversation
    let existing = conversations.find(c => 
      c.participantIds.includes(currentUser.id) && c.participantIds.includes(seller.id)
    );

    if (!existing) {
      const newConvId = `conv_${Date.now()}`;
      const newConv: Conversation = {
        id: newConvId,
        participantIds: [currentUser.id, seller.id],
        participants: [currentUser, seller],
        lastMessage: item ? `Hi! I'm interested in your ${item.title}` : `Hi ${seller.name}!`,
        lastMessageTimestamp: 'Just now',
        unreadCount: { [seller.id]: 1, [currentUser.id]: 0 },
        relatedItemId: item?.id,
        relatedItemTitle: item?.title
      };

      const initialMsg: ChatMessage = {
        id: `msg_${Date.now()}`,
        conversationId: newConvId,
        senderId: currentUser.id,
        text: item ? `Hi Senior/Junior! Is your "${item.title}" still available?` : `Hi ${seller.name}!`,
        timestamp: 'Just now',
        itemId: item?.id
      };

      setConversations(prev => [newConv, ...prev]);
      setMessagesMap(prev => ({ ...prev, [newConvId]: [initialMsg] }));
      setActiveConversationId(newConvId);
      
      // Save to Supabase (with safe error handling)
      try {
        supabase.from('conversations').insert({
          id: newConv.id,
          participant_ids: newConv.participantIds,
          last_message: newConv.lastMessage,
          last_message_timestamp: new Date().toISOString(),
          unread_count: newConv.unreadCount,
          related_item_id: newConv.relatedItemId,
          related_item_title: newConv.relatedItemTitle
        }).then(() => {
          supabase.from('chat_messages').insert({
            id: initialMsg.id,
            conversation_id: initialMsg.conversationId,
            sender_id: initialMsg.senderId,
            text: initialMsg.text,
            timestamp: new Date().toISOString(),
            item_id: initialMsg.itemId,
            item_snapshot: initialMsg.itemSnapshot
          }).then(() => {}, (err) => console.warn("Supabase message sync note:", err));
        }, (err) => console.warn("Supabase conversation sync note:", err));
      } catch (err) {
        console.warn("Supabase chat sync error:", err);
      }

    } else {
      setActiveConversationId(existing.id);
    }

    setSelectedItemForDetail(null);
    setActiveTab('messages');
  };

  // Handler: Create Listing
  const handleCreateListing = (newItemData: Omit<MarketplaceItem, 'id' | 'createdAt' | 'viewsCount' | 'wishlistCount' | 'seller' | 'sellerId' | 'status'>) => {
    const newItem: MarketplaceItem = {
      ...newItemData,
      id: `item_${Date.now()}`,
      createdAt: 'Just now',
      viewsCount: 1,
      wishlistCount: 0,
      sellerId: currentUser.id,
      seller: currentUser,
      status: 'Available'
    };

    setItems(prev => [newItem, ...prev]);

    // Add notification
    const notif: Notification = {
      id: `notif_${Date.now()}`,
      userId: currentUser.id,
      title: 'Item Published Successfully',
      message: `Your item "${newItem.title}" is now live on the Hostel Connect Marketplace.`,
      type: 'marketplace',
      createdAt: 'Just now',
      read: false,
      linkTab: 'marketplace',
      targetId: newItem.id
    };
    setNotifications(prev => [notif, ...prev]);
  };

  // Handler: Reserve Item
  const handleReserveItem = (itemId: string) => {
    setItems(prev => prev.map(item => 
      item.id === itemId ? { ...item, status: 'Reserved' as const } : item
    ));
    supabase.from('marketplace_items').update({ status: 'Reserved' }).eq('id', itemId).then(({error}) => { if(error) console.error("Error reserving item in Supabase:", error); });
    

    const item = items.find(i => i.id === itemId);
    if (item) {
      // Notify seller
      const notif: Notification = {
        id: `notif_${Date.now()}`,
        userId: item.sellerId,
        title: 'Buyer Requested Reservation',
        message: `${currentUser.name} requested to reserve "${item.title}".`,
        type: 'marketplace',
        createdAt: 'Just now',
        read: false,
        linkTab: 'messages'
      };
      setNotifications(prev => [notif, ...prev]);
    }
  };

  // Handler: Create Question
  const handleCreateQuestion = (newQData: Omit<ForumQuestion, 'id' | 'createdAt' | 'upvotes' | 'upvotedUserIds' | 'answersCount' | 'solved' | 'author' | 'authorId'>) => {
    const newQ: ForumQuestion = {
      ...newQData,
      id: `q_${Date.now()}`,
      createdAt: 'Just now',
      upvotes: 1,
      upvotedUserIds: [currentUser.id],
      answersCount: 0,
      solved: false,
      authorId: currentUser.id,
      author: currentUser
    };

    setQuestions(prev => [newQ, ...prev]);
    setAnswersMap(prev => ({ ...prev, [newQ.id]: [] }));
  };

  // Handler: Upvote Question
  const handleUpvoteQuestion = (qId: string) => {
    setQuestions(prev => prev.map(q => {
      if (q.id === qId) {
        const isAlreadyUpvoted = q.upvotedUserIds?.includes(currentUser.id);
        const updatedUserIds = isAlreadyUpvoted
          ? q.upvotedUserIds.filter(id => id !== currentUser.id)
          : [...(q.upvotedUserIds || []), currentUser.id];
        return {
          ...q,
          upvotes: isAlreadyUpvoted ? q.upvotes - 1 : q.upvotes + 1,
          upvotedUserIds: updatedUserIds
        };
      }
      return q;
    }));
  };

  // Handler: Add Answer
  const handleAddAnswer = (qId: string, contentText: string) => {
    const isSenior = currentUser.role === 'Senior' || currentUser.role === 'Hostel Rep' || currentUser.year.includes('Senior');

    const newAnswer: ForumAnswer = {
      id: `ans_${Date.now()}`,
      questionId: qId,
      content: contentText,
      authorId: currentUser.id,
      author: currentUser,
      createdAt: 'Just now',
      upvotes: 1,
      upvotedUserIds: [currentUser.id],
      isBestAnswer: false,
      isSeniorAnswer: isSenior
    };

    setAnswersMap(prev => ({
      ...prev,
      [qId]: [...(prev[qId] || []), newAnswer]
    }));

    setQuestions(prev => prev.map(q => 
      q.id === qId ? { ...q, answersCount: q.answersCount + 1 } : q
    ));
  };

  // Handler: Upvote Answer
  const handleUpvoteAnswer = (answerId: string) => {
    setAnswersMap(prev => {
      const updated = { ...prev };
      Object.keys(updated).forEach(qId => {
        updated[qId] = updated[qId].map(ans => {
          if (ans.id === answerId) {
            const isAlreadyUpvoted = ans.upvotedUserIds?.includes(currentUser.id);
            const updatedUserIds = isAlreadyUpvoted
              ? ans.upvotedUserIds.filter(id => id !== currentUser.id)
              : [...(ans.upvotedUserIds || []), currentUser.id];
            return {
              ...ans,
              upvotes: isAlreadyUpvoted ? ans.upvotes - 1 : ans.upvotes + 1,
              upvotedUserIds: updatedUserIds
            };
          }
          return ans;
        });
      });
      return updated;
    });
  };

  // Handler: Mark Best Answer
  const handleMarkBestAnswer = (qId: string, answerId: string) => {
    setAnswersMap(prev => ({
      ...prev,
      [qId]: (prev[qId] || []).map(a => ({
        ...a,
        isBestAnswer: a.id === answerId
      }))
    }));

    setQuestions(prev => prev.map(q => 
      q.id === qId ? { ...q, solved: true } : q
    ));
  };

  // Handler: Create Notice
  const handleCreateNotice = (newNoticeData: Omit<Notice, 'id' | 'createdAt' | 'attendeesCount' | 'attendeeUserIds' | 'author' | 'authorId'>) => {
    const newNotice: Notice = {
      ...newNoticeData,
      id: `not_${Date.now()}`,
      createdAt: 'Just now',
      attendeesCount: 1,
      attendeeUserIds: [currentUser.id],
      authorId: currentUser.id,
      author: currentUser
    };

    setNotices(prev => [newNotice, ...prev]);
  };

  // Handler: Toggle Notice RSVP
  const handleToggleRSVP = (noticeId: string) => {
    setNotices(prev => prev.map(n => {
      if (n.id === noticeId) {
        const isAttending = n.attendeeUserIds?.includes(currentUser.id);
        const updatedUserIds = isAttending
          ? n.attendeeUserIds.filter(id => id !== currentUser.id)
          : [...(n.attendeeUserIds || []), currentUser.id];
        return {
          ...n,
          attendeesCount: isAttending ? n.attendeesCount - 1 : n.attendeesCount + 1,
          attendeeUserIds: updatedUserIds
        };
      }
      return n;
    }));
  };

  // Handler: Send Direct Chat Message
  const handleSendMessage = (convId: string, text: string) => {
    const newMsg: ChatMessage = {
      id: `msg_${Date.now()}`,
      conversationId: convId,
      senderId: currentUser.id,
      text,
      timestamp: 'Just now'
    };
    try {
      supabase.from('chat_messages').insert({
        id: newMsg.id,
        conversation_id: newMsg.conversationId,
        sender_id: newMsg.senderId,
        text: newMsg.text,
        timestamp: new Date().toISOString()
      }).then(({error}) => { 
        if(error) console.warn("Supabase message sync note:", error.message); 
      }, (err) => console.warn("Supabase message sync note:", err));
    } catch (err) {
      console.warn("Supabase message sync error:", err);
    }
    

    setMessagesMap(prev => ({
      ...prev,
      [convId]: [...(prev[convId] || []), newMsg]
    }));

    setConversations(prev => prev.map(c => 
      c.id === convId
        ? {
            ...c,
            lastMessage: text,
            lastMessageTimestamp: 'Just now'
          }
        : c
    ));
  };

  // Handler: Update Profile
  const handleUpdateProfile = (updated: Partial<User>) => {
    const updatedUser = { ...currentUser, ...updated };
    setCurrentUser(updatedUser);
    setAllUsers(prev => prev.map(u => u.id === currentUser.id ? updatedUser : u));
  };

  // Handler: Item Status Toggle in Profile
  const handleToggleItemStatus = (itemId: string, status: 'Available' | 'Reserved' | 'Sold') => {
    setItems(prev => prev.map(item => item.id === itemId ? { ...item, status } : item));
  };

  if (!currentUser) {
    return (
      <LoginView 
        allUsers={allUsers}
        onLogin={setCurrentUser} 
        onRegister={async (newUser) => {
          setAllUsers(prev => [...prev, newUser]);
          setCurrentUser(newUser);
          try {
            const { error } = await supabase.from('users').insert({
              id: newUser.id,
              name: newUser.name,
              email: newUser.email,
              avatar: newUser.avatar,
              year: newUser.year,
              role: newUser.role,
              hostel_block: newUser.hostelBlock,
              room_number: newUser.roomNumber,
              department: newUser.department,
              phone: newUser.phone,
              bio: newUser.bio,
              rating: newUser.rating,
              review_count: newUser.reviewCount,
              verified_student: newUser.verifiedStudent,
              badges: newUser.badges,
              password: newUser.password
            });
            if (error) console.warn("Supabase user sync note:", error.message);
          } catch (err) {
            console.warn("Supabase user sync network note:", err);
          }
        }}
      />
    );
  }

  // Derived calculations
  const wishlistItems = items.filter(i => wishlistIds.includes(i.id));
  const userListings = items.filter(i => i.sellerId === currentUser.id);
  const userQuestions = questions.filter(q => q.authorId === currentUser.id);

  const totalUnreadMessages = conversations.reduce((acc, c) => acc + (c.unreadCount[currentUser.id] || 0), 0);
  const openQuestionsCount = questions.filter(q => !q.solved).length;
  const availableItemsCount = items.filter(i => i.status === 'Available').length;
  const pinnedNoticesCount = notices.filter(n => n.pinned).length;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50 flex flex-col font-sans selection:bg-indigo-600 selection:text-white">
      
      {/* Top Bar Header */}
      <Header
        currentUser={currentUser}
        allUsers={allUsers}
        onSwitchUser={(user) => setCurrentUser(user)}
        onLogout={() => setCurrentUser(null)}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
        wishlistCount={wishlistIds.length}
        notifications={notifications}
        onOpenNotifications={() => setShowNotificationsDropdown(true)}
        onOpenWishlist={() => {
          setActiveTab('profile');
        }}
        onOpenCreateListing={() => setShowCreateListingModal(true)}
        onOpenCreateQuestion={() => setShowCreateQuestionModal(true)}
        onOpenProfile={() => setActiveTab('profile')}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        activeTab={activeTab}
      />

      {/* Main Tab Bar */}
      <Navigation
        userRole={currentUser.role}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        totalUnreadMessages={totalUnreadMessages}
        openQuestionsCount={openQuestionsCount}
        availableItemsCount={availableItemsCount}
        pinnedNoticesCount={pinnedNoticesCount}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {activeTab === 'marketplace' && (
          <MarketplaceView
            items={items}
            currentUser={currentUser}
            onSelectItem={(item) => setSelectedItemForDetail(item)}
            onOpenCreateListing={() => setShowCreateListingModal(true)}
            onToggleWishlist={handleToggleWishlist}
            wishlistIds={wishlistIds}
            onStartChatWithSeller={handleStartChatWithSeller}
            searchQuery={searchQuery}
          />
        )}

        {activeTab === 'forum' && (
          <ForumView
            questions={questions}
            answersMap={answersMap}
            currentUser={currentUser}
            onSelectQuestion={(q) => setSelectedQuestionForDetail(q)}
            onOpenAskQuestion={() => setShowCreateQuestionModal(true)}
            onUpvoteQuestion={handleUpvoteQuestion}
            searchQuery={searchQuery}
          />
        )}

        {activeTab === 'notices' && (
          <NoticeBoardView
            notices={notices}
            currentUser={currentUser}
            onToggleRSVP={handleToggleRSVP}
            onCreateNotice={handleCreateNotice}
            searchQuery={searchQuery}
          />
        )}

        {activeTab === 'seniors' && (
          <SeniorsDirectoryView
            allUsers={allUsers}
            currentUser={currentUser}
            onStartChat={handleStartChatWithSeller}
            mentorReviews={mentorReviews}
            onRateMentor={handleRateMentor}
          />
        )}

        {activeTab === 'messages' && (
          <ChatView
            conversations={conversations}
            activeConversationId={activeConversationId}
            setActiveConversationId={setActiveConversationId}
            messagesMap={messagesMap}
            currentUser={currentUser}
            onSendMessage={handleSendMessage}
            items={items}
            onSelectItem={(item) => setSelectedItemForDetail(item)}
          />
        )}

        

        {activeTab === 'profile' && (
          <ProfileView
            currentUser={currentUser}
            userListings={userListings}
            userQuestions={userQuestions}
            wishlistItems={wishlistItems}
            reviews={reviews}
            onSelectItem={(item) => setSelectedItemForDetail(item)}
            onSelectQuestion={(q) => setSelectedQuestionForDetail(q)}
            onUpdateProfile={handleUpdateProfile}
            onToggleItemStatus={handleToggleItemStatus}
            onRemoveWishlist={handleToggleWishlist}
            onDeleteProfile={() => {
              setAllUsers(prev => prev.filter(u => u.id !== currentUser.id));
              setCurrentUser(null);
            }}
          />
        )}

      </main>

      {/* Modals */}
      {selectedItemForDetail && (
        <ItemDetailModal
          item={selectedItemForDetail}
          onClose={() => setSelectedItemForDetail(null)}
          currentUser={currentUser}
          onStartChat={handleStartChatWithSeller}
          onToggleWishlist={handleToggleWishlist}
          isWishlisted={wishlistIds.includes(selectedItemForDetail.id)}
          onReserveItem={handleReserveItem}
          reviews={reviews}
        />
      )}

      {selectedQuestionForDetail && (
        <QuestionDetailModal
          question={selectedQuestionForDetail}
          answers={answersMap[selectedQuestionForDetail.id] || []}
          onClose={() => setSelectedQuestionForDetail(null)}
          currentUser={currentUser}
          onAddAnswer={handleAddAnswer}
          onUpvoteQuestion={handleUpvoteQuestion}
          onUpvoteAnswer={handleUpvoteAnswer}
          onMarkBestAnswer={handleMarkBestAnswer}
        />
      )}

      {showCreateListingModal && (
        <CreateListingModal
          isOpen={showCreateListingModal}
          onClose={() => setShowCreateListingModal(false)}
          currentUser={currentUser}
          onCreateListing={handleCreateListing}
        />
      )}

      {showCreateQuestionModal && (
        <CreateQuestionModal
          isOpen={showCreateQuestionModal}
          onClose={() => setShowCreateQuestionModal(false)}
          currentUser={currentUser}
          onCreateQuestion={handleCreateQuestion}
        />
      )}

      {showUserSwitcherModal && (
        <UserSwitcherModal
          isOpen={showUserSwitcherModal}
          onClose={() => setShowUserSwitcherModal(false)}
          currentUser={currentUser}
          allUsers={allUsers}
          onSelectUser={(user) => setCurrentUser(user)}
          onRegisterCustomUser={(newUser) => {
            setAllUsers(prev => [...prev, newUser]);
            setCurrentUser(newUser);
          }}
        />
      )}

      {showNotificationsDropdown && (
        <NotificationDropdown
          notifications={notifications}
          onClose={() => setShowNotificationsDropdown(false)}
          onMarkAllAsRead={() => setNotifications(prev => prev.map(n => ({ ...n, read: true })))}
          onSelectNotification={(n) => {
            setNotifications(prev => prev.map(item => item.id === n.id ? { ...item, read: true } : item));
            setActiveTab(n.linkTab);
            setShowNotificationsDropdown(false);
          }}
        />
      )}

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200/80 py-6 text-center text-xs text-slate-500 mt-12">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 Hostel Connect • Junior–Senior Mentorship & Buy/Sell Community</p>
          <div className="flex items-center gap-4 text-slate-500">
            <span>Verified Student Network</span>
            <span>•</span>
            <span>Room Pickups in Hostel</span>
            <span>•</span>
            <span>Zero Platform Fees</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
