import React from "react";
import { Text, View } from "@react-pdf/renderer";

function Committee({ fontSize, name, advisor, signature }) {
  return (
    <View style={{ flexDirection: "row", marginTop: 10 }}>
      <Text
        style={{
          flexDirection: "column",
          width: 385,
          fontSize: fontSize,
          fontFamily: "Times-Roman",
        }}
      >
        {`Nome: ${name} ${advisor ? "(ORIENTADOR)" : ""}`}
      </Text>
      <Text
        style={{
          fontSize: fontSize,
          fontFamily: "Times-Roman",
        }}
      >
        {`${signature}`}
      </Text>
    </View>
  );
}

export default Committee;
