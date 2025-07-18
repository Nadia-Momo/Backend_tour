//custom error tai class diye banabo
class AppError extends Error{
    public statusCode:number;
    constructor(statusCode:number,message:string,stack=''){
        super(message)//something went wrong
        this.statusCode=statusCode
        if(stack){
        this.stack=stack
        }else{
            Error.captureStackTrace(this,this.constructor)

        }
    }
}
export default AppError