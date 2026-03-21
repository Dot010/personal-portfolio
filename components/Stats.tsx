"use client";

import CountUp from "react-countup";

type Stat = {
  num: number;
  text: string;
};
const stats : Stat[] =
    [
  { num: 3, text: "Year studying programming" },
  { num: 5, text: "Projects completed" },
  { num: 4, text: "Technologies learned" },
{ num: 1, text: "Courses in progress" }
]


    

const Stats = () => {
    return <section className="pt-4 pb-12 xl:pt-0 xl:pb-0">
        <div className="container mx-auto">
            <div className="flex flex-wrap gap-6 max-w-[80vw] mx-auto xl:max-w-none">
                {stats.map((item, index )=> {
                    return (
                        <div
                            className="flex-1 flex gap-4 items-center justify-center xl:justify-start"
                            key={index}>
                            <CountUp
                                end={item.num}
                                duration={5}
                                delay={2}
                                className="text-4xl xl:text-6xl
                        font-extrabold" />
                            <p className={`${item.text.length < 15 ? "max-w-25" : "max-w-37.5"}
                                leading-snug text-white/80`}>
                                {item.text}</p>
                        </div>
                    )
                })}
</div>
        </div>
    </section>
}

export default Stats