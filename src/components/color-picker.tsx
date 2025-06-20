import React from "react";

interface ColorPickerProps {
  defaultColor: string;
  onChange: (color: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({
  defaultColor,
  onChange,
}) => {
  return (
    <div className="flex items-center space-x-2">
      <input
        type="color"
        defaultValue={defaultColor}
        onChange={(e) => onChange(e.target.value)}
        className="h-8 w-8 overflow-hidden rounded-full"
      />
      <span>Choose a color for your dither effect</span>
    </div>
  );
};

export default ColorPicker;
