import React from 'react';


export const DefaultBlogs = [
  {
    content:{
      title: "How To Use",
      content: "Please sign in to see more blogs and also create your own blogs.",
      author: "Qiwei",
      image: "https://images.unsplash.com/photo-1549921296-bc643ead1e65?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3401&q=80",
    },
    noteId: "how-to-use",
    createdAt: Date.parse('May 15, 2019 00:00:01'),
  },
  {
    content:{
      title: "How to build a vpn",
      content: "(I will do this later)",
      author: "Qiwei",
      image: "https://images.unsplash.com/photo-1480160734175-e2209654433c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1400&q=80",
    },
    noteId: "how-to-build-a-vpn",
    createdAt: Date.parse('May 15, 2019, 00:00:02'),
  },
  {
    content:{
      title: "What Is My Fav Color",
      content: "#6fcff1",
      author: "Qiwei",
      image: "zima",
    },
    noteId: "fav-color",
    createdAt: Date.parse('May 15, 2019, 00:00:03'),
  }, 
  {
    content:{
      title: "How to learn cloud computing",
      content: "",
      author: "Qiwei",
      image: "https://images.unsplash.com/photo-1536250853075-e8504ee040b9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80",
    },
    noteId: "cloud-computing",
    createdAt: Date.parse('May 15, 2019, 00:00:04'),
  }, 
  {
    content:{
      title: "Materials for practicing algorithms",
      content: "",
      author: "Qiwei",
      image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixlib=rb-1.2.1&auto=format&fit=crop&w=2250&q=80",
    },
    noteId: "learn-python",
    createdAt: Date.parse('May 15, 2019, 00:00:05'),
  },
  {
    content:{
      title: "Materials for learning Web Development",
      content: "It is easy to learn web dev, there are a few websites that can help you get started:" 
                + '\n' + "1. Udemy web development courses"
                + '\n' + "..."
                ,
      author: "Qiwei",
      image: "https://images.unsplash.com/photo-1509718443690-d8e2fb3474b7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80",
    },
    noteId: "learn-web-dev",
    createdAt: Date.parse('May 15, 2019, 00:00:06'),
  },
  {
    content:{
      title: "How to add comments to your website",
      content: "It is quite troublesome to build a comment section on my own, it will take me a lot of time to design and figure out how to handle data, so i choose to use Disqus, a third party comment system that I saw on lots of websites."
                + '\n' + "This is my first time using it and it is not very straight forward to implement on React. Fortunately, I found a package (https://github.com/disqus/disqus-react) that makes my life a lot easier. I just need to change a few configuration variables and it works!"
                ,
      author: "Qiwei",
      image: "https://images.unsplash.com/photo-1483546416237-76fd26bbcdd1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80",
    },
    noteId: "add-comments",
    createdAt: Date.parse('May 15, 2019, 00:00:07'),
  },
];