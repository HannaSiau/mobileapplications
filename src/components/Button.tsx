import { Pressable, Text, type PressableProps } from "react-native";
import type { ReactNode } from "react";

export const COLORS = {
  emerald:  { border: "border-emerald-400",  text: "text-emerald-400", hex: "#00d492"},
  sky:   { border: "border-sky-400",   text: "text-sky-400", hex: "#00bcff" },
  amber: { border: "border-amber-500", text: "text-amber-500", hex:  "#fe9a00" },
} as const;

const SIZES = {
  lg: "w-full py-8",
  md: "w-2/3 py-4",
} as const;

const TILTS = {
  "-2": "-rotate-2",
  "-1": "-rotate-1",
  "0": "",
  "1": "rotate-1",
  "2": "rotate-2",
} as const;

type Props = Omit<PressableProps, "children"> & {
  label: string;
  children?: ReactNode;
  color?: keyof typeof COLORS;
  size?: keyof typeof SIZES;
  tilt?: keyof typeof TILTS;
  className?: string;
};

export function Button({
    label,
    children,
    color = "emerald",
    size = "md",
    tilt = "0",
    className = "",
    ...rest
}: Props & { className?: string }) {
    const c = COLORS[color];
    return (
        <Pressable
            accessibilityRole="button"
            accessibilityLabel={label}
            className={`${c.border} ${TILTS[tilt]} ${SIZES[size]} items-center rounded-[36px] border-4 border-b-8 bg-indigo-950 active:translate-y-1 active:border-b-4 ${className}`}
            {...rest}
            >
            {children}
            <Text className={`${c.text} text-3xl font-extrabold`}>{label}</Text>
        </Pressable>
  );
}