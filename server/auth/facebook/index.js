import express from 'express'
import passport from 'passport'
const router = express.Router()

// authentication
router.get(
  '/',
  passport.authenticate('facebook', {
    scope: ['public_profile', 'email']
  })
)

router.get(
  '/callback',
  passport.authenticate('facebook', {
    successRedirect: '/profile',
    failureRedirect: '/'
  })
)

// authorization
router.get(
  '/connect',
  passport.authorize('facebook', {
    scope: ['public_profile', 'email']
  })
)

router.get(
  '/connect/callback',
  passport.authorize('facebook', {
    successRedirect: '/profile',
    failureRedirect: '/'
  })
)

router.get('/unlink', (req, res) => {
  let user = req.user
  user.facebook.token = undefined
  user.save(() => {
    res.redirect('/test')
  })
})

module.exports = router
