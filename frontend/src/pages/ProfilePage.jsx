import { useEffect, useState } from "react";
import { getCurrentUser } from "aws-amplify/auth";
import { uploadData } from "aws-amplify/storage";
import { generateClient } from "aws-amplify/data";
import { client } from "../lib/amplify-config";

// ✅ 技能清單（範例）
const SKILL_OPTIONS = ["Frontend", "Backend", "Data", "Design", "Marketing"];

export default function ProfilePage() {
  const [formData, setFormData] = useState({
    nickname: "",
    major: "",
    skills: [],
    selfIntro: "",
    resume: null,
    portfolioURL: "",
  });

  const [userId, setUserId] = useState("");

  // ✅ 取得目前使用者資訊
  useEffect(() => {
    getCurrentUser()
      .then((user) => {
        setUserId(user.userId);
      })
      .catch((err) => {
        console.error("尚未登入或取得 userId 失敗：", err);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSkillToggle = (skill) => {
    setFormData((prev) => {
      const newSkills = prev.skills.includes(skill)
        ? prev.skills.filter((s) => s !== skill)
        : [...prev.skills, skill];
      return { ...prev, skills: newSkills };
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let resumeURL = "";

      if (formData.resume) {
        const { key } = await uploadData({
          key: `resumes/${userId}-${formData.resume.name}`,
          data: formData.resume,
        }).result;

        resumeURL = key;
      }

      const payload = {
        userId,
        nickname: formData.nickname,
        major: formData.major,
        skills: formData.skills,
        selfIntro: formData.selfIntro,
        resumeURL,
        portfolioURL: formData.portfolioURL,
      };

      const db = generateClient(client);
      await db.models.UserProfile.create(payload);
      console.log("✅ 資料成功寫入 DynamoDB！");
    } catch (err) {
      console.error("上傳或儲存失敗：", err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">編輯個人資料</h2>
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
          type="text"
          name="major"
          value={formData.major}
          onChange={handleChange}
          placeholder="科系"
          className="w-full border p-2"
        />
        <textarea
          name="selfIntro"
          value={formData.selfIntro}
          onChange={handleChange}
          placeholder="自我介紹"
          className="w-full border p-2 h-24"
        />
        <input
          type="url"
          name="portfolioURL"
          value={formData.portfolioURL}
          onChange={handleChange}
          placeholder="作品集網址"
          className="w-full border p-2"
        />

        <div>
          <label className="font-bold">技能選擇：</label>
          <div className="flex flex-wrap gap-2 mt-2">
            {SKILL_OPTIONS.map((skill) => (
              <label key={skill} className="inline-flex items-center gap-1">
                <input
                  type="checkbox"
                  checked={formData.skills.includes(skill)}
                  onChange={() => handleSkillToggle(skill)}
                />
                {skill}
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block font-bold">上傳履歷：</label>
          <input type="file" name="resume" accept=".pdf,.doc,.docx" onChange={handleFileChange} />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          儲存資料
        </button>
      </form>
    </div>
  );
}
