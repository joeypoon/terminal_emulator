import { List, fromJS } from 'immutable';

export const filler = '-------';

export const inputChoices = List.of(
  'help', 'skills', 'experience', 'contact',
  'portfolio', 'resume', 'blog', 'social'
);

export const links = fromJS({
  portfolio: "http://joeypoon.com/portfolio#portfolio",
  resume: "http://joeypoon.com/resume/",
  blog: "http://joeypoon.com/blog/",
  social: {
    github: "https://github.com/joeypoon",
    twitter: "https://twitter.com/joeyfpoon",
    linkedin: "https://www.linkedin.com/in/joeypoon"
  }
});

export const dialogs = fromJS({
  intro: [
    "Hi there, I'm Joey.",
    "I write code for a living and for fun.",
    "Type 'help' to learn more."
  ],

  help: [
    "Available commands:",
    `[ ${inputChoices.join(', ')} ]`
  ],

  skills: [
    "$ npm install react angular",
    "$ rails new restful_api",
    "$ git commit -m 'git awesome.'"
  ],

  experience: [
    "Erdos Miller:",
    "Software Engineer (July 2015 - Current)",
    filler,
    "The Iron Yard:",
    "Backend Engineer (May 2015 - July 2015)",
    filler,
    "University of Houston Downtown:",
    "Software Developer (May 2015 - July 2015)",
  ],

  contact: [
    "phone: 281-942-8891",
    "email: joey@joeypoon.com"
  ],

  portfolio: [ links.get('portfolio') ],
  resume: [ links.get('resume') ],
  blog: [ links.get('blog') ],
  social: links.get('social').map((value, key) => `${key}: ${value}`)
});