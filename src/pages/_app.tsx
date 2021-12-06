import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SWRConfig } from "swr";
import Head from "next/head";
import { information } from "../info";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <title>Sponsor @{information.username} on GitHub</title>
                <link rel="icon" type="image/png" href="/favicon.png" />
                <meta
                    name="description"
                    content={`Sponsor ${information.username} on an easier alternative to GitHub Sponsors.`}
                />
                <meta name="theme-color" content="#ffffff" />
                <meta name="image" content="/favicon.png" />
            </Head>

            <SWRConfig
                value={{
                    fetcher: async (url: string) => await fetch(url).then(res => res.json()),
                }}
            >
                <Component {...pageProps} />
            </SWRConfig>
        </>
    );
}

export default MyApp;
