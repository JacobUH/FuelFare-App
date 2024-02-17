interface Props {
  children: string;
}

export const Navbar = ({ children }: Props) => {
  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container">
        {/* Home icon on the left */}
        <a className="navbar-brand" href="#">
          <img src="/images/Home.png" width="30" height="24" />
        </a>

        {/* Company logo and title in the middle */}
        <a className="navbar-brand">
          {/*<img
              src="/images/gas.jpg"
              alt={children}
              width="30"
              height="24"
              className="mr-2"
             />*/}
          {children}
        </a>

        {/* Contributors icon on the right */}
        <a className="navbar-brand" href="#">
          <img src="/images/Order.png" alt={children} width="30" height="24" />
        </a>

        {/* Settings icon on the edge next to the contributors icon */}
        <a className="navbar-brand" href="#">
          <img src="/images/Filter.png" alt={children} width="30" height="24" />
        </a>
      </div>
    </nav>
  );
};
