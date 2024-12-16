type EmbedPageProps = {
  website: string
  title: string
}

const WebsiteEmbed = ({ website, title }: EmbedPageProps) => {
  return (
    <>
      <div style={{ height: '100vh', overflow: 'hidden' }}>
        <iframe
          src={`${website}`} // Replace with the URL you want to embed
          title={title}
          style={{ border: 'none', width: '100%', height: '100%' }}
          allowFullScreen
        />
      </div>
    </>
  )
}

export default WebsiteEmbed
