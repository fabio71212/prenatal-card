import { useEffect, useState } from "react";
import { Button, FlatList, Text, TextInput, View } from "react-native";
import { usePaciente } from "../context";

export default function Consultas() {
  const { pacienteSelecionado } = usePaciente();
  const [consulta, setConsulta] = useState({ data: "", semanas: "", peso: "", pressao: "" });
  const [lista, setLista] = useState([]);

  useEffect(() => {
    if (pacienteSelecionado) carregar();
  }, [pacienteSelecionado]);

  const carregar = async () => {
    const { data, error } = await supabase
      .from("consultas")
      .select("*")
      .eq("paciente_id", pacienteSelecionado.id);
    if (!error) setLista(data);
  };

  const salvar = async () => {
    await supabase.from("consultas").insert([{ ...consulta, paciente_id: pacienteSelecionado.id }]);
    setConsulta({ data: "", semanas: "", peso: "", pressao: "" });
    carregar();
  };

  if (!pacienteSelecionado) return <Text>Selecione uma paciente primeiro.</Text>;

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 18 }}>Consultas - {pacienteSelecionado.nome}</Text>
      <TextInput placeholder="Data" value={consulta.data} onChangeText={t => setConsulta({ ...consulta, data: t })} style={{ borderWidth: 1, marginBottom: 10 }} />
      <TextInput placeholder="Semanas" value={consulta.semanas} onChangeText={t => setConsulta({ ...consulta, semanas: t })} style={{ borderWidth: 1, marginBottom: 10 }} />
      <TextInput placeholder="Peso" value={consulta.peso} onChangeText={t => setConsulta({ ...consulta, peso: t })} style={{ borderWidth: 1, marginBottom: 10 }} />
      <TextInput placeholder="PA" value={consulta.pressao} onChangeText={t => setConsulta({ ...consulta, pressao: t })} style={{ borderWidth: 1, marginBottom: 10 }} />
      <Button title="Salvar" onPress={salvar} />

      <FlatList
        data={lista}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <Text>• {item.data} | {item.semanas} sem | {item.peso} | {item.pressao}</Text>
        )}
      />
    </View>
  );
}



