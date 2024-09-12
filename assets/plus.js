// icon:plus | Entypo http://entypo.com/ | Daniel Bruce
import * as React from "react";
import Svg, { Path } from "react-native-svg";

function IconPlus(props) {
  return (
    <Svg
      viewBox="0 0 580 1000"
      fill="#000000"
      height="30"
      width="30"
      {...props}
    >
      <Path d="M550 450c20 0 30 16.667 30 50s-10 50-30 50H340v210c0 20-16.667 30-50 30s-50-10-50-30V550H30c-20 0-30-16.667-30-50s10-50 30-50h210V240c0-20 16.667-30 50-30s50 10 50 30v210h210" />
    </Svg>
  );
}

export default IconPlus;
