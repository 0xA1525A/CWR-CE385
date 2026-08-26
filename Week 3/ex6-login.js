const SYS_CONFIGS = {
    MIN_ELIGIBLE_AGE: 18
};

const Database = class {
    static Users = [
        {
            username: "admin",
            password: "ce385pass",
            role: "professor",
            yearOfBirth: 1999,
            isActive: true
        },
        {
            username: "natthakit",
            password: "1234",
            role: "student",
            yearOfBirth: 2006,
            isActive: true
        },
        {
            username: "randomdude",
            password: "whyamihere",
            role: "student",
            yearOfBirth: 2005,
            isActive: false
        },
        {
            username: "iloveroblox",
            password: "6767676767",
            role: "student",
            yearOfBirth: 2014,
            isActive: true
        }
    ];
};

const UserRepository = class {
    static getByUsername = function(username) {
        return Database.Users.find(function(user) {
            return user.username === username;
        });
    };
};

const UserInputService = class {
    static normaliseWhitespace = function(input) {
        // supposed to do more things here but this is just demonstration.
        return input.trim();
    };
};

const UserService = class {
    static calculateAge = function(yearOfBirth) {
        return (new Date()).getUTCFullYear() - yearOfBirth;
    };
};

const AuthService = class {
    static isUsernameValid = function(username) {
        return (
            typeof username === "string"
        &&  username === UserInputService.normaliseWhitespace(username)
        &&  username.length > 0
        );
    };

    static isPasswordValid = function(password) {
        return (
            typeof password === "string"
        &&  password === UserInputService.normaliseWhitespace(password)
        &&  password.length > 0
        );
    };

    static isAgeEligible = function(age) {
        return (age >= SYS_CONFIGS.MIN_ELIGIBLE_AGE);
    };

    static validateInputCredentials = function(username, password) {
        if (!this.isUsernameValid(username)) {
            return {
                valid: false,
                message: "Invalid Username"
            };
        }

        if (!this.isPasswordValid(password)) {
            return {
                valid: false,
                message: "Invalid Password"
            };
        }

        return {
            valid: true
        };
    };

    static verifyPassword = function(inputPassword, accountPassword) {
        // const hashedPassword = this.hashPassword(inputPassword);
        // since this is just a classwork demonstration and the password is stored-
        // in plaintext, there's nothing to do besides comparing the two.
        return (inputPassword === accountPassword);
    };

    static getLoginAccountByUsername = function(username) {
        const account = UserRepository.getByUsername(username);
        if (!account) {
            return undefined;
        }

        return {
            password: account.password,
            role: account.role,
            isActive: account.isActive,
            yearOfBirth: account.yearOfBirth
        };
    };

    static processLogin = function(username, password) {
        const areInputsValid = this.validateInputCredentials(username, password);
        if (!areInputsValid.valid) {
            return {
                success: false,
                message: areInputsValid.message
            };
        }

        const account = this.getLoginAccountByUsername(username);
        if (!account || !this.verifyPassword(password, account.password)) {
            return {
                success: false,
                message: "Incorrect Username or Password"
            };
        }

        if (!account.isActive) {
            return {
                success: false,
                message: "Account Disabled"
            };
        }

        const age = UserService.calculateAge(account.yearOfBirth);
        if (!this.isAgeEligible(age)) {
            return {
                success: false,
                message: "Ineligible Age"
            };
        }

        return {
            success: true,
            username: username,
            role: account.role
        };
    };
};

const FormatterService = class {
    static formatLoginSuccess = function(username, role) {
        return `Login Success! ${username}/${role}`;
    };
};

const AuthController = class {
    static login = function(username, password) {
        const result = AuthService.processLogin(username, password);
        if (!result.success) {
            return result.message;
        }

        return FormatterService.formatLoginSuccess(result.username, result.role);
    };
};

(function() {
    const loginAttempts = [
        {
            // valid credentials (professor)
            username: "admin",
            password: "ce385pass"
        },
        {
            // valid credentials (student)
            username: "natthakit",
            password: "1234"
        },
        {
            // inccorect password
            username: "natthakit",
            password: "asasdasdasd"
        },
        {
            // incorrect username
            username: "okpsokfpdkgpodfkg",
            password: "1234"
        },
        {
            // valid credentials, account inactive
            username: "randomdude",
            password: "whyamihere"
        },
        {
            // ineligible age
            username: "iloveroblox",
            password: "6767676767"
        },
    ];

    for (const attempt of loginAttempts) {
        console.log(
            AuthController.login(attempt.username, attempt.password)
        );
    }
})();