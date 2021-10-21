import React from "react";
import { Text, View } from "@react-pdf/renderer";

function Student({ fontSize, name, dre, signature }) {
  return (
    <View style={{ flexDirection: "row", marginTop: 10 }}>
      <View style={{ flexDirection: "column", width: 370 }}>
        <Text
          style={{
            fontSize: fontSize,
            fontFamily: "Times-Roman",
          }}
        >
          {`Nome: ${name}`}
        </Text>
        <Text
          style={{
            fontSize: fontSize,
            fontFamily: "Times-Roman",
          }}
        >
          {`Assinatura: ${signature}`}
        </Text>
      </View>
      <Text
        style={{
          fontSize: fontSize,
          fontFamily: "Times-Roman",
          marginTop: 7,
        }}
      >
        {`DRE: ${dre}`}
      </Text>
    </View>
  );
}

export default Student;
