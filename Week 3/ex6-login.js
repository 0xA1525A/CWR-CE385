const USERS = [
    {
        username: "admin",
        password: "ce385pass",
        role: "professor",
        isActive: true
    },
    {
        username: "natthakit",
        password: "1234",
        role: "student",
        isActive: true
    },
    {
        username: "randomdude",
        password: "whyamihere",
        role: "student",
        isActive: false
    },
    {
        username: "iloveroblox",
        password: "6767676767",
        role: "student",
        isActive: true
    },
];

function loginResponse(statusCode, message, username, hasAdminAccess) {
    return {
        status: statusCode,
        message: message,
        session: {
            username: username,
            hasAdminAccess: hasAdminAccess
        }
    };
}

function sanitiseUserInput(input) {
    const output = String(input).replace(/[^a-zA-Z0-9_-]/g, "");
    return output;
}

function areCredentialsValid(username, password) {
    return (
        username !== ""
        && username !== undefined
        && password !== ""
        && password !== undefined
    );
}

function queryUserByUsername(username) {
    const foundUser = USERS.find(function(user) {
        return user.username === username;
    });

    return foundUser;
}

function isUserExist(username) {
    return queryUserByUsername(username) !== undefined;
}

function getLoginCredentialsByUsername(username) {
    const user = queryUserByUsername(username);

    return {
        password: user.password,
        isActive: user.isActive,
        role: user.role
    };
}

function isPasswordCorrect(dbPassword, password) {
    return dbPassword === password;
}

function isAccountActive(accountData) {
    return accountData.isActive;
}

function isAgeValid(age) {
    return (
        typeof age === typeof 0
        && age >= 18
        && Number.isFinite(age)
        && !Number.isNaN(age)
    );
}

function handleLogin(dirtyUsername, dirtyPassword, dirtyAge) {
    const username = sanitiseUserInput(dirtyUsername);
    const password = sanitiseUserInput(dirtyPassword);
    const age      = Number(sanitiseUserInput(dirtyAge));

    if (!areCredentialsValid(username, password)) {
        const HTTP_UNAUTHORISED = 401;
        const MESSAGE = "Invalid field data. Please try again";

        return loginResponse(HTTP_UNAUTHORISED, MESSAGE, null, null);
    }

    if (!isUserExist(username)) {
        const HTTP_UNAUTHORISED = 401;
        const MESSAGE = "User does not exists";

        return loginResponse(HTTP_UNAUTHORISED, MESSAGE, null, null);
    }

    const credentials = getLoginCredentialsByUsername(username);

    if (!isPasswordCorrect(credentials.password, password)) {
        const HTTP_UNAUTHORISED = 401;
        const MESSAGE = "Incorrect username or password";

        return loginResponse(HTTP_UNAUTHORISED, MESSAGE, null, null);
    }

    if (!credentials.isActive) {
        const HTTP_UNAUTHORISED = 401;
        const MESSAGE = "Your account has been disbaled. Please contact System Administrator/Professor";

        return loginResponse(HTTP_UNAUTHORISED, MESSAGE, null, null);
    }

    if (!isAgeValid(age)) {
        const HTTP_UNAUTHORISED = 401;
        const MESSAGE = "Invalid age";

        return loginResponse(HTTP_UNAUTHORISED, MESSAGE, null, null);
    }

    return { good: true }
}

(function() {
    const loginAttempts = [
        {
            username: "admin",
            password: "ce385pass",
            age: 25
        },
        {
            username: "natthakit",
            password: "1234",
            age: 25
        },
        {
            username: "natthakit",
            password: "asasdasdasd",
            age: 25
        },
        {
            username: "okpsokfpdkgpodfkg",
            password: "1234",
            age: 25
        },
        {
            username: "randomdude",
            password: "whyamihere",
            age: 25
        },
        {
            username: "iloveroblox",
            password: "6767676767",
            age: 13
        },
    ];

    for (const attempt of loginAttempts) {
        console.log(handleLogin(attempt.username, attempt.password, attempt.age));
    }
})();