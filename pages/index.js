import { gql, GraphQLClient } from 'graphql-request'
import Link from 'next/link'
import Image from 'next/image'
import NavBar from '../components/NavBar'
import Section from '../components/section'
import disneyLogo from '../public/disney-button.png'
import marvelLogo from '../public/marvel-button.png'
import dcLogo from '../public/pixar.png'
import legendaryLogo from '../public/natgeo-button.png'
import wbLogo from '../public/star-wars-button.png'

export const getStaticProps = async () => {
  const url = process.env.ENDPOINT
  const graphQLClient = new GraphQLClient(url, {
    headers: {
      'Authorization': `Bearer ${process.env.GRAPH_CMS_TOKEN}`
    }
  })

  const videosQuery = gql`
  query {
    videos {
      createdAt,
      id,
      title,
      description,
      seen,
      slug,
      tags,
      thumbnail {
        url
      },
      mp4 {
        url
      }
    }
  }`

  const accountQuery = gql`
  query {
    account(where: {id: "ckyy57mdk1qll0b608r866cd9"}) {
      username,
      avatar {
        url
      }
    }
  }`

  const data = await graphQLClient.request(videosQuery)
  const videos = data.videos

  const accountData = await graphQLClient.request(accountQuery)
  const account = accountData.account

  return {
    props: {
      videos,
      account
    }
  }
}



const Home = ({ videos, account }) => {
  const ranVid = () => {
    return videos[Math.floor(Math.random() * videos.length)]
  }

  const filterVideos = (videos, genre) => {
    return videos.filter((video) => video.tags.includes(genre))
  }

  const notSeenVideos = (video) => {
    return videos.filter(video => video.seen == false || video.seen == null)
  }

  return (
    <>
      <NavBar account={account} />
      <div className='app'>
        <div className='intro-video'>
          <img src={ranVid(videos).thumbnail.url} alt={ranVid(videos).title} />
        </div>

        <div className='feed'>
          <Link href="#WB"><div className='franchise' id='WB'>
            <Image src={wbLogo} />
          </div></Link>
          <Link href="#marvel"><div className='franchise' id='marvel'>
            <Image src={marvelLogo} />
          </div></Link>
          <Link href="#dc"><div className='franchise' id='dc'>
            <Image src={dcLogo} />
          </div></Link>
          <Link href="#disney"><div className='franchise' id='disney'>
            <Image src={disneyLogo} />
          </div></Link>
          <Link href="#legendary"><div className='franchise' id='legendary'>
            <Image src={legendaryLogo} />
          </div></Link>
        </div>
        <Section genre={'Recommended for you'} videos={notSeenVideos(videos)} />
        <Section genre={'Action'} videos={filterVideos(videos, 'action')} />
        <Section id='dc' genre={'Adventure'} videos={filterVideos(videos, 'adventure')} />
        <Section id='pixar' genre={'Animation'} videos={filterVideos(videos, 'animation')} />
        <Section id='disney' genre={'Disney'} videos={filterVideos(videos, 'disney')} />
        <Section id='WB' genre={'Drama'} videos={filterVideos(videos, 'drama')} />
        <Section genre={'Family'} videos={filterVideos(videos, 'family')} />
        <Section genre={'Fantasy'} videos={filterVideos(videos, 'fantasy')} />
        <Section genre={'Fiction'} videos={filterVideos(videos, 'fiction')} />
        <Section id='marvel' genre={'Marvel'} videos={filterVideos(videos, 'marvel')} />
        <Section id='legendary' genre={'Sci-Fi'} videos={filterVideos(videos, 'sci-fi')} />

      </div>

    </>
  )
}

export default Home
