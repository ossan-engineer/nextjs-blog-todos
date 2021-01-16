import fetch from 'node-fetch';
import sortby from 'lodash.sortby';

export type Post = {
  id: string;
  title: string;
  content: string;
  created_at: number;
};

export const getAllPostsData = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/list-post`
  );
  const posts: Post[] = await res.json();
  const filteredPosts = sortby(posts, [(o) => o.created_at]).reverse();

  return filteredPosts;
};

export const getAllIds = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/list-post`
  );
  const posts: Post[] = await res.json();
  const ids = posts.map(({ id }) => ({
    params: {
      id: String(id),
    },
  }));

  return ids;
};

export const getPostData = async (id: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/detail-post/${id}`
  );
  const post: Post = await res.json();

  return {
    post,
  };
};
