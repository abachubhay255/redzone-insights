import { WeekSelect } from "#s/components/WeekSelect";
import { useState } from "react";
import { getNFLWeek } from "./utils";
import { Center } from "@mantine/core";

export function Scores() {
  const [week, setWeek] = useState(getNFLWeek(new Date()));
  return (
    <>
      <Center>
        <WeekSelect week={week} setWeek={setWeek} />
      </Center>
      Navbar is only visible on mobile, links that are rendered in the header on desktop are hidden on mobile in header and rendered in
      navbar instead.Navbar is only visible on mobile, links that are rendered in the header on desktop are hidden on mobile in header and
      rendered in navbar instead.
    </>
  );
}
