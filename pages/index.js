import { clientConfig } from '@/lib/server/config'
import Script from 'next/script'
import Container from '@/components/Container'
import BlogPost from '@/components/BlogPost'
import Pagination from '@/components/Pagination'
import { getAllPosts } from '@/lib/notion'
import { useConfig } from '@/lib/config'

export async function getStaticProps () {
  const posts = await getAllPosts({ includePages: false })
  const postsToShow = posts.slice(0, clientConfig.postsPerPage)
  const totalPosts = posts.length
  const showNext = totalPosts > clientConfig.postsPerPage
  return {
    props: {
      page: 1, // current page is 1
      postsToShow,
      showNext
    },
    revalidate: 1
  }
}

export default function Blog ({ postsToShow, page, showNext }) {
  const { title, description } = useConfig()

  return (
    <Container title={title} description={description}>
      {postsToShow.map(post => (
        <BlogPost key={post.id} post={post} />
      ))}
      {showNext && <Pagination page={page} showNext={showNext} />}
  {/* Iklan */}
    <div style={{ marginTop: '2rem', textAlign: 'center' }}>
      <div id="ad-container" />
      <Script id="ads-script" strategy="afterInteractive">
        {`
          atOptions = {
            'key' : 'b58e4c3930f31cf14828b39200130126',
            'format' : 'iframe',
            'height' : 300,
            'width' : 160,
            'params' : {}
          };
          (function() {
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = '//www.highperformanceformat.com/b58e4c3930f31cf14828b39200130126/invoke.js';
            document.getElementById('ad-container').appendChild(script);
          })();
        `}
      </Script>
    </div>
    </Container>
  )
}
