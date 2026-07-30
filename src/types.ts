export type UserRole = 'Junior' | 'Senior' | 'Hostel Rep' | 'Warden';
export type AcademicYear = '1st Year (Junior)' | '2nd Year' | '3rd Year (Senior)' | '4th Year (Senior)' | 'Alumni';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  year: AcademicYear;
  role: UserRole;
  hostelBlock: string;
  roomNumber: string;
  department: string;
  phone: string;
  bio: string;
  rating: number;
  reviewCount: number;
  verifiedStudent: boolean;
  badges: string[];
  password?: string;
}

export type ItemCategory = 
  | 'Textbooks & Notes'
  | 'Calculators & Tech'
  | 'Lab Equipment & Coats'
  | 'Furniture & Mattress'
  | 'Room Decor & Electronics'
  | 'Sports Gear'
  | 'Other';

export type ItemCondition = 'Like New' | 'Good' | 'Fair';
export type ItemStatus = 'Available' | 'Reserved' | 'Sold';

export interface MarketplaceItem {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  category: ItemCategory;
  condition: ItemCondition;
  description: string;
  images: string[];
  sellerId: string;
  seller: User;
  createdAt: string;
  status: ItemStatus;
  tags: string[];
  viewsCount: number;
  wishlistCount: number;
}

export type ForumCategory =
  | 'Academics & Exams'
  | 'Lab & Project Guidance'
  | 'Hostel Life & Mess'
  | 'Placements & Internships'
  | 'Clubs & Sports'
  | 'General Guidance';

export interface ForumQuestion {
  id: string;
  title: string;
  content: string;
  category: ForumCategory;
  authorId: string;
  author: User;
  createdAt: string;
  upvotes: number;
  upvotedUserIds: string[];
  answersCount: number;
  solved: boolean;
  tags: string[];
  targetYear?: string;
}

export interface ForumAnswer {
  id: string;
  questionId: string;
  content: string;
  authorId: string;
  author: User;
  createdAt: string;
  upvotes: number;
  upvotedUserIds: string[];
  isBestAnswer: boolean;
  isSeniorAnswer: boolean;
}

export type NoticeCategory =
  | 'Official Warden Notice'
  | 'Hostel Event'
  | 'Sports & Cultural'
  | 'Mess Menu & Canteen'
  | 'Study Group'
  | 'Lost & Found';

export interface Notice {
  id: string;
  title: string;
  content: string;
  category: NoticeCategory;
  authorId: string;
  author: User;
  createdAt: string;
  eventDate?: string;
  location?: string;
  pinned: boolean;
  attendeesCount: number;
  attendeeUserIds: string[];
  important: boolean;
}

export interface ChatMessage {
  id: string;
  conversationId: string;
  senderId: string;
  text: string;
  timestamp: string;
  itemId?: string;
  itemSnapshot?: {
    title: string;
    price: number;
    image: string;
  };
}

export interface Conversation {
  id: string;
  participantIds: string[];
  participants: User[];
  lastMessage: string;
  lastMessageTimestamp: string;
  unreadCount: Record<string, number>;
  relatedItemId?: string;
  relatedItemTitle?: string;
}

export interface SellerReview {
  id: string;
  sellerId: string;
  reviewerId: string;
  reviewer: User;
  rating: number;
  comment: string;
  itemTitle: string;
  createdAt: string;
}

export interface MentorReview {
  id: string;
  mentorId: string;
  menteeId: string;
  mentee: User;
  rating: number;
  testimonial: string;
  createdAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'message' | 'marketplace' | 'forum' | 'notice';
  createdAt: string;
  read: boolean;
  linkTab: 'marketplace' | 'forum' | 'notices' | 'messages' | 'seniors';
  targetId?: string;
}
