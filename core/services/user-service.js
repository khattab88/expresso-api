import { urlencoded } from "body-parser";

/* TEST */
class UserService {
    constructor() {}

    get() {
        const promise = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, 3000);
        });

        return promise;
    }
}

module.exports = UserService;