const checkRole = (...roles) => {
    return (req,res,next)=>{
        if(!req.user){
            return res.status(401).json({
                message: "Kullanıcı doğrulanamadı. Lütfen giriş yapın.",
            });
        }
        const userRole = req.user.role;
        if(!roles.includes(userRole)){
            return res.status(403).json({
                message: "Bu işlem için yetkiniz yok.",
            });
            
        }
        next();
    }
}

module.exports = {checkRole};