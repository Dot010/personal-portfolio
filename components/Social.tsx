import Link from "next/link";

import { FaGithub, FaLinkedin, FaInstagram, FaYoutube, FaTwitter } from "react-icons/fa";

const social = [
    { icon: <FaGithub />, path: ""},
    { icon: <FaLinkedin />, path: ""},
    { icon: <FaInstagram />, path: ""},
    { icon: <FaYoutube />, path : ""},
    { icon: <FaTwitter />, path : ""},

]

type SocialProps = {
    containerStyles: string,
    iconStyles: string
};
const Social = ({containerStyles, iconStyles}: SocialProps) => {
    return <div className={containerStyles}>
        {social.map((item, index) => {
            return <Link key={index} href={item.path} className={iconStyles}>
                {item.icon}
            </Link>
        })}

    </div>
  
}

export default Social