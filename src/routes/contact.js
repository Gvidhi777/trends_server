const { Router } = require("express")
const pool = require("../db")

const router = Router()

router.post("/", async (req, res) => {
    const { name, phone, message, location, pageUrl } = req.body

    if (!name || !phone || !message) {
        return res.status(400).json({ error: "Missing required fields" })
    }

    try {
        await pool.query(
            `INSERT INTO "Contact" (name, phone, location, "pageUrl", message)
       VALUES ($1, $2, $3, $4, $5)`,
            [name, phone, location, pageUrl, message]
        )

        res.json({ success: true })
    } catch (err) {
        console.error("DB error:", err)
        res.status(500).json({ error: "Database error" })
    }
})

module.exports = router
