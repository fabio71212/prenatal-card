import { Link } from "expo-router";
import { Button, Text, View } from "react-native";

export default function Index() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 22, marginBottom: 20 }}>Cartão de Pré-Natal</Text>

      <Link href="/paciente"><Button title="Paciente" /></Link>
      <Link href="/consultas"><Button title="Consultas" /></Link>
      <Link href="/observacoes"><Button title="Observações" /></Link>
      <Link href="/avisos"><Button title="Avisos" /></Link>
      <Link href="/exportar"><Button title="Exportar PDF" /></Link>
    </View>
  );
}

