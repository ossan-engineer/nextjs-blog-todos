import { useContext } from 'react';
import Cookie from 'universal-cookie';

import { StateContext } from 'context/StateContext';

type Props = {
  onCreate: () => void;
  onUpdate: () => void;
};

const cookie = new Cookie();

const TaskForm: React.FC<Props> = ({ onCreate, onUpdate }) => {
  const { selectedTask, setSelectedTask } = useContext(
    StateContext
  ) as ContextType;

  const create = async (e) => {
    e.preventDefault();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/tasks/`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `JWT ${cookie.get('access_token')}`,
        },
        body: JSON.stringify({ title: selectedTask.title }),
      }
    );
    if (res.status === 401) {
      alert('JWT token not valid');
    }
    setSelectedTask({ id: 0, title: '' });
    onCreate();
  };

  const update = async (e) => {
    e.preventDefault();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/tasks/${selectedTask.id}/`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `JWT ${cookie.get('access_token')}`,
        },
        body: JSON.stringify({ title: selectedTask.title }),
      }
    );
    if (res.status === 401) {
      alert('JWT token not valid');
    }
    setSelectedTask({ id: 0, title: '' });
    onUpdate();
  };

  return (
    <div>
      <form onSubmit={selectedTask.id !== 0 ? update : create}>
        <input
          type='text'
          className='text-black mb-8 px-2 py-1'
          value={selectedTask.title}
          onChange={(e) =>
            setSelectedTask({ ...selectedTask, title: e.target.value })
          }
        />
        <button
          type='submit'
          className='bg-gray-500 ml-2 hover:bg-gray-600 text-sm px-2 py-1 rounded uppercase'
        >
          {selectedTask.id !== 0 ? 'update' : 'create'}
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
