module.exports = function handler(req, res) {
  res.json({ status: 'OK', message: 'Stripe API server is running' });
}