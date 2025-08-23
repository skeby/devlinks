"use client";

import GithubIcon from "@/app/assets/icons/github.svg";
import FrontendMentorIcon from "@/app/assets/icons/frontend-mentor.svg";
import TwitterIcon from "@/app/assets/icons/twitter.svg";
import LinkedInIcon from "@/app/assets/icons/linkedin.svg";
import YouTubeIcon from "@/app/assets/icons/youtube.svg";
import FacebookIcon from "@/app/assets/icons/facebook.svg";
import TwitchIcon from "@/app/assets/icons/twitch.svg";
// import DevToIcon from "@/app/assets/icons/dev.to.svg";
import CodewarsIcon from "@/app/assets/icons/codewars.svg";
import CodepenIcon from "@/app/assets/icons/codepen.svg";
import FreecodecampIcon from "@/app/assets/icons/freecodecamp.svg";
import GitlabIcon from "@/app/assets/icons/gitlab.svg";
import HashnodeIcon from "@/app/assets/icons/hashnode.svg";
import StackOverflowIcon from "@/app/assets/icons/stack-overflow.svg";

export const platformOptions = [
  {
    label: "GitHub",
    value: "github",
    icon: GithubIcon,
    color: "#1A1A1A",
    regex: /^(https?:\/\/)?(www\.)?github\.com\/[a-zA-Z0-9_-]+\/?$/,
    hint: "https://github.com/johndoe",
  },
  {
    label: "Frontend Mentor",
    value: "frontend-mentor",
    icon: FrontendMentorIcon,
    color: "#3F54A3", // custom blue from their site
    regex:
      /^(https?:\/\/)?(www\.)?frontendmentor\.io\/profile\/[a-zA-Z0-9_-]+\/?$/,
    hint: "https://frontendmentor.io/profile/johndoe",
  },
  {
    label: "Twitter",
    value: "twitter",
    icon: TwitterIcon,
    color: "#1DA1F2",
    regex: /^(https?:\/\/)?(www\.)?(twitter\.com|x\.com)\/[a-zA-Z0-9_-]+\/?$/,
    hint: "https://twitter.com/johndoe or https://x.com/johndoe",
  },
  {
    label: "LinkedIn",
    value: "linkedin",
    icon: LinkedInIcon,
    color: "#2D68FF",
    regex: /^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]+\/?$/,
    hint: "https://linkedin.com/in/johndoe",
  },
  {
    label: "YouTube",
    value: "youtube",
    icon: YouTubeIcon,
    color: "#EE3939",
    regex:
      /^(https?:\/\/)?(www\.)?youtube\.com\/(channel|c|user)\/[a-zA-Z0-9_-]+\/?$/,
    hint: "https://youtube.com/channel/johndoe or https://youtube.com/c/johndoe",
  },
  {
    label: "Facebook",
    value: "facebook",
    icon: FacebookIcon,
    color: "#1877F2",
    regex: /^(https?:\/\/)?(www\.)?facebook\.com\/[a-zA-Z0-9._-]+\/?$/,
    hint: "https://facebook.com/johndoe",
  },
  {
    label: "Twitch",
    value: "twitch",
    icon: TwitchIcon,
    color: "#9146FF",
    regex: /^(https?:\/\/)?(www\.)?twitch\.tv\/[a-zA-Z0-9_-]+\/?$/,
    hint: "https://twitch.tv/johndoe",
  },
  {
    label: "Codewars",
    value: "codewars",
    icon: CodewarsIcon,
    color: "#AD2C27",
    regex: /^(https?:\/\/)?(www\.)?codewars\.com\/users\/[a-zA-Z0-9_-]+\/?$/,
    hint: "https://codewars.com/users/johndoe",
  },
  {
    label: "Codepen",
    value: "codepen",
    icon: CodepenIcon,
    color: "#000000",
    regex: /^(https?:\/\/)?(www\.)?codepen\.io\/[a-zA-Z0-9_-]+\/?$/,
    hint: "https://codepen.io/johndoe",
  },
  {
    label: "freeCodeCamp",
    value: "freecodecamp",
    icon: FreecodecampIcon,
    color: "#0A0A23",
    regex: /^(https?:\/\/)?(www\.)?freecodecamp\.org\/[a-zA-Z0-9_-]+\/?$/,
    hint: "https://freecodecamp.org/johndoe",
  },
  {
    label: "GitLab",
    value: "gitlab",
    icon: GitlabIcon,
    color: "#FC6D26",
    regex: /^(https?:\/\/)?(www\.)?gitlab\.com\/[a-zA-Z0-9_-]+\/?$/,
    hint: "https://gitlab.com/johndoe",
  },
  {
    label: "Hashnode",
    value: "hashnode",
    icon: HashnodeIcon,
    color: "#2962FF",
    regex: /^(https?:\/\/)?(www\.)?hashnode\.com\/@[a-zA-Z0-9_-]+\/?$/,
    hint: "https://hashnode.com/@johndoe",
  },
  {
    label: "Stack Overflow",
    value: "stack-overflow",
    icon: StackOverflowIcon,
    color: "#F48024",
    regex:
      /^(https?:\/\/)?(www\.)?stackoverflow\.com\/users\/[0-9]+\/[a-zA-Z0-9_-]+\/?$/,
    hint: "https://stackoverflow.com/users/123456/johndoe",
  },
];
