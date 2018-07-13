import * as React from "react"
import { Link } from "react-router-dom"
import "./tweet.css"

interface Props {
  text: string
  author: User
}
interface User {
  id: string
  name: string
  username: string
  email: string
}

class Tweet extends React.Component<Props> {
  render() {
    return (
      <div className="tweet">
        <div className="tweet-text">{this.props.text}</div>
        <div className="tweet-author">
          <Link className="author" to={"/" + this.props.author.username}>
            {this.props.author.name}
          </Link>
        </div>
      </div>
    )
  }
}

export default Tweet
