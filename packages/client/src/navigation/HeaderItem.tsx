import { Link, LinkProps } from "react-router-dom";
import classes from "./HeaderItem.module.css";
import { Badge, Indicator, NavLink } from "@mantine/core";
import { useMobile } from "#s/hooks/useMobile";

type HeaderItemProps = {
  link: string;
  label: string;
  active: boolean;
  indicator?: string;
};

export function HeaderItem({ link, label, active, indicator, ...props }: HeaderItemProps & Partial<LinkProps>) {
  const isMobile = useMobile();
  return (
    <Link key={label} to={link} className={classes.link} data-active={active || undefined} {...props}>
      <Indicator
        offset={isMobile ? 0 : -6}
        label={
          <Badge size="sm" variant="gradient" p={0}>
            {indicator}
          </Badge>
        }
        size="sm"
        disabled={!indicator}
      >
        {label}
      </Indicator>
    </Link>
  );
}
