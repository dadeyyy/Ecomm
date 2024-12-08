import React from 'react';

type UserCommentIconProps = {
  imageUrl: string; // User's image URL
  altText?: string; // Alternative text for accessibility
};

const UserCommentIcon: React.FC<UserCommentIconProps> = ({ imageUrl, altText = 'User Avatar' }) => {
  return (
    <div className="flex items-center gap-3">
      {/* User's image */}
      <img
        src={imageUrl}
        alt={altText}
        className="max-w-10 min-w-10 max-h-10 min-h-10 rounded-full object-cover border border-gray-300"
      />
    
    </div>
  );
};

export default UserCommentIcon;
