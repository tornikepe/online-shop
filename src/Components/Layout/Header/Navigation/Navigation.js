import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./Navigation.css";

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: true,
    };
  }

  mouseEnterHandler = () => {
    this.setState({ active: false });
  };

  mouseLeaveHandler = () => {
    this.setState({ active: true });
  };

  render() {
    const { active } = this.state;
    const { categories } = this.props;

    return (
      <nav>
        <ul className="navlist">
          {categories.map((category) => {
            return (
              <li key={category} className="navitem">
                <NavLink
                  to={`/${category === "all" ? "" : category}`}
                  className={({ isActive }) =>
                    `${"navlink"} ${active && isActive && "active"}`
                  }
                  onMouseEnter={this.mouseEnterHandler}
                  onMouseLeave={this.mouseLeaveHandler}
                >
                  {category}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
    );
  }
}

export default Navigation;
