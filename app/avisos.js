import { Text, View } from "react-native";

export default function Avisos() {
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 18, fontWeight: "bold" }}>Avisos à Gestante</Text>
      <Text>{"\n"}Vá à maternidade se:</Text>
      <Text>• Contrações regulares e dolorosas</Text>
      <Text>• Perda de líquido vaginal</Text>
      <Text>• Sangramento</Text>
      <Text>• Febre</Text>
      <Text>• Inchaço acentuado em pernas, mãos ou rosto</Text>
    </View>
  );
}

