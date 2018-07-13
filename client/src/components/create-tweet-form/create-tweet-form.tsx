import * as React from "react"
import gql from "graphql-tag"
import { Mutation } from "react-apollo"
import { User } from "../../types"
import "./create-tweet-form.css"

const CREATE_TWEET = gql`
  mutation createTweet($text: String!) {
    createTweet(text: $text) {
      id
      text
      author {
        id
        name
        username
        email
      }
    }
  }
`

interface Props {
  refetchFeedTweets: any
  author: User
}

class CreateTweetForm extends React.Component<Props> {
  render() {
    let input: any

    return (
      <div>
        <Mutation mutation={CREATE_TWEET}>
          {(createTweet, { data }) => {
            return (
              <div>
                <form
                  onSubmit={async e => {
                    e.preventDefault()
                    await createTweet({
                      variables: {
                        text: input.value
                      }
                    })
                    this.props.refetchFeedTweets()
                    input.value = ""
                  }}
                >
                  <input
                    className="tweet-input"
                    ref={node => {
                      input = node
                    }}
                    placeholder={
                      "What's on your mind" +
                      (this.props.author ? this.props.author.name : "?")
                    }
                  />
                  <button type="submit">Tweet!</button>
                </form>
              </div>
            )
          }}
        </Mutation>
      </div>
    )
  }
}

export default CreateTweetForm
