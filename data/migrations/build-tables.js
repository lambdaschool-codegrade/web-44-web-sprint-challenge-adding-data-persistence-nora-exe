exports.up = async function (knex) {
    await knex.schema
/** A project is what needs to be done and is stored in a projects table with the following columns:
        project_id - primary key
        project_name - required
        project_description - optional
        project_completed - the database defaults it to false (integer 0) if not provided
*/
        .createTable('projects', (table) => {
            table.increments('project_id')
            table.string('project_name', 128).notNullable()
            table.string('project_description')
            table.integer('project_completed').defaultTo(0)
        })
/** A resource is anything needed to complete a project and is stored in a resources table with the following columns:
        resource_id - primary key
        resource_name - required and unique
        resource_description - optional
 */
        .createTable('resources', (table) => {
            table.increments('resource_id')
            table.string('resource_name', 128).unique().notNullable()
            table.string('resource_description')
        })
/* A task is one of the steps needed to complete a project and is stored in a tasks table with the following columns:
        task_id - primary key
        task_description - required
        task_notes - optional
        task_completed - the database defaults it to false (integer 0) if not provided
        project_id - required and points to an actual project_id in the projects table
*/
        .createTable('tasks', (table) => {
            table.increments('task_id')
            table.string('task_description').notNullable()
            table.string('task_notes')
            table.integer('task_completed').defaultTo(0)
            table.integer('project_id') // foreign key ref. projects
                .unsigned()
                .notNullable()
                .references('project_id')
                .inTable('projects')
                .onDelete('CASCADE') // normally restricted
                .onUpdate('CASCADE')
        })
/*  A resource assignment connects a resource and a project, and is stored in a project_resources table. You decide what columns to use.
*/
        .createTable('project_resources', (table) => {
            table.increments()
            table.integer('project_id') // foreign key ref. projects
                .unsigned()
                .notNullable()
                .references('project_id')
                .inTable('projects')
                .onDelete('CASCADE')
                .onUpdate('CASCADE')        
            table.integer('resource_id') // foreign key ref. resources
                .unsigned()
                .notNullable()
                .references('resource_id')
                .inTable('resources')
                .onDelete('CASCADE')
                .onUpdate('CASCADE')
        })

}

exports.down = function (knex) {
    return knex.schema
    .dropTableIfExists('project_resources')
    .dropTableIfExists('tasks')
    .dropTableIfExists('resources')
    .dropTableIfExists('projects')
};
