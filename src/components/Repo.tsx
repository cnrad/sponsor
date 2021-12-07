import { languages } from "../util/languages";
import { motion } from "framer-motion";
import { Repo } from "../util/types";
import { OcticonRepo, OcticonStar } from "../icons";
import useSWR from "swr";
import { information } from "../info";

export const RepoComponent = (props: any) => {
    const { data: info, error } = useSWR<Repo | null, Record<string, any>>(
        `https://api.github.com/repos/${information.username}/${props.name}`
    );

    if (!info || error)
        return (
            <div className="border-solid border-[1px] border-[#30363d] rounded-md p-4 w-full h-full">Loading...</div>
        );

    return (
        <motion.div {...props}>
            <div className="border-solid border-[1px] border-[#30363d] rounded-md p-4 w-full h-full">
                <div className="flex flex-row items-center justify-start">
                    <OcticonRepo className="mr-2" fill="#c9d1d9" />
                    <a
                        className="text-[#c9d1d9] font-semibold text-sm"
                        href={`https://github.com/${info.owner.login}/${info.name}`}
                    >
                        {info.owner.login}/{info.name}
                    </a>
                </div>

                <p className="text-[#8b949e] text-[12px] my-1">{info.description}</p>

                <div className="flex flex-row mt-[6px]">
                    <span className="mr-4 flex flex-row items-center justify-start">
                        <div
                            className="mr-1 rounded-full"
                            style={{
                                backgroundColor: languages[info.language].color ?? "#000",
                                border: "solid 1px rgba(240, 246, 252, 0.2)",
                                width: "12px",
                                height: "12px",
                            }}
                        />
                        <p className="text-[#c9d1d9] text-[12px]">{info.language}</p>
                    </span>
                    <motion.a
                        href={info.stargazers_url}
                        className="text-[12px] flex flex-row items-center justify-start"
                        style={{ color: "#8b949e", textDecoration: "none" }}
                        whileHover={{ color: "#58a6ff", textDecoration: "none" }}
                        transition={{ duration: 0 }}
                    >
                        <OcticonStar fill={"currentColor"} className="mr-1" />
                        {info.stargazers_count}
                    </motion.a>
                </div>
            </div>
        </motion.div>
    );
};
