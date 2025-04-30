import VerticalText from "@/components/decorative/VerticalText";
import useTailwindThemes from "@/hooks/useTailwindThemes";
import { useTheme } from "@/theme/ThemeContext";
import classNames from "classnames";

const Accents = () => {
  const { text } = useTailwindThemes();
  return (
    <div className='absolute bottom-0 translate-y-[-50%] left-10  '>
      <VerticalText text='2025.02.07' className={classNames('text-xs font-bold opacity-80', text)} />
    </div>
  )
}

export default Accents;