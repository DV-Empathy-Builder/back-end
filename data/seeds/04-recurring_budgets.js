exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('recurring_budget')
        .truncate()
        .then(function() {
            // Inserts seed entries
            return knex('recurring_budget').insert([
                { user_id: 1, category_id: 1, amount: 80 },
                { user_id: 2, category_id: 1, amount: 60 },
                { user_id: 1, category_id: 2, amount: 20 },
                { user_id: 2, category_id: 2, amount: 0 },
                { user_id: 1, category_id: 3, amount: 105 },
                { user_id: 2, category_id: 3, amount: 150 },
                { user_id: 1, category_id: 4, amount: 0 },
                { user_id: 2, category_id: 4, amount: 225 },
                { user_id: 1, category_id: 5, amount: 80 },
                { user_id: 2, category_id: 5, amount: 50 },
                { user_id: 1, category_id: 6, amount: 175 },
                { user_id: 2, category_id: 6, amount: 275 },
                { user_id: 1, category_id: 7, amount: 30 },
                { user_id: 2, category_id: 7, amount: 0 },
                { user_id: 1, category_id: 8, amount: 0 },
                { user_id: 2, category_id: 8, amount: 0 },
                { user_id: 1, category_id: 9, amount: 0 },
                { user_id: 2, category_id: 9, amount: 350 },
                { user_id: 1, category_id: 10, amount: 190 },
                { user_id: 2, category_id: 10, amount: 0 },
                { user_id: 1, category_id: 11, amount: 50 },
                { user_id: 2, category_id: 11, amount: 50 },
                { user_id: 1, category_id: 12, amount: 850 },
                { user_id: 2, category_id: 12, amount: 0 },
                { user_id: 1, category_id: 13, amount: 0 },
                { user_id: 2, category_id: 13, amount: 1050 },
                { user_id: 1, category_id: 14, amount: 50 },
                { user_id: 2, category_id: 14, amount: 50 },
                { user_id: 1, category_id: 15, amount: 50 },
                { user_id: 2, category_id: 15, amount: 50 },
                { user_id: 1, category_id: 16, amount: 0 },
                { user_id: 2, category_id: 16, amount: 0 },
                { user_id: 1, category_id: 17, amount: 20 },
                { user_id: 2, category_id: 17, amount: 20 },
                { user_id: 1, category_id: 18, amount: 50 },
                { user_id: 2, category_id: 18, amount: 50 },
            ]);
        });
};
