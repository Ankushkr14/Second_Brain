import { useEffect, useRef, useState } from 'react';

declare global {
    interface Window {
        twttr: any;
    }
}

export const TwitterEmbed = ({ link }: { link: string }) => {
    const [isLoading, setIsLoading] = useState(true);
    const tweetContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!window.twttr?.widgets?.load) {
            return;
        }
        const observer = new MutationObserver(() => {
            if (tweetContainerRef.current?.querySelector('iframe')) {
                setIsLoading(false); 
                observer.disconnect(); 
            }
        });

        if (tweetContainerRef.current) {
            observer.observe(tweetContainerRef.current, { childList: true });
        }

        window.twttr.widgets.load();

        return () => {
            observer.disconnect();
        };

    }, [link]);

    return (
        <div className="w-full min-h-[100px]">
            {/*Show a placeholder while loading */}
            {isLoading && (
                <div className="w-full h-32 flex items-center justify-center text-gray-400 text-sm">
                    Loading Tweet...
                </div>
            )}

            {/* The tweet is hidden until the observer confirms it has loaded */}
            <div ref={tweetContainerRef} className={isLoading ? 'hidden' : 'block'}>
                <blockquote className="twitter-tweet">
                    <a href={link.replace("x.com", "twitter.com")}></a>
                </blockquote>
            </div>
        </div>
    );
};