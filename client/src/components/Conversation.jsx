import axios from "axios";
import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";

const Conversation = ({ conversation, currentUser }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);

    const getUser = async () => {
      try {
        const res = await axios(`/api/users/${friendId}`);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation]);

  return (
    <>
      <Card.Body>
        <Card.Text>{user?.name}</Card.Text>
      </Card.Body>
    </>
  );
};

export default Conversation;
