import React from "react";
import { Text, Image, View } from "@react-pdf/renderer";

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
        <View style={{ flexDirection: "row" }}>
          <Text
            style={{
              fontSize: fontSize,
              fontFamily: "Times-Roman",
            }}
          >
            Assinatura:&nbsp;
          </Text>
          {signature === null ? (
            <></>
          ) : (
            <Image
              style={{
                height: 25,
                minWidth: 50,
                maxWidth: 250,
              }}
              src={signature}
            />
          )}
        </View>
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
