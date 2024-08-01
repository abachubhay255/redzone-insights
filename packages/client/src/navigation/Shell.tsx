import { AppShell, Box, Burger, Container, Flex, Group } from "@mantine/core";
import { HeaderItem } from "./HeaderItem";
import { useDisclosure } from "@mantine/hooks";
import { useMemo } from "react";
import { Outlet, useMatches } from "react-router-dom";
import { AppLogo } from "#s/components/AppLogo";
import { useMobile } from "#s/hooks/useMobile";

export function Shell() {
  const [opened, { toggle }] = useDisclosure();
  const matches = useMatches();

  const active = useMemo(() => (matches.length > 1 ? matches[1].pathname : "/"), [matches]);

  const isMobile = useMobile();

  return (
    <AppShell header={{ height: 60 }} navbar={{ width: 300, breakpoint: "sm", collapsed: { desktop: true, mobile: !opened } }} padding="md">
      <AppShell.Header>
        <Container h={60} size="xl">
          <Flex h="100%" direction="column" justify="center">
            <Group>
              <Burger flex={isMobile ? 1 : undefined} opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
              <Box flex={!isMobile ? 1 : undefined}>
                <AppLogo />
              </Box>

              <Group visibleFrom="sm">
                {pages.map(page => (
                  <HeaderItem
                    key={page.link}
                    link={page.link}
                    label={page.label}
                    active={active === page.link}
                    indicator={page.indicator}
                  />
                ))}
              </Group>
              <Box flex={1} />
            </Group>
          </Flex>
        </Container>
      </AppShell.Header>

      <AppShell.Navbar py="md" px={4} zIndex={500}>
        {pages.map(page => (
          <HeaderItem
            key={page.link}
            link={page.link}
            label={page.label}
            active={active === page.link}
            indicator={page.indicator}
            onClick={toggle}
          />
        ))}
      </AppShell.Navbar>

      <AppShell.Main>
        <Container size="xl">
          <Outlet />
        </Container>
      </AppShell.Main>
    </AppShell>
  );
}

const pages = [
  { link: "/", label: "Scores" },
  { link: "/standings", label: "Standings" },
  { link: "/parlays", label: "Parlays", indicator: "AI" }
];
