import VideoCard from './VideoCard'

const Section = ({ genre, videos }) => {
    return (
        <div className="section">
            <h3>{genre}</h3>
            <div>
                {videos.map(video => (
                    <a key={video.id} href={`/video/${video.slug}`}>
                        <VideoCard thumbnail={video.thumbnail} />
                    </a>
                ))}
            </div>
        </div>
    )
}

export default Section