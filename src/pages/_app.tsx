import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SWRConfig } from "swr";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <SWRConfig
            value={{
                refreshInterval: 3000,
                fetcher: async (url: string) => await fetch(url).then(res => res.json()),
            }}
        >
            <Component {...pageProps} />
        </SWRConfig>
    );
}

export default MyApp;
