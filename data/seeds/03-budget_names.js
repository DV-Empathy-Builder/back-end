exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('budget_names')
        .del()
        .then(function() {
            // Inserts seed entries
            return knex('budget_names').insert([
                { budget_name: 'Denver' },
                { budget_name: "Aunt Sally's" },
                { budget_name: 'Sell car' },
            ]);
        });
};
