const bcrypt = require('bcrypt');
const Customer = require('../models/Customer');

module.exports = {
    async customerLogin(req, res){
        try {
            const { email, password } = req.body;
            if(!email || !password){
                return res.status(200).json({message: "Required field missing!"});
            }
            const customer = await Customer.findOne({customer_email: email});
            if(!customer){
                return res.status(200).json({message: "email not found! Do you want to login instead?"})
            }
            
            if (customer && await bcrypt.compare(password, customer.customer_password)){
                const customerResponse = {
                    _id: customer._id,
                    email: customer.customer_email,
                    building_number: customer.building_number,
                    street: customer.street,
                    city: customer.city,
                    state: customer.state,
                    customer_phone_number : customer.customer_phone_number,
                    passport_number : customer.passport_number,
                    passport_expiration: customer.passport_expiration,
                    passport_country : customer.passport_country,
                    date_of_birth: customer.date_of_birth
                }
                console.log("here")
                return res.json(customerResponse);
            }
        } catch (error) {
            throw Error(`Error while Authenticating user ${error}`);
        }
    }
}