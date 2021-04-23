const Customer = require('../modules/Customer');
const bcrypt = require('bcrypt');
module.exports = {
    async createCustomer(req, res){
        try {
                console.log(req.body);
                const {customer_name, customer_email, customer_password, building_number,
                    street, city, state, customer_phone_number, passport_number, passport_expiration,
                    passport_country, date_of_birth} = req.body;

                const existentCustomer = await Customer.findOne({customer_email});

                if(!existentCustomer){
                    const hashedPassword = await bcrypt.hash(customer_password, 10);
                    const customer = Customer.create({
                        customer_name,
                        customer_email,
                        customer_password: hashedPassword,
                        building_number,
                        street,
                        city,
                        state,
                        customer_phone_number,
                        passport_number,
                        passport_expiration,
                        passport_country,
                        date_of_birth
                    });
                    return res.json(customer);
                }
                return res.status(400).json({
                    message: `email/user already exist! do you want to login instead?`
                });
                

        } catch(error){
            throw Error(`Error while registering a new user: ${error}`);
        }
    },

    async getCustomerById(req, res){
        const {customerID} = req.params;
        try {
            const customer = await Customer.findById(customerID);
            return res.json(customer);
        } catch (error) {
            return res.status(400).json({
                message: `Customer ID does not exist, Do you want to register instead?`
            });
        }
    }


}