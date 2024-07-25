import { Center, Loader } from "@mantine/core";

export function AppLoader() {
  return (
    <Center my="md">
      <Loader type="bars" />
    </Center>
  );
}
