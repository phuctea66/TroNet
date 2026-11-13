export const initialConnections = [
  {
    id: "conn-1",
    fromProfileId: "profile-1", // Elena Tran
    toProfileId: "profile-me",   // Alex Nguyen (Current demo user)
    message: "Hi Alex! I saw your profile and we have an 88% compatibility match in Cau Giay. Would you like to team up for the apartment on Tran Thai Tong?",
    status: "accepted",
    createdAt: "2026-11-10T09:00:00Z"
  },
  {
    id: "conn-2",
    fromProfileId: "profile-3", // Sophie Le
    toProfileId: "profile-me",   // Alex Nguyen
    message: "Hello Alex! I noticed you are cat-friendly and work in tech. My flat near O Cho Dua has a sunny balcony room ready for move-in!",
    status: "pending",
    createdAt: "2026-11-12T14:30:00Z"
  },
  {
    id: "conn-3",
    fromProfileId: "profile-me", // Alex Nguyen
    toProfileId: "profile-2",   // Minh Duc
    message: "Hi Minh Duc, I liked your quiet study environment. Let me know if you would like to connect and check out places around Thanh Xuan.",
    status: "pending",
    createdAt: "2026-11-12T18:00:00Z"
  }
];

export const initialMessages = [
  {
    id: "msg-1",
    connectionId: "conn-1",
    senderProfileId: "profile-1",
    text: "Hi Alex! I saw your profile and we have an 88% compatibility match in Cau Giay. Would you like to team up for the apartment on Tran Thai Tong?",
    createdAt: "2026-11-10T09:00:00Z"
  },
  {
    id: "msg-2",
    connectionId: "conn-1",
    senderProfileId: "profile-me",
    text: "Hi Elena! Thank you for reaching out. Yes, Tran Thai Tong is only 5 minutes from my office. Does the room get good morning light?",
    createdAt: "2026-11-10T09:15:00Z"
  },
  {
    id: "msg-3",
    connectionId: "conn-1",
    senderProfileId: "profile-1",
    text: "Yes, it has a large south-facing window and a shared balcony! We can schedule a tour this weekend if you're free.",
    createdAt: "2026-11-10T09:20:00Z"
  }
];
