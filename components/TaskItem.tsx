import Link from 'next/link';
import Cookie from 'universal-cookie';

import { Task } from 'lib/tasks';

type Props = {
  task: Task;
  onDelete: () => void;
};

const cookie = new Cookie();

const TaskItem: React.FC<Props> = ({ task: { id, title }, onDelete }) => {
  const deleteTask = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/tasks/${id}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `JWT ${cookie.get('access_token')}`,
        },
      }
    );
    if (res.status === 401) {
      alert('JWT token not valid');
    }
    onDelete();
  };

  return (
    <div>
      <span>{id}: </span>
      <Link href={`/tasks/${id}`}>
        <span className='cursor-pointer text-white border-b border-gray-500 hover:bg-gray-600'>
          {title}
        </span>
      </Link>
      <div className='float-right ml-20'>
        <svg
          onClick={deleteTask}
          className='w-6 h-6 mr-2 cursor-pointer'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default TaskItem;
