import DataLoader from 'dataloader'
import { DataSourceConfig } from 'apollo-datasource'
import sort from 'dataloader-sort'
import BaseAPI from './base-api'
import { Context } from './context'
import { maxBy, last } from 'lodash'
import {
  EventIdea,
  JoinEventResponse,
  AddEventIdeaResponse,
  AddEventIdeaInput,
  IdInput,
  DeleteEventIdeaResponse,
  EditEventIdeaInput,
  EditEventIdeaResponse,
  DeleteEventIdeaInput,
  UnauthorizedResponse,
} from '../__generated__/schema-types'
import { unauthorizedResponse } from './const'
import { filterOutErrorsFromResponses } from './utils'

export type ApiEventIdeasDto = {
  [key: number]: string
}

function apiEventIdeasToEventIdeas(eventIdeas: ApiEventIdeasDto): EventIdea[] {
  return Object.entries(eventIdeas).map(([id, name]) => ({
    __typename: 'EventIdea',
    id: parseInt(id),
    name: name as string,
  }))
}

export default class EventIdeaAPI extends BaseAPI {
  // constructor() {
  //   super()
  // }

  // initialize(config: DataSourceConfig<Context>) {
  //   super.initialize(config)

  //   if (!config.context.loaders.eventLoader) {
  //     config.context.loaders.eventLoader = new DataLoader(async (keys) => {
  //       const results = await this.get(`vx/node2/get/${keys.join('+')}`)

  //       return sort(keys, results.node.map(apiEventIdeaToEventIdea))
  //     })
  //   }
  // }
  async getEventIdeas(eventId: number): Promise<EventIdea[]> {
    const response = await this.get(`vx/theme/idea/vote/get/${eventId}`)

    const ideas = apiEventIdeasToEventIdeas(response.ideas)

    return ideas
  }

  async getMyEventIdeas(eventId: number): Promise<EventIdea[]> {
    const response = await this.get(`vx/theme/idea/getmy/${eventId}`)

    const ideas = apiEventIdeasToEventIdeas(response.ideas)

    return ideas
  }

  async getMyEventIdea({
    eventId,
    id,
  }: {
    eventId: number
    id: number
  }): Promise<EventIdea | undefined> {
    const ideas = await this.getMyEventIdeas(eventId)
    const idea = ideas.find((idea) => idea.id === id)

    return idea
  }

  async addEventIdea({
    eventId,
    name,
  }: AddEventIdeaInput): Promise<AddEventIdeaResponse> {
    // TODO Get the event and make sure there aren't took many theme ideas already.
    // The create endpoint simply returns the existing ideas without error even if
    // you try to add too many. This isn't a problem now since the client can limit the number

    try {
      const response = await this.post(`vx/theme/idea/add/${eventId}`, {
        idea: name,
      })

      return {
        __typename: 'AddEventIdeaSuccess',
        success: true,
        eventIdea: last(apiEventIdeasToEventIdeas(response.ideas)) as EventIdea,
      }
    } catch (e) {
      console.error(e)
      return unauthorizedResponse
    }
  }

  async deleteEventIdea({
    eventId,
    eventIdeaId,
  }: DeleteEventIdeaInput): Promise<DeleteEventIdeaResponse> {
    try {
      this.post(`vx/theme/idea/remove/${eventId}`, {
        id: eventIdeaId,
      })

      return {
        __typename: 'DeleteEventIdeaSuccess',
        success: true,
        eventId,
        eventIdeaId,
      }
    } catch (e) {
      console.error(e)

      return unauthorizedResponse
    }
  }

  async editEventIdea({
    id,
    eventId,
    name,
  }: EditEventIdeaInput): Promise<EditEventIdeaResponse> {
    try {
      await this.deleteEventIdea({ eventId, eventIdeaId: id })
      const eventIdeaResponse = await this.addEventIdea({ eventId, name })

      if (eventIdeaResponse.__typename === 'AddEventIdeaSuccess') {
        return {
          __typename: 'EditEventIdeaSuccess',
          success: true,
          eventIdeaId: eventIdeaResponse.eventIdea.id,
          eventIdea: eventIdeaResponse.eventIdea,
        }
      }

      return unauthorizedResponse
    } catch (e) {
      console.error(e)
      return unauthorizedResponse
    }
  }

  // async getFeaturedEvent(): Promise<Event> {
  //   const rootNodeResponse = await this.get(`vx/node2/get/1`)
  //   const eventId = parseInt(rootNodeResponse.node[0].meta.featured)

  //   return this.context.loaders.eventLoader.load(eventId)
  // }

  // async getEvent(id: number): Promise<Event> {
  //   return this.context.loaders.eventLoader.load(id)
  // }

  // async joinEvent(): Promise<JoinEventResponse> {
  //   const event = await this.getFeaturedEvent()

  //   if (event.__typename === 'Event') {
  //     try {
  //       const joinEventResponse = await this.post(
  //         `vx/node/add/${event.id}/item/game`
  //       )
  //       const gameId = joinEventResponse.id

  //       return {
  //         __typename: 'JoinEventSuccess',
  //         success: true,
  //         gameId,
  //       }
  //     } catch (e) {
  //       console.error(e)
  //       return unauthorizedResponse
  //     }
  //   }

  //   return unauthorizedResponse
  // }

  // async getCurrentUserGameId(): Promise<Event['currentUserGameId']> {
  //   const event = await this.getFeaturedEvent()

  //   if (event.__typename === 'Event') {
  //     const response = await this.get(`vx/node/what/${event.id}`)

  //     if (response.what.length === 1) {
  //       return response.what[0] || null
  //     } else {
  //       const games = await this.context.loaders.gameLoader.loadMany(
  //         response.what
  //       )
  //       console.log(games)
  //       const lastGameModified = maxBy(
  //         filterOutErrorsFromResponses(games),
  //         'modifiedDate'
  //       )

  //       return lastGameModified?.id || null
  //     }
  //   }

  //   return null
  // }
}
