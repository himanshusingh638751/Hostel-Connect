import { createClient } from '@supabase/supabase-js';

const supabase = createClient('https://dbpmcqygevxwwievuxja.supabase.co', 'sb_publishable_LkXaEFXB5EM4nSR0vKy--Q_Idhp1xP7');

const SAMPLE_USERS = [
  {
    id: 'usr_rohan',
    name: 'Rohan Sharma',
    email: 'rohan.s@hostel.edu',
    avatar: '/images/senior_student_avatar.jpg',
    year: '4th Year (Senior)',
    role: 'Senior',
    hostel_block: 'Block B4 (Boys)',
    room_number: '302',
    department: 'Computer Science & Engg',
    phone: '+91 98765 43210',
    bio: '4th Year CS Major. Tech lead @ Campus Dev Club. Happy to help juniors with DSA, OS, and placement prep! Selling my old textbooks & lab gear.',
    rating: 4.9,
    review_count: 24,
    verified_student: true,
    badges: ['Top Seller', 'Senior Mentor', 'Academic Helper'],
    password: 'password123'
  },
  {
    id: 'usr_aarav',
    name: 'Aarav Patel',
    email: 'aarav.p@hostel.edu',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200',
    year: '1st Year (Junior)',
    role: 'Junior',
    hostel_block: 'Block B1 (Boys)',
    room_number: '105',
    department: 'Electrical Engineering',
    phone: '+91 91234 56789',
    bio: 'Freshie in Electrical Engg. Eager to learn, looking for good condition lab coats, calculators, and senior guidance for mid-sems.',
    rating: 5.0,
    review_count: 3,
    verified_student: true,
    badges: ['Freshie 2026', 'Active Buyer'],
    password: 'password123'
  },
  {
    id: 'usr_ananya',
    name: 'Ananya Verma',
    email: 'ananya.v@hostel.edu',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200',
    year: '3rd Year (Senior)',
    role: 'Hostel Rep',
    hostel_block: 'Block G2 (Girls)',
    room_number: '204',
    department: 'Mechanical Engineering',
    phone: '+91 99887 76655',
    bio: 'G2 Girls Hostel Rep & Mechanical Senior. Mini-drafters, drawing boards, and robotics gear for sale. Feel free to reach out for hostel queries!',
    rating: 4.8,
    review_count: 19,
    verified_student: true,
    badges: ['Hostel Rep', 'Top Seller', 'Sports Captain'],
    password: 'password123'
  },
  {
    id: 'usr_vikram',
    name: 'Vikram Singh',
    email: 'vikram.s@hostel.edu',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    year: '4th Year (Senior)',
    role: 'Senior',
    hostel_block: 'Block B3 (Boys)',
    room_number: '412',
    department: 'Civil Engineering',
    phone: '+91 98112 23344',
    bio: '4th year Civil senior. Moving out after graduation soon, selling study lamp and textbooks at heavy discounts!',
    rating: 4.7,
    review_count: 15,
    verified_student: true,
    badges: ['Moving Out Sale', 'Verified Senior'],
    password: 'password123'
  }
];

async function seed() {
  const { error } = await supabase.from('users').upsert(SAMPLE_USERS);
  console.log("Seeding users:", error ? error : "Success!");
}
seed();
