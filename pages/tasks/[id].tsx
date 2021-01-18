import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import useSWR from 'swr';

import Layout from 'components/Layout';
import { getAllTaskIds, getTaskData, Task } from 'lib/tasks';

type Props = {
  id: string;
  staicTask: Task;
};

const fetcher = async (url) => {
  const res = await fetch(url);
  const data = await res.json();

  return data;
};

const TaskDetail: React.FC<Props> = ({ id, staicTask }) => {
  const router = useRouter();
  const { data: task, mutate } = useSWR(
    `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/detail-task/${id}`,
    fetcher,
    {
      initialData: staicTask,
    }
  );

  useEffect(() => {
    mutate();
  }, []);

  if (router.isFallback || !task) {
    return <div>Loading...</div>;
  }

  const { created_at, title, content } = task;

  return (
    <Layout title={title}>
      <p className='m-4'>ID: {id}</p>
      <p className='mb-4 text-xl font-bold'>{title}</p>
      <p className='mb-12'>{created_at}</p>
      <p className='px-10'>{content}</p>
      <Link href='/task-page'>
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
          <span>Back to task page</span>
        </div>
      </Link>
    </Layout>
  );
};

export const getStaticPaths = async () => {
  const paths = await getAllTaskIds();

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps = async ({ params: { id } }) => {
  const { task: staicTask } = await getTaskData(id);

  return {
    props: {
      id: staicTask.id,
      staicTask,
    },
    revalidate: 3,
  };
};

export default TaskDetail;
