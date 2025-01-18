import { CircleUserRound } from "lucide-react";
import { HTMLAttributes } from "react";

export function ProfileIcon({
  size,
  ...props
} : {
  size?: number
} & HTMLAttributes<SVGSVGElement>) {
  return (
    <CircleUserRound 
      {...props}
      style={{ cursor: 'pointer' }} 
      size={size}
    />
  )
}