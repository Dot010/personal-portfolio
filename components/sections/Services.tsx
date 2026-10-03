"use client";

import { BsArrowDownRight } from "react-icons/bs";
import Link from "next/link";
import { motion } from "framer-motion";
import { services } from "@/data/services";

const Services = () => {
  return (
    <section id="services" className="min-h-[80vh] flex flex-col justify-center py-12 xl:py-0">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1, transition: { duration: 0.6, ease: "easeOut" } }}
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-15"
        >
          {services.map((service, index) => {
            return (
              <div
                key={index}
                className="flex-1 flex flex-col justify-center gap-6 group"
              >
                {/* Top */}
                <div className="w-full flex justify-between items-center">
                  <div
                    className="text-5xl font-extrabold text-outline
                text-transparent transition-all duration-500 "
                  >
                    {String(service.num).padStart(2, "0")}
                  </div>
                  <Link
                    href={service.href}
                    className="w-17.5 h-17.5 rounded-full
                bg-white group-hover:bg-accent transition-all duration-500 flex
                justify-center items-center hover:-rotate-45 "
                  >
                    <BsArrowDownRight className="text-primary text-3xl" />
                  </Link>
                </div>
                {/* {Title} */}
                <h2
                  className="text-[42px] font-bold leading-none text-white group-hover:text-accent
              transiton-all duration-500"
                >
                  {service.title}
                </h2>

                {/* {Description} */}
                <p className="text-white/60">{service.description}</p>
                {/* Border */}
                <div className="border-b border-white/20 w-full"></div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
