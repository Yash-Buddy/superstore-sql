import express from 'express'
import mysql from 'mysql2/promise'

const app = express()
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: process.env.DB_PASSWORD,
  database: 'superstore',
  decimalNumbers: true,
})

// {W} becomes "WHERE YEAR(order_date)=?" when ?year=2016 is passed
const route = (sql) => async (req, res) => {
  try {
    const year = parseInt(req.query.year) || null
    const where = year ? 'WHERE YEAR(order_date)=?' : ''
    const [rows] = await pool.query(sql.replace('{W}', where), year ? [year] : [])
    res.json(rows)
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
}

app.get('/api/years', route('SELECT DISTINCT YEAR(order_date) AS year FROM orders ORDER BY year'))
app.get('/api/kpis', route(`SELECT ROUND(SUM(sales),2) AS sales, ROUND(SUM(profit),2) AS profit,
  COUNT(DISTINCT order_id) AS orders FROM orders {W}`))
app.get('/api/region', route(`SELECT region, ROUND(SUM(sales),2) AS sales, ROUND(SUM(profit),2) AS profit
  FROM orders {W} GROUP BY region ORDER BY sales DESC`))
app.get('/api/category', route(`SELECT category, ROUND(SUM(sales),2) AS sales, ROUND(SUM(profit),2) AS profit
  FROM orders {W} GROUP BY category ORDER BY profit DESC`))
app.get('/api/monthly', route(`SELECT DATE_FORMAT(order_date,'%Y-%m') AS month, ROUND(SUM(sales),2) AS sales,
  ROUND(SUM(profit),2) AS profit FROM orders {W} GROUP BY month ORDER BY month`))
app.get('/api/discount', route(`SELECT discount, ROUND(AVG(profit),2) AS avg_profit
  FROM orders {W} GROUP BY discount ORDER BY discount`))

app.listen(3001, () => console.log('API running on http://localhost:3001'))
