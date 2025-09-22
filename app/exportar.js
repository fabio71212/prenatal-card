import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";
import { usePaciente } from "../context";

export default function Exportar() {
  const { pacienteSelecionado } = usePaciente();
  const [consultas, setConsultas] = useState([]);
  const [observacoes, setObservacoes] = useState([]);

  useEffect(() => {
    if (pacienteSelecionado) {
      carregar();
    }
  }, [pacienteSelecionado]);

  const carregar = async () => {
    const { data: c } = await supabase
      .from("consultas")
      .select("*")
      .eq("paciente_id", pacienteSelecionado.id);
    setConsultas(c || []);

    const { data: o } = await supabase
      .from("observacoes")
      .select("*")
      .eq("paciente_id", pacienteSelecionado.id);
    setObservacoes(o || []);
  };

  const gerarPDF = async () => {
    if (!pacienteSelecionado) {
      alert("Selecione uma paciente primeiro.");
      return;
    }

    const html = `
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h1 { text-align: center; }
            table { border-collapse: collapse; width: 100%; margin-top: 10px; }
            th, td { border: 1px solid #000; padding: 5px; font-size: 12px; text-align: center; }
            th { background-color: #f0f0f0; }
            .section { margin-top: 20px; }
          </style>
        </head>
        <body>
          <h1>Cartão de Pré-Natal</h1>

          <div class="section">
            <h2>Dados da Paciente</h2>
            <p><b>Nome:</b> ${pacienteSelecionado.nome}</p>
            <p><b>Idade:</b> ${pacienteSelecionado.idade}</p>
            <p><b>Telefone:</b> ${pacienteSelecionado.telefone}</p>
            <p><b>Endereço:</b> ${pacienteSelecionado.endereco}</p>
            <p><b>DUM:</b> ${pacienteSelecionado.DUM || ""} | 
               <b>DPP:</b> ${pacienteSelecionado.DPP || ""} | 
               <b>US:</b> ${pacienteSelecionado.US || ""}</p>
            <p><b>Risco:</b> ${pacienteSelecionado.risco || ""} | 
               <b>Strepto:</b> ${pacienteSelecionado.strepto || ""}</p>
          </div>

          <div class="section">
            <h2>Consultas</h2>
            <table>
              <tr>
                <th>Data</th><th>Semanas</th><th>Peso</th><th>PA</th>
                <th>Alt. Uterina</th><th>BCF</th><th>Mov.</th>
                <th>Edema</th><th>Apresentação</th>
              </tr>
              ${consultas.map(c => `
                <tr>
                  <td>${c.data || ""}</td>
                  <td>${c.semanas || ""}</td>
                  <td>${c.peso || ""}</td>
                  <td>${c.pressao || ""}</td>
                  <td>${c.alturaUterina || ""}</td>
                  <td>${c.BCF || ""}</td>
                  <td>${c.movimentos || ""}</td>
                  <td>${c.edema || ""}</td>
                  <td>${c.apresentacao || ""}</td>
                </tr>
              `).join("")}
            </table>
          </div>

          <div class="section">
            <h2>Observações</h2>
            ${observacoes.map(o => `<p>• ${o.texto}</p>`).join("")}
          </div>

          <div class="section">
            <h2>Avisos à Gestante</h2>
            <p>Vá à maternidade se:</p>
            <ul>
              <li>Contrações regulares e dolorosas</li>
              <li>Perda de líquido vaginal</li>
              <li>Sangramento</li>
              <li>Febre</li>
              <li>Inchaço acentuado em pernas, mãos ou rosto</li>
            </ul>
          </div>
        </body>
      </html>
    `;

    const { uri } = await Print.printToFileAsync({ html });
    await Sharing.shareAsync(uri);
  };

  if (!pacienteSelecionado) {
    return <Text style={{ padding: 20 }}>Selecione uma paciente para exportar.</Text>;
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button title="Gerar PDF do Cartão" onPress={gerarPDF} />
    </View>
  );
}

