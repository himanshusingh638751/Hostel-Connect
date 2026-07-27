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
} from '../types';

export const SAMPLE_USERS: User[] = [
  {
    id: 'usr_rohan',
    name: 'Rohan Sharma',
    email: 'rohan.s@hostel.edu',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    year: '4th Year (Senior)',
    role: 'Senior',
    hostelBlock: 'Block B4 (Boys)',
    roomNumber: '302',
    department: 'Computer Science & Engg',
    phone: '+91 98765 43210',
    bio: '4th Year CS Major. Tech lead @ Campus Dev Club. Happy to help juniors with DSA, OS, and placement prep! Selling my old textbooks & lab gear.',
    rating: 4.9,
    reviewCount: 24,
    verifiedStudent: true,
    badges: ['Top Seller', 'Senior Mentor', 'Academic Helper']
  },
  {
    id: 'usr_aarav',
    name: 'Aarav Patel',
    email: 'aarav.p@hostel.edu',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200',
    year: '1st Year (Junior)',
    role: 'Junior',
    hostelBlock: 'Block B1 (Boys)',
    roomNumber: '105',
    department: 'Electrical Engineering',
    phone: '+91 91234 56789',
    bio: 'Freshie in Electrical Engg. Eager to learn, looking for good condition lab coats, calculators, and senior guidance for mid-sems.',
    rating: 5.0,
    reviewCount: 3,
    verifiedStudent: true,
    badges: ['Freshie 2026', 'Active Buyer']
  },
  {
    id: 'usr_ananya',
    name: 'Ananya Verma',
    email: 'ananya.v@hostel.edu',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200',
    year: '3rd Year (Senior)',
    role: 'Hostel Rep',
    hostelBlock: 'Block G2 (Girls)',
    roomNumber: '204',
    department: 'Mechanical Engineering',
    phone: '+91 99887 76655',
    bio: 'G2 Girls Hostel Rep & Mechanical Senior. Mini-drafters, drawing boards, and robotics gear for sale. Feel free to reach out for hostel queries!',
    rating: 4.8,
    reviewCount: 19,
    verifiedStudent: true,
    badges: ['Hostel Rep', 'Top Seller', 'Sports Captain']
  },
  {
    id: 'usr_vikram',
    name: 'Vikram Singh',
    email: 'vikram.s@hostel.edu',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    year: '4th Year (Senior)',
    role: 'Senior',
    hostelBlock: 'Block B3 (Boys)',
    roomNumber: '412',
    department: 'Civil Engineering',
    phone: '+91 98112 23344',
    bio: 'Cycling enthusiast & 4th year Civil senior. Moving out after graduation soon, selling bicycle, study lamp, and textbooks at heavy discounts!',
    rating: 4.7,
    reviewCount: 15,
    verifiedStudent: true,
    badges: ['Moving Out Sale', 'Verified Senior']
  }
];

export const INITIAL_MENTOR_REVIEWS: MentorReview[] = [
  {
    id: 'mrev_1',
    mentorId: 'usr_rohan',
    menteeId: 'usr_aarav',
    mentee: SAMPLE_USERS[1],
    rating: 5,
    testimonial: 'Rohan bhaiya is amazing! He helped me a lot with DSA concepts and guided me through my first hackathon. Highly recommend him for placement prep.',
    createdAt: '2 days ago'
  },
  {
    id: 'mrev_2',
    mentorId: 'usr_ananya',
    menteeId: 'usr_aarav',
    mentee: SAMPLE_USERS[1],
    rating: 4,
    testimonial: 'Helped me figure out hostel mess voting and gave great tips for the Mechanical Engineering lab vivas.',
    createdAt: '1 week ago'
  }
];

export const INITIAL_MARKETPLACE_ITEMS: MarketplaceItem[] = [
  {
    id: 'item_1',
    title: 'Casio FX-991EX ClassWiz Non-Programmable Scientific Calculator',
    price: 850,
    originalPrice: 1800,
    category: 'Calculators & Tech',
    condition: 'Like New',
    description: 'Used for only 1 semester during Engineering Mathematics & Statistics. Fully functional with solar panel, pristine display, original cover box included. Approved for all university examinations.',
    images: [
      'https://images.unsplash.com/photo-1611125832047-1d7ad1e8e48e?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1594980596870-8aa52a78d8cd?auto=format&fit=crop&q=80&w=600'
    ],
    sellerId: 'usr_rohan',
    seller: SAMPLE_USERS[0],
    createdAt: '2 hours ago',
    status: 'Available',
    tags: ['Calculators', 'Exam Approved', 'Casio', 'Maths'],
    viewsCount: 84,
    wishlistCount: 12
  },
  {
    id: 'item_2',
    title: 'Engineering Graphics Set (Mini Drafter + Wooden Drawing Board + Compass Box)',
    price: 600,
    originalPrice: 1500,
    category: 'Lab Equipment & Coats',
    condition: 'Good',
    description: 'Complete 1st year Engineering Graphics kit! Includes smooth acrylic Mini Drafter with clamp, A2 size wooden drawing board, set squares, and heavy duty compass box. Perfect for 1st/2nd semester students.',
    images: [
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&q=80&w=600'
    ],
    sellerId: 'usr_ananya',
    seller: SAMPLE_USERS[2],
    createdAt: '5 hours ago',
    status: 'Available',
    tags: ['Engineering Graphics', 'Mini Drafter', '1st Year', 'Lab Gear'],
    viewsCount: 120,
    wishlistCount: 18
  },
  {
    id: 'item_3',
    title: 'Data Structures & Algorithms in C++ (4th Ed) + Topper Handwritten Notes',
    price: 450,
    originalPrice: 1100,
    category: 'Textbooks & Notes',
    condition: 'Like New',
    description: 'Standard textbook for CS/IT 2nd Year DSA course. Free bonus: My complete spiral-bound handwritten lecture notes covering Trees, Graphs, Dynamic Programming, and C++ STL examples.',
    images: [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=600'
    ],
    sellerId: 'usr_rohan',
    seller: SAMPLE_USERS[0],
    createdAt: '1 day ago',
    status: 'Available',
    tags: ['DSA', 'Textbook', 'C++', 'Handwritten Notes'],
    viewsCount: 210,
    wishlistCount: 31
  },
  {
    id: 'item_4',
    title: 'Hero Sprint 21-Speed Gear Bicycle with Combination Lock & Front Light',
    price: 3200,
    originalPrice: 8500,
    category: 'Bicycles & Transport',
    condition: 'Good',
    description: 'Great reliable bicycle for commuting between Hostel Block B3 and Academic Block. Newly replaced brake pads, smooth gear shifts, includes heavy steel lock & LED rechargeable headlight. Selling because moving out after final semester.',
    images: [
      'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?auto=format&fit=crop&q=80&w=600'
    ],
    sellerId: 'usr_vikram',
    seller: SAMPLE_USERS[3],
    createdAt: '1 day ago',
    status: 'Available',
    tags: ['Bicycle', 'Campus Commute', 'Gears', 'Moving Out'],
    viewsCount: 340,
    wishlistCount: 42
  },
  {
    id: 'item_5',
    title: 'Adjustable LED Study Table Lamp with USB Charging Port',
    price: 350,
    originalPrice: 890,
    category: 'Room Decor & Electronics',
    condition: 'Like New',
    description: 'Flexible touch-sensor desk lamp with 3 warm white light modes (Reading, Study, Night light). Built-in USB output port to charge your phone while studying. Super power efficient.',
    images: [
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=600'
    ],
    sellerId: 'usr_ananya',
    seller: SAMPLE_USERS[2],
    createdAt: '2 days ago',
    status: 'Available',
    tags: ['Desk Lamp', 'Hostel Decor', 'Study Gear', 'USB Charger'],
    viewsCount: 95,
    wishlistCount: 15
  },
  {
    id: 'item_6',
    title: '100% Cotton White Chemistry Lab Coat & Anti-Scratch Safety Goggles (Size M)',
    price: 220,
    originalPrice: 550,
    category: 'Lab Equipment & Coats',
    condition: 'Like New',
    description: 'Cleaned, sanitized, and neatly pressed lab coat suitable for 1st Year Chemistry and Material Science practicals. Includes UV protection safety goggles.',
    images: [
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=600'
    ],
    sellerId: 'usr_aarav',
    seller: SAMPLE_USERS[1],
    createdAt: '3 days ago',
    status: 'Available',
    tags: ['Lab Coat', 'Chemistry', '1st Year', 'Safety Goggles'],
    viewsCount: 160,
    wishlistCount: 9
  },
  {
    id: 'item_7',
    title: 'High-Density Memory Foam Ergonomic Chair Seat Cushion',
    price: 490,
    originalPrice: 1200,
    category: 'Furniture & Mattress',
    condition: 'Like New',
    description: 'Saves your lower back during long coding sessions and exam study nights on hostel wooden chairs. Breathable mesh cover, washable zipper cover.',
    images: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=600'
    ],
    sellerId: 'usr_rohan',
    seller: SAMPLE_USERS[0],
    createdAt: '3 days ago',
    status: 'Available',
    tags: ['Furniture', 'Memory Foam', 'Hostel Chair', 'Comfort'],
    viewsCount: 110,
    wishlistCount: 22
  }
];

export const INITIAL_FORUM_QUESTIONS: ForumQuestion[] = [
  {
    id: 'q_1',
    title: 'How to prepare for Data Structures & Algorithms mid-sems? What topics carry highest weightage?',
    content: "Hey seniors! I'm a 1st year CS student in Block B1. Our DSA mid-sems are coming up in two weeks. Could any 3rd/4th year senior share advice on key topics? Are linked lists, recursion trees, and stacks asked heavily in code writing?",
    category: 'Academics & Exams',
    authorId: 'usr_aarav',
    author: SAMPLE_USERS[1],
    createdAt: '3 hours ago',
    upvotes: 28,
    upvotedUserIds: ['usr_rohan', 'usr_ananya', 'usr_vikram'],
    answersCount: 3,
    solved: true,
    tags: ['DSA', 'MidSems', '1stYearAdvice', 'C++'],
    targetYear: '1st Year'
  },
  {
    id: 'q_2',
    title: 'Where do 1st years submit Physics & Electrical Lab reports in Block B1 / Academic Block 2?',
    content: 'Hi everyone! Is the lab assignment box located inside Room 204 or near the HOD office? Also, do we need the blue physical file cover or spiral bind?',
    category: 'Lab & Project Guidance',
    authorId: 'usr_aarav',
    author: SAMPLE_USERS[1],
    createdAt: '1 day ago',
    upvotes: 14,
    upvotedUserIds: ['usr_ananya'],
    answersCount: 2,
    solved: true,
    tags: ['PhysicsLab', 'Submission', 'HostelB1'],
    targetYear: '1st Year'
  },
  {
    id: 'q_3',
    title: 'Tips for clearing 3rd Year Mechanical Thermal Engineering Lab viva without stress?',
    content: 'Seniors who cleared Thermal Engg last year - what are the favorite viva questions asked by Prof. Verma? Any formula sheets or viva shortcuts available?',
    category: 'Academics & Exams',
    authorId: 'usr_ananya',
    author: SAMPLE_USERS[2],
    createdAt: '2 days ago',
    upvotes: 19,
    upvotedUserIds: ['usr_rohan', 'usr_vikram'],
    answersCount: 1,
    solved: false,
    tags: ['Mechanical', 'Viva', 'ThermalEngg'],
    targetYear: '3rd Year'
  },
  {
    id: 'q_4',
    title: 'Are night passes required for late library study sessions during end-semester exam week?',
    content: 'Quick hostel rule query: If we stay in the Central Library till 2:00 AM during exam weeks, do we need prior written permission from Block Warden or just show student ID card at hostel gate?',
    category: 'Hostel Life & Mess',
    authorId: 'usr_aarav',
    author: SAMPLE_USERS[1],
    createdAt: '3 days ago',
    upvotes: 35,
    upvotedUserIds: ['usr_rohan', 'usr_ananya'],
    answersCount: 4,
    solved: true,
    tags: ['HostelRules', 'Library', 'NightPass', 'Warden'],
    targetYear: 'All Years'
  }
];

export const INITIAL_FORUM_ANSWERS: Record<string, ForumAnswer[]> = {
  'q_1': [
    {
      id: 'ans_101',
      questionId: 'q_1',
      content: 'Hey Aarav! Great question. As a 4th year who took this course with Prof. Das:\n\n1. **High Weightage:** Recursion tree tracing (10 marks), Stack applications (Infix to Postfix conversion), and Binary Search Tree deletion algorithms.\n2. **Code writing:** You will be asked to write full pointer-based code for linked list reversal and cycle detection.\n3. **Pro-tip:** I have uploaded my complete DSA class notes on Hostel Connect marketplace (item #3). Feel free to check them out or swing by Room 302 Block B4 if you want to clear any doubts live!',
      authorId: 'usr_rohan',
      author: SAMPLE_USERS[0],
      createdAt: '2 hours ago',
      upvotes: 22,
      upvotedUserIds: ['usr_aarav', 'usr_ananya'],
      isBestAnswer: true,
      isSeniorAnswer: true
    },
    {
      id: 'ans_102',
      questionId: 'q_1',
      content: 'Also make sure you practice dry-running array operations on paper! Don’t just memorize the logic on screen.',
      authorId: 'usr_vikram',
      author: SAMPLE_USERS[3],
      createdAt: '1 hour ago',
      upvotes: 8,
      upvotedUserIds: ['usr_aarav'],
      isBestAnswer: false,
      isSeniorAnswer: true
    }
  ],
  'q_2': [
    {
      id: 'ans_201',
      questionId: 'q_2',
      content: 'Hi Aarav! The physics lab drop-box is placed right outside Room 204 next to the lab assistant’s cabin. Yellow spiral file or blue folder both work fine as long as your Name, Roll No, and Hostel Room are clearly written on page 1.',
      authorId: 'usr_ananya',
      author: SAMPLE_USERS[2],
      createdAt: '22 hours ago',
      upvotes: 11,
      upvotedUserIds: ['usr_aarav'],
      isBestAnswer: true,
      isSeniorAnswer: true
    }
  ],
  'q_4': [
    {
      id: 'ans_401',
      questionId: 'q_4',
      content: 'During official exam weeks, Central Library stays open 24/7. You do NOT need a written night pass — simply scan your Student ID at the hostel gate before 2:30 AM entry.',
      authorId: 'usr_rohan',
      author: SAMPLE_USERS[0],
      createdAt: '2 days ago',
      upvotes: 18,
      upvotedUserIds: ['usr_aarav', 'usr_vikram'],
      isBestAnswer: true,
      isSeniorAnswer: true
    }
  ]
};

export const INITIAL_NOTICES: Notice[] = [
  {
    id: 'not_1',
    title: 'Official Warden Notice: Hostel Gate Timings & Exam Week Night Out Guidelines',
    content: 'All hostel residents are hereby notified that during the upcoming Mid-Semester Examinations (Aug 1 - Aug 10), reading rooms and central library will remain operational 24/7. Gate entry rules are relaxed until 2:30 AM with mandatory ID card verification.',
    category: 'Official Warden Notice',
    authorId: 'usr_rohan',
    author: SAMPLE_USERS[0],
    createdAt: 'Yesterday at 4:00 PM',
    pinned: true,
    attendeesCount: 142,
    attendeeUserIds: ['usr_aarav', 'usr_ananya', 'usr_vikram'],
    important: true
  },
  {
    id: 'not_2',
    title: 'Inter-Hostel Badminton & Table Tennis Tournament 2026',
    content: 'Get ready for the annual hostel clash! Registrations are open for Singles and Doubles matches across Block B1, B2, B3, B4 and G-Block. Trophies & cash vouchers for winning teams.',
    category: 'Sports & Cultural',
    authorId: 'usr_ananya',
    author: SAMPLE_USERS[2],
    createdAt: '2 days ago',
    eventDate: 'Saturday, Aug 8 at 5:00 PM',
    location: 'Hostel Sports Complex Court 2',
    pinned: true,
    attendeesCount: 48,
    attendeeUserIds: ['usr_rohan', 'usr_aarav'],
    important: false
  },
  {
    id: 'not_3',
    title: 'Mess Menu Special Feedback & Sunday Dinner Vote',
    content: 'The Mess Committee is inviting votes for this Sunday’s special dinner menu! Options: 1) Paneer Butter Masala & Butter Naan + Gulab Jamun, 2) South Indian Feast & Payasam. Cast your vote now!',
    category: 'Mess Menu & Canteen',
    authorId: 'usr_rohan',
    author: SAMPLE_USERS[0],
    createdAt: '3 days ago',
    eventDate: 'This Sunday 7:30 PM',
    location: 'Central Dining Hall',
    pinned: false,
    attendeesCount: 210,
    attendeeUserIds: ['usr_aarav', 'usr_ananya', 'usr_vikram'],
    important: false
  },
  {
    id: 'not_4',
    title: 'Junior Resume Review & Placement Strategy Session by 4th Year Seniors',
    content: 'Calling all 2nd & 3rd year students! 4th year placed seniors (Google, Microsoft, L&T, Siemens) are hosting an interactive resume review and mock interview prep session in Block B4 Common Room.',
    category: 'Study Group',
    authorId: 'usr_rohan',
    author: SAMPLE_USERS[0],
    createdAt: '4 days ago',
    eventDate: 'Friday, July 31 at 7:00 PM',
    location: 'Block B4 Multipurpose Room',
    pinned: false,
    attendeesCount: 65,
    attendeeUserIds: ['usr_aarav'],
    important: true
  }
];

export const INITIAL_CONVERSATIONS: Conversation[] = [
  {
    id: 'conv_1',
    participantIds: ['usr_aarav', 'usr_rohan'],
    participants: [SAMPLE_USERS[1], SAMPLE_USERS[0]],
    lastMessage: 'Hi Senior! Is the Casio scientific calculator still available? Can I pick it up from Block B4 Room 302 today?',
    lastMessageTimestamp: '10 mins ago',
    unreadCount: {
      'usr_rohan': 1,
      'usr_aarav': 0
    },
    relatedItemId: 'item_1',
    relatedItemTitle: 'Casio FX-991EX Scientific Calculator'
  },
  {
    id: 'conv_2',
    participantIds: ['usr_aarav', 'usr_ananya'],
    participants: [SAMPLE_USERS[1], SAMPLE_USERS[2]],
    lastMessage: 'Thanks Ananya senior! The mini drafter set was super helpful for my graphics lab today.',
    lastMessageTimestamp: 'Yesterday',
    unreadCount: {
      'usr_rohan': 0,
      'usr_aarav': 0,
      'usr_ananya': 0
    },
    relatedItemId: 'item_2',
    relatedItemTitle: 'Engineering Graphics Set'
  }
];

export const INITIAL_MESSAGES: Record<string, ChatMessage[]> = {
  'conv_1': [
    {
      id: 'msg_101',
      conversationId: 'conv_1',
      senderId: 'usr_aarav',
      text: 'Hello Rohan Senior! I saw your Casio FX-991EX calculator listed on Hostel Connect marketplace.',
      timestamp: '15 mins ago',
      itemId: 'item_1',
      itemSnapshot: {
        title: 'Casio FX-991EX Scientific Calculator',
        price: 850,
        image: 'https://images.unsplash.com/photo-1611125832047-1d7ad1e8e48e?auto=format&fit=crop&q=80&w=600'
      }
    },
    {
      id: 'msg_102',
      conversationId: 'conv_1',
      senderId: 'usr_aarav',
      text: 'Hi Senior! Is the Casio scientific calculator still available? Can I pick it up from Block B4 Room 302 today?',
      timestamp: '10 mins ago'
    }
  ],
  'conv_2': [
    {
      id: 'msg_201',
      conversationId: 'conv_2',
      senderId: 'usr_aarav',
      text: 'Hi Ananya senior, is the drawing board kit available?',
      timestamp: 'Yesterday 2:00 PM'
    },
    {
      id: 'msg_202',
      conversationId: 'conv_2',
      senderId: 'usr_ananya',
      text: 'Yes Aarav! You can drop by G2 hostel reception or I can hand it over near the canteen.',
      timestamp: 'Yesterday 2:15 PM'
    },
    {
      id: 'msg_203',
      conversationId: 'conv_2',
      senderId: 'usr_aarav',
      text: 'Thanks Ananya senior! The mini drafter set was super helpful for my graphics lab today.',
      timestamp: 'Yesterday 6:00 PM'
    }
  ]
};

export const INITIAL_REVIEWS: SellerReview[] = [
  {
    id: 'rev_1',
    sellerId: 'usr_rohan',
    reviewerId: 'usr_aarav',
    reviewer: SAMPLE_USERS[1],
    rating: 5,
    comment: 'Rohan senior was extremely helpful! He gave me his handwritten C++ notes for free along with the DSA textbook and explained how to approach mid-sems.',
    itemTitle: 'Data Structures Textbook & Notes',
    createdAt: '3 days ago'
  },
  {
    id: 'rev_2',
    sellerId: 'usr_ananya',
    reviewerId: 'usr_aarav',
    reviewer: SAMPLE_USERS[1],
    rating: 5,
    comment: 'Pristine condition mini drafter and drawing board! Saved me over ₹900 compared to buying brand new from college bookstore.',
    itemTitle: 'Engineering Graphics Kit',
    createdAt: '1 week ago'
  }
];

export const INITIAL_NOTIFICATIONS: Notification[] = [
  {
    id: 'notif_1',
    userId: 'usr_aarav',
    title: 'Senior Replied to Your Q&A Post',
    message: 'Rohan Sharma (4th Year Senior) answered your question about DSA mid-sem preparation.',
    type: 'forum',
    createdAt: '2 hours ago',
    read: false,
    linkTab: 'forum',
    targetId: 'q_1'
  },
  {
    id: 'notif_2',
    userId: 'usr_aarav',
    title: 'New Price Drop in Marketplace',
    message: 'Adjustable LED Study Lamp was reduced from ₹450 to ₹350 by Ananya Verma.',
    type: 'marketplace',
    createdAt: '5 hours ago',
    read: false,
    linkTab: 'marketplace',
    targetId: 'item_5'
  },
  {
    id: 'notif_3',
    userId: 'usr_rohan',
    title: 'New Marketplace Inquiry',
    message: 'Aarav Patel sent you a message about Casio FX-991EX Scientific Calculator.',
    type: 'message',
    createdAt: '10 mins ago',
    read: false,
    linkTab: 'messages',
    targetId: 'conv_1'
  }
];
