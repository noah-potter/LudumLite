import DataLoader from 'dataloader'
import { DataSourceConfig } from 'apollo-datasource'
import sort from 'dataloader-sort'
import BaseAPI from './base-api'
import { Context } from './context'
import { AuthenticationError } from 'apollo-server'
import { User, LoginResponse } from '../__generated__/schema-types'

export type ApiUserDto = {
  id: number
  created: string
  modified: string
  games: number
  posts: number
  name: string
  type: string
  path: string
  meta: {
    avatar: string
  }
}

function apiUserToUser(user: ApiUserDto): User {
  return {
    id: user.id,
    createdDate: user.created,
    modifiedDate: user.modified,
    numGames: user.games,
    numPosts: user.posts,
    name: user.name,
    type: user.type,
    profilePath: user.path,
    avatarPath: user.meta?.avatar,
  }
}

function getCookieValue(cookies: string, a: string) {
  var b = cookies.match('(^|[^;]+)\\s*' + a + '\\s*=\\s*([^;]+)')
  return b ? b.pop() : ''
}

export default class UserAPI extends BaseAPI {
  initialize(config: DataSourceConfig<Context>) {
    super.initialize(config)

    if (!config.context.loaders.userLoader) {
      config.context.loaders.userLoader = new DataLoader(async (keys) => {
        const results = await this.get(`vx/node2/get/${keys.join('+')}`)

        return sort(keys, results.node.map(apiUserToUser))
      })
    }
  }

  async login(email: string, password: string): Promise<LoginResponse> {
    try {
      const response = await this.post(
        'vx/user/login',
        `login=${email}&pw=${password}`,
        {
          headers: {
            'content-type': 'application/x-www-form-urlencoded',
            includeHeaders: 'true',
          },
          credentials: 'include',
        }
      )

      console.log({ response })

      const cookies = response._headers.get('set-cookie')

      return {
        __typename: 'LoginSuccessResponse',
        success: true,
        token: getCookieValue(cookies, 'SIDS') || '',
      }
    } catch (e) {
      return {
        __typename: 'LoginFailureResponse',
        success: false,
        message: 'The given username/password is incorrect.',
      }
    }
  }

  async me() {
    return apiUserToUser((await this.get('vx/user/get')).node)
  }

  async getUser(id: number) {
    return await this.context.loaders.userLoader.load(id)
  }
}
