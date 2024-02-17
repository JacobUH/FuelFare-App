interface Props {
  color?: "primary" | "secondary" | "danger";
  children: string;
  onClick: () => void;
}

const Button = ({ color = "primary", children, onClick }: Props) => {
  return (
    <button color="react" className={"btn btn-" + color} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
