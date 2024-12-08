import UserCommentIcon from './Icon';

const Comment = ({ comment, username, date }: { comment: string; username: string; date: Date }) => {
  const commentDate = date.toLocaleString('en-US');
  return (
    <div className="flex gap-4">
      <UserCommentIcon imageUrl="https://img.freepik.com/free-photo/portrait-cute-smiling-boy-cafe_23-2148436234.jpg" />
      <div className="bg-white p-3 rounded-lg shadow-sm">
        <p className="text-black">{commentDate}</p>
        <p className="text-black">{username}</p>
        <p className="text-sm text-gray-800">{comment}</p>
      </div>
    </div>
  );
};

export default Comment;
