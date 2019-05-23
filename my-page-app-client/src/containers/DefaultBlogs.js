
export const DefaultBlogs = [
  {
    content:{
      title: "How To Use",
      content: "Please sign in to see more blogs and also post your own blogs.",
      author: "Qiwei",
      image: "https://images.unsplash.com/photo-1549921296-bc643ead1e65?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3401&q=80",
    },
    noteId: "how-to-use",
    createdAt: Date.parse('May 15, 2019 00:00:01'),
  },
  {
    content:{
      title: "How to build a VPN",
      content: "General steps:" 
                + '\n' + "- Buy a VPS(Virtual Private Server) on AWS/Vultr/Azure or other platforms"
                + '\n' + "- Download shadowsocks here: https://shadowsocks.org/en/download/clients.html"
                + '\n' + "- Go to the website you bought VPS, find the console of your VPS and open it"
                + '\n' + "- Command 1: wget ­­no­check­certificate https://raw.githubusercontent.com/teddysun/shadowsocks_install/master/shado wsocks.sh"
                + '\n' + "- Command 2: chmod +x shadowsocks.s"
                + '\n' + "- Command 2: ./shadowsocks.sh 2>&1 | tee shadowsocks.log"
                + '\n' + "- Take note of the information on the console output"
                + '\n' + "- Open shadowsocks and add new server with information you get in previous step"
                ,
      author: "Qiwei",
      image: "https://images.unsplash.com/photo-1480160734175-e2209654433c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1400&q=80",
    },
    noteId: "how-to-build-a-vpn",
    createdAt: Date.parse('May 15, 2019, 00:00:02'),
  },
  {
    content:{
      title: "What Is My Fav Color",
      content: "#6fcff1"
                + '\n' + "Google it and you will find the color"
                ,
      author: "Qiwei",
      image: "zima",
    },
    noteId: "fav-color",
    createdAt: Date.parse('May 15, 2019, 00:00:03'),
  }, 
  {
    content:{
      title: "How to learn cloud computing",
      content: "Serverless framework: https://serverless.com/"
                + '\n' + "AWS guide: https://serverless.com/framework/docs/providers/aws/guide/"
                + '\n' + "Example: https://github.com/serverless/examples/tree/master/aws-node-rest-api-with-dynamodb"
                + '\n' + "Example: https://serverless-stack.com/#table-of-contents"
                + '\n' + "Microsoft Azure: https://azure.microsoft.com/en-au/"
                + '\n' + "Google cloud: https://cloud.google.com/",
      author: "Qiwei",
      image: "https://images.unsplash.com/photo-1536250853075-e8504ee040b9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80",
    },
    noteId: "cloud-computing",
    createdAt: Date.parse('May 15, 2019, 00:00:04'),
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