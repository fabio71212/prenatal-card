import { Stack } from "expo-router";
import { PacienteProvider } from "../context";

export default function Layout() {
  return (
    <PacienteProvider>
      <Stack screenOptions={{ headerShown: true }} />
    </PacienteProvider>
  );
}
