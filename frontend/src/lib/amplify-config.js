export const amplifyConfig = {
  Auth: {
    region: "",
    userPoolId: "",
    userPoolWebClientId: "",
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
