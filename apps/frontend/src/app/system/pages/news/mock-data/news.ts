import {NewsAuthor, News} from "@maorix-contract/types";


const authors: Record<'alex' | 'max', NewsAuthor> = {
  'alex': {
    name: 'Alexey Horbunov',
    jobTitle: 'Maorix CTO',
    avatarUrl: 'https://media-exp1.licdn.com/dms/image/C4D03AQF3NE-JL73H1A/profile-displayphoto-shrink_400_400/0/1639425085670?e=1672876800&v=beta&t=sTcafNpGqLM_sHn_5izPhCmRQjQ_dY9CVdNGXAQeDFQ'
  },
  'max': {
    name: 'Maxim Radko',
    jobTitle: 'Maorix Co-Founder',
    avatarUrl: 'https://media-exp1.licdn.com/dms/image/C4D03AQGf0gOaNJ8NrQ/profile-displayphoto-shrink_400_400/0/1630592777233?e=1672876800&v=beta&t=aAFoJyh2FgWgMFDn5tXqs3dOK5F-z1PDoRCAqKjkcMc'
  }
};

export const news: News[] = [
  {
    author: authors.max,
    title: 'Maorix announced expansion into the German market',
    description: 'Yesterday, 21th of November, Maorix announced news about opening new eco-terminals for Germany. Now citizens can join and make the Earth more clean',
    body: '',
    thumbnailUrl: 'assets/news/germany.png'
  },
  {
    author: authors.alex,
    title: 'Maorix updated cotract: what was changed',
    description: 'We implemented features for new users and re-built rating system inside application. Read for more info',
    body: '',
    thumbnailUrl: 'assets/news/rating.png'
  },
  {
    author: authors.alex,
    title: 'Updates in Near contract: How it will affect our users',
    description: 'Near introduced new opportunities in contract: check our plans for the future',
    body: '',
    thumbnailUrl: 'assets/news/near.png',
  },
  {
    author: authors.max,
    title: 'Special gifts for newcomers',
    description: 'Maorix appreciated activity of new users of eco-appication. We are announcing special gifts for new month',
    body: '',
    thumbnailUrl: 'assets/news/apple.png',
  },
  {
    author: authors.alex,
    title: 'New jobs in Maorix',
    description: 'We have opened new vacancies for JavaScript and NodeJS engineers in Maorix. Check them, maybe you are our next candidate',
    body: '',
    thumbnailUrl: 'assets/news/jsjob.png',
  },
  {
    author: authors.max,
    title: 'How we grew from a startup to an international company?',
    description: 'Now Maorix is a big company which provides solutions for solving ecological problems on the Earth. But we want tell you how we became an international company. Which problems we had and how we solved it',
    body: '',
    thumbnailUrl: 'assets/news/worldwide.png'
  }
]
