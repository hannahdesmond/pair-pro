import { Card, Row, Col } from "react-bootstrap";
import { format } from "timeago.js";

const Message = ({ message, own }) => {
  return (
    <>

        <Row className="width-90pc">
          { own ? (
      <>
            <Col xs={2}></Col>
            <Col xs={10}>
            <Card className="text-right" border="info">
        <Card.Body>
              <Card.Text>{message.messageBody}</Card.Text>
              <Card.Text className="text-muted">{format(message.createdAt)}</Card.Text>
              </Card.Body>
      </Card>
            </Col>
            </>
          ):(
            <>
            <Col xs={10}>
            <Card border="primary">
        <Card.Body>
            <Card.Text>{message.messageBody}</Card.Text>
            <Card.Text className="text-muted">{format(message.createdAt)}</Card.Text>
            </Card.Body>
      </Card>
          </Col>
            <Col xs={2}></Col>
            </>
   
        )}
               </Row>
    
    </>

  );
};

export default Message;
