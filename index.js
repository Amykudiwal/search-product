const express =require("express");
const bodyParser=require("body-parser");
const app=express();
const PORT = 3000;

const products=[
    {productId:1,productName:"book",productImageName:"abc.jpg",productImageURL:"http://abc.com",brandName:"Nayka",description:"Thriller noval it is",itemCode:"123",itemType:"books",currency:"Indian",currencyCode:"INR",saleAmount:"500",brochureFileName:"filename",brochureFileURL:"http://file-url.com",vendors:"amy",status:true,createdBy:"27/03/2024",created:"27/03/2024",updated:"27/03/2024",subCategoryId:1,categoryId:2,uomId:"abc",shippingMethodId:223,shippingTermsId:45,paymentTermsId:88,categoryName:"books",subCategoryName:"books",uomCode:1245,uomDescription:"Excellent book",organisationName:"Sandeep maaheshwari",organisationId:222,vendorInfo:"HB road"},
    {productId:2,productName:"statue",productImageName:"xyz.jpg",productImageURL:"http://xyz.com",brandName:"Silicon",description:"Thriller noval it is",itemCode:"123",itemType:"books",currency:"Indian",currencyCode:"INR",saleAmount:"500",brochureFileName:"filename",brochureFileURL:"http://file-url.com",vendors:"amy",status:true,createdBy:"27/03/2024",created:"27/03/2024",updated:"27/03/2024",subCategoryId:1,categoryId:2,uomId:"abc",shippingMethodId:223,shippingTermsId:45,paymentTermsId:88,categoryName:"books",subCategoryName:"books",uomCode:1245,uomDescription:"Excellent book",organisationName:"Sandeep maaheshwari",organisationId:222,vendorInfo:"HB road"}
]

app.use(bodyParser.json());

app.get('/products',(req,res)=>{
    const currentPage=parseInt(req.query.page) || 1 ;
    const pageSize=parseInt(req.query.pageSize) || 10;
    const orderBy=req.query.orderBy || "id";
    const orderDirection=req.query.orderDirection || "asc";
    const searchField=req.query.searchField || "";
    const searchValue=req.query.searchValue || "";

    let filterProducts=[...products];

    if(searchValue && searchField && filterProducts.length > 0){
        filterProducts=filterProducts.filter(product =>{
                const fieldValue=product[searchField];
                if(typeof fieldValue === 'string'){
                    return fieldValue.toLowerCase().includes(searchValue.toLowerCase());
                }
                else{
                    return false
                }
            // console.log(" product[searchField]", product[searchField])
            //    String(product[searchField].toLowerCase().includes(searchValue.toLowerCase()))
        })
    }

    filterProducts.sort((a,b)=>{
        if(orderDirection.toLowerCase() === "desc"){
            return b[orderBy] - a[orderBy];
        }
        else{
            return a[orderBy] - b[orderBy];
        }
    })

    const startIndex=(currentPage - 1 ) * pageSize ;
    const endIndex = startIndex + pageSize ;
    const paginationProducts = filterProducts.slice(startIndex , endIndex);

    res.json({
        currentPage ,
        pageSize,
        totalItems:filterProducts.length,
        totalPage:Math.ceil(filterProducts.length / pageSize),
        products:paginationProducts,
        searchBy:searchField,
        searchField:searchValue


    })



})

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})