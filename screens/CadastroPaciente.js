import React, { useState, useEffect } from "react";
import { ScrollView, Text, TextInput, Button, FlatList } from "react-native";
import { getDBConnection, createTables } from "../database";

export default function CadastroPaciente() {
  const [paciente, setPaciente] = useState({
    nome: "", idade: "", telefone: "", endereco: "",
    G: "", PN: "", AE: "", AP: "", F: "", C: "", NV: "", NM: "", FV: "",
    DUM: "", DPP: "", US: "", risco: "", strepto: "Negativo"
  });
  const [pacientes, setPacientes] = useState([]);

  useEffect(() => {
    async function load() {
      const db = await getDBConnection();
      await createTables(db);
      const results = await db.executeSql("SELECT * FROM pacientes");
      setPacientes(results[0].rows.raw());
    }
    load();
  }, []);

  const salvar = async () => {
    const db = await getDBConnection();
    await db.executeSql(
      `INSERT INTO pacientes (nome, idade, telefone, endereco, G, PN, AE, AP, F, C, NV, NM, FV, DUM, DPP, US, risco, strepto)
       VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      Object.values(paciente)
    );
    const results = await db.executeSql("SELECT * FROM pacientes");
    setPacientes(results[0].rows.raw());
  };

  return (
    <ScrollView style={{ padding: 20 }}>
      <Text style={{ fontWeight: "bold", fontSize: 18 }}>Cadastro da Paciente</Text>
      {["nome","idade","telefone","endereco","G","PN","AE","AP","F","C","NV","NM","FV","DUM","DPP","US","risco"].map((campo) => (
        <TextInput
          key={campo}
          placeholder={campo}
          value={paciente[campo]}
          onChangeText={(t) => setPaciente({ ...paciente, [campo]: t })}
          style={{ borderWidth: 1, marginBottom: 10 }}
        />
      ))}
      <Button title="Salvar" onPress={salvar} />

      <Text style={{ marginTop: 20, fontWeight: "bold" }}>Pacientes cadastrados:</Text>
      <FlatList
        data={pacientes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Text>#{item.id} - {item.nome} ({item.idade} anos)</Text>
        )}
      />
    </ScrollView>
  );
}

