import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.string('uid').notNullable().unique().index();
    table.string('username').unique().index();
    table.string('email').unique().index();
    table.string('phone').unique().index();
    table.text('password', 'longtext');
    table.string('pin');
    table.timestamps(true, false);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('users');
}
