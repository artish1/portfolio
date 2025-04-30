import ScrollingText from "@/components/decorative/ScrollingText";
import useTailwindThemes from "@/hooks/useTailwindThemes";
import classNames from "classnames";

const Content = ({ divRef }) => {
  const { text, textAccent, background, backgroundAccent, backgroundLight } = useTailwindThemes();
  return (
    <div
      ref={divRef}
      className={classNames('absolute top-[100vh] z-7 left-[50%] translate-x-[-50%] max-w-5xl w-full h-[2500px] flex items-start justify-center', text)}
    >
      <div className={classNames('max-w-[1000px] mx-8 w-full')}>
        <div id="about">

          <div className={classNames("w-full h-2 ", backgroundAccent)}></div>

          <div className="flex flex-col justify-between w-full">

            <div className="overflow-hidden">

              <ScrollingText reverse>
                <h2 className="uppercase font-extrabold text-[4rem]">About</h2>
              </ScrollingText>
            </div>


            <Maintenance />
            {/* <p className="text-[1rem]
            ">Mark Artishuk is a fullstack developer with a passion for crafting thoughtful, user-centered experiences. I'm also a drummer with a lifelong connection to music, which has shaped how I approach rhythm, flow, and creativity in both design and development
              <br />
              <br />
              Beyond engineering, I’m deeply interested in UI/UX design and enjoy exploring how form meets function to create seamless digital experiences.
            </p> */}

          </div>
        </div>

        <div id="projects" className="mt-[5rem]">
          <div className={classNames("w-full h-2 ", backgroundAccent)}></div>

          <div className="flex flex-col justify-between w-full">
            <ScrollingText>
              <h2 className="uppercase font-extrabold text-[4rem]">Projects</h2>
            </ScrollingText>
            <Maintenance />
          </div>
        </div>

        <div id="skills" className="mt-[5rem]">
          <div className={classNames("w-full h-2 ", backgroundAccent)}></div>

          <div className="flex flex-col justify-between w-full">
            <ScrollingText reverse>
              <h2 className="uppercase font-extrabold text-[4rem]">Skills</h2>
            </ScrollingText>
            <Maintenance />
          </div>
        </div>
      </div>
    </div >
  )
}


const Maintenance = () => {
  const { backgroundAccent, textAccent } = useTailwindThemes()
  return <div
    className={classNames("w-full", backgroundAccent)}
  >
    <p className={classNames("font-bold text-[2rem] flex justify-center items-center h-[500px] uppercase text-center", textAccent)}>
      🚧 UNDERGOING DESIGN CHANGES 🚧
      <br />
      ASK ME INSTEAD!
    </p>
  </div>
}

const GridItem = ({ children, ...rest }) => {
  const { backgroundLight } = useTailwindThemes()
  return <div className={classNames("flex flex-col items-center ", backgroundLight)}>
    {children}
  </div >
}

export default Content;