import Link from 'next/link';

import { Post } from 'lib/posts';

type Props = {
  post: Post;
};

const PostItem: React.FC<Props> = ({ post: { id, title } }) => {
  return (
    <div>
      <span>{id}: </span>
      <Link href={`/posts/${id}`}>
        <span className='cursor-pointer text-white border-b border-gray-500 hover:bg-gray-600'>
          {title}
        </span>
      </Link>
    </div>
  );
};

export default PostItem;
