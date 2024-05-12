import { Comment } from "@prisma/client";

export default function CommentList({ comments }: { comments: Comment[] }) {
  return (
    <li>
      {comments.map((comment) => (
        <div key={comment.id}>
          <p>{comment.content}</p>
        </div>
      ))}
      {comments.length == 0 && <div>히히 댓글 업따</div>}
    </li>
  );
}
