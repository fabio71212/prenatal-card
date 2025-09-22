import React from "react";
import { ScrollView, Text } from "react-native";

export default function Avisos() {
  return (
    <ScrollView style={{ padding: 20 }}>
      <Text style={{ fontWeight: "bold", fontSize: 18, marginBottom: 10 }}>
        Avisos à Gestante
      </Text>
      <Text>A gravidez não é doença, mas necessita de vigilância médica permanente.</Text>

      <Text style={{ marginTop: 15, fontWeight: "bold" }}>Vá à Maternidade se:</Text>
      <Text>• Contrações rítmicas e dolorosas (2 a 3 em 10 min).</Text>
      <Text>• Perda de líquido via vaginal.</Text>

      <Text style={{ marginTop: 15, fontWeight: "bold" }}>Vá imediatamente à Maternidade se:</Text>
      <Text>• Perde água ou sangue.</Text>
      <Text>• Inchaço grande nas pernas, mãos ou rosto.</Text>
      <Text>• Febre.</Text>
      <Text>• Sinais de parto.</Text>
    </ScrollView>
  );
}
