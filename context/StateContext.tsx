import { createContext, useState } from 'react';

export const StateContext = createContext(null);

const StateContextProvider: React.FC = ({ children }) => {
  const [selectedTask, setSelectedTask] = useState<SelectedTask>({
    id: 0,
    title: '',
  });
  return (
    <StateContext.Provider
      value={{
        selectedTask,
        setSelectedTask,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export default StateContextProvider;
