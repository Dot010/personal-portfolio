import { socials } from "@/data/site";

type SocialProps = {
  containerStyles: string;
  iconStyles: string;
};

const Social = ({ containerStyles, iconStyles }: SocialProps) => {
  return (
    <div className={containerStyles}>
      {socials.map(({ label, href, icon: Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className={iconStyles}
        >
          <Icon />
        </a>
      ))}
    </div>
  );
};

export default Social;
