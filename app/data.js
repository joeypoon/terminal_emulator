import { List, fromJS } from 'immutable';

export const filler = '-';

// export const MAX_LINES =  screen.width > 767 ? 15 : 10;

export const inputChoices = List.of(
  'help', 'skills', 'experience', 'contact',
  'portfolio', 'resume', 'github', 'twitter',
  'linkedin', 'blog'
);

export const links = fromJS({
  portfolio: "http://kaijudev.com/",
  resume: "http://kaijudev.com/resume.pdf",
  blog: "https://medium.com/@joeypoon",
  github: "https://github.com/joeypoon",
  twitter: "https://twitter.com/joeyfpoon",
  linkedin: "https://www.linkedin.com/in/joeypoon"
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
    "$ npm install react @angular/core",
    "$ react-native init MobileApp",
    "$ node server.js",
    "$ git commit -m 'git awesome.'"
  ],

  experience: [
    "National Oilwell Varco",
    "Software Engineer (August 2016 - Current)",
    filler,
    "Erdos Miller:",
    "Software Engineer (July 2015 - July 2016)",
    filler,
    "University of Houston Downtown:",
    "Software Developer (May 2015 - July 2015)",
    "Financial Aid Counselor II (2014 - April 2015)",
    "Financial Aid Counselor I (2012 - 2014)",
    "Student Assistant (2010 - 2012)"
  ],

  contact: [
    "phone: 281-942-8891",
    "email: joey@kaijudev.com"
  ],

  portfolio: [ links.get('portfolio') ],
  resume: [ links.get('resume') ],
  github: [ links.get('github') ],
  twitter: [ links.get('twitter') ],
  linkedin: [ links.get('linkedin') ],
  blog: [ links.get('blog') ]
});