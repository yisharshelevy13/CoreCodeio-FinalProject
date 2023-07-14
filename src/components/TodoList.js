import React, { useState } from "react";
import TodoForm from "./TodoForm";
import Todo from "./Todo";
import FormPopup from "./FormPopup";
import { useEffect } from "react";

function TodoList(props) {
  const [todos, setTodos] = useState([]);

  const getToDos = async () => {
    const result = await fetch("http://localhost:4000/api");
    const resultJson = await result.json();

    console.log(resultJson);
    setTodos(resultJson.data);
  };

  useEffect(() => {
    getToDos();
  }, []);

  const addTodo = async (todo) => {
    if (!todo.title || /^\s*$/.test(todo.title)) {
      return;
    }
    console.log(todo);

    const result = await fetch("http://localhost:4000/api", {
      method: "POST",
      body: JSON.stringify({
        title: todo.title,
        description: todo.description,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const resultJson = await result.json();
    console.log(resultJson);

    // getToDos();

    const newToDo = {
      id: resultJson.toDo.id,
      description: resultJson.toDo.description,
      title: resultJson.toDo.title,
      isDone: false,
      showDescription: false,
      creationDate: resultJson.toDo.creationDate,
      modificationDate: resultJson.toDo.modificationDate,
    };

    const newTodos = [...todos, newToDo];

    setTodos(newTodos);

    // console.log(...todos);
    // console.log("Crear");
  };

  useEffect(() => {
    // console.log(todos);
  }, [todos]);

  const showDescription = (todoId) => {
    let updatedTodos = todos.map((todo) => {
      if (todo.id === todoId) {
        todo.showDescription = !todo.showDescription;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const updateTodo = async (todoId, newValue) => {
    if (!newValue.title || /^\s*$/.test(newValue.title)) {
      return;
    }

    console.log(newValue);

    const result = await fetch(`http://localhost:4000/api/${todoId}`, {
      method: "PATCH",
      body: JSON.stringify({
        title: newValue.title,
        description: newValue.description,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const resultJson = await result.json();
    console.log(resultJson);

    const newData = todos.map((item) => {
      if (item.id == resultJson.toDo.id) {
        return resultJson.toDo;
      }

      return item;
    });

    setTodos(newData);

    // setTodos((prev) =>
    //   prev.map((item) => (item.id === todoId ? newValue : item))
    // );
  };

  const removeTodo = async (id) => {
    const result = await fetch(`http://localhost:4000/api/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const resultJson = await result.json();

    console.log(resultJson);

    const removedArr = [...todos].filter((todo) => todo.id !== id);
    setTodos(removedArr);
  };

  async function completeTodo(id) {
    const newIsDone = todos.filter((item) => item.id == id);
    const result = await fetch(`http://localhost:4000/api/${id}`, {
      method: "PATCH",
      body: JSON.stringify({
        isDone: !newIsDone[0].isDone,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const resultJson = await result.json();
    console.log(resultJson);

    const newData = todos.map((item) => {
      if (item.id == resultJson.toDo.id) {
        return resultJson.toDo;
      }

      return item;
    });

    setTodos(newData);

    // let updatedTodos = todos.map((todo) => {
    //   if (todo.id === id) {
    //     todo.isDone = !todo.isDone;
    //   }

    //   return todo;
    // });
    // setTodos(updatedTodos);
  }

  return (
    <>
      <h1>What's the Plan for Today?</h1>
      <TodoForm onSubmit={addTodo} />
      <Todo
        todos={todos}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
        showDescription={showDescription}
      />
    </>
  );
}

export default TodoList;
