import * as React from "react"
import Navigation from "../navigation/navigation"
import gql from "graphql-tag"
import { Mutation } from "react-apollo"
import "./login-page.css"

const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        email
        username
        name
      }
    }
  }
`

class LoginPage extends React.Component {
  state = {
    email: "",
    password: ""
  }

  render() {
    return (
      <div>
        <Navigation history={this.props.history} />
        <div className="login-form">
          <Mutation mutation={LOGIN}>
            {login => {
              return (
                <form
                  onSubmit={async e => {
                    //this is executed when we submit
                    e.preventDefault()
                    const { data } = await login({
                      variables: {
                        email: this.state.email,
                        password: this.state.password
                      }
                    })

                    localStorage.setItem("token", data.login.token)
                    localStorage.setItem("user", data.login.user.name)
                    this.props.history.push("/")
                  }}
                >
                  <div>
                    <input
                      type="text"
                      onChange={e => this.setState({ email: e.target.value })}
                      placeholder="email"
                    />
                    <input
                      type="password"
                      onChange={e =>
                        this.setState({ password: e.target.value })
                      }
                      placeholder="password"
                    />
                  </div>
                  <button type="submit">Login</button>
                </form>
              )
            }}
          </Mutation>
        </div>
      </div>
    )
  }
}

export default LoginPage
