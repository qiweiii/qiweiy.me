/* eslint-disable no-template-curly-in-string */
/* eslint-disable no-useless-concat */
// eslint-disable-next-line no-useless-concat
export const DefaultBlogs = [
  {
    content:{
      title: "How To Add Comment System To Your Website (The Simplest Way)",
      content: "It is quite troublesome to build a comment section on my own, it will take some time to design and figure out how to handle data, so i choose to use Disqus, a third party comment system that I saw on lots of websites.  " 
                + '\n' + "This is my first time using it and it's not very straight forward since there is no official doc on how to implement it with React. Fortunately, I found a package [disqus-react](https://github.com/disqus/disqus-react) that makes my life a lot easier. I just need to change a few configuration variables and it works!   "
                + '\n' + "```javascript"
                + '\n' + "import Disqus from 'disqus-react';"
                + '\n' + "render() {"
                + '\n' + "  const disqusShortname = 'yourDisqusShortName';"
                + '\n' + "  const disqusConfig = {  "
                + '\n' + "    url: `https://qiweiy.me/blogs/view/${this.props.match.params.id}`,"
                + '\n' + "    identifier: uniqueIdOfThisPage,"
                + '\n' + "    title: title,"
                + '\n' + "  };"
                + '\n' + "  return ("
                + '\n' + "    <div>  "
                + '\n' + "      <Disqus.CommentCount shortname={disqusShortname} config={disqusConfig}>"
                + '\n' + "      </Disqus.CommentCount>"
                + '\n' + "      <Disqus.DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />  "
                + '\n' + "    </div>"
                + '\n' + "  )"
                + '\n' + "}"
                + '\n' + "```"
              ,
      author: "Qiwei",
      image: "https://images.unsplash.com/photo-1483546416237-76fd26bbcdd1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80",
    },
    noteId: "add-comments",
    createdAt: Date.parse('May 15, 2019, 00:00:07'),
  },
];