const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const targetStr = `setConversations(prev => [newConv, ...prev]);
      setMessagesMap(prev => ({ ...prev, [newConvId]: [initialMsg] }));
      setActiveConversationId(newConvId);`;

const replacement = `setConversations(prev => [newConv, ...prev]);
      setMessagesMap(prev => ({ ...prev, [newConvId]: [initialMsg] }));
      setActiveConversationId(newConvId);
      
      // Save to Supabase
      supabase.from('conversations').insert({
        id: newConv.id,
        participant_ids: newConv.participantIds,
        last_message: newConv.lastMessage,
        last_message_timestamp: new Date().toISOString(),
        unread_count: newConv.unreadCount,
        related_item_id: newConv.relatedItemId,
        related_item_title: newConv.relatedItemTitle
      }).then(() => {
        return supabase.from('chat_messages').insert({
          id: initialMsg.id,
          conversation_id: initialMsg.conversationId,
          sender_id: initialMsg.senderId,
          text: initialMsg.text,
          timestamp: new Date().toISOString(),
          item_id: initialMsg.itemId,
          item_snapshot: initialMsg.itemSnapshot
        });
      }).catch(err => console.error("Error creating chat in Supabase:", err));
`;
code = code.replace(targetStr, replacement);
fs.writeFileSync('src/App.tsx', code);
