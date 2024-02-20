interface FooterProps {
  color?: string; // Optional background color prop
}

export const Footer: React.FC<FooterProps> = ({ color }) => {
  const footerStyle: React.CSSProperties = {
    color: color || "#FFFFFF",
  };

  return (
    <footer
      className="footer fixed-bottom d-flex justify-content-center text-center"
      style={footerStyle}
    >
      <div className="container">
        <p>Generic Gas Company and Copyright © {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
};
