const RobotsTxt = () => {}

    export const getServerSideProps = async ({res}) => {

        const robotsTxtDtata = `User-agent: *\nAllow: /`

        res.setHeader('Content-Type', 'text/plain')
        res.write(robotsTxtDtata)
        res.end()

        return {props: {}}
    }

    export default RobotsTxt