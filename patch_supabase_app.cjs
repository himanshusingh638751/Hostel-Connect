const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Update onRegister
code = code.replace(
  `onRegister={(newUser) => {
          setAllUsers(prev => [...prev, newUser]);
          setCurrentUser(newUser);
        }}`,
  `onRegister={async (newUser) => {
          setAllUsers(prev => [...prev, newUser]);
          setCurrentUser(newUser);
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
          if (error) console.error("Error inserting user:", error);
        }}`
);

// 2. Update handleSendMessage
code = code.replace(
  `const newMsg: ChatMessage = {
      id: \`msg_\${Date.now()}\`,
      conversationId: convId,
      senderId: currentUser.id,
      text,
      timestamp: 'Just now'
    };`,
  `const newMsg: ChatMessage = {
      id: \`msg_\${Date.now()}\`,
      conversationId: convId,
      senderId: currentUser.id,
      text,
      timestamp: 'Just now'
    };
    supabase.from('chat_messages').insert({
      id: newMsg.id,
      conversation_id: newMsg.conversationId,
      sender_id: newMsg.senderId,
      text: newMsg.text,
      timestamp: new Date().toISOString()
    }).then(({error}) => { if(error) console.error("Error sending message to Supabase:", error); });
    `
);

// 3. Update handleReserveItem
code = code.replace(
  `setItems(prev => prev.map(item => 
      item.id === itemId ? { ...item, status: 'Reserved' as const } : item
    ));`,
  `setItems(prev => prev.map(item => 
      item.id === itemId ? { ...item, status: 'Reserved' as const } : item
    ));
    supabase.from('marketplace_items').update({ status: 'Reserved' }).eq('id', itemId).then(({error}) => { if(error) console.error("Error reserving item in Supabase:", error); });
    `
);

fs.writeFileSync('src/App.tsx', code);
