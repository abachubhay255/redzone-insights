import { MantineProvider } from "@mantine/core";
import { PropsWithChildren } from "react";
import "@mantine/core/styles.css";

export function ThemeProvider({ children }: PropsWithChildren) {
  return <MantineProvider defaultColorScheme="dark">{children}</MantineProvider>;
}
