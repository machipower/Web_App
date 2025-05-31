export const amplifyConfig = {
  Auth: {
    region: "ap-southeast-2",
    userPoolId: "ap-southeast-2_pUZWPptE2",
    userPoolWebClientId: "2rufu41r5rgbdm19kp3ihjea41",
  },
};

import { defineData } from "aws-amplify/data";
import { createClient } from "aws-amplify/data";

export const client = createClient(defineData({
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
}));