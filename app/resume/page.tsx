"use client";

import { info } from "console";
import { title } from "process";
import {
  FaHtml5,
  FaCss3,
  FaJs,
  FaReact,
  FaFigma,
  FaNodeJs,
}
  from "react-icons/fa";
  
import { SiTailwindcss, SiNextdotjs } from "react-icons/si";

// about

type About = {
  title: string;
  description: string;
  info: {
    fieldName: string;
    fieldvalue: string;
  }[];
}
const about : About = {
  title: "About me",
  description:"I am a beginner Full Stack developer, currently studying at EBAC, focused on Python for back-end development and JavaScript/React for front-end. I am building practical projects to strengthen my skills and gain hands-on experience.",
  info: [
    {
      fieldName: "Name",
      fieldvalue: "Jonathan Carvalho",
    },
     {
      fieldName: "Phone",
      fieldvalue: "(+55) 55 99226-0711",
    },
      {
      fieldName: "E-mail",
      fieldvalue: "jonathan2500@outlook.pt",
    },
       {
      fieldName: "Freelance",
      fieldvalue: "Available",
    },
        {
      fieldName: "Languages",
      fieldvalue: "Portuguese, English, Spanish",
    } 
  ]
}
type Education = {
  icon: string;
  title: string;
  description: string;
  items: {
    institution: string;
    course: string;
    duration: string;
  }[];
}
const education: Education = {
  icon: "/assets/education.svg",
  title: "My Education",
  description: "I am a beginner Full Stack developer, currently studying at EBAC, focused on Python for back-end development and JavaScript/React for front-end. I am building practical projects to strengthen my skills and gain hands-on experience.",
  items: [
    {
      institution: "EBAC - Escola Britânica de Artes e Tecnologia",
      course: "Dev Full Stack Python",
      duration: "2024 - Present",
    },
    {
      institution: "IFSUL - Instituto Federal de Educação, Ciência e Tecnologia.",
      course: "Informática para Internet",
      duration: "2014 - 2017",
    },
    {
      institution: "Universidade Federal do Pampa",
      course: "Administração",
      duration: "2021 - Present",
    },
  ],
  
};

type Goals = {
  title: string;
  description: string;
  items: {
    goal: string;
    deadline: string;
    status: string;
  }[]
}
const goals : Goals = {
  title: "My Goals",
  description: "My short and long terms goals as a developer.",
  items: [
    {
      goal: "Get my first job as a Full Stack developer.", deadline: "2026", status: "Planned",

    },
      {
      goal: "Master my skills in Front and Back-End.", deadline: "2026", status: "In Progress",

    },
        {
      goal: "Contribute to an open source project.", deadline: "2026",  status: "Planned",

    },
          {
      goal: "Work remotely for an international company.", deadline: "2026", status: "Planned",

    }
      
  ]
}

type Skills = {
  title: string;
  description: string;
  skillList: {
    icon: string;
    name: string;
  }[];
} 
const skills = {
  title: "My Skills",
  description: "Here are some of my skills that I have acquired in the past and that I am currently learning to improve.",
  skillList: [
    {
      icon: <FaHtml5 />,
      name: "html 5",
    },
    {
      icon: <FaCss3 />,
      name: "css 3",
    },
    {
      icon: <FaJs />,
      name: "javascript",
    },
    {
      icon: <FaReact />,
      name: "react.js",
    },
    {
      icon: <SiTailwindcss />,
      name: "tailwind.css",
    },
    {
      icon: <FaNodeJs/>,
      name: "node.js",
    },
    {
      icon: <FaFigma />,
      name: "figma",
    }
  ]
}
 
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";

import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";
import { li } from "framer-motion/client";

const Resume = () => {
  return <motion.div initial={{ opacity: 0 }} animate={{
    opacity: 1, transition: {
      delay: 2.4,
      duration: 0.4,
    ease: "easeIn"
    }
  }}
    className="min-h-[80vh] flex items-center justify-center py-12 xl:py-0"
  >
      <div className="container mx-auto">
        <Tabs
          defaultValue="education"
          className="flex flex-col xl:flex-row gap-[60px]"
        >
        <TabsList className="flex flex-col w-full max-w-[380px] mx-auto xl:mx-0 gap-6">
          <TabsTrigger value={"goals"}>Goals</TabsTrigger>
            <TabsTrigger value={"education"}>Education</TabsTrigger>
            <TabsTrigger value={"skills"}>Skills</TabsTrigger>
            <TabsTrigger value={"about"}>About me</TabsTrigger>
          </TabsList>

        {/* Content */}
        <div className="min-h-[70vh] w-full">
          
        {/* Goals */}
            <TabsContent value="goals" className="w-full">
              <div className="flex flex-col gap-[30px] text-center xl:text-left">
              <h3 className="text-4xl font-bold">{goals.title} </h3>
              <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0">{goals.description}</p>
              <ScrollArea className="h-[400px]">
                <ul className="grid grid-cols-1 lg:grid-cols-2 gap-[30px]">
                  {goals.items.map((item, index) => {
                    return (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="bg-[#232329] h-[184px] py-6
                    px-10 rounded-xl flex flex-col justify-center items-center
                    lg:items-start gap-3"
                      >
                        <span className="text-accent text-2xl">🎯</span>
                      <h3 className="text-xl font-bold">{item.goal}</h3>
                        <span className={`text-sm px-3 py-1 rounded-full border ${
                          item.status === "In Progress"
                            ? "text-accent border-accent/30"
                            : "text-white/40 border-white/10"}`}>
                          {item.status} - {item.deadline}
                        </span>
                      
                    </motion.li>
                  )
                  })}
                </ul>
              </ScrollArea>
              </div>
          </TabsContent>

            {/* Education */}
            <TabsContent value="education" className="w-full">
              <div className="flex flex-col gap-[30px] text-center xl:text-left">
                <h3 className="text-4xl font-bold">{education.title} </h3>
                <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0">
                  {education.description}
              </p>
              <ScrollArea className="h-[400px]">
                <ul className="grid grid-cols-1 lg:grid-cols-2 gap-[30px]">
                  {education.items.map((item, index) => {
                    return (
                      <motion.li
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        key={index}
                        className="bg-[#232329] h-[184px] py-6
                    px-10 rounded-xl flex flex-col justify-center items-center
                    lg:items-start gap-1"
                      >
                        <span className="text-accent">{item.duration}</span>
                        <h1 className="text-xl max-w-[260px] min-h-[60px] text-center lg:text-left">
                          {item.institution}
                        </h1>
                        {/* Dot */}
                        <div className="flex items-center gap-3">
                          <span className="w-[6px] h-[6px] rounded-full bg-accent"></span>  
                      <p className="text-white/60">{item.course}</p>
                        </div>
                    </motion.li>
                  )
                  })}
                </ul>
              </ScrollArea>
              </div>
          </TabsContent>
          
            {/* Skills */}
          <TabsContent value="skills" className="w-full h-full">
            <div className="flex flex-col gap-[30px]">
              <div className="flex flex-col gap-[30px] text-center xl:text-left">
                <h3 className="text-4xl font-bold">{skills.title}</h3>
                <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0">{skills.description}</p>
              </div>
              <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 xl:gap-[30px]">
                {skills.skillList.map((skill, index) => {
                  return(
                    <motion.li key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}>
                      <TooltipProvider delayDuration={100}> 
                        <Tooltip>
                          <TooltipTrigger className="w-full h-[150px] bg-[#232329] rounded-xl flex 
                          justify-center items-center group"> 
                            <div className="text-6xl group-hover:text-accent transition-all duration-300">
                              {skill.icon}</div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="capitalize">{skill.name}</p>
                          </TooltipContent>                        
                      </Tooltip> 
                      </TooltipProvider>
                      </motion.li>
                  )
                })}
              </ul>
            </div>
          </TabsContent>
          
            {/* About */}
          <TabsContent
            value="about"
            className="w-full text-center xl:text-left"
          >
            <div className="flex flex-col gap-[30px]">
              <h3 className="text-4xl font-bold">{about.title}</h3>
              <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0">{about.description}</p>
              <ul className="grid grid-cols-1  gap-4 max-w-[620px] mx-auto xl:mx-0">
                {about.info.map((item, index) => {
                  return (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex items-center justify-center xl:justify-start gap-4">
                      <span className="text-white/60 min-w-[120px]">{item.fieldName }</span>
                      <span className="text-xl">{item.fieldvalue}</span>
                    </motion.li>

                  )
                })}

              </ul>
              </div>
            </TabsContent>


          </div>

          </Tabs>  
    </div>
    </motion.div>
    
  }

  export default Resume