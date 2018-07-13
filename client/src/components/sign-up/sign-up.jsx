import * as React from "react"
import Navigation from "../navigation/navigation"
import gql from "graphql-tag"
import { Mutation } from "react-apollo"
import "./sign-up.css"

const SIGN_UP = gql`
  mutation signup(
    $name: String!
    $username: String!
    $email: String!
    $password: String!
  ) {
    signup(
      name: $name
      username: $username
      email: $email
      password: $password
    ) {
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

class SignUp extends React.Component {
  state = {
    email: "",
    name: "",
    password: "",
    username: ""
  }

  render() {
    return (
      <div>
        <Navigation history={this.props.history} />
        <div className="signup-form">
          <Mutation mutation={SIGN_UP}>
            {signup => {
              return (
                <form
                  onSubmit={async e => {
                    //this is executed when we submit
                    e.preventDefault()
                    const { data } = await signup({
                      variables: {
                        email: this.state.email,
                        name: this.state.name,
                        password: this.state.password,
                        username: this.state.username
                      }
                    })

                    localStorage.setItem("token", data.signup.token)
                    localStorage.setItem("user", data.signup.user.name)
                    this.props.history.push("/login")
                  }}
                >
                  <div className="signup">
                    <input
                      type="text"
                      onChange={e => this.setState({ name: e.target.value })}
                      placeholder="name"
                    />
                    <input
                      type="text"
                      onChange={e =>
                        this.setState({ username: e.target.value })
                      }
                      placeholder="username"
                    />
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
                  <button type="submit">Sign Up</button>
                </form>
              )
            }}
          </Mutation>
        </div>
      </div>
    )
  }
}

export default SignUp
