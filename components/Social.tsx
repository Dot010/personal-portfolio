import Link from "next/link";

import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

const social = [
    { icon: <FaGithub />, path: "https://github.com/Dot010"},
    { icon: <FaLinkedin />, path: "https://www.linkedin.com/in/jonathan-viana-b23b81186/"},
    { icon: <FaInstagram />, path: "https://www.instagram.com/_jxnathan0/"},

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