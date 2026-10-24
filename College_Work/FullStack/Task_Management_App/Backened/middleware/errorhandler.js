const errorhandler=(err,req,res,next) =>{
    const statuscode = err.statuscode || 500;
    res.status(statuscode).json({
        success:false,
        statuscode:500?"Internal server error":err.message
    });
};

export default errorhandler;