import { AppShell, Burger, Container, Group } from "@mantine/core";
import { HeaderItem } from "./HeaderItem";
import { useDisclosure } from "@mantine/hooks";
import { useMemo } from "react";
import { Outlet, useMatches } from "react-router-dom";

export function Shell() {
  const [opened, { toggle }] = useDisclosure();
  const matches = useMatches();

  const active = useMemo(() => (matches.length > 1 ? matches[1].pathname : "/"), [matches]);

  return (
    <AppShell header={{ height: 60 }} navbar={{ width: 300, breakpoint: "sm", collapsed: { desktop: true, mobile: !opened } }} padding="md">
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />

          <Group ml="auto" mr="auto" visibleFrom="sm">
            {pages.map(page => (
              <HeaderItem key={page.link} link={page.link} label={page.label} active={active === page.link} indicator={page.indicator} />
            ))}
          </Group>
        </Group>
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
