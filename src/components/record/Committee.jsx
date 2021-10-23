import React from "react";
import { Text, Image, View } from "@react-pdf/renderer";

function Committee({ fontSize, name, advisor, coadvisor, signature }) {
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
        {`Nome: ${name} ${
          advisor ? "(ORIENTADOR)" : coadvisor ? "(CO-ORIENTADOR)" : ""
        }`}
      </Text>
      {signature === null ? (
        <></>
      ) : (
        <Image
          style={{
            height: 30,
            minWidth: 60,
            maxWidth: 300,
          }}
          src={signature}
        />
      )}
    </View>
  );
}

export default Committee;
