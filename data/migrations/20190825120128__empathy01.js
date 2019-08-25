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
        .createTable('categories', cats => {
            cats.increments();
            cats.string('category_name')
                .notNullable()
                .unique();
        })
        .createTable('budget_names', bname => {
            bname.increments();
            bname.string('budget_name').notNullable();
        })
        .createTable('budget_items', bdgt => {
            bdgt.increments('budget_item_id');
            bdgt.integer('amount')
                .unsigned()
                .notNullable()
                .defaultTo(0);
            bdgt.integer('user_id')
                .unsigned()
                .notNullable()
                .references('user_id')
                .inTable('users')
                .onDelete('CASCADE')
                .onUPDATE('CASCADE');
            bdgt.integer('category_id')
                .unsigned()
                .notNullable()
                .references('category_id')
                .inTable('categories')
                .onDelete('CASCADE')
                .onUPDATE('CASCADE');
            bdgt.integer('budget_name_id')
                .unsigned()
                .notNullable()
                .references('budget_name_id')
                .inTable('budget_names')
                .onDelete('CASCADE')
                .onUPDATE('CASCADE');
            bdgt.boolean('isRecurring')
                .notNullable()
                .defaultTo(1);
        });
};

exports.down = function(knex) {};
