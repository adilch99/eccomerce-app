const router = require("express").Router();

const stripe = require("stripe")(process.env.STRIPE_KEY)

router.post("/create-checkout-session", async(req, res) => {
try {

    const cart = [
        {id: 1, name: "alpha", quantity: 3 , price: 2},
        {id: 2, name: "beta", quantity: 2, price: 2},
      ]

    const {items} = req.body;

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: items.map(item => {
            const storedItems = cart.filter(x => x.id === item.id)[0]
            return {
                price_data: {
                    currency: 'usd',
                    unit_amount: storedItems.price,
                    product_data: {
                        name: storedItems.name
                    }
                },
                quantity: item.quantity,
            }
        }),
        mode: "payment",
        success_url:`http://localhost:3000/payment/success`,
        cancel_url:`http://localhost:3000/payment/cancel`
    });

    res.status(200).json({url: session.url})

} catch (error) {    
    console.log(error)
    res.status(500).json(error)
}} )

module.exports= router