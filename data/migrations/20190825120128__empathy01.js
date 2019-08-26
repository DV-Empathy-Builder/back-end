exports.up = function(knex) {
    return knex.schema
        .createTable('users', users => {
            users.increments('user_id');
            users
                .string('username')
                .notNullable()
                .unique();
            users.string('password').notNullable();
        })
        .createTable('categories', categories => {
            categories.increments('category_id');
            categories.string('category_name').notNullable();
            categories.string('category_type').notNullable();
            categories
                .integer('user_id')
                .unsigned()
                .references('user_id')
                .inTable('users')
                .onDelete('CASCADE')
                .onUpdate('CASCADE');
        })
        .createTable('budget_names', budget_names => {
            budget_names.increments('budget_name_id');
            budget_names.string('budget_name').notNullable();
            budget_names.timestamps(true, true);
            budget_names
                .integer('user_id')
                .unsigned()
                .notNullable()
                .references('user_id')
                .inTable('users')
                .onDelete('CASCADE')
                .onUpdate('CASCADE');
        })
        .createTable('stored_budget_lines', stored_budget_lines => {
            stored_budget_lines.increments('line_id');
            stored_budget_lines
                .integer('amount')
                .unsigned()
                .notNullable()
                .defaultTo(0);
            stored_budget_lines
                .integer('user_id')
                .unsigned()
                .notNullable()
                .references('user_id')
                .inTable('users')
                .onDelete('CASCADE')
                .onUpdate('CASCADE');
            stored_budget_lines
                .integer('category_id')
                .unsigned()
                .notNullable()
                .references('category_id')
                .inTable('categories')
                .onDelete('CASCADE')
                .onUpdate('CASCADE');
            stored_budget_lines
                .integer('budget_name_id')
                .unsigned()
                .notNullable()
                .references('budget_name_id')
                .inTable('budget_names')
                .onDelete('CASCADE')
                .onUpdate('CASCADE');
        });
};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('stored_budget_lines')
        .dropTableIfExists('categories')
        .dropTableIfExists('budget_names')
        .dropTableIfExists('users');
};
