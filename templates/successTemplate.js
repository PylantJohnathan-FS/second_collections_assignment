const customer = require('../api/model/customer');

const customerTemplate = (res, result, message, status) => {
    return res.status(status).json({
        message: message,
        customer: result,
        status: status,
    });
};

const customerDeletedTemplate = (res, result, message, status) => {
    return res.status(status).json({
        message: message,
        customer:result[{
            Name: result.firstName,
            Surname: result.lastName,
            motorcycle: result.motorcycle,
            id: result.id,
        }],
        status: status,
    });
};

module.exports = customerTemplate, customerDeletedTemplate;