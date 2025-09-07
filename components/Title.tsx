import {
  Luckiest_Guy,
  Saira_Condensed,
  Rubik_80s_Fade,
} from "next/font/google";

// const luckiestGuy = Luckiest_Guy({
//   subsets: ["latin"],
//   weight: "400",
// });
const saira = Saira_Condensed({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "900"],
});
const rubik = Rubik_80s_Fade({
  subsets: ["latin"],
  weight: ["400"],
});

const Title = ({ title, styles }: { title: string; styles: string }) => {
  return (
    <h1
      className={
        title === "MUSIC APP"
          ? rubik.className + styles
          : saira.className + styles
      }
    >
      {title}
    </h1>
  );
};

export default Title;
