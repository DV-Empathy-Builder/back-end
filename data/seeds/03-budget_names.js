exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('budget_names')
        .del()
        .then(function() {
            // Inserts seed entries
            return knex('budget_names').insert([
                { budget_name: 'Denver', user_id: 1 },
                { budget_name: "Aunt Sally's", user_id: 2 },
                { budget_name: 'Sell car', user_id: 2 },
            ]);
        });
};
