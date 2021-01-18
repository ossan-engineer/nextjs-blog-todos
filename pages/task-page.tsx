import { useEffect } from 'react';
import Link from 'next/link';
import useSWR from 'swr';
import sortby from 'lodash.sortby';

import Layout from 'components/Layout';
import TaskItem from 'components/TaskItem';
import { getAllTasksData, Task } from 'lib/tasks';

type Props = {
  staticFilteredTasks: Task[];
};

const fetcher = async (url) => {
  const res = await fetch(url);
  const data = await res.json();

  return data;
};

const API_URL = `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/list-task/`;

const TaskPage: React.FC<Props> = ({ staticFilteredTasks }) => {
  const { data: tasks, mutate } = useSWR(API_URL, fetcher, {
    initialData: staticFilteredTasks,
  });
  const filteredTasks = sortby(tasks, [(o) => o.created_at]).reverse();

  useEffect(() => {
    mutate();
  }, []);

  return (
    <Layout title='Task page'>
      <ul>
        {filteredTasks &&
          filteredTasks.map((task) => <TaskItem key={task.id} task={task} />)}
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
  const staticFilteredTasks = await getAllTasksData();

  return {
    props: {
      staticFilteredTasks,
    },
    revalidate: 3,
  };
};

export default TaskPage;
