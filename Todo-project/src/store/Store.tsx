import { create } from 'zustand';

// Types for Todo
interface Todo {
  id: number;
  title: string;
  content: string;
  priority: number;
  dueDate: string; // Using string to handle date input
  done: boolean;
}

interface TodoStore {
  todos: Todo[];
  addTodo: (todo: Todo) => void;
  toggleTodo: (id: number) => void;
  editTodo: (updatedTodo: Todo) => void;
  deleteTodo: (id: number) => void;
  sortTodos: (type: 'priority' | 'dueDate') => void;
}

// Load todos from local storage
const loadTodosFromLocalStorage = (): Todo[] => {
  const todos = localStorage.getItem('todos');
  return todos ? JSON.parse(todos) : [];
};

// Save todos to local storage
const saveTodosToLocalStorage = (todos: Todo[]) => {
  localStorage.setItem('todos', JSON.stringify(todos));
};

export const useTodoStore = create<TodoStore>((set) => ({
  todos: loadTodosFromLocalStorage(), // Load todos when store is created
  addTodo: (todo) => set((state) => {
    const newTodos = [...state.todos, todo];
    saveTodosToLocalStorage(newTodos); // Save todos after adding
    return { todos: newTodos };
  }),
  toggleTodo: (id) => set((state) => {
    const newTodos = state.todos.map((todo) =>
      todo.id === id ? { ...todo, done: !todo.done } : todo
    );
    saveTodosToLocalStorage(newTodos); // Save todos after toggling
    return { todos: newTodos };
  }),
  editTodo: (updatedTodo) => set((state) => {
    const newTodos = state.todos.map((todo) =>
      todo.id === updatedTodo.id ? updatedTodo : todo
    );
    saveTodosToLocalStorage(newTodos); // Save todos after editing
    return { todos: newTodos };
  }),
  deleteTodo: (id) => set((state) => {
    const newTodos = state.todos.filter((todo) => todo.id !== id);
    saveTodosToLocalStorage(newTodos); // Save todos after deletion
    return { todos: newTodos };
  }),
  sortTodos: (type) => set((state) => {
    const newTodos = [...state.todos].sort((a, b) =>
      type === 'priority'
        ? a.priority - b.priority
        : new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
    );
    saveTodosToLocalStorage(newTodos); // Save todos after sorting
    return { todos: newTodos };
  }),
}));
