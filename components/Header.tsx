import Link from "next/link";
import { Button } from "./ui/button";

// Components
import Nav from "./Nav";

const Header = () => {
    
    return (
        
        <header className="py-8 xl:py-12 text-white ">
            <div className="container mx-auto flex justify-between items-center">
                {/* {Logo} */}
                <Link href={"/"}>
                    <h1 className="text-4xl font-semibold">
                        Jonathan<span className="text-accent">.</span>
                    </h1>
                </Link>
                {/* {Desktop Nav & hire me button} */}

                <div className="hidden xl:flex items-center gap-8">
                    <Nav />
                    <Link href={"/contact"}>
                        <Button variant="ghost"> Hire me</Button>
                    </Link>
                </div>
                {/* {Mobile Nav} */}
                <div className="xl:hidden"> mobile nav</div>
            </div>
    </header>
    );
    
};

export default Header