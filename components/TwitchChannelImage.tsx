import Image from 'next/image';

export interface TwitchChannelImageProps {
    channel: string;
    forBroadcast?: boolean;
}

export default function TwitchChannelImage(props: TwitchChannelImageProps) {
    const { pictureUri, twitchLink } = getChannelData(props.channel);
    const size = props.forBroadcast ? 'h-20 w-20' : 'h-10 w-10';
    const sizePx = props.forBroadcast ? 80 : 40;
    return (
        <div className={'relative ' + size}>
            <a href={twitchLink}>
                <Image
                    layout="fill"
                    alt={`Profile picture for ${props.channel}`}
                    src={pictureUri}
                />
                {!props.forBroadcast && (
                    <div className="absolute h-3 w-3 bottom-0 left-0">
                        <Image alt="The twitch logo" layout="fill" src="/TwitchGlitchPurple.svg" />
                    </div>
                )}
            </a>
        </div>
    );
}

function getChannelData(channel: string) {
    switch (channel) {
        case 'Bingothon':
            return {
                pictureUri: '/bingothon.png',
                twitchLink: 'https://twitch.tv/bingothon',
            };
        case 'SAESR_Events':
            return {
                pictureUri: '/saesr.jpg',
                twitchLink: 'https://twitch.tv/saesr_events',
            };
        case 'SonicSpeedrunCommunity':
            return {
                pictureUri: '/ssc.jpg',
                twitchLink: 'https://twitch.tv/sonicspeedruncommunity',
            };
    }
}
