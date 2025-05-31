import React, { useState } from "react";
import { signUp } from "@aws-amplify/auth";
import { configure } from "@aws-amplify/core";
import { amplifyConfig } from "../lib/amplify-config";

// 初始化 Amplify（只需執行一次）
configure(amplifyConfig);

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    nickname: "",
  });

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setLoading(true);

    try {
      const { email, password, name, nickname } = formData;

      const result = await signUp({
        username: email,
        password,
        options: {
          userAttributes: {
            email,
            name,
            nickname,
          },
        },
      });

      console.log("註冊結果：", result);
      setMsg("✅ 註冊成功，請至信箱驗證帳號。");
    } catch (err) {
      console.error("註冊錯誤：", err);
      setMsg(err.message || "註冊失敗");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-4 border rounded shadow">
      <h2 className="text-xl font-bold mb-4">註冊新帳號</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full border p-2"
          required
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="密碼"
          className="w-full border p-2"
          required
        />
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="本名"
          className="w-full border p-2"
          required
        />
        <input
          type="text"
          name="nickname"
          value={formData.nickname}
          onChange={handleChange}
          placeholder="暱稱"
          className="w-full border p-2"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "註冊中..." : "註冊"}
        </button>
        {msg && <p className="text-sm mt-2 text-gray-700">{msg}</p>}
      </form>
    </div>
  );
}
