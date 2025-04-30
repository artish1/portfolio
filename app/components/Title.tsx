import { useToggled } from "@/contexts/ToggledContext";
import { motion } from "framer-motion";

const Title = () => {
  const { toggled } = useToggled();
  return <motion.div
    initial={{ opacity: 0, bottom: '50%' }}
    animate={{ opacity: toggled ? 1 : 0, bottom: toggled ? '60%' : '58%' }}
    transition={{ duration: 0.6, delay: 0.4 }}
    className="absolute right-[50%] bottom-[60%] translate-y-[50%] translate-x-[50%] mix-blend-difference ">
    <p className="text-black filter invert text-center uppercase font-bold text-[1rem]">I AM A</p>
    <h3 className={`text-black sm:text-[7rem] md:text-[8rem] lg:text-[9rem] leading-[100%] text-center text-[5rem] filter invert font-extrabold uppercase`}>Creative <b /> Developer</h3>
    <p className="text-black filter invert text-center uppercase font-bold text-[1rem] mt-5">Making Handcrafted web experiences with design in mind.</p>
  </motion.div>
}
export default Title;