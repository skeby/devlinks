import GithubIcon from "../../public/icons/github.svg";
import FrontendMentorIcon from "../../public/icons/frontend-mentor.svg";
import TwitterIcon from "../../public/icons/twitter.svg";
import LinkedInIcon from "../../public/icons/linkedin.svg";
import YouTubeIcon from "../../public/icons/youtube.svg";
import FacebookIcon from "../../public/icons/facebook.svg";
import TwitchIcon from "../../public/icons/twitch.svg";
// import DevToIcon from "../../public/icons/dev.to.svg";
import CodewarsIcon from "../../public/icons/codewars.svg";
import CodepenIcon from "../../public/icons/codepen.svg";
import FreecodecampIcon from "../../public/icons/freecodecamp.svg";
import GitlabIcon from "../../public/icons/gitlab.svg";
import HashnodeIcon from "../../public/icons/hashnode.svg";
import StackOverflowIcon from "../../public/icons/stack-overflow.svg";

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
    regex:
      /^(https?:\/\/)?(www\.)?frontendmentor\.io\/profile\/[a-zA-Z0-9_-]+\/?$/,
    hint: "https://frontendmentor.io/profile/johndoe",
  },
  {
    label: "Twitter",
    value: "twitter",
    icon: TwitterIcon,
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
    regex: /^(https?:\/\/)?(www\.)?facebook\.com\/[a-zA-Z0-9._-]+\/?$/,
    hint: "https://facebook.com/johndoe",
  },
  {
    label: "Twitch",
    value: "twitch",
    icon: TwitchIcon,
    regex: /^(https?:\/\/)?(www\.)?twitch\.tv\/[a-zA-Z0-9_-]+\/?$/,
    hint: "https://twitch.tv/johndoe",
  },
  {
    label: "Codewars",
    value: "codewars",
    icon: CodewarsIcon,
    regex: /^(https?:\/\/)?(www\.)?codewars\.com\/users\/[a-zA-Z0-9_-]+\/?$/,
    hint: "https://codewars.com/users/johndoe",
  },
  {
    label: "Codepen",
    value: "codepen",
    icon: CodepenIcon,
    regex: /^(https?:\/\/)?(www\.)?codepen\.io\/[a-zA-Z0-9_-]+\/?$/,
    hint: "https://codepen.io/johndoe",
  },
  {
    label: "freeCodeCamp",
    value: "freecodecamp",
    icon: FreecodecampIcon,
    regex: /^(https?:\/\/)?(www\.)?freecodecamp\.org\/[a-zA-Z0-9_-]+\/?$/,
    hint: "https://freecodecamp.org/johndoe",
  },
  {
    label: "GitLab",
    value: "gitlab",
    icon: GitlabIcon,
    regex: /^(https?:\/\/)?(www\.)?gitlab\.com\/[a-zA-Z0-9_-]+\/?$/,
    hint: "https://gitlab.com/johndoe",
  },
  {
    label: "Hashnode",
    value: "hashnode",
    icon: HashnodeIcon,
    regex: /^(https?:\/\/)?(www\.)?hashnode\.com\/@[a-zA-Z0-9_-]+\/?$/,
    hint: "https://hashnode.com/@johndoe",
  },
  {
    label: "Stack Overflow",
    value: "stack-overflow",
    icon: StackOverflowIcon,
    regex:
      /^(https?:\/\/)?(www\.)?stackoverflow\.com\/users\/[0-9]+\/[a-zA-Z0-9_-]+\/?$/,
    hint: "https://stackoverflow.com/users/123456/johndoe",
  },
];
