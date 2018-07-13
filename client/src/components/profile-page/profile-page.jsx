import * as React from "react"
import gql from "graphql-tag"
import { Tweet } from "../../types"
import { Query } from "react-apollo"
import TweetComponent from "../tweet/tweet"
import Navigation from "../navigation/navigation"

const MY_TWEETS = gql`
  query tweets($where: TweetWhereInput) {
    tweets(orderBy: createdAt_DESC, where: $where) {
      id
      text
      author {
        id
        name
        username
      }
    }
  }
`

class ProfilePage extends React.Component {
  render() {
    return (
      <div>
        <Navigation history={this.props.history} />
        <Query
          query={MY_TWEETS}
          variables={{
            where: {
              author: {
                username: this.props.match.params.user
              }
            }
          }}
        >
          {({ loading, error, data, refetch }) => {
            if (loading) {
              return "LOading..."
            }
            if (error) {
              return error
            }
            return (
              <div>
                {data.tweets.map(tweet => {
                  return (
                    <TweetComponent
                      key={tweet.id}
                      text={tweet.text}
                      author={tweet.author}
                    />
                  )
                })}
              </div>
            )
          }}
        </Query>
      </div>
    )
  }
}

export default ProfilePage
