// icon:cup-soda | Lucide https://lucide.dev/ | Lucide
import * as React from "react";
import Svg, { Path } from "react-native-svg";

function IconCupSoda(props) {
  return (
    <Svg
      fill="none"
      stroke="#000000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      viewBox="0 0 24 24"
      height="30"
      width="30"
      {...props}
    >
      <Path d="M6 8l1.75 12.28a2 2 0 002 1.72h4.54a2 2 0 002-1.72L18 8M5 8h14" />
      <Path d="M7 15a6.47 6.47 0 015 0 6.47 6.47 0 005 0M12 8l1-6h2" />
    </Svg>
  );
}

export default IconCupSoda;
