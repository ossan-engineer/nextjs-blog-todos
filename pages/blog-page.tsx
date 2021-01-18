import Link from 'next/link';

import Layout from 'components/Layout';
import PostItem from 'components/PostItem';
import { getAllPostsData, Post } from 'lib/posts';

type Props = {
  staticFilteredPosts: Post[];
};

const BlogPage: React.FC<Props> = ({ staticFilteredPosts }) => {
  return (
    <Layout title='Blog page'>
      <ul>
        {staticFilteredPosts &&
          staticFilteredPosts.map((post) => (
            <PostItem key={post.id} post={post} />
          ))}
      </ul>
      <Link href='/main-page'>
        <div className='flex cursor-pointer mt-12'>
          <svg
            className='w-6 h-6 mr-3'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M11 19l-7-7 7-7m8 14l-7-7 7-7'
            />
          </svg>
          <span>Back to main page</span>
        </div>
      </Link>
    </Layout>
  );
};

export const getStaticProps = async () => {
  const staticFilteredPosts = await getAllPostsData();

  return {
    props: {
      staticFilteredPosts,
    },
    revalidate: 3,
  };
};

export default BlogPage;
