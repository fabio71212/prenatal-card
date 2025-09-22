import { useEffect, useState } from "react";
import { Button, FlatList, Text, TextInput, View } from "react-native";
import { usePaciente } from "../context";

export default function Observacoes() {
  const { pacienteSelecionado } = usePaciente();
  const [texto, setTexto] = useState("");
  const [lista, setLista] = useState([]);

  useEffect(() => {
    if (pacienteSelecionado) carregar();
  }, [pacienteSelecionado]);

  const carregar = async () => {
    const { data, error } = await supabase
      .from("observacoes")
      .select("*")
      .eq("paciente_id", pacienteSelecionado.id);

    if (!error) setLista(data);
  };

  const salvar = async () => {
    await supabase.from("observacoes").insert([
      { paciente_id: pacienteSelecionado.id, texto }
    ]);
    setTexto("");
    carregar();
  };

  if (!pacienteSelecionado) {
    return <Text style={{ padding: 20 }}>Selecione uma paciente primeiro.</Text>;
  }

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 18 }}>Observações - {pacienteSelecionado.nome}</Text>
      <TextInput
        placeholder="Escreva aqui..."
        value={texto}
        onChangeText={setTexto}
        style={{ borderWidth: 1, marginBottom: 10 }}
      />
      <Button title="Salvar" onPress={salvar} />

      <FlatList
        data={lista}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Text>• {item.texto}</Text>}
      />
    </View>
  );
}


