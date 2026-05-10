const bcrypt = require('bcrypt')
const prisma = require('../config/prisma')
const { generateToken } = require('../utils/jwt')
const { registerSchema, loginSchema } = require('../validations/authValidation')

exports.register = async (req, res) => {
  try {

    const validation =
      registerSchema.safeParse(req.body)

    if (!validation.success) {
      return res.status(400).json({
        errors: validation.error.issues
      })
    }

    const { name, email, password } = req.body

    const userExists = await prisma.user.findUnique({
      where: { email }
    })

    if (userExists) {
      return res.status(400).json({
        error: 'Email already exists'
      })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword
      }
    })

    const token = generateToken(user.id)

    return res.status(201).json({
      user,
      token
    })

  } catch (error) {
    return res.status(500).json(error)
  }
}

exports.login = async (req, res) => {

  try {

    const validation = loginSchema.safeParse(req.body)

    if (!validation.success) {
      return res.status(400).json({
        errors: validation.error.issues
      })
    }

    const { email, password } = req.body

    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      return res.status(400).json({
        error: 'Invalid credentials'
      })
    }

    const passwordMatch = await bcrypt.compare(
      password,
      user.password
    )

    if (!passwordMatch) {
      return res.status(400).json({
        error: 'Invalid credentials'
      })
    }

    const token = generateToken(user.id)

    return res.json({
      user,
      token
    })

  } catch (error) {
    return res.status(500).json(error)
  }
}