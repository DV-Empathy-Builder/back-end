exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('relocation_budget')
        .truncate()
        .then(function() {
            // Inserts seed entries
            return knex('relocation_budget').insert([
                { user_id: 1, category_id: 19, budget_name_id: 1, amount: 250 },
                { user_id: 2, category_id: 19, budget_name_id: 2, amount: 200 },
                { user_id: 2, category_id: 19, budget_name_id: 3, amount: 150 },
                { user_id: 1, category_id: 20, budget_name_id: 1, amount: 950 },
                { user_id: 2, category_id: 20, budget_name_id: 2, amount: 750 },
                { user_id: 2, category_id: 20, budget_name_id: 3, amount: 0 },
                { user_id: 1, category_id: 21, budget_name_id: 1, amount: 150 },
                { user_id: 2, category_id: 21, budget_name_id: 2, amount: 150 },
                { user_id: 2, category_id: 21, budget_name_id: 3, amount: 150 },
                { user_id: 1, category_id: 22, budget_name_id: 1, amount: 50 },
                { user_id: 2, category_id: 22, budget_name_id: 2, amount: 250 },
                { user_id: 2, category_id: 22, budget_name_id: 3, amount: 500 },
                { user_id: 1, category_id: 23, budget_name_id: 1, amount: 0 },
                { user_id: 2, category_id: 23, budget_name_id: 2, amount: 0 },
                { user_id: 2, category_id: 23, budget_name_id: 3, amount: 450 },
                { user_id: 1, category_id: 24, budget_name_id: 1, amount: 750 },
                { user_id: 2, category_id: 24, budget_name_id: 2, amount: 750 },
                { user_id: 2, category_id: 24, budget_name_id: 3, amount: 750 },
                { user_id: 1, category_id: 25, budget_name_id: 1, amount: 25 },
                { user_id: 2, category_id: 25, budget_name_id: 2, amount: 0 },
                { user_id: 2, category_id: 25, budget_name_id: 3, amount: 0 },
                { user_id: 1, category_id: 26, budget_name_id: 1, amount: 0 },
                { user_id: 2, category_id: 26, budget_name_id: 2, amount: 0 },
                { user_id: 2, category_id: 26, budget_name_id: 3, amount: 0 },
                { user_id: 1, category_id: 27, budget_name_id: 1, amount: 0 },
                { user_id: 2, category_id: 27, budget_name_id: 2, amount: 125 },
                { user_id: 2, category_id: 27, budget_name_id: 3, amount: 0 },
                { user_id: 1, category_id: 28, budget_name_id: 1, amount: 200 },
                { user_id: 2, category_id: 28, budget_name_id: 2, amount: 50 },
                { user_id: 2, category_id: 28, budget_name_id: 3, amount: 175 },
                { user_id: 1, category_id: 29, budget_name_id: 1, amount: 0 },
                { user_id: 2, category_id: 29, budget_name_id: 2, amount: 0 },
                { user_id: 2, category_id: 29, budget_name_id: 3, amount: 0 },
            ]);
        });
};
