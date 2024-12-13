import "../compStyles/navbar.css";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import SearchIcon from "@mui/icons-material/Search";
function Navbar() {
  const navItems = [
    "iPhone",
    "iPad",
    "Mac",
    "Tablets",
    "Store",
    "Accessories",
    "Support",
    "Airpods",
  ];

  return (
    <>
      <header className="navbar-sec">
        <nav className="navbar">
          <img
            src="\assets\images\apple.png"
            alt="apple-icon"
            id="apple-icon"
          />
          <div className="nav-items">
            {navItems.map((item, i) => (
              <ul key={i} className="nav-i-ul">
                <li className="nav-i-li">{item}</li>
              </ul>
            ))}
          </div>
          <div className="action-icons">
            <SearchIcon
              style={{
                cursor: "pointer",
                opacity: "0.6",
              }}
              className="search-icon"
            />
            <ShoppingBagIcon
              style={{
                cursor: "pointer",
                opacity: "0.6",
              }}
              className="search-icon"
            />
          </div>
        </nav>
      </header>
    </>
  );
}

export default Navbar;
