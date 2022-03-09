import axios from "axios";
import { useParams } from 'react-router-dom'
import { useEffect, useState, useContext, useRef } from "react";
import { Card, Row, Col, Form, Button } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";
import Conversation from "./Conversation";
import Message from "./Message";
import { io } from "socket.io-client";

const ChatPage = () => {
  const { state } = useContext(AuthContext);
  const { conversationId } = useParams();
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const socket = useRef(io("ws://localhost:8900"));
  const scrollRef = useRef();

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        messageBody: data.messageBody,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", state.user._id);
    socket.current.on("getUsers", (users) => {
      console.log(`chatpage useEffect ${users}`);
    });
  }, [state.user]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get(`/api/conversations/${state.user._id}`);
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [state.user._id]);

  useEffect(()=> {
    const chat = conversations.find((c) => {return c._id === conversationId});
    setCurrentChat(chat);
  }, [state.user._id, conversations, conversationId])

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(`/api/messages/${currentChat._id}`);
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      senderId: state.user._id,
      conversationId: currentChat._id,
      messageBody: newMessage,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== state.user._id
    );

    console.log("in the message submit function");
    console.log(receiverId);
    socket.current.emit("sendMessage", {
      senderId: state.user._id,
      receiverId: receiverId,
      messageBody: newMessage
    });

    try {
      const res = await axios.post("/api/messages", message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages])

  const chatBackground = (conversation) => {
    return conversation === currentChat ? "primary" : "warning"
  }

  return (
    <>
    <div className='sml-banner-image-teal'>
      <div className="dark-grey-bg white-text">
        <h1 className="varela">Chat</h1>
        <h3 className="courier">Time to talk code!</h3>
      </div>
    </div>
    <Row className="width-98pc">
      <Col sm={4}>
        {conversations.map((conversation) => (
          <> 
            <Card 
              onClick={() => setCurrentChat(conversation)} bg={chatBackground(conversation)} 
              style={{ cursor: "pointer" }}
              className="text-right"
            >
              <Conversation
                conversation={conversation}
                currentUser={state.user}
              />
            </Card>
          </>
        ))}
      </Col>
      <Col sm={8}>
        <div className="scroll height-70vh bottom-scroll">
        {messages.map((message) => (
          <div ref={scrollRef}>
          <Message
            message={message}
            own={state.user._id === message.senderId}
        
          />
          </div>
        ))}
        </div>
        <div className="form-container fix-bottom">
          <Form className="message-submit">
            <Form.Group>
              <Form.Control
                as="textarea"
                rows={3}
                onChange={(e) => setNewMessage(e.target.value)}
                value={newMessage}
              />
              <Button onClick={handleSubmit} type="submit" >
                Submit
              </Button>
            </Form.Group>
          </Form>

        </div>
      </Col>
    </Row>
    </>
  );
};

export default ChatPage;
