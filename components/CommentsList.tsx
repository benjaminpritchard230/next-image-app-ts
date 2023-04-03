import { IPost } from "@/types/posts";
import { useEffect, useRef } from "react";
import { useGetPostCommentsQuery } from "../features/api/apiSlice";
import CommentDisplay from "./CommentDisplay";

type Props = {
  post: IPost;
};

const CommentsList = ({ post }: Props) => {
  const {
    data: postCommentsData,

    isLoading,
  } = useGetPostCommentsQuery(post.id);

  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView(false);
  };

  useEffect(() => {
    scrollToBottom();

    setTimeout(scrollToBottom, 15);
  }, [postCommentsData]);

  return (
    <div ref={messagesEndRef}>
      {postCommentsData!.map((comment) => (
        <CommentDisplay comment={comment} key={comment.id} />
      ))}
    </div>
  );
};
export default CommentsList;
