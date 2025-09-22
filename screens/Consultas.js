import React, { useState, useEffect } from "react";
import { ScrollView, View, Text, TextInput, Button } from "react-native";
import { getDBConnection } from "../database";

export default function Consultas() {
  const [consultas, setConsultas] = useState(
    Array.from({ length: 14 }, (_, i) => ({ numero: i + 1 }))
  );
  const [pacienteId] = useState(1); // depois você pode escolher paciente

  useEffect(() => {
    async function load() {
      const db = await getDBConnection();
      const results = await db.executeSql("SELECT * FROM consultas WHERE paciente_id=?", [pacienteId]);
      if (results[0].rows.length > 0) setConsultas(results[0].rows.raw());
    }
    load();
  }, []);

  const salvar = async () => {
    const db = await getDBConnection();
    for (let c of consultas) {
      await db.executeSql(
        `INSERT OR REPLACE INTO consultas (paciente_id, numero, data, semanas, peso, pressao, alturaUterina, BCF, movimentos, edema, apresentacao)
         VALUES (?,?,?,?,?,?,?,?,?,?,?)`,
        [pacienteId, c.numero, c.data, c.semanas, c.peso, c.pressao, c.alturaUterina, c.BCF, c.movimentos, c.edema, c.apresentacao]
      );
    }
  };

  const atualizar = (i, campo, valor) => {
    const novas = [...consultas];
    novas[i][campo] = valor;
    setConsultas(novas);
  };

  return (
    <ScrollView style={{ padding: 10 }}>
      {consultas.map((c, i) => (
        <View key={i} style={{ borderWidth: 1, marginBottom: 10, padding: 10 }}>
          <Text style={{ fontWeight: "bold" }}>Consulta {i + 1}</Text>
          {["data","semanas","peso","pressao","alturaUterina","BCF","movimentos","edema","apresentacao"].map((campo) => (
            <TextInput
              key={campo}
              placeholder={campo}
              value={c[campo] || ""}
              onChangeText={(t) => atualizar(i, campo, t)}
              style={{ borderWidth: 1, marginBottom: 5 }}
            />
          ))}
        </View>
      ))}
      <Button title="Salvar Consultas" onPress={salvar} />
    </ScrollView>
  );
}

