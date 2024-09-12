// icon:location-food | Zondicons http://www.zondicons.com | Steve Schoger
import * as React from "react";
import Svg, { Path } from "react-native-svg";

function IconLocationFood(props) {
  return (
    <Svg
      viewBox="0 0 20 20"
      fill="#000000"
      height="30"
      width="25"
      {...props}
    >
      <Path d="M18 11v7a2 2 0 01-4 0v-5h-2V3a3 3 0 013-3h3v11zM4 10a2 2 0 01-2-2V1a1 1 0 012 0v4h1V1a1 1 0 012 0v4h1V1a1 1 0 012 0v7a2 2 0 01-2 2v8a2 2 0 01-4 0v-8z" />
    </Svg>
  );
}

export default IconLocationFood;
