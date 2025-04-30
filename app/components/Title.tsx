import { useTheme } from "@/theme/ThemeContext";

const Title = () => {
  const { theme } = useTheme();
  return <div className="absolute right-[50%] bottom-[60%] translate-y-[50%] translate-x-[50%] mix-blend-difference ">
    <h3 className={`text-black sm:text-[7rem] md:text-[8rem] lg:text-[9rem] leading-[100%] text-center text-[5rem] filter invert font-extrabold uppercase`}>Creative <b /> Developer</h3>
  </div>
}
export default Title;