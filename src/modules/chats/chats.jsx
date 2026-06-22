import {
  Box,
  Paper,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Typography,
  TextField,
  IconButton,
  Stack,
  Divider,
  Badge,
} from "@mui/material";

import SendIcon from "@mui/icons-material/Send";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SearchIcon from "@mui/icons-material/Search";

import { useEffect, useState, useRef } from "react";
import axios from "axios";

const Chats = () => {

  const [chatList, setChatList] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);

  const fileInputRef = useRef(null);

  const token = localStorage.getItem("token");
  const uniqueUserId= localStorage.getItem("uniqueUserId");

  // ================= LOAD CHAT LIST =================
  const loadChatList = async () => {
    const res = await axios.get(
      `http://localhost:8080/api/chat/list?userId=${uniqueUserId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setChatList(res.data.data);
  };

  useEffect(() => {
    loadChatList();
  }, []);

  // ================= OPEN CHAT =================
  const openChat = async (user) => {
    setSelectedUser(user);

    const res = await axios.get(
      `http://localhost:8080/api/chat/history?user1=${uniqueUserId}&user2=${user.userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setMessages(res.data.data);

    // Mark messages as read 
    await axios.post(
      `http://localhost:8080/api/chat/read?senderId=${user.userId}&receiverId=${uniqueUserId}`,
      {}, 
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    loadChatList();

  };

  // ================= FILE UPLOAD =================
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(
        `http://localhost:8080/api/files/upload?senderId=${uniqueUserId}&receiverId=${selectedUser.userId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setUploadedFile({
        url: res.data.fileUrl,
        name: file.name,
        type: file.type,
      });
    } catch (err) {
      console.error("Upload failed", err);
    }
  };

  // ================= SEND MESSAGE =================
  const sendMessage = async () => {
    if (!message.trim() && !uploadedFile) return;

    const payload = {
      senderId: uniqueUserId,
      receiverId: selectedUser.userId,
      message: message,
      fileUrl: uploadedFile?.url || null,
      fileName: uploadedFile?.name || null,
      fileType: uploadedFile?.type || null,
      messageType: uploadedFile ? "FILE" : "TEXT",
    };

    await axios.post("http://localhost:8080/api/chat/send", payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setMessage("");
    setUploadedFile(null);
    openChat(selectedUser);
  };

  // ================= UI =================
  return (
    <Box sx={{ display: "flex", height: "80vh", gap: 2 }}>
      {/* LEFT CHAT LIST */}
      <Paper sx={{ width: "30%", p: 2, display: "flex", flexDirection: "column" }}>
        <TextField
          fullWidth
          size="small"
          placeholder="Search chats..."
          InputProps={{
            startAdornment: <SearchIcon />,
          }}
        />

        <Divider sx={{ my: 2 }} />

        <List sx={{ overflowY: "auto" }}>
          {chatList.map((chat) => (
            <ListItem
              button
              key={chat.userId}
              onClick={() => openChat(chat)}
              sx={{
                borderRadius: 2,
                mb: 1,
                backgroundColor:
                  selectedUser?.userId === chat.userId ? "#e3f2fd" : "#fff",
              }}
            >
              <Avatar sx={{ mr: 2 }}>
                {chat.name?.charAt(0)}
              </Avatar>

              <ListItemText
                primary={
                  <Stack direction="row" justifyContent="space-between">
                    <Typography fontWeight="bold">{chat.name}</Typography>
                    {chat.unreadCount > 0 && (
                      <Badge badgeContent={chat.unreadCount} color="error" />
                    )}
                  </Stack>
                }
                secondary={chat.lastMessage}
              />
            </ListItem>
          ))}
        </List>
      </Paper>

      {/* RIGHT CHAT BOX */}
      <Paper sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {/* HEADER */}
        <Box sx={{ p: 2, borderBottom: "1px solid #eee", display: "flex", alignItems: "center" }}>
          {selectedUser ? (
            <>
              <Avatar sx={{ mr: 2 }}>
                {selectedUser.name?.charAt(0)}
              </Avatar>
              <Box>
                <Typography fontWeight="bold">{selectedUser.name}</Typography>
                <Typography variant="caption">{selectedUser.businessName}</Typography>
              </Box>
            </>
          ) : (
            <Typography>Select a chat</Typography>
          )}
        </Box>

        {/* MESSAGES */}
        <Box sx={{ flex: 1, p: 2, overflowY: "auto", backgroundColor: "#f9fafb" }}>
          {messages.map((msg) => (
            <Box
              key={msg.id}
              sx={{
                display: "flex",
                justifyContent: msg.senderId === uniqueUserId ? "flex-end" : "flex-start",
                mb: 1,
              }}
            >
              <Box
                sx={{
                  p: 1.5,
                  borderRadius: 2,
                  maxWidth: "60%",
                  backgroundColor: msg.senderId === uniqueUserId ? "#1976d2" : "#e5e7eb",
                  color: msg.senderId === uniqueUserId ? "#fff" : "#000",
                }}
              >
                {/* TEXT */}
                {msg.messageType !== "FILE" && (
                  <Typography>{msg.message}</Typography>
                )}

                {/* FILE */}
                {msg.messageType === "FILE" && (
                  <Box>
                    {msg.fileType?.startsWith("image/") ? (
                      <img
                        src={msg.fileUrl}
                        alt="file"
                        style={{ maxWidth: "200px", borderRadius: 8 }}
                      />
                    ) : (
                      <a
                        href={msg.fileUrl}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          color: msg.senderId === uniqueUserId ? "#fff" : "#1976d2",
                        }}
                      >
                        📎 {msg.fileName}
                      </a>
                    )}
                  </Box>
                )}
              </Box>
            </Box>
          ))}
        </Box>

        {/* INPUT AREA */}
        <Box sx={{ p: 2, borderTop: "1px solid #eee", display: "flex", gap: 1 }}>
          {/* FILE INPUT */}
          <IconButton onClick={() => fileInputRef.current.click()}>
            <AttachFileIcon />
          </IconButton>

          <input
            type="file"
            hidden
            ref={fileInputRef}
            onChange={handleFileUpload}
          />

          {/* TEXT INPUT */}
          <TextField
            fullWidth
            size="small"
            placeholder="Type message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          {/* SEND */}
          <IconButton
            onClick={sendMessage}
            sx={{
              backgroundColor: "#1976d2",
              color: "#fff",
              "&:hover": { backgroundColor: "#1565c0" },
            }}
          >
            <SendIcon />
          </IconButton>
        </Box>

        {/* FILE PREVIEW */}
        {uploadedFile && (
          <Box sx={{ px: 2, pb: 1, fontSize: 12, color: "gray" }}>
            📎 {uploadedFile.name}
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default Chats;