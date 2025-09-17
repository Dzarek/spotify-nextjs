import Image from "next/image";

const Footer = () => {
  return (
    <footer className="w-full h-[10vh] xl:h-[6vh] opacity-80 bg-zinc-950 flex items-center justify-between px-2 md:px-10 relative bottom-0 left-0">
      <span className="flex flex-row justify-center items-center">
        <a href="https://www.jarekjanas.com">
          <Image
            src="/logoJarek.png"
            height={20}
            width={20}
            alt="logo Jarosław Janas"
          />
        </a>{" "}
        <p className="md:ml-2">projekt i wykonanie</p>
      </span>
      <p className="text-white text-lg text-right md:text-left">
        Music data from: https://api.deezer.com
      </p>
    </footer>
  );
};

export default Footer;
