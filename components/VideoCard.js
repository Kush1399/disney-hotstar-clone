const VideoCard = ({ thumbnail }) => {
    return <img className="video-card" src={thumbnail.url} alt={thumbnail.title} />
}

export default VideoCard