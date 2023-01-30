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

const motorcycleTemplate = (res, result, message, status) => {
    return res.status(status).json({
        message: message,
        motorcycle: result,
        status: status,
    });
};

module.exports = customerTemplate, customerDeletedTemplate, motorcycleTemplate;