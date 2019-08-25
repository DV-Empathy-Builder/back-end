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
            categories
                .string('category_name')
                .notNullable()
                .unique();
        })
        .createTable('budget_names', budget_names => {
            budget_names.increments('budget_name_id');
            budget_names.string('budget_name').notNullable();
            budget_names.timestamps(true, true);
        })
        .createTable('recurring_budget', recurring_budget => {
            recurring_budget.increments('recurring_item_id');
            recurring_budget
                .integer('amount')
                .unsigned()
                .notNullable()
                .defaultTo(0);
            recurring_budget
                .integer('user_id')
                .unsigned()
                .notNullable()
                .references('user_id')
                .inTable('users')
                .onDelete('CASCADE')
                .onUpdate('CASCADE');
            recurring_budget
                .integer('category_id')
                .unsigned()
                .notNullable()
                .references('category_id')
                .inTable('categories')
                .onDelete('CASCADE')
                .onUpdate('CASCADE');
        })
        .createTable('relocation_budget', relocation_budget => {
            relocation_budget.increments('recurring_item_id');
            relocation_budget
                .integer('amount')
                .unsigned()
                .notNullable()
                .defaultTo(0);
            relocation_budget
                .integer('user_id')
                .unsigned()
                .notNullable()
                .references('user_id')
                .inTable('users')
                .onDelete('CASCADE')
                .onUpdate('CASCADE');
            relocation_budget
                .integer('category_id')
                .unsigned()
                .notNullable()
                .references('category_id')
                .inTable('categories')
                .onDelete('CASCADE')
                .onUpdate('CASCADE');
            relocation_budget
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
        .dropTableIfExists('recurring_budget')
        .dropTableIfExists('relocation_budget')
        .dropTableIfExists('users')
        .dropTableIfExists('categories')
        .dropTableIfExists('budget_names');
};
