"use client";

import * as React from "react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from "@/components/ui/select";

import { FaPhoneAlt, FaEnvelope, FaMapMarkedAlt } from "react-icons/fa";

type Info = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

const info: Info[] = [
  {
    icon: <FaPhoneAlt />,
    title: "Phone",
    description: "+55 (55) 99226-0711",
  },
  {
    icon: <FaEnvelope />,
    title: "Email",
    description: "jonathan2500@outlook.pt",
  },
  {
    icon: <FaMapMarkedAlt />,
    title: "Address",
    description: "Monsenhor Vera 170, Rivera",
  },
];

const Contact = () => {
  const [service, setService] = React.useState("");

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { delay: 0.5, duration: 0.4, ease: "easeIn" },
      }}
      className="py-10"
    >
      <div className="container mx-auto">
        <div className="flex flex-col xl:flex-row gap-[30px]">

          {/* FORM */}
          <div className="xl:w-[70%] order-2 xl:order-none">
            <form className="flex flex-col gap-6 p-8 bg-[#27272c] rounded-xl shadow-lg">

              <h3 className="text-4xl text-accent font-semibold">
                Let&apos;s Work Together
              </h3>

              <p className="text-white/60">
                Fill in the form to start a conversation
              </p>

              {/* INPUTS */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input type="text" placeholder="First Name" />
                <Input type="text" placeholder="Last Name" />
                <Input type="email" placeholder="Email" />
                <Input type="tel" placeholder="Phone Number" />
              </div>

              {/* SELECT */}
          <Select value={service} onValueChange={setService}>
  <SelectTrigger>
    <SelectValue placeholder="Select a service" />
  </SelectTrigger>

  <SelectContent>
    <SelectGroup> {/* ✅ obrigatório */}
      <SelectLabel>Select a service</SelectLabel>

      <SelectItem value="web-dev">
        Web Development
      </SelectItem>

      <SelectItem value="ui-ux">
        UI/UX Design
      </SelectItem>

      <SelectItem value="logo">
        Logo Design
      </SelectItem>
    </SelectGroup>
  </SelectContent>
</Select>
              {/* TEXTAREA */}
              <Textarea
                className="h-[180px]"
                placeholder="Type your message here."
              />

              {/* BUTTON */}
              <Button className="max-w-[160px]">
                Send message
              </Button>
            </form>
          </div>

          {/* INFO */}
          <div className="flex-1 flex items-center xl:justify-end order-1 xl:order-none mb-8 xl:mb-0">
            <ul className="flex flex-col gap-8">

              {info.map((item, index) => (
                <li key={index} className="flex items-center gap-6">

                  <div className="w-[60px] h-[60px] bg-[#27272c] text-accent rounded-md flex items-center justify-center">
                    <div className="text-[24px]">
                      {item.icon}
                    </div>
                  </div>

                  <div>
                    <p className="text-white/60 text-sm">
                      {item.title}
                    </p>

                    <h3 className="text-lg">
                      {item.description}
                    </h3>
                  </div>

                </li>
              ))}

            </ul>
          </div>

        </div>
      </div>
    </motion.section>
  );
};

export default Contact;