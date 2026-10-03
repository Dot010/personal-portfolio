
"use client";

import { motion } from "framer-motion"
import Image from "next/image"

const Photo = () => {
    return (
     
    <div className="w-full h-full relative">
            <motion.div initial={{ opacity: 0 }}
                animate={{
                opacity: 1,
                    transition:
                    {
                        delay: 2,
                        duration: 0.4,
                        ease: "easeIn"
                    }
         }}>
                <motion.div
                    initial={{ opacity: 0 }}
                animate={{
                opacity: 1,
                    transition:
                    {
                        delay: 2.4,
                        duration: 0.4,
                        ease: "easeInOut"
                    }
                    }}
                    
                    className="absolute w-74.5 aspect-square xl:w-120 mix-blend-lighten rounded-full overflow-hidden">
                    <Image
                        src="/assets/CvPhoto.png"
                        priority quality={100}
                        fill
                        alt=""
                        className="object-cover  brightness-85"
                         style={{ objectPosition: "30% 0%", transform: "translateY(-10%)" }}    
                    
                    />
     <div
  className="absolute inset-0 rounded-full"
  style={{
    background: "radial-gradient(circle, transparent 30%, rgba(0,0,0,0.4) 55%, rgba(0,0,0,0.85) 70%, #1a1a1a 100%)"
  }}
/>
                                 
            </motion.div>
            
                <motion.svg
                    className="w-75 xl:w-126.5 h-75 xl:h-126.5"
                    fill="transparent"
                    viewBox="0 0 506 506"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <motion.circle
                        cx="253"
                        cy="253"
                        r="250"
                        stroke="#009ddd"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ strokeDasharray: "24 10 0 0" }}
                        animate={{
                            strokeDasharray: ["15 120 25 25", "16 25 92 72", "4 250 22 22"],
                            rotate: [120, 360 ]
                        }}
                        transition={{
                            duration: 20,
                            repeat: Infinity,
                            repeatType: "reverse",
                        }}

                    
                    
                    />
                        
                </motion.svg>
        </motion.div>    
    </div>
    )
}

export default Photo