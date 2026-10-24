import { useEffect, useState } from "react";

const API = "http://localhost:3000/api";
async function refreshAccessToken() {
  const res = await fetch(`${API}/users/refresh`, {
    method: "POST",
    credentials: "include",
  });
  return res.ok;
}

async function apiFetch(url, options = {}) {
  const makeRequest = () =>
    fetch(url, {
      ...options,
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });

  let res = await makeRequest();
  if (res.status === 401) {
    const ok = await refreshAccessToken();
    if (ok) res = await makeRequest();
  }
  return res;
}
function App() {
  // who is logged in (null = nobody)
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);

  // login form state
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // task state
  const [title, setTitle] = useState("");
  const [tasks, setTasks] = useState([]);

  // on page load: ask the server "am I still logged in?"
  useEffect(() => {
    async function checkLogin() {
      try {
        const res = await fetch(`${API}/users/me`, { credentials: "include" });
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        }
      } catch (err) {
        console.log(err);
      }
      setChecking(false);
    }
    checkLogin();
  }, []);

  // once we know who the user is, load their tasks
  useEffect(() => {
    if (user) getTasks();
  }, [user]);

  async function handleAuth(e) {
    e.preventDefault();
    const path = isRegister ? "register" : "login";
    const body = isRegister ? { username, email, password } : { email, password };
    try {
      const res = await fetch(`${API}/users/${path}`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.message);
        return;
      }
      if (isRegister) {
        alert("Registered! Now log in.");
        setIsRegister(false);
        return;
      }
      setUser(data.user);
    } catch (err) {
      alert("Server not reachable");
    }
  }

  async function logout() {
    try {
      await fetch(`${API}/users/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (err) {
      console.log(err);
    }
    setUser(null);
    setTasks([]);
  }

  async function getTasks() {
    try {
      const res = await apiFetch(`${API}/tasks`);
      if (res.status === 401) {
        setUser(null);
        return;
      }
      const data = await res.json();
      if (!res.ok) {
        alert(data.message);
        return;
      }
      setTasks(data);
    } catch (err) {
      console.log(err);
    }
  }

  async function addTask(e) {
    e.preventDefault();
    if (!title.trim()) {
      alert("Enter the task");
      return;
    }
    try {
      const res = await apiFetch(`${API}/tasks`, {
        method: "POST",
        body: JSON.stringify({ title }),
      });
      if (!res.ok) {
        const data = await res.json();
        alert(data.message);
        return;
      }
      setTitle("");
      getTasks();
    } catch (err) {
      console.log(err);
    }
  }

  async function deleteTask(id) {
    try {
      const res = await apiFetch(`${API}/tasks/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const data = await res.json();
        alert(data.message);
        return;
      }
      getTasks();
    } catch (err) {
      console.log(err);
    }
  }

  // ---------- WAIT FOR LOGIN CHECK ----------
  if (checking) return <h3 style={{ textAlign: "center" }}>Loading...</h3>;

  // ---------- LOGIN / REGISTER SCREEN ----------
  if (!user) {
    return (
      <div style={{ width: "500px", margin: "50px auto", textAlign: "center" }}>
        <h1>{isRegister ? "Register" : "Login"}</h1>
        <form onSubmit={handleAuth}>
          {isRegister && (
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">{isRegister ? "Register" : "Login"}</button>
        </form>
        <p style={{ marginTop: "15px" }}>
          {isRegister ? "Already have an account?" : "New here?"}{" "}
          <button onClick={() => setIsRegister(!isRegister)}>
            {isRegister ? "Go to Login" : "Go to Register"}
          </button>
        </p>
      </div>
    );
  }

  // ---------- TASK SCREEN ----------
  return (
    <div style={{ width: "500px", margin: "50px auto", textAlign: "center" }}>
      <h1>Task Manager</h1>
      <p>Hello, {user.username}</p>
      <button onClick={logout}>Logout</button>

      <form onSubmit={addTask}>
        <input
          type="text"
          placeholder="Enter Task"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button type="submit">Add Task</button>
      </form>

      <hr />

      {tasks.length === 0 ? (
        <h3>No Tasks Found</h3>
      ) : (
        tasks.map((task) => (
          <div
            key={task._id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              margin: "10px 0",
              border: "1px solid black",
              padding: "10px",
            }}
          >
            <span>{task.title}</span>
            <button
              onClick={() => deleteTask(task._id)}
              style={{ backgroundColor: "red", color: "white" }}
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default App;