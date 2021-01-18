import Link from 'next/link';

import { Task } from 'lib/tasks';

type Props = {
  task: Task;
};

const TaskItem: React.FC<Props> = ({ task: { id, title } }) => {
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

export default TaskItem;
