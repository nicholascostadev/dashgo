import {
	createServer,
	Factory,
	Model,
	Response,
	ActiveModelSerializer,
} from 'miragejs';
import { faker } from '@faker-js/faker';

type User = {
	name: string;
	email: string;
	created_at: string;
};

export function makeServer() {
	const server = createServer({
		serializers: {
			application: ActiveModelSerializer,
		},
		models: {
			user: Model.extend<Partial<User>>({}),
		},

		factories: {
			// generate mass amount of users(for example)
			user: Factory.extend({
				name(i: number) {
					return `User ${i + 1}`;
				},
				email() {
					return faker.internet.email().toLowerCase();
				},
				createdAt() {
					return faker.date.recent(10);
				}, // there is no problem for it to be camelCase because MirageJS understands it as snake_case
			}),
		},

		seeds(server) {
			// create basic data for testing
			server.createList('user', 200);
		},

		routes() {
			this.namespace = 'api'; // base url
			this.timing = 750; // to simulate the time we have to wait for response

			this.get('/users', function (schema, request) {
				const { page = 1, per_page = 10 } = request.queryParams;

				const total = schema.all('user').length;

				const pageStart = (Number(page) - 1) * Number(per_page);
				const pageEnd = pageStart + Number(per_page);

				const users = this.serialize(schema.all('user'))
					.users.sort((a, b) => a.cratedAt - b.createdAt)
					.slice(pageStart, pageEnd);

				return new Response(
					200,
					{ 'x-total-count': String(total) },
					{ users }
				);
			});

			this.get('/users/:id');
			this.post('/users');

			this.namespace = ''; // reset base url because of Next
			this.passthrough();
			// make all requests to '/api' pass through mirage
			// and if they're not detected from the routes we created, they will
			// go to the route without doing anything
		},
	});
	return server;
}
