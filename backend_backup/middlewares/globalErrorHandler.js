export const globalErrorHandler = (err,req,res,next)=>{

    res.status(err.status|| 500).send({error:   err.message || "Something went Wrong!"      })
}