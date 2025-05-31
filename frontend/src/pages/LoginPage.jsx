import React, { useState } from 'react';
import { signIn } from 'aws-amplify/auth';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg('');
    setLoading(true);

    try {
      const { email, password } = formData;
      const result = await signIn({ username: email, password });
      console.log("登入成功：", result);

      setMsg('登入成功！即將導向個人資料頁面...');
      setTimeout(() => {
        navigate('/profile'); // 成功後跳轉
      }, 1000);
    } catch (err) {
      console.error(err);
      setMsg(err.message || '登入失敗');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-4 border rounded shadow">
      <h2 className="text-xl font-bold mb-4">登入</h2>
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
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? '登入中...' : '登入'}
        </button>
        {msg && <p className="text-sm mt-2 text-gray-700">{msg}</p>}
      </form>
    </div>
  );
}

