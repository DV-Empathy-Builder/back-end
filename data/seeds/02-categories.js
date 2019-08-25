exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('categories')
        .truncate()
        .then(function() {
            // Inserts seed entries
            return knex('categories').insert([
                { category_name: 'Groceries' },
                { category_name: 'Restaurant Costs' },
                { category_name: 'Car Insurance' },
                { category_name: 'Car Payment' },
                { category_name: 'Gas' },
                { category_name: 'Health Insurance' },
                { category_name: 'Prescriptions' },
                { category_name: 'Therapy' },
                { category_name: 'Childcare' },
                { category_name: 'Loans' },
                { category_name: 'Credit Card Payments' },
                { category_name: 'Rent' },
                { category_name: 'Mortgage' },
                { category_name: 'Phone' },
                { category_name: 'Internet' },
                { category_name: 'Cable' },
                { category_name: 'Laundry' },
                { category_name: 'Clothes' },
                { category_name: 'Miscellaneous' },
                { category_name: 'Hotel' },
                { category_name: 'Deposits' },
                { category_name: 'Airline/Bus Tickets' },
                { category_name: 'Car Rental' },
                { category_name: 'Moving Truck' },
                { category_name: 'Storage Unit' },
                { category_name: 'Pets' },
                { category_name: 'Additional Security Measures' },
                { category_name: 'Cell Phone Disconnections Fees' },
                { category_name: 'Furniture and Appliances'}
            ]);
        });
};
