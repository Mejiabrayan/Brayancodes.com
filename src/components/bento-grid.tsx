import { useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";

type GridItemLayout = {
  id: string;
  colSpan: string;
  hasImage: boolean;
  imagePosition?: string;
};

const gridLayouts: GridItemLayout[][] = [
  // Default layout
  [
    {
      id: "devgenius",
      colSpan: "col-span-full md:col-span-6 xl:row-span-4",
      hasImage: true,
      imagePosition: "object-[1rem_1rem] @md:object-[center_1rem] @lg:object-cover",
    },
    {
      id: "hermessend",
      colSpan: "col-span-full md:col-span-6 xl:row-span-4",
      hasImage: true,
      imagePosition: "object-[1rem_center] @md:object-[center_60%] @lg:object-cover",
    },
    {
      id: "rapidbart",
      colSpan: "col-span-full sm:col-span-6 lg:col-span-3 row-span-2",
      hasImage: false,
    },
    {
      id: "webdev",
      colSpan: "col-span-full sm:col-span-6 lg:col-span-3 row-span-2",
      hasImage: false,
    },
    {
      id: "rapidbart-large",
      colSpan: "col-span-full lg:col-span-6 row-span-4",
      hasImage: true,
      imagePosition: "object-[1rem_1rem] @md:object-[center_1rem] @lg:object-cover",
    },
    {
      id: "ai-security",
      colSpan: "col-span-full lg:col-span-6 row-span-2",
      hasImage: false,
    },
  ],
  // Rows layout
  [
    {
      id: "devgenius",
      colSpan: "col-span-full",
      hasImage: true,
      imagePosition: "object-[1rem_1rem] @md:object-[center_1rem] @lg:object-cover",
    },
    {
      id: "hermessend",
      colSpan: "col-span-full",
      hasImage: true,
      imagePosition: "object-[1rem_center] @md:object-[center_60%] @lg:object-cover",
    },
    {
      id: "rapidbart-large",
      colSpan: "col-span-full",
      hasImage: true,
      imagePosition: "object-[1rem_1rem] @md:object-[center_1rem]",
    },
    { id: "rapidbart", colSpan: "col-span-full", hasImage: false },
    { id: "webdev", colSpan: "col-span-full", hasImage: false },
    { id: "ai-security", colSpan: "col-span-full", hasImage: false },
  ],
  // Columns layout
  [
    {
      id: "devgenius",
      colSpan: "col-span-full md:col-span-4 row-span-full",
      hasImage: true,
      imagePosition: "object-center",
    },
    {
      id: "hermessend",
      colSpan: "col-span-full md:col-span-4 row-span-full",
      hasImage: true,
      imagePosition: "object-center",
    },
    {
      id: "rapidbart-large",
      colSpan: "col-span-full md:col-span-4 row-span-full",
      hasImage: true,
      imagePosition: "object-center",
    },
    {
      id: "rapidbart",
      colSpan: "col-span-full md:col-span-4",
      hasImage: false,
    },
    {
      id: "webdev",
      colSpan: "col-span-full md:col-span-4",
      hasImage: false,
    },
    {
      id: "ai-security",
      colSpan: "col-span-full md:col-span-4",
      hasImage: false,
    },
  ],
];

export default function BentoGrid() {
  const [currentLayout, setCurrentLayout] = useState<number>(0);

  const handleShuffle = () => {
    setCurrentLayout((prev) => (prev + 1) % gridLayouts.length);
  };

  const getSectionData = (id: string) => {
    const sections: Record<
      string,
      {
        title: string;
        description: string;
        tech: string[];
        icon: JSX.Element;
        image?: string;
      }
    > = {
      devgenius: {
        title: "DevGenius",
        description:
          "DevGenius Creates SEO-optimized technical content and publish to Dev.to in minutes.",
        tech: ["Next.js", "OpenAI", "Tailwind"],
        icon: (
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        ),
        image: "/src/assets/devgenius.png",
      },
      hermessend: {
        title: "Hermes Send",
        description:
          "I've worked on a variety of projects, from small personal projects to large-scale enterprise applications.",
        tech: ["React", "Node.js", "PostgreSQL"],
        icon: (
          <>
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
            <polyline points="3.27,6.96 12,12.01 20.73,6.96" />
            <line x1="12" y1="22.08" x2="12" y2="12" />
          </>
        ),
        image: "/src/assets/hermessend.png",
      },
      rapidbart: {
        title: "Rapid Bart",
        description:
          "Built on top of AC Transit's API, Rapid Bart is a real-time transit tracking app for the San Francisco Bay Area.",
        tech: ["React Native", "TypeScript", "REST API"],
        icon: (
          <>
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
          </>
        ),
      },
      webdev: {
        title: "Web Development",
        description:
          "Full-stack web development with modern technologies and best practices.",
        tech: ["React", "Node.js", "TypeScript"],
        icon: (
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
        ),
      },
      "rapidbart-large": {
        title: "Rapid Bart",
        description:
          "Real-time transit tracking app for the San Francisco Bay Area, built on top of AC Transit's API with modern mobile development practices.",
        tech: ["React Native", "TypeScript", "REST API"],
        icon: (
          <>
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
          </>
        ),
        image: "/src/assets/rapidbart.png",
      },
      "ai-security": {
        title: "AI & Security",
        description:
          "Working at the intersection of AI, security, and modern web development to create innovative solutions.",
        tech: ["AI/ML", "Security", "Web Dev"],
        icon: (
          <>
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
          </>
        ),
      },
    };
    return sections[id];
  };

  return (
    <motion.div className="w-full space-y-6">
      <motion.div className="flex justify-center">
        <motion.button
          onClick={handleShuffle}
          className="group flex items-center space-x-2 rounded-2xl bg-black px-4 py-2 text-sm font-medium text-neutral-300 ring ring-white/10 inset-ring-2 inset-ring-zinc-800 transition-all duration-200focus:outline-none shadow-[0_0_10px_rgba(0,0,0,0.5)]"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg
            className="h-4 w-4 transition-transform group-hover:rotate-180"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          <span>Shuffle Layout</span>
        </motion.button>
      </motion.div>

      {/* Grid */}
      <LayoutGroup>
        <motion.div
          layout='preserve-aspect'
          className="mx-auto grid w-full max-w-[1328px] grid-flow-dense grid-cols-12 gap-4 rounded-2xl bg-zinc-950 xl:auto-rows-fr shadow-[0_0_10px_rgba(0,0,0,0.5)] p-3.5"
        >
          {gridLayouts[currentLayout].map((item, index) => {
            const data = getSectionData(item.id);
            return (
              <motion.section
                layout='preserve-aspect'
                layoutId={item.id}
                key={item.id}
                className={`group @container/section flex flex-col gap-2 rounded-2xl bg-neutral-900/50 p-2 ring ring-white/10 backdrop-blur-xl hover:ring-white/20 overflow-hidden ${item.colSpan}`}
                transition={{ type: "tween", ease: "easeInOut", duration: 0.3 }}
                style={{ borderRadius: "1rem" }}
              >
                <motion.div
                  layout="position"
                  className="flex flex-col gap-4 p-6 flex-shrink-0"
                >
                  <h3 className="flex flex-col gap-4 font-semibold text-neutral-200 transition-colors group-hover:text-white @[17.5rem]:flex-row @[17.5rem]:items-center">
                    <span
                      className="flex h-10 w-10 flex-[0_0_auto] items-center justify-center rounded-full bg-neutral-800 ring ring-neutral-700"
                      aria-hidden="true"
                    >
                      <svg
                        className="fill-neutral-200"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        {data.icon}
                      </svg>
                    </span>
                    {data.title}
                  </h3>
                  <p className="max-w-prose text-pretty text-neutral-300 break-words">
                    {data.description}
                  </p>
                  <div className="flex items-center space-x-2 text-xs text-neutral-400 flex-wrap">
                    {data.tech.map((tech, techIndex) => (
                      <span key={techIndex}>
                        {tech}
                        {techIndex < data.tech.length - 1 && " • "}
                      </span>
                    ))}
                  </div>
                </motion.div>
                {item.hasImage && data.image && (
                  <motion.div
                    layout
                    className="flex aspect-[340/376] overflow-hidden rounded-lg bg-neutral-800 ring ring-neutral-700 group-hover:ring-neutral-600 @md:aspect-[640/376]"
                    style={{ borderRadius: "0.5rem" }}
                  >
                    <motion.img
                      layoutId={`image-${item.id}`}
                      src={data.image}
                      alt={data.title}
                      className={`h-full w-full object-cover ${item.imagePosition ||
                        "object-[1rem_1rem] @md:object-[center_1rem] @lg:object-[center_60%]"
                        }`}
                      whileHover={{ scale: 1.05 }}
                      transition={{
                        type: "tween",
                        ease: "easeInOut",
                        duration: 0.3,
                      }}
                      width={468}
                      height={376}
                    />
                  </motion.div>
                )}
              </motion.section>
            );
          })}
        </motion.div>
      </LayoutGroup>
    </motion.div>
  );
}
