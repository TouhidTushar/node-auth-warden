import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('node_auth_warden_wizard', (table) => {
    table.increments('id').primary();
    table
      .integer('migration_sequence')
      .notNullable()
      .unsigned()
      .unique()
      .index();
    table.timestamp('migration_time').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('node_auth_warden_wizard');
}
