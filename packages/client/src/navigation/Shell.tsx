import { AppShell, Burger, Container, Group } from "@mantine/core";
import { HeaderItem } from "./HeaderItem";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";

export function Shell() {
  const [opened, { toggle }] = useDisclosure();
  const [active, setActive] = useState(pages[0].link);

  return (
    <AppShell header={{ height: 60 }} navbar={{ width: 300, breakpoint: "sm", collapsed: { desktop: true, mobile: !opened } }} padding="md">
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />

          <Group ml="auto" mr="auto" visibleFrom="sm">
            {pages.map(page => (
              <HeaderItem
                key={page.link}
                link={page.link}
                label={page.label}
                active={active === page.link}
                onClick={e => {
                  setActive(page.link);
                }}
              />
            ))}
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar py="md" px={4}>
        {pages.map(page => (
          <HeaderItem
            key={page.link}
            link={page.link}
            label={page.label}
            active={active === page.link}
            onClick={e => {
              toggle();
              setActive(page.link);
            }}
          />
        ))}
      </AppShell.Navbar>

      <AppShell.Main>
        <Container size="xl">
          Navbar is only visible on mobile, links that are rendered in the header on desktop are hidden on mobile in header and rendered in
          navbar instead.Navbar is only visible on mobile, links that are rendered in the header on desktop are hidden on mobile in header
          and rendered in navbar instead.
        </Container>
      </AppShell.Main>
    </AppShell>
  );
}

const pages = [
  { link: "/", label: "Scores" },
  { link: "/pricing", label: "Pricing" },
  { link: "/learn", label: "Learn" },
  { link: "/community", label: "Community" }
];
