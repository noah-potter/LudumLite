import { ApolloServer, makeExecutableSchema } from 'apollo-server'
import { Context } from './data-sources/context'
import CommentAPI from './data-sources/comment-api'
import EventAPI from './data-sources/event-api'
import EventIdeaAPI from './data-sources/event-idea-api'
import GameAPI from './data-sources/game-api'
import PostAPI from './data-sources/post-api'
import UserAPI from './data-sources/user-api'
import { typeDefs } from './schema'
import { Resolvers } from './__generated__/schema-types'
import ImageAPI from './data-sources/image-api'

const resolvers: Resolvers<Context> = {
  Query: {
    me(_, __, context) {
      return context.dataSources.userApi.me()
    },
    user(_, { input: { id } }, context) {
      return context.dataSources.userApi.getUser(id)
    },
    post(_, { input: { id } }, context) {
      return context.dataSources.postApi.getPost(id)
    },
    searchPosts(_, args, context) {
      return context.dataSources.postApi.searchPosts(args)
    },
    featuredEvent(_, __, context) {
      return context.dataSources.eventApi.getFeaturedEvent()
    },
    event(_, { input: { id } }, context) {
      return context.dataSources.eventApi.getEvent(id)
    },
  },
  Mutation: {
    login(_, { input: { email, password } }, context) {
      return context.dataSources.userApi.login(email, password)
    },
    lovePost(_, { input: { id } }, context) {
      return context.dataSources.postApi.lovePost(id)
    },
    unlovePost(_, { input: { id } }, context) {
      return context.dataSources.postApi.unlovePost(id)
    },
    editPost(_, { input }, context) {
      return context.dataSources.postApi.editPost(input)
    },
    createPost(_, { input }, context) {
      return context.dataSources.postApi.createPost(input)
    },
    publishPost(_, { input: { id } }, context) {
      return context.dataSources.postApi.publishPost(id)
    },
    loveComment(_, { input: { id } }, context) {
      return context.dataSources.commentApi.loveComment(id)
    },
    unloveComment(_, { input: { id } }, context) {
      return context.dataSources.commentApi.unloveComment(id)
    },
    addComment(_, { input }, context) {
      return context.dataSources.commentApi.addComment(input)
    },
    editComment(_, { input }, context) {
      return context.dataSources.commentApi.editComment(input)
    },
    joinEvent(_, __, context) {
      return context.dataSources.eventApi.joinEvent()
    },
    addEventIdea(_, { input }, context) {
      return context.dataSources.eventIdeaApi.addEventIdea(input)
    },
    deleteEventIdea(_, { input }, context) {
      return context.dataSources.eventIdeaApi.deleteEventIdea(input)
    },
    editEventIdea(_, { input }, context) {
      return context.dataSources.eventIdeaApi.editEventIdea(input)
    },
    approveEventIdea(_, { input }, context) {
      return context.dataSources.eventIdeaApi.approveEventIdea(input)
    },
    rejectEventIdea(_, { input }, context) {
      return context.dataSources.eventIdeaApi.rejectEventIdea(input)
    },
    flagEventIdea(_, { input }, context) {
      return context.dataSources.eventIdeaApi.flagEventIdea(input)
    },
    editGame(_, { input }, context) {
      return context.dataSources.gameApi.editGame(input)
    },
    addFriend(_, { input }, context) {
      return context.dataSources.userApi.addFriend(input.id)
    },
    addFriendAndAddToGame(_, { input }, context) {
      return context.dataSources.userApi.addFriendAndAddToTeam(input.id)
    },
    addUserToGame(_, { input }, context) {
      return context.dataSources.gameApi.addUserToGame(input)
    },
    removeUserFromGame(_, { input }, context) {
      return context.dataSources.gameApi.removeUserFromGame(input)
    },
    async uploadImage(_, { file }, context) {
      return context.dataSources.imageApi.uploadImage(file)
    },
  },
  Post: {
    author(post, __, context) {
      return context.dataSources.userApi.getUser(post.authorId)
    },
    comments(post, __, context) {
      return context.dataSources.commentApi.getCommentsForPost(post.id)
    },
    myCommentLove(post, __, context) {
      return context.dataSources.commentApi.getMyLovedCommentsForPost(post.id)
    },
  },
  Comment: {
    author(comment, __, context) {
      return context.dataSources.userApi.getUser(comment.authorId)
    },
  },
  Event: {
    currentUserGameId(_, __, context) {
      return context.dataSources.eventApi.getCurrentUserGameId()
    },
    async currentUserGame(_, __, context) {
      const gameId = await context.dataSources.eventApi.getCurrentUserGameId()
      console.log(gameId)

      if (gameId) {
        return context.dataSources.gameApi.getGame(gameId)
      }

      return null
    },
    myEventIdeas(event, __, context) {
      return context.dataSources.eventIdeaApi.getMyEventIdeas(event.id)
    },
    eventIdeas(event, __, context) {
      return context.dataSources.eventIdeaApi.getEventIdeas(event.id)
    },
  },
  Me: {
    lovedPosts(_, __, context) {
      return context.dataSources.userApi.getMyLovedPosts()
    },
    userIdsImFollowing(_, __, context) {
      return context.dataSources.userApi.getUserIdsImFollowing()
    },
    async usersImFollowing(_, __, context) {
      const userIdsImFollowing = await context.dataSources.userApi.getUserIdsImFollowing()
      return context.dataSources.userApi.getUsers(userIdsImFollowing || [])
    },
    userIdsFollowingMe(_, __, context) {
      return context.dataSources.userApi.getUserIdsFollowingMe()
    },
    async usersFollowingMe(_, __, context) {
      const userIdsFollowingMe = await context.dataSources.userApi.getUserIdsFollowingMe()
      return context.dataSources.userApi.getUsers(userIdsFollowingMe || [])
    },
  },
  AddFriendSuccess: {
    user(response, __, context) {
      return context.dataSources.userApi.getUser(response.userId)
    },
  },
  AddFriendAndAddToGameSuccess: {
    game(response, __, context) {
      return context.dataSources.gameApi.getGame(response.gameId)
    },
    user(response, __, context) {
      return context.dataSources.userApi.getUser(response.userId)
    },
  },
  AddUserToGameSuccess: {
    game(response, __, context) {
      return context.dataSources.gameApi.getGame(response.gameId)
    },
    user(response, __, context) {
      return context.dataSources.userApi.getUser(response.userId)
    },
  },
  RemoveUserFromGameSuccess: {
    game(response, __, context) {
      return context.dataSources.gameApi.getGame(response.gameId)
    },
    user(response, __, context) {
      return context.dataSources.userApi.getUser(response.userId)
    },
  },
  Game: {
    author(game, __, context) {
      return context.dataSources.userApi.getUser(game.authorId)
    },
    teamUsers(game, __, context) {
      return context.dataSources.gameApi.getTeamUsers(game.id)
    },
  },
  EditGameSuccess: {
    game(response, __, context) {
      return context.dataSources.gameApi.getGame(response.gameId)
    },
  },
  LovePostSuccess: {
    me(_, __, context) {
      return context.dataSources.userApi.me()
    },
  },
  UnlovePostSuccess: {
    me(_, __, context) {
      return context.dataSources.userApi.me()
    },
  },
  LoveCommentSuccess: {
    post(response, __, context) {
      return context.dataSources.postApi.getPost(response.comment.postId)
    },
  },
  UnloveCommentSuccess: {
    post(response, __, context) {
      return context.dataSources.postApi.getPost(response.comment.postId)
    },
  },
  JoinEventSuccess: {
    featuredEvent(_, __, context) {
      return context.dataSources.eventApi.getFeaturedEvent()
    },
  },
  // DeleteEventIdeaSuccess: {
  //   async eventIdea(response, __, context) {
  //     const eventIdea = await context.dataSources.eventIdeaApi.getMyEventIdea({
  //       eventId: response.eventId,
  //       id: response.eventIdeaId,
  //     })

  //     return eventIdea ||
  //   },
  // },
  EventPhase: {
    ThemeSubmission: 1,
    ThemeSlaughter: 2,
    ThemeVoting: 4,
    EventRunning: 5,
    GameVoting: 6,
    Results: 7,
  },
}

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
  resolverValidationOptions: {
    requireResolversForResolveType: false,
  },
})

new ApolloServer({
  schema,
  context: ({ req: { headers } }): Context =>
    (({
      authToken: headers.authorization,
      loaders: {
        postLoader: undefined,
      },
    } as any) as Context),
  dataSources: () => ({
    postApi: new PostAPI(),
    commentApi: new CommentAPI(),
    userApi: new UserAPI(),
    eventApi: new EventAPI(),
    eventIdeaApi: new EventIdeaAPI(),
    gameApi: new GameAPI(),
    imageApi: new ImageAPI(),
  }),
  engine: {
    apiKey: 'service:ldjam:S8IzjK8QYWQyOeLhjtuFvA',
  },
})
  .listen()
  .then(({ url }) => {
    console.log(`\nServer ready at ${url}`)
  })
