import "./message.scss";
import { format } from "timeago.js";

export default function Message({ message, own, ownImg, friendImg }) {
  const PF = process.env.REACT_APP_IMAGES_PERSON;
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img
          className="messageImg"
          src={own ? PF + ownImg : PF + friendImg}
          alt=""
        />
        <p className="messageText">{message.text}</p>
      </div>
      <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  );
}
