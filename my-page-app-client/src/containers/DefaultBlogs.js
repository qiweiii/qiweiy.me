/* eslint-disable no-template-curly-in-string */
/* eslint-disable no-useless-concat */
// eslint-disable-next-line no-useless-concat
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
      content: "## General steps:"
      +"\n"+ "* Buy a VPS(Virtual Private Server) on AWS/Vultr/Azure or other platforms"
      +"\n"+ "* Go to your VPS website, find the console of the VPS you just bought and open it"    
      +"\n"+ "* Enter the following comments"    
      +"\n"+ "  1. `wget ­­no­check­certificate https://raw.githubusercontent.com/teddysun/shadowsocks_install/master/shadowsocks.sh`"
      +"\n"+ "  2. `chmod +x shadowsocks.s`"
      +"\n"+ "  3. `./shadowsocks.sh 2>&1 | tee shadowsocks.log`"
      +"\n"+ "* Take note of the information on the console output"
      +"\n"+ "* Download shadowsocks here: [Shadowsocks](https://shadowsocks.org/en/download/clients.html)"
      +"\n"+ "* Open shadowsocks and add new server with information you get in previous step",
      author: "Qiwei",
      image: "https://images.unsplash.com/photo-1480160734175-e2209654433c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1400&q=80",
    },
    noteId: "how-to-build-a-vpn",
    createdAt: Date.parse('May 15, 2019, 00:00:03'),
  },
  {
    content:{
      title: "What Is My Fav Color",
      content: "`#6fcff1`"
                + "\n" + "Google it and you will find the color"
                ,
      author: "Qiwei",
      image: "zima",
    },
    noteId: "fav-color",
    createdAt: Date.parse('May 15, 2019, 00:00:04'),
  }, 
  {
    content:{
      title: "Learn Serverless With AWS",
      content: "* Serverless framework: https://serverless.com/"
              + '\n' + "* Serverless guide on AWS: https://serverless.com/framework/docs/providers/aws/guide/"
              + '\n' + "* Serverless tutorial: https://serverless-stack.com/#table-of-contents"
              + '\n' + "* Serverless api example: https://github.com/serverless/examples/tree/master/aws-node-rest-api-with-dynamodb"
              ,
      author: "Qiwei",
      image: "https://images.unsplash.com/photo-1536250853075-e8504ee040b9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80",
    },
    noteId: "cloud-computing",
    createdAt: Date.parse('May 15, 2019, 00:00:02'),
  }, 
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
  {
    content:{
      title: "How To Break Long URLs",
      content: "Sometimes we have long urls, for example, this one: https://longurlmaker.com/go?id=Smallr00sustainedShortURLDigBigxpandedlengthyfz1t4eG8L00highNotLongdprotractedRubyURL383016DigBigelongated2082Redirx1expanded10711l8fG8L7350i15lnkZinYepIt7301URL1Ulimitloftyrangy1f933stretched1U7626protracted0lofty61a1tall0IsZgdStartURL0lengthy2886LiteURLShortURL95lingeringcdeepURLHawk9spreadZoutSmallr5NotLong00SnipURLNe1Shrinkr36MooURLSnipURLr88Metamark10lasting55ganglingb2SnipURL01A2N058TinyLink71SimURL4URLCutter3DecentURLFhURL180224tallrangyoLiteURLSimURL01stretchlengthened410farZreaching1080960Sitelutionsb91SnipURL0emWapURL0enlargedtallf5drawnZout09ShimNotLong8eRubyURL0c0b4019YATUCcprotractedq051bae1URLCutter90elongateelongateShimMetamarklengthened11311kShrinkURLn2z7nd2extensive022ShoterLinkNotLong7SitelutionsStartURLspreadZout6high2e1longish4UrlTea0continued5lengthy084b7m173b4bU760005hfarZoffrangyFly21yl001732GetShortyNanoRefy681Fly27m1tall1RubyURLGetShorty044farZreaching0Doiop7elongate87y7dURLvifloftyrangyURLPieMetamarkSmallrastringyShrinkURLShorl50SimURLwq1vRedirx8URLCutter2highStartURLDwarfurlexpanded0621125NanoRefTraceURL876XZseShortenURLa09a087u8291bdShortenURL4enduring3LiteURLgangling0stretching4689Shrinkr1runningremoteSHurl141v06lengthenedd4ShrinkURL6b0519deep81918s16cShortenURLq7fgangling8elongatedfarawayShrinkraDwarfurl71URLZcoZuk5ShortlinksWapURL5553Smallrdeep8TinyURLFhURL0g1q2ShortenURL5nw39m4601Metamark0Doiop9d13Dwarfurl100h5rextensiveenduring62lengthened72ShortenURL7extensivestringy8690xSitelutions070URLPie0lengthy0toweringLiteURL8tall11remote6stretching1stringyb0cURLcut4expanded7Minilienfaraway4RubyURLURlZ  "
              + '\n' + "Usually, this kind of urls will be one line in html and go outside of the container.  "
              + '\n' + "**How did i make it stays inside?**  "
              + '\n' + "Just need a few lines of css:  "
              + '\n' + "```css"
              + '\n' + ".break-url {"
              + '\n' + "  overflow-wrap: break-word;"
              + '\n' + "  word-break: break-word;"
              + '\n' + "  hyphens: auto;"
              + '\n' + "}"
              + '\n' + "```"
              + '\n' + "(It may not work on all browsers)  "
              + '\n' + "See more details on [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow-wrap)"
              ,
      author: "Qiwei",
      image: "https://images.unsplash.com/photo-1558717738-0b9fbb9b0b21?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80https://images.unsplash.com/photo-1558717738-0b9fbb9b0b21?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80",
    },
    noteId: "break-long-urls",
    createdAt: Date.parse('June 15, 2019, 00:00:00'),
  }, 
  {
    content:{
      title: "微信小程序内嵌网页",
      content: "今天有人问我能不能把网站直接放在微信小程序里，我就想用自己的网站试试，但是发现并不可以，不过还是记录一下。首选登录微信小程序后台，页面左边选择“开发“，然后选择“开发设置” -> “业务域名” -> “开始配置” -> 添加需要访问的网站。添加的“业务域名”必须是https开头，并已经有ICP备案的。 "
              + '\n' + "然后在小程序DevTool里添加一个page文件夹，该wxml文件里面只需要一行code："
              + '\n' + '\n' + "```" 
              + '\n' + "<web-view src=\"https://yoursite.xxx\" />" 
              + '\n' +  "```" 
              + '\n' + '\n' + "***但是*** <web-view>`这个tag只有企业版可以使用，个人版或者海外版小程序账号都无法配置业务域名。因为我的账号是个人版，qiweiy.me也没有ICP备案，所以只能放弃了，唉。"
              ,
      author: "Qiwei",
      image: "https://upload.wikimedia.org/wikipedia/en/thumb/a/af/WeChat_logo.svg/1200px-WeChat_logo.svg.png",
    },
    noteId: "wechat-mini-web-view",
    createdAt: Date.parse('July 19, 2019, 19:00:00'),
  }, 
];