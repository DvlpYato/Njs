const express = require('express')
const cors = require('cors')
const multer = require('multer')
const fs = require('fs')
const path = require('path')
const md5 = require('md5')
const ReverseMd5 = require('reverse-md5')
const router = express.Router()
const app = express()

var rev = ReverseMd5({
  lettersUpper: false,
  lettersLower: true,
  numbers: true,
  special: false,
  whitespace: true,
  maxLen: 12,
})

var mysql = require('mysql')
const Token_maneger = require('./token')
const { json } = require('express')
import userModel from '../api/model/users'

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

router.get('/me', (req, res) => {
  const checkToken = Token_maneger.checkAuthentication(req)
  if (checkToken) {
    return res.json({ user: checkToken.data })
  } else {
    return res.status(401).json({ message: 'Invalid Token' })
  }
})

// router.get('/users', function (req, res, next) {
//   userModel.getUsers((err, data) => {
//     res.status(200).json(data)
//   })
// })

router.post('/login', async (req, res) => {
  const { username, password } = req.body
  userModel.getUserstologin(username, md5(password), (err, data) => {
    if (!data.length) {
      return res.status(401).json({ message: 'Invalid Token' })
    } else {
      //return res.send(Token_maneger.getGenerateToken({ data: data }))
      return res.json({
        token: Token_maneger.getGenerateToken({ data: data[0] }),
      })
    }
  })
  // if (username === '' && password === '') {
  //   return res.json({
  //     user: mockUser,
  //     token: mockToken,
  //   })
  // } else {
  //   return res.status(401).json({ message: 'Invlid User' })
  // }
})

// const upload = multer({ dest: './upload/' })
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './static/upload/')
  },

  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + '-' + Date.now() + path.extname(file.originalname)
    )
  },
})
const upload = multer({ storage: storage })
router.post('/register', upload.single('profileImg'), async (req, res) => {
  const { username, password } = req.body
  const formData = req.body
  const CheckUser = userModel.CheckUsername(
    req.body.username,
    async (error, data) => {
      if (data.length) {
        res.send({ message: 1 })
      } else {
        const file = req.file.path.replace('static/', '')
        const reuslt = await userModel.Insertuser({
          username: req.body.username,
          password: md5(req.body.password),
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          profile_img: file,
        })
        res.sendStatus(200)
      }
    }
  )
})

router.post('/get_token/:user_id', (req, res) => {
  res.send(Token_maneger.getGenerateToken({ user_id: req.params.user_id }))
})

router.post('/check_auth', (req, res) => {
  let jwtStatus = Token_maneger.checkAuthentication(req)
  if (jwtStatus != false) {
    res.send(jwtStatus)
  } else {
    res.send(false)
  }
})

router.post('/update', upload.single('profile_img'), async (req, res) => {
  let file
  if (req.file) {
    file = req.file.path.replace('static/', '')
  } else {
    file = req.body.profile_img_old
  }

  const CheckPass = await userModel.CheckPass(
    {
      u_id: req.body.u_id,
      password: req.body.password,
    },
    async (error, data) => {
      if (data > 0) {
        res.send({ message: 1 })
      } else {
        const CheckUser = await userModel.UpdateUser(
          {
            u_id: req.body.u_id,
            username: req.body.username,
            password: req.body.password,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            profile_img: file,
          },
          (error, data) => {
            if (data.length) {
            } else {
              res.sendStatus(200)
            }
          }
        )
      }
    }
  )
})
app.use(router)

module.exports = app
