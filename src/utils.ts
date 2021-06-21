  export const getEllipsisTxt = (text:string= "", n = 6)=>{
    return `${text.substr(0,n)}...${text.substr(text.length - n, text.length)}`;
}

export const tokenValue = (value:number,decimals:number) => decimals?value/Math.pow(10,decimals):value;

