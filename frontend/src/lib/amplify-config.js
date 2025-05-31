import { defineData, generateClient } from "aws-amplify/data";

// ✅ Auth 設定（可供 Amplify.configure 使用）
export const amplifyConfig = {
  Auth: {
    region: "ap-southeast-2",
    userPoolId: "ap-southeast-2_pUZWPptE2",
    userPoolWebClientId: "2rufu41r5rgbdm19kp3ihjea41",
  },
};

// ✅ define schema + 產生 client（for資料操作）
const schema = defineData({
  models: {
    UserProfile: {
      fields: {
        userId: "string",
        nickname: "string",
        major: "string",
        skills: ["string"],
        selfIntro: "string",
        resumeURL: "string",
        portfolioURL: "string",
      },
      primaryKey: "userId",
    },
  },
});

export const client = generateClient({ schema });
