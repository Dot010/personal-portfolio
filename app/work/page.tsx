"use client";
import "swiper/css";
import "swiper/css/bundle";
import { motion } from "framer-motion";
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { BsArrowUpRight, BsGithub } from "react-icons/bs";  
import {  
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import Link from "next/link";
import Image from "next/image";  
import WorkSliderBtns from "@/components/common/WorkSliderBtns";
import { projects } from "@/data/projects";

const Work = () => {
  const [project, setProject] = useState(projects[0]);
  const swiperRef = useRef<SwiperType | null>(null);

  const handleSlideChange = (swiper: { activeIndex: number }) => {
    setProject(projects[swiper.activeIndex]);
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 2.4, duration: 0.4, ease: "easeIn" } }}
      className="flex flex-col md:justify-center py-12 xl:px-0"
    >
      <div className="container mx-auto">
        <div className="flex flex-col-reverse xl:flex-row gap-8">


          <div className="order-1 xl:order-none w-full xl:w-1/2 flex flex-col gap-8">
            <div className="text-8xl leading-none font-extrabold text-transparent text-outline">
              {project.num}
            </div>
            <h2 className="text-[42px] font-bold leading-none text-white group-hover:text-accent transition-all duration-500 capitalize">
              {project.category} project
            </h2>
            <p className="text-white/60">{project.description}</p>

      
            <ul className="flex flex-wrap gap-2">
              {project.stack.map((item, index) => (
                <li key={index} className="text-xl text-accent">
                  {item.name}{index !== project.stack.length - 1 && ","}
                </li>
              ))}
            </ul>

            <div className="border border-white/20" />

      
            <div className="flex items-center gap-4">
              <Link href={project.live}>
                <TooltipProvider delayDuration={100}>
                  <Tooltip>
                    <TooltipTrigger className="w-[70px] h-[70px] rounded-full bg-white/5 flex justify-center items-center group">
                      <BsArrowUpRight className="text-white text-3xl group-hover:text-accent" />
                    </TooltipTrigger>
                    <TooltipContent><p>Live project</p></TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Link>

              {project.github && (
                <Link href={project.github}>
                  <TooltipProvider delayDuration={100}>
                    <Tooltip>
                      <TooltipTrigger className="w-[70px] h-[70px] rounded-full bg-white/5 flex justify-center items-center group">
                        <BsGithub className="text-white text-3xl group-hover:text-accent" />
                      </TooltipTrigger>
                      <TooltipContent><p>Github Repository</p></TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Link>
              )}
            </div>
          </div>

          {/* Swiper do projeto */}
          <div className="order-2 xl:order-none w-full xl:w-1/2 relative">
            <Swiper
              spaceBetween={30}
              slidesPerView={1}
              className="w-full h-auto mb-6"
              onSlideChange={handleSlideChange}
              onSwiper={(swiper) => (swiperRef.current = swiper)}
            >
              {projects.map((proj, index) => (
                <SwiperSlide key={index} className="w-full">
                  <div className="relative w-full h-[350px] sm:h-[400px] md:h-[460px] flex justify-center items-center rounded-2xl overflow-hidden bg-[#151518] p-3 border border-white/10 shadow-xl">

                 
                    <div className="relative w-full h-full flex items-center justify-center">
                      <Image
                        src={proj.image}
                        fill
                        className="object-contain rounded-lg"
                        alt={proj.title}
                        quality={100}
                      />
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

       
            <div className="absolute inset-0 flex justify-between items-center px-4 top-1/2 transform -translate-y-1/2 z-20 xl:static xl:mt-4 xl:justify-center">
              <WorkSliderBtns
                containerStyles="flex w-full justify-between xl:justify-center xl:gap-4"
                btnStyles="bg-accent hover:bg-accent-hover text-primary w-[44px] h-[44px] flex justify-center items-center"
                iconStyles=""
                onPrev={() => swiperRef.current?.slidePrev()}
                onNext={() => swiperRef.current?.slideNext()}
              />
            </div>
          </div>

        </div>
      </div>
    </motion.section>
  );
};

export default Work;