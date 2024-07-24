import { Link, LinkProps } from "react-router-dom";
import classes from "./HeaderItem.module.css";

type HeaderItemProps = {
  link: string;
  label: string;
  active: boolean;
};

export function HeaderItem({ link, label, active, ...props }: HeaderItemProps & Partial<LinkProps>) {
  return (
    <Link key={label} to={link} className={classes.link} data-active={active || undefined} {...props}>
      {label}
    </Link>
  );
}
