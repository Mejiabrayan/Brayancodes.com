import { useState } from "react";

const HalftoneDemo = () => {
  const [size, setSize] = useState(5);
  const [opacity, setOpacity] = useState(50);
  const [color, setColor] = useState("#ffffff");

  return (
    <div className="space-y-6 rounded-2xl border border-white/10 bg-[#0A0A0A] p-4 shadow-md sm:p-6">
      <div className="relative h-48 w-full overflow-hidden rounded-lg sm:h-64">
        <img
          src="/dither-effect.png"
          alt="Demo Image"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(${color} 0.5px, transparent 0.5px)`,
            backgroundSize: `${size}px ${size}px`,
            opacity: opacity / 100,
          }}
        ></div>
      </div>
      <div className="space-y-4">
        <div className="flex flex-col">
          <label className="text-accents-6 mb-1 text-sm font-medium">
            Size:
          </label>
          <input
            type="range"
            min="1"
            max="10"
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
            className="bg-accents-2 h-2 w-full cursor-pointer appearance-none rounded-full"
          />
          <span className="text-accents-5 mt-1 text-xs">{size}px</span>
        </div>
        <div className="flex flex-col">
          <label className="text-accents-6 mb-1 text-sm font-medium">
            Opacity:
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={opacity}
            onChange={(e) => setOpacity(Number(e.target.value))}
            className="bg-accents-2 h-2 w-full cursor-pointer appearance-none rounded-full"
          />
          <span className="text-accents-5 mt-1 text-xs">{opacity}%</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center">
          <label className="text-accents-6 mb-1 text-sm font-medium sm:mr-2 sm:mb-0">
            Color:
          </label>
          <div className="flex items-center">
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="border-accents-3 h-8 w-8 overflow-hidden rounded-full border-2 bg-transparent"
            />
            <span className="text-accents-5 ml-2 text-sm">{color}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HalftoneDemo;
