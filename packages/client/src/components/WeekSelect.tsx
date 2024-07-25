import { ActionIcon, Group, GroupProps, Select, SelectProps } from "@mantine/core";
import { IconAdjustments, IconArrowLeft, IconArrowRight } from "@tabler/icons-react";

type WeekSelectProps = {
  week: number;
  setWeek: (week: number) => void;
};

export function WeekSelect({ week, setWeek }: WeekSelectProps) {
  return (
    <Group>
      <ActionIcon size="lg" onClick={() => setWeek(week - 1 > 0 ? week - 1 : 1)}>
        <IconArrowLeft />
      </ActionIcon>
      <Select variant="filled" data={weeksData} value={String(week)} onChange={val => setWeek(Number(val))} />
      <ActionIcon size="lg" onClick={() => setWeek(week + 1 <= 18 ? week + 1 : 18)}>
        <IconArrowRight />
      </ActionIcon>
    </Group>
  );
}

const weeks = Array.from({ length: 18 }, (_, i) => i + 1);
const weeksData = weeks.map(week => ({ value: String(week), label: `Week ${week}` }));
