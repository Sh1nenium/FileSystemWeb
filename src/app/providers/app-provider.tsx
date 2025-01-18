import { ComposeChildren } from "@/shared/utils/compose-children";
import QueryProvider from "./app-query";
import { AuthProvider } from "./app-auth";
// import { Confirmations } from "@/widgets/confirmations";

export function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <ComposeChildren>
      <QueryProvider/>
      <AuthProvider/>
      {children}
    </ComposeChildren>
  );
}