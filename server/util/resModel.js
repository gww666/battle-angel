class BaseModel {
    constructor(data, message) {
        data && (this.data = data)
        message && (this.message = message)
    }
}

class SucModel extends BaseModel {
    constructor(data, message) {
        super(data, message);
        this.errno = 1
    }
}

class ErrModel extends BaseModel {
    constructor(data, message) {
        super(data, message);
        this.errno = 0
    }
}

module.exports = {
    SucModel,
    ErrModel
}