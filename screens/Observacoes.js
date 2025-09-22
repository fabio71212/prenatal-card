import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, FlatList } from "react-native";
import { getDBConnection } from "../database";

export default function Observacoes() {
  const [obs, setObs] = useState("");
  const [lista, setLista] = useState([]);
  const [pacienteId] = useState(1);

  useEffect(() => {
    async function load() {
      const db = await getDBConnection();
      const results = await db.executeSql("SELECT * FROM observacoes WHERE paciente_id=?", [pacienteId]);
      setLista(results[0].rows.raw());
    }
    load();
  }, []);

  const salvar = async () => {
    const db = await getDBConnection();
    await db.executeSql("INSERT INTO observacoes (paciente_id, texto) VALUES (?,?)", [pacienteId, obs]);
    const results = await db.executeSql("SELECT * FROM observacoes WHERE paciente_id=?", [pacienteId]);
    setLista(results[0].rows.raw());
    setObs("");
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text>Nova observação:</Text>
      <TextInput
        value={obs}
        onChangeText={setObs}
        style={{ borderWidth: 1, marginBottom: 10 }}
      />
      <Button title="Salvar" onPress={salvar} />

      <FlatList
        data={lista}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Text style={{ marginTop: 5 }}>• {item.texto}</Text>}
      />
    </View>
  );
}

  );
}
