const login = async (username: string, password: string) => {
  const res = await fetch("/api/auth/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  if (res.ok) {
    await res.json().then((data) => {
      localStorage.setItem("token", data.token);
    });
    return true;
  } else {
    return false;
  }
};

export default { login };
