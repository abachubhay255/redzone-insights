import { Group, Image, Text } from "@mantine/core";

export function AppLogo() {
  return (
    <Group>
      <Image h={25} src="/assets/logo.svg" />
      <Text fw={600}>
        Redzo
        <Text span style={{ textDecoration: "underline", textDecorationColor: "#c92a2a", textDecorationThickness: 3 }} fw={600}>
          ne
        </Text>
        <Text span fw={600} c="blue">
          {" "}
          Insights
        </Text>
      </Text>
    </Group>
  );
}
