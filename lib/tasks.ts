import fetch from 'node-fetch';
import sortby from 'lodash.sortby';

export type Task = {
  id: string;
  title: string;
  content: string;
  created_at: number;
};

export const getAllTasksData = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/list-task`
  );
  const tasks: Task[] = await res.json();
  const filteredTasks = sortby(tasks, [(o) => o.created_at]).reverse();

  return filteredTasks;
};

export const getAllTaskIds = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/list-task`
  );
  const tasks: Task[] = await res.json();
  const ids = tasks.map(({ id }) => ({
    params: {
      id: String(id),
    },
  }));

  return ids;
};

export const getTaskData = async (id: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/detail-task/${id}`
  );
  const task: Task = await res.json();

  return {
    task,
  };
};
