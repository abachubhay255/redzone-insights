import { Title, Text, Button, Group, Stack } from "@mantine/core";
import { useNavigate } from "react-router-dom";

export function NotFound() {
  const navigate = useNavigate();
  return (
    <Stack align="center" my="xl">
      <Title>404</Title>
      <Title>You have found a secret place.</Title>
      <Text c="dimmed" size="lg" ta="center">
        Unfortunately, this is only a 404 page. You may have mistyped the address, or the page has been moved to another URL.
      </Text>
      <Group justify="center">
        <Button variant="light" onClick={() => navigate("/")}>
          Take me back to the home page
        </Button>
      </Group>
    </Stack>
  );
}
