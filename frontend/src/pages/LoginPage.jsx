import React, { useState } from "react";
import { Auth } from "aws-amplify";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const user = await Auth.signIn(email, password);
      console.log("✅ 登入成功", user);
      navigate("/profile"); // 登入成功導向
    } catch (err) {
      console.error("❌ 登入失敗", err);
      setError("登入失敗，請確認帳號密碼");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-4 border shadow">
      <h2 className="text-2xl font-bold mb-4">登入</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="密碼"
          className="w-full border p-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="text-red-600">{error}</p>}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          登入
        </button>
      </form>
    </div>
  );
}
