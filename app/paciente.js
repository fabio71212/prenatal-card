import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Button, ScrollView, Text, TextInput, TouchableOpacity } from "react-native";
import { usePaciente } from "../context";

export default function Paciente() {
  const { setPacienteSelecionado } = usePaciente();
  const router = useRouter();
  const [paciente, setPaciente] = useState({ nome: "", idade: "", telefone: "", endereco: "" });
  const [lista, setLista] = useState([]);

  useEffect(() => {
    carregar();
  }, []);

  const carregar = async () => {
    const { data, error } = await supabase.from("pacientes").select("*");
    if (!error) setLista(data);
  };

  const salvar = async () => {
    await supabase.from("pacientes").insert([paciente]);
    setPaciente({ nome: "", idade: "", telefone: "", endereco: "" });
    carregar();
  };

  const selecionar = (p) => {
    setPacienteSelecionado(p);
    router.push("/consultas");
  };

  return (
    <ScrollView style={{ padding: 20 }}>
      <Text style={{ fontSize: 18, marginBottom: 10 }}>Cadastro de Paciente</Text>
      <TextInput placeholder="Nome" value={paciente.nome} onChangeText={t => setPaciente({ ...paciente, nome: t })} style={{ borderWidth: 1, marginBottom: 10 }} />
      <TextInput placeholder="Idade" value={paciente.idade} onChangeText={t => setPaciente({ ...paciente, idade: t })} style={{ borderWidth: 1, marginBottom: 10 }} />
      <TextInput placeholder="Telefone" value={paciente.telefone} onChangeText={t => setPaciente({ ...paciente, telefone: t })} style={{ borderWidth: 1, marginBottom: 10 }} />
      <TextInput placeholder="Endereço" value={paciente.endereco} onChangeText={t => setPaciente({ ...paciente, endereco: t })} style={{ borderWidth: 1, marginBottom: 10 }} />
      <Button title="Salvar" onPress={salvar} />

      <Text style={{ marginTop: 20, fontWeight: "bold" }}>Pacientes cadastrados:</Text>
      {lista.map(p => (
        <TouchableOpacity key={p.id} onPress={() => selecionar(p)} style={{ padding: 8, borderBottomWidth: 1 }}>
          <Text>• {p.nome} ({p.idade} anos)</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}
