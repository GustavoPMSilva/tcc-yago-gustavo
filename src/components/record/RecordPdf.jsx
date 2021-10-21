import React from "react";
import { Page, Text, Document, Font, Image, View } from "@react-pdf/renderer";
import Student from "./Student";
import Committee from "./Committee";

// Create styles

Font.register({
  family: "Oswald",
  src: "https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf",
});

// Create Document Component
function RecordPdf() {
  const smallFontSize = 8;
  const mediumFontSize = 11;
  const mediumHighFontSize = 12;

  return (
    <Document>
      <Page
        style={{ paddingTop: 35, paddingBottom: 65, paddingHorizontal: 50 }}
      >
        <Image
          style={{
            marginTop: 35,
            marginLeft: 50,
            height: 25,
            width: 50,
            position: "absolute",
          }}
          src={{
            uri: "https://upload.wikimedia.org/wikipedia/commons/9/9f/Logo_IM_-_UFRJ.png",
            method: "GET",
            headers: {},
            body: "",
          }}
        />
        <View style={{ textAlign: "right" }}>
          <Text style={{ fontSize: smallFontSize, fontFamily: "Times-Roman" }}>
            Universidade Federal do Rio de Janeiro
          </Text>
          <Text style={{ fontSize: smallFontSize, fontFamily: "Times-Roman" }}>
            Centro de Ciências Matemáticas e da Natureza
          </Text>
          <Text
            style={{
              fontSize: smallFontSize,
              fontFamily: "Times-Roman",
              fontWeight: "bold",
            }}
          >
            INSTITUTO DE MATEMÁTICA
          </Text>
          <Text
            style={{
              fontSize: smallFontSize,
              fontFamily: "Times-Roman",
              fontWeight: "bold",
            }}
          >
            Departamento de Ciência da Computação
          </Text>
        </View>
        <Text
          style={{
            fontSize: mediumFontSize,
            textAlign: "center",
            fontFamily: "Times-Roman",
            marginTop: 30,
          }}
        >
          ATA DE DEFESA DE PROJETO FINAL
        </Text>
        <Text
          style={{
            fontSize: mediumFontSize,
            textAlign: "center",
            fontFamily: "Times-Roman",
          }}
        >
          DO CURSO DE CIÊNCIA DA COMPUTAÇÃO
        </Text>
        <Text
          style={{
            fontSize: mediumFontSize,
            textAlign: "center",
            fontFamily: "Times-Roman",
            marginTop: 12,
          }}
        >
          Ata da undefined Defesa de Projeto Final do Curso de Ciência da
          Computação.
        </Text>
        <View style={{ flexDirection: "row" }}>
          <Text
            style={{
              flexDirection: "column",
              width: 400,
              fontSize: mediumHighFontSize,
              textAlign: "center",
              fontFamily: "Times-Roman",
              marginTop: 12,
            }}
          >
            Candidatos
          </Text>
          <Text
            style={{
              fontSize: mediumHighFontSize,
              fontFamily: "Times-Roman",
              marginTop: 12,
            }}
          >
            DRE
          </Text>
        </View>
        <Student fontSize={mediumHighFontSize} />
        <Student fontSize={mediumHighFontSize} />
        <Student fontSize={mediumHighFontSize} />
        <View style={{ flexDirection: "row" }}>
          <Text
            style={{
              flexDirection: "column",
              width: 250,
              fontSize: mediumHighFontSize,
              textAlign: "right",
              fontFamily: "Times-Roman",
              marginTop: 12,
            }}
          >
            Banca Examinadora
          </Text>
          <Text
            style={{
              flex: 1,
              fontSize: mediumHighFontSize,
              fontFamily: "Times-Roman",
              textAlign: "center",
              marginTop: 12,
              marginLeft: 58,
            }}
          >
            Assinatura
          </Text>
        </View>
        <Committee fontSize={mediumHighFontSize} />
        <Committee fontSize={mediumHighFontSize} />
        <Committee fontSize={mediumHighFontSize} />
        <Committee fontSize={mediumHighFontSize} />
        <Text
          style={{
            fontSize: mediumHighFontSize,
            fontFamily: "Times-Roman",
            marginTop: 30,
          }}
        >
          Título: undefined
        </Text>
        <View style={{ flexDirection: "row", marginTop: 20 }}>
          <Text
            style={{
              flex: 1,
              fontSize: mediumHighFontSize,
              fontFamily: "Times-Roman",
            }}
          >
            Data: undefined
          </Text>
          <Text
            style={{
              flex: 1,
              fontSize: mediumHighFontSize,
              fontFamily: "Times-Roman",
              textAlign: "center",
            }}
          >
            Início: undefined
          </Text>
          <Text
            style={{
              flex: 1,
              fontSize: mediumHighFontSize,
              fontFamily: "Times-Roman",
              textAlign: "right",
            }}
          >
            Término: undefined
          </Text>
        </View>
        <Text
          style={{
            fontSize: mediumHighFontSize,
            fontFamily: "Times-Roman",
            marginTop: 5,
          }}
        >
          Local: undefined
        </Text>
        <Text
          style={{
            fontSize: mediumHighFontSize,
            fontFamily: "Times-Roman",
            marginTop: 30,
          }}
        >
          Em sessão pública, após exposição do trabalho, o(s) candidato(s)
          foi(ram) arguidos(s) pelos membros da Banca Examinadora e o Projeto
          Final obteve o seguinte resultado:
        </Text>
        <Text
          style={{
            fontSize: mediumHighFontSize,
            fontFamily: "Times-Roman",
            marginTop: 30,
          }}
        >
          {`(X) Aprovação por unanimidade.`}
        </Text>
        <Text
          style={{
            fontSize: mediumHighFontSize,
            fontFamily: "Times-Roman",
            marginTop: 5,
          }}
        >
          {`(   ) Aprovação somente após fazer as exigências, no prazo de ___ dias.`}
        </Text>
        <Text
          style={{
            fontSize: mediumHighFontSize,
            fontFamily: "Times-Roman",
            marginTop: 5,
          }}
        >
          {`(   ) Reprovação.`}
        </Text>
        <Text
          style={{
            fontSize: mediumHighFontSize,
            fontFamily: "Times-Roman",
            marginTop: 30,
          }}
        >
          {`Grau obtido: undefined (undefined)`}
        </Text>
        <View style={{ flexDirection: "row", marginTop: 30 }}>
          <Text
            style={{
              flex: 1,
              fontSize: smallFontSize,
              fontFamily: "Times-Roman",
            }}
          >
            {
              "Universidade Federal do Rio de Janeiro\nCCMN - Instituto de Matemática - DCC"
            }
          </Text>
          <Text
            style={{
              flex: 1,
              fontSize: smallFontSize,
              fontFamily: "Times-Roman",
              textAlign: "center",
            }}
          >
            {
              "Av. Athos da Silveira Ramos 274 - Ilha do Fundão\nCaixa Postal: 68530 - CEP: 21941-909"
            }
          </Text>
          <Text
            style={{
              flex: 1,
              fontSize: smallFontSize,
              fontFamily: "Times-Roman",
              textAlign: "right",
            }}
          >
            {"Tel: 0xx 21 2598-9516\n2598-3393"}
          </Text>
        </View>
      </Page>
    </Document>
  );
}

export default RecordPdf;
