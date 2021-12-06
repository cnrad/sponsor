import type { NextPage } from "next";
import { motion } from "framer-motion";
import { information } from "../info";
import { Location } from "../icons";
import { RepoComponent } from "../components/Repo";
import { useRef, useState } from "react";
import { User } from "../util/types";
import useSWR from "swr";

const Home: NextPage = () => {
    const [amountFocused, setAmountFocused] = useState(false);
    const paymentAmount = useRef<string>("1");

    const { data: fetchedUserInfo, error } = useSWR<User, Record<string, any>>(
        `https://api.github.com/users/${information.username}`
    );

    const isLoading = !error && !fetchedUserInfo;

    if (isLoading)
        return (
            <div className="w-[24rem] md:w-[36rem] h-auto flex flex-col items-center justify-center">
                <h3 className="mt-20 text-2xl text-[#c9d1d9] font-medium mb-10 text-center">Loading....</h3>
            </div>
        );

    if (fetchedUserInfo && !error)
        return (
            <div className="w-[25rem] md:w-[36rem] h-auto flex flex-col items-center justify-center">
                <h3 className="mt-20 text-2xl text-[#c9d1d9] font-medium mb-10 text-center">
                    Become a Sponsor to{" "}
                    <a className="font-semibold" href={`https://github.com/${fetchedUserInfo.login}`}>
                        {fetchedUserInfo.name}
                    </a>
                </h3>

                <motion.div className="flex flex-row items-start justify-center">
                    <img width={80} className="rounded-full" src={fetchedUserInfo.avatar_url} />
                    <div className="flex flex-col items-start justify-center ml-5">
                        <motion.a
                            className="text-xl font-semibold"
                            style={{ color: "#c9d1d9" }}
                            whileHover={{ color: "#58a6ff", cursor: "pointer", textDecoration: "none" }}
                            transition={{ duration: 0 }}
                            href={`https://github.com/${information.username}`}
                        >
                            {fetchedUserInfo.name}
                        </motion.a>
                        <p className="mt-1 text-sm text-[#8b949e]">{fetchedUserInfo.login}</p>
                        <p className="mt-1 text-sm flex flex-row">
                            <Location fill="#8b949e" style={{ marginTop: "4px" }} />
                            <a
                                href={`https://www.google.com/maps/search/?api=1&query=${fetchedUserInfo.location}`}
                                className="ml-1 text-[#58a6ff]"
                            >
                                {fetchedUserInfo.location}
                            </a>
                        </p>
                    </div>
                </motion.div>

                <motion.pre className="mt-6 text-[1rem] leading-[1.5] text-[#c9d1d9] w-full whitespace-pre-wrap font-default">
                    {information.description}
                </motion.pre>

                <motion.div className="flex flex-row mt-4">
                    <motion.div
                        className="text-[#8b949e] border-solid border-[1px] rounded-md px-3 py-1 mr-2"
                        style={{ borderColor: amountFocused ? "#58a6ff" : "#30363d" }}
                        transition={{ duration: 0.05 }}
                    >
                        $
                        <input
                            type="number"
                            min={1}
                            placeholder="5"
                            className="ml-1 w-[4rem] h-[2rem] bg-transparent text-white outline-none"
                            onFocus={() => setAmountFocused(true)}
                            onBlur={() => setAmountFocused(false)}
                            onChange={(e: { target: HTMLInputElement }) => (paymentAmount.current = e.target.value)}
                        />
                    </motion.div>
                    <motion.button
                        className="text-[#c9d1d9] px-4 py-1 text-md rounded-md"
                        style={{ backgroundColor: "#21262d", border: "solid 1px rgba(240, 246, 252, 0.2)" }}
                        whileHover={{ backgroundColor: "#30363d", border: "solid 1px #8b949e" }}
                        whileTap={{ backgroundColor: "hsl(212, 12%, 18%, 1)", border: "solid 1px #6e7681" }}
                        transition={{ duration: 0.15 }}
                        onClick={() =>
                            window.open(
                                information.amount_slug
                                    ? `${information.payment_url}/${paymentAmount.current}`
                                    : information.payment_url,
                                "_self"
                            )
                        }
                    >
                        Donate
                    </motion.button>
                </motion.div>

                <motion.div className="mt-10 mb-16 w-full">
                    <h3 className="text-xl text-[#8b949e] font-thin mb-4 text-center md:text-left">Featured Work</h3>
                    <div className="w-full h-auto grid grid-flow-row grid-cols-1 md:grid-cols-2 gap-4 auto-rows-fr">
                        {information.featuredRepos.map((repoName: string) => (
                            <RepoComponent key={repoName} name={repoName} />
                        ))}
                    </div>
                </motion.div>

                <p className="text-[#8b949e] text-sm mb-12">
                    Psst... this project is{" "}
                    <a className="no-underline text-[#e35454]" href="https://github.com/cnrad/sponsor">
                        open source
                    </a>
                    !
                </p>
            </div>
        );

    return (
        <div className="w-[25rem] md:w-[36rem] h-auto flex flex-col items-center justify-center">
            <h3 className="mt-20 text-2xl text-[#c9d1d9] font-medium mb-10 text-center">Loading....</h3>
        </div>
    );
};

export default Home;
