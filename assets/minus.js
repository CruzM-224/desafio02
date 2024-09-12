// icon:minus | Entypo http://entypo.com/ | Daniel Bruce
import * as React from "react";
import Svg, { Path } from "react-native-svg";

function IconMinus(props) {
  return (
    <Svg
      viewBox="0 0 580 1000"
      fill="#000000"
      height="30"
      width="30"
      {...props}
    >
      <Path d="M550 450c20 0 30 16.667 30 50s-10 50-30 50H30c-20 0-30-16.667-30-50s10-50 30-50h520" />
    </Svg>
  );
}

export default IconMinus;
