import {
  ActiveModelSerializer,
  createServer,
  Factory,
  Model,
  Response,
} from 'miragejs'

import { faker } from '@faker-js/faker'

type User = {
  name: string
  email: string
  created_at: string
}

export const makeServer = () => {
  const server = createServer({
    serializers: {
      application: ActiveModelSerializer,
    },

    models: {
      user: Model.extend<Partial<User>>({}),
    },

    // filling fake database with data
    factories: {
      user: Factory.extend({
        name() {
          return faker.name.fullName()
        },
        email() {
          return faker.internet.email().toLowerCase()
        },
        createdAt() {
          return faker.date.recent(10)
        },
      }),
    },

    seeds(server) {
      server.createList('user', 200)
    },

    routes() {
      // "/api/ ..."
      this.namespace = 'api'
      this.timing = 750 // delay for response

      this.get('/users', function (schema, request) {
        const { page = 1, per_page: perPage = 10 } = request.queryParams as any

        const total = schema.all('user').length

        const pageStart = (Number(page) - 1) * Number(perPage)
        const pageEnd = pageStart + Number(perPage)

        // @ts-ignore
        const users = this.serialize(schema.all('user'))
          .users.sort(
            (a: any, b: any) =>
              new Date(a.created_at).getTime() -
              new Date(b.created_at).getTime()
          )
          .slice(pageStart, pageEnd)

        return new Response(200, { 'x-total-count': String(total) }, { users })
      })

      this.get('/users/:id')
      this.post('/users')

      // reset for it not to conflict with Next.js API routes
      this.namespace = ''
      this.passthrough()
    },
  })

  return server
}
