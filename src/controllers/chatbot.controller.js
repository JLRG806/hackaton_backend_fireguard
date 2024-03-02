import { Router } from "express"

const router = Router();

router.get("/chatbot", (req, res) =>{

    try {
        
        
        

        return res.status(200).json({ data: "resultData" });
    } catch (error) {
        console.error('Error in get:', error);
        return res.status(500).json({ error: 'Internal Server Error.' });
    }
})

router.post("/chatbot", (req, res) =>{
    try {
        
        return res.status(200).json({ data: "resultData" });
    } catch (error) {
        console.error('Error in post:', error);
        return res.status(500).json({ error: 'Internal Server Error.' });
    }
})

export default router