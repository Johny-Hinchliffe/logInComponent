require('dotenv/config')
const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const { verify } = require('jsonwebtoken')
const { hash, compare } = require('bcryptjs')
const {
	createAccessToken,
	createRefreshToken,
	sendRefreshToken,
	sendAccessToken,
} = require('./tokens.js')
const pool = require('./db.js')
const { isAuth } = require('./isAuth.js')

// 1. Register a user
// 2. Login a user
// 3. Logout a user
// 4. Setup a protected route
// 5. Get a new accesstoken with a refresh token

const server = express()

// Use express middleware for easier cookie handling
server.use(cookieParser())

server.use(
	cors({
		origin: 'http://localhost:3000',
		credentials: true,
		
	})
)

// Needed to be able to read body data
server.use(express.json()) // to support JSON-encoded bodies
server.use(express.urlencoded({ extended: true })) // to support URL-encoded bodies

// 1. Register a user
server.post('/register', async (req, res) => {
	const { firstName, lastName, email, password, marketing, signedUp } = req.body

	try {
		// 1. Check if the user exist
		const repeatCustomer = await pool.query(
			`SELECT * FROM ${process.env.USER} WHERE email = $1`,
			[email]
		)

		const result = repeatCustomer.rows[0]

		if (result) {
			throw new Error('User already exist')
		}

		// 2. If not user exist already, hash the password
		const hashedPassword = await hash(password, 10)

		const newCustomer = await pool.query(
			// 'INSERT INTO client (first_name, last_name, email, password, marketing, sign_up_date) VALUES($1, $2, $3, $4, $5, $6) RETURNING *',
			// [firstName, lastName, email, hashedPassword, marketing, signedUp]
			`INSERT INTO ${process.env.USER} (first_name, last_name, email, password, marketing, sign_up_date) VALUES($1, $2, $3, $4, $5, $6) RETURNING *`,
			[firstName, lastName, email, hashedPassword, marketing, signedUp]
		)

		res.json(newCustomer.rows[0])
	} catch (err) {
		res.send({
			error: `${err.message}`,
		})
	}
})

// Work out how remember me works

// 2. Login a user
server.post('/login', async (req, res) => {
	const { email, password } = req.body

	try {
		// 1. Find user in array. If not exist send error
		const findUser = await pool.query(
			`SELECT * FROM ${process.env.USER} WHERE email = $1`,
			[email]
		)

		const user = findUser.rows[0]
		if (!user) {
			throw new Error('User does not exist')
		}

		// 2. Compare crypted password and see if it checks out. Send error if not
		const valid = await compare(password, user.password)

		if (!valid) throw new Error('Password not correct')
		// 3. Create Refresh- and Accesstoken
		const accesstoken = createAccessToken(user.id)
		const refreshtoken = createRefreshToken(user.id)

		// 4. Store Refreshtoken with user in "db"
		// Could also use different version numbers instead.
		// Then just increase the version number on the revoke endpoint

		await pool.query(
			`UPDATE ${process.env.USER} SET refreshtoken = $1 WHERE email=$2;`,
			[refreshtoken, email]
		)

		// 5. Send token. Refreshtoken as a cookie and accesstoken as a regular response
		sendRefreshToken(res, refreshtoken)
		sendAccessToken(res, req, accesstoken)
	} catch (err) {
		res.send({
			error: `${err.message}`,
		})
	}
})

// 3. Logout a user
server.post('/logout', async (_req, res) => {
	console.log('run')
	res.clearCookie('refreshtoken', { path: '/refresh_token' })
	// Logic here for also remove refreshtoken from pool
	// await pool.query('UPDATE practice SET refreshtoken = null WHERE refreshtoken=$1;', [
	//   refreshtoken
	// ])

	return res.send({
		message: 'Logged out',
	})
})

// 4. Protected route
server.post('/', async (req, res) => {
	try {
		const userId = isAuth(req)
		if (userId !== null) {
			res.send({
				data: 'logged in matey mate',
			})
		}
	} catch (err) {
		res.send({
			error: `${err.message}`,
		})
	}
})

// 5. Get a new access token with a refresh token
server.post('/refresh_token', async (req, res) => {
	const token = req.cookies.refreshtoken
	// If we don't have a token in our request
	if (!token) return res.send({ accesstoken: '' })
	// We have a token, let's verify it!
	let payload = null
	try {
		payload = verify(token, process.env.REFRESH_TOKEN_SECRET)
	} catch (err) {
		return res.send({ accesstoken: '' })
	}
	// token is valid, check if user exist
	const findUser = await pool.query(
		`SELECT * FROM ${process.env.USER} WHERE id = $1`,
		[payload.userId]
	)

	const user = findUser.rows[0]

	if (!user) {
		return res.send({ accesstoken: '' })
	}
	// user exist, check if refreshtoken exist on user
	if (user.refreshtoken !== token) {
		return res.send({ accesstoken: '' })
	}
	// token exist, create new Refresh- and accesstoken
	const accesstoken = createAccessToken(user.id)
	const refreshtoken = createRefreshToken(user.id)

	// update refreshtoken on user in pool
	// Could have different versions instead!

	await pool.query(
		`UPDATE ${process.env.USER} SET refreshtoken = $1 WHERE id = $2`,
		[refreshtoken, payload.userId]
	)

	// All good to go, send new refreshtoken and accesstoken
	sendRefreshToken(res, refreshtoken)
	return res.send({ accesstoken })
})

server.listen(process.env.PORT, () =>
	console.log(`Server listening on port ${process.env.PORT}!`)
)
