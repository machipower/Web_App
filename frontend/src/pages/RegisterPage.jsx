// src/pages/RegisterPage.jsx
import { useState } from "react";
import { Auth } from "aws-amplify";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    nickname: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const { email, password, nickname } = formData;

      const result = await Auth.signUp({
        username: email,
        password,
        attributes: {
          email,
          name: nickname, // Cognito 預設支援的屬性
        },
      });

      console.log("註冊成功", result);
      setSuccess("註冊成功，請至信箱收取驗證信！");
      // 可以選擇導向登入頁
      // navigate('/login')
    } catch (err) {
      console.error("註冊失敗", err);
      setError(err.message || "發生錯誤，請再試一次");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">註冊帳號</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="nickname"
          value={formData.nickname}
          onChange={handleChange}
          placeholder="暱稱"
          className="w-full border p-2"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full border p-2"
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="密碼（至少 6 位數）"
          className="w-full border p-2"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          註冊
        </button>
      </form>

      {error && <p className="text-red-500 mt-2">{error}</p>}
      {success && <p className="text-green-600 mt-2">{success}</p>}
    </div>
  );
}
