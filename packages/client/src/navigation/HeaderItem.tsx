import classes from "./HeaderItem.module.css";

type HeaderItemProps = {
  link: string;
  label: string;
  active: boolean;
  onClick: React.MouseEventHandler<HTMLAnchorElement>;
};

export function HeaderItem({ link, label, active, onClick }: HeaderItemProps) {
  return (
    <a key={label} href={link} className={classes.link} data-active={active || undefined} onClick={onClick}>
      {label}
    </a>
  );
}
