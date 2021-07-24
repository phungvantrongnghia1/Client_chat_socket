import react from "react";
import "./Message.css";
type IProps = {
  content: string;
  isSender: boolean;
};
export const Message = (props: IProps) => {
  return (
    <div className={`message-container ${props.isSender ? "right" : ""}`}>
      <span className="content">{props.content}</span>
    </div>
  );
};
