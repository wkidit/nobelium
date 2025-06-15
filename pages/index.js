import { clientConfig } from '@/lib/server/config'
import Container from '@/components/Container'
import BlogPost from '@/components/BlogPost'
import Pagination from '@/components/Pagination'
import { getAllPosts } from '@/lib/notion'
import { useConfig } from '@/lib/config'
import { useEffect } from 'react'

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
  useEffect(() => {
  const script = document.createElement('script')
  script.src = '//www.highperformanceformat.com/b58e4c3930f31cf14828b39200130126/invoke.js'
  script.type = 'text/javascript'
  script.async = true
  document.getElementById('ad-container')?.appendChild(script)
}, [])

  return (
    <Container title={title} description={description}>
      {postsToShow.map(post => (
        <BlogPost key={post.id} post={post} />
      ))}
      {showNext && <Pagination page={page} showNext={showNext} />}
  <div id="ad-container" style={{ width: 160, height: 300, margin: '20px auto' }}></div>
    </Container>
  )
}
