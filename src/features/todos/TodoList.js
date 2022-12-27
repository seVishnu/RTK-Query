import {
  useGetTodosQuery,
  useAddTodoMutation,
  useDeleteTodoMutation,
  useUpdateTodoMutation,
} from "../api/apiSlice";
import { faUpload, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
const TodoList = () => {
  const [todo, setTodo] = useState("");
  const {
    data: todos,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetTodosQuery();
  const [addTodo] = useAddTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();
  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo({ userId: 1, title: todo, completed: false });
    setTodo("");
  };
  const newItemSection = (
    <form onSubmit={handleSubmit}>
      <label htmlFor="new-todo">Enter a new Todo Item</label>
      <div className="new-todo">
        <input
          id="new-todo"
          name="new-todo"
          type="text"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          placeholder="enter new todo"
        />
      </div>
      <button className="submit">
        <FontAwesomeIcon icon={faUpload} />
      </button>
    </form>
  );
  let content;
  if (isLoading) content = <p>Loading...</p>;
  else if (isSuccess) {
    content = todos.map((todo) => (
      <article key={todo.id}>
        <div className="todo">
          <input
            type="checkbox"
            checked={todo.completed}
            id={todo.id}
            onChange={() => updateTodo({ ...todo, completed: !todo.completed })}
          />
          <label htmlFor={todo.id}>{todo.title}</label>
        </div>
        <button className="trash" onClick={() => deleteTodo({ id: todo.id })}>
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </article>
    ));
  } else if (isError) content = <p>{error}</p>;

  return (
    <main>
      <h1>Todo List</h1>
      {newItemSection}
      {content}
    </main>
  );
};

export default TodoList;
