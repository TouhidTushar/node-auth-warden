import fs from 'fs';
import path from 'path';
import { Knex } from 'knex';

import Logger from './logger';

const MIGRATION_SEQUENCE = 1; // TODO: Change this to the latest migration sequence

export default {
  synchronizeMigrationDir: async function (dbPath: string): Promise<string[]> {
    const srcDir = path.join(__dirname, 'db', 'migrations');
    const destDir = path.join(dbPath, 'migrations');

    try {
      await fs.promises.access(destDir); // Check if the destination directory exists
    } catch (error) {
      try {
        await fs.promises.mkdir(destDir); // If it doesn't, create it
      } catch (err) {
        Logger.error('Failed to create migrations directory', err);
      }
    }

    // Synchronize the migration directories
    const [filesInSrc, filesInDest] = await Promise.all([
      fs.promises.readdir(srcDir),
      fs.promises.readdir(destDir),
    ]);

    // Copy files from src to dest if they don't exist in dest
    await Promise.all(
      filesInSrc.map(async (file) => {
        if (!filesInDest.includes(file)) {
          const srcPath = path.join(srcDir, file);
          const destPath = path.join(destDir, file);
          await fs.promises.copyFile(srcPath, destPath);
        }
      }),
    );

    // Copy files from dest to src if they don't exist in src
    const tempFiles: string[] = [];
    await Promise.all(
      filesInDest.map(async (file) => {
        if (!filesInSrc.includes(file)) {
          tempFiles.push(file);
          const srcPath = path.join(srcDir, file);
          const destPath = path.join(destDir, file);
          await fs.promises.copyFile(destPath, srcPath);
        }
      }),
    );

    // Return the files that were copied from dest to src
    return tempFiles;
  },

  migrate: async function (knex: Knex, dbPath: string): Promise<void> {
    try {
      Logger.info(
        `Migrating database to currently installed version...\n[Compatible Migration Sequence: ${MIGRATION_SEQUENCE}]`,
      );

      // Sync migration directory to handle version downgrades
      const filesToUnsync = await this.synchronizeMigrationDir(dbPath);

      /* Rollback operation logic
      Checks if rollback is required due to version downgrade */
      const wizard = 'node_auth_warden_wizard';
      const wizardPresent: boolean = await knex.schema.hasTable(wizard);
      if (wizardPresent) {
        const result = await knex(wizard)
          .where('migration_sequence', '>', MIGRATION_SEQUENCE)
          .count()
          .first();
        const count = (result?.['count(*)'] || 0) as number;
        // Need to rollback count times
        if (count > 0) {
          let rollbackCount = count;
          while (rollbackCount > 0) {
            await knex.migrate.rollback();
            rollbackCount--;
          }
          // Delete the wizard entry for the rolled back migrations
          await knex(wizard)
            .delete()
            .where('migration_sequence', '>', MIGRATION_SEQUENCE);
          // Delete the rolled back migration files from the src directory
          await Promise.all(
            filesToUnsync.map(async (file) => {
              const srcDir = path.join(__dirname, 'db', 'migrations');
              const srcPath = path.join(srcDir, file);
              await fs.promises.unlink(srcPath);
            }),
          );
        }
      }

      /* Migrates the database to latest state */
      await knex.migrate.latest();
      const alreadyExists = await knex(wizard)
        .where('migration_sequence', MIGRATION_SEQUENCE)
        .first();
      if (!alreadyExists) {
        await knex(wizard).insert({ migration_sequence: MIGRATION_SEQUENCE });
      }

      Logger.info('Database migration successful');
    } catch (err) {
      Logger.error('Failed to migrate database', err);
    }
  },
};
