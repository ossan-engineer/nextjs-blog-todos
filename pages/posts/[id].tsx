import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import Layout from 'components/Layout';
import { getAllIds, getPostData, Post } from 'lib/posts';

type Props = {
  post: Post;
};

const PostDetail: React.FC<Props> = ({ post }) => {
  const router = useRouter();

  if (router.isFallback || !post) {
    return <div>Loading...</div>;
  }

  const { id, created_at, title, content } = post;

  return (
    <Layout title={title}>
      <p className='m-4'>ID: {id}</p>
      <p className='mb-4 text-xl font-bold'>{title}</p>
      <p className='mb-12'>{created_at}</p>
      <p className='px-10'>{content}</p>
      <Link href='/blog-page'>
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
          <span>Back to blog page</span>
        </div>
      </Link>
    </Layout>
  );
};

export const getStaticPaths = async () => {
  const paths = await getAllIds();

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps = async ({ params: { id } }) => {
  const { post } = await getPostData(id);

  return {
    props: {
      post,
    },
    revalidate: 3,
  };
};

export default PostDetail;
