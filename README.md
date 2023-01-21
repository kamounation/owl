# OWL-FACTORY

Owl.js is an express.js library for making software development easier by taking care of all the unneccessary tasks developers have to worry about.

Owl.js makes it possible for junior developers to write code in an environment set-up as if they are senior's. It supports robust codebase system and the best error handling middlewares.

With owl.js code is written smaller as it has many repetitive features taken account of and put into the engine which is then exposed to the developer.

# Installation

To install the package, run:

`npm install owl-factory`

## Usage

To use the package, you'll need to require it in your project and then set up your routes.

Here's an example of how you can use it:

    const OwlFactory = require('owl-factory');

    class TestController {
    	constructor() {}

    	getMsg = OwlFactory.catchAsync(async (req, res, next) => {
    		res.send('welcome to this endpoint');
    	});
    	sendMsg = OwlFactory.catchAsync(async (req, res, next) => {
    		const { body } = req;
    		if (!body.name)
    			return next(
    				new OwlFactory.AppRes(
    					OwlFactory.httpStatus.BAD_REQUEST,
    					'error, provide name in json'
    				)
    			);

    		res.status(200).json(body);
    	});
    }

    class TestRoute {
    	path = '/test';
    	router = OwlFactory.Router();
    	controller = new TestController();
    	constructor() {
    		this.initializeRoutes();
    	}
    	initializeRoutes() {
    		this.router.get(`${this.path}`, this.controller.getMsg);
    		this.router.post(`${this.path}`, this.controller.sendMsg);
    	}
    }

    const server = new OwlFactory([new TestRoute()], '9999');

    server.listen();

## CatchAsync

The `catchAsync` function is a utility function that wraps your route handler functions and catches any errors that may occur inside them. This is useful for handling errors in an async route handler without having to use try-catch blocks.

Here's an example of how you can use it:

    const routeHandler = OwlFactory.catchAsync(async (req, res, next) => {
    	// your route code here
    });

## AppRes

The `AppRes` class is a custom error class that you can use to return custom error responses to the client. It takes two arguments: an HTTP status code and a message.

Here's an example of how you can use it:

    if (!body.name)
    return next(
    	new OwlFactory.AppRes(
    		OwlFactory.httpStatus.BAD_REQUEST,
    		'error, provide name in json'
    	)
    );

## HttpStatus

The `httpStatus` object is an object containing commonly used HTTP status codes as properties. You can use these to set the status code of your custom error responses.

Here's an example of how you can use it:

    new OwlFactory.AppRes(OwlFactory.httpStatus.BAD_REQUEST, 'error message')

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

#### Please note that this package is still in production and more versions will be released in the future. Stay tuned for updates and new features!

### BENCHMARK

To run benchmark for this app, navigate to the brnchmark folder

```bash
    cd benchmarks
```

then run

```bash
    node benchmarks.js
```

to start the server then,

```bash
    make all
```

to perform the benchmark
