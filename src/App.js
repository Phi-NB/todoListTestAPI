import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [todos, setTodos] = useState([]);
  const [todoName, setTodoName] = useState("");
  const [todoNameUpdate, setTodoNameUpdate] = useState("");
  const [idUpdate, setIdUpdate] = useState("");
  const [isDisplayInput, setIsDisplayInput] = useState(true);
  const [isDisplayInputUpdate, setIsDisplayInputUpdate] = useState(false);
  const [isDisplayButton, setIsDisplayButton] = useState(true);
  const [isDisplayButtonUpdate, setIsDisplayButtonUpdate] = useState(false);

  useEffect(() => {
    getDataTodo();
  }, []);

  const getDataTodo = async () => {
    try {
      const url = process.env.REACT_APP_BACKEND_HOST + "todo"

      const { data } = await axios.get(url);
      setTodos(data);
    } catch (err) {
      console.log(err.message);
    }
  };

  const addTodo = async () => {
    try {
      const url = process.env.REACT_APP_BACKEND_HOST + "todo"
      await axios({
        url: url,
        method: "POST",
        data: {
          todoName: todoName,
        },
      });
      getDataTodo();
    } catch (err) {
      console.log(err.message);
    }
  };

  const deleteTodo = async (todo) => {
    try {
      const url = process.env.REACT_APP_BACKEND_HOST + "todo"
      await axios({
        url: url,
        method: "DELETE",
        data: {
          _id: todo._id,
        },
      });
      getDataTodo();
    } catch (err) {
      console.log(err.message);
    }
  };
  const updateTodo = async () => {
    try {
      const url = process.env.REACT_APP_BACKEND_HOST + "todo"
      await axios({
        url: url,
        method: "PUT",
        data: {
          _id: idUpdate,
          todoName: todoNameUpdate,
        },
      });
      getDataTodo();
      console.log(idUpdate, todoNameUpdate);
    } catch (err) {
      console.log(err.message);
    }
  };

  const displayUpdate = (item) => {
    setIsDisplayInputUpdate(true);
    setIsDisplayInput(false);
    setIsDisplayButton(false);
    setIsDisplayButtonUpdate(true);
    setIdUpdate(item._id)
  };

  return (
    <div className="App">
      <header className="App-header">
        {isDisplayInput && (
          <input
            placeholder="Nhập todo"
            value={todoName}
            onChange={(e) => setTodoName(e.target.value)}
            style={{
              padding: "10px 8px",
              fontSize: "20px",
              width: "500px",
              borderRadius: "8px",
            }}
          />
        )}

        {isDisplayInputUpdate && (
          <input
            placeholder="Nhập update"
            value={todoNameUpdate}
            onChange={(e) => setTodoNameUpdate(e.target.value)}
            style={{
              padding: "10px 8px",
              fontSize: "20px",
              width: "500px",
              borderRadius: "8px",
            }}
          />
        )}
        {isDisplayButton && (
          <button
            onClick={addTodo}
            style={{
              padding: "10px 8px",
              fontSize: "20px",
              width: "100px",
              borderRadius: "8px",
              marginTop: 20,
            }}
          >
            Nhập
          </button>
        )}

        {isDisplayButtonUpdate && (
          <button
            onClick={updateTodo}
            style={{
              padding: "10px 8px",
              fontSize: "20px",
              borderRadius: "8px",
              marginTop: 20,
            }}
          >
            Nhập todo update
          </button>
        )}

        <ul style={{ listStyle: "none", padding: "0" }}>
          {todos.map((todo) => {
            return (
              <li
                style={{
                  color: "#000",
                  backgroundColor: "#fff",
                  margin: "20px 0",
                  padding: "8px 10px",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                }}
                key={todo._id}
              >
                {todo.todoName}
                <button
                  style={{
                    padding: "0px 8px",
                    fontSize: "20px",
                    width: "30px",
                    borderRadius: "8px",
                    margin: "0 10px",
                  }}
                  onClick={() => deleteTodo(todo)}
                >
                  X
                </button>
                <button
                  style={{
                    padding: "0px 8px",
                    fontSize: "20px",
                    borderRadius: "8px",
                  }}
                  onClick={() => displayUpdate(todo)}
                >
                  update
                </button>
              </li>
            );
          })}
        </ul>
      </header>
    </div>
  );
}

export default App;
