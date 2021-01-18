/// <reference types="next" />
/// <reference types="next/types/global" />

type SelectedTask = {
  id: number;
  title: string;
};

type ContextType = {
  selectedTask: SelectedTask;
  setSelectedTask: Dispatch<SetStateAction<SelectedTask>>;
};
