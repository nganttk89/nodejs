const express = require('express')

const app = express()

const port = 3000

const userRouter = require('./routers/user')

app.use(express.json())
app.use(userRouter)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
})

const bcrypt = require('bcryptjs')
const hashPassword = async () => {
	const password = '123456'
	const hash = await bcrypt.hash(password, 8)
	console.log(password)
	console.log(hash)
	const isMath = await bcrypt.compare(password, hash)
	console.log(isMath)
}
hashPassword()