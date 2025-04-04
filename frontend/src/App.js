import React from "react";
import ToDoCard from "./components/ToDoCard";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Heading from "./components/Heading";
import AddToDoButton from "./components/AddToDoButton";
import ArchivedList from "./components/ArchivedList";

function App() {
  const [todos, setTodos] = React.useState([]);

  React.useEffect(() => {
    fetch("/api/todos")
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch((err) => console.error("Fehler beim Laden der Todos:", err));
  }, []);

  const handleSave = async (id, newTitle, newText) => {
    const todo = todos.find((item) => item.id === id);
    const updatedTodo = {
      ...todo,
      title: newTitle,
      text: newText,
    };

    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTodo),
      });

      const saved = await response.json();
      setTodos(todos.map((item) => (item.id === id ? saved : item)));
    } catch (err) {
      console.error("Fehler beim Aktualisieren:", err);
    }
  };

  const deleteToDo = async (id) => {
    try {
      await fetch(`/api/todos/${id}`, {
        method: "DELETE",
      });
      setTodos(todos.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Fehler beim Löschen des Todos:", error);
    }
  };

  const toggleDone = async (id) => {
    const todo = todos.find((item) => item.id === id);
    const updated = { ...todo, done: !todo.done };

    try {
      const res = await fetch(`/api/todos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updated),
      });

      const saved = await res.json();
      setTodos(todos.map((item) => (item.id === id ? saved : item)));

      if (updated.done) {
        setTimeout(async () => {
          const archiveRes = await fetch(`/api/todos/${id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...saved, archived: true }),
          });

          const archivedTodo = await archiveRes.json();

          setTodos((prev) =>
            prev.map((item) => (item.id === id ? archivedTodo : item))
          );
        }, 500);
      }
    } catch (err) {
      console.error("Fehler beim Toggle Done:", err);
    }
  };

  const handleAddToDo = async () => {
    try {
      const response = await fetch("/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: "",
          text: "",
          date: new Date().toLocaleDateString(),
        }),
      });

      const newTodo = await response.json();
      setTodos([...todos, newTodo]);
    } catch (err) {
      console.error("Fehler beim Erstellen des Todos:", err);
    }
  };

  const archivedTodos = todos.filter((todo) => todo.archived);

  return (
    <div className="container mt-4">
      <Heading />

      <div className="row">
        {todos
          .filter((todo) => !todo.archived)
          .map((todo) => (
            <div className="col-sm-6 col-md-4 col-lg-3 mb-4" key={todo.id}>
              <ToDoCard
                {...todo}
                onDelete={() => deleteToDo(todo.id)}
                onToggleDone={() => toggleDone(todo.id)}
                onUpdate={(title, text) => handleSave(todo.id, title, text)}
              />
            </div>
          ))}

        <div className="col-sm-6 col-md-4 col-lg-3 mb-4 d-flex align-items-center justify-content-center">
          <AddToDoButton onClick={handleAddToDo} />
        </div>

        <div>
          <ArchivedList todos={archivedTodos} />
        </div>
      </div>
    </div>
  );
}

export default App;
