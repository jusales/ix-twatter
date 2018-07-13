import * as React from "react"
import { Link } from "react-router-dom"
import "./navigation.css"

class Navigation extends React.Component {
  onLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    this.props.history.push("/login")
  }

  render() {
    const token = localStorage.getItem("token")
    return (
      <div className="navigation">
        <div className="link">
          <Link className="header" to="/">
            HOMEPAGE
          </Link>
        </div>

        <div className="link">
          {token ? (
            <button className="header" onClick={this.onLogout}>
              {" "}
              Logout{" "}
            </button>
          ) : (
            <Link className="hyperlink" to="/login">
              {" "}
              login{" "}
            </Link>
          )}
        </div>
        <div className="link">
          {token ? null : (
            <Link className="hyperlink" to="/signup">
              signup
            </Link>
          )}
        </div>
      </div>
    )
  }
}

export default Navigation
