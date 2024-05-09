import puppeteer from "puppeteer";



let scrap = async (req: {propertyType:string, transactionType:string})=> {
    let {propertyType,transactionType} = req

    try { 
    
    let link = `https://www.argenprop.com/${propertyType}/${transactionType}`
    const browser = await puppeteer.launch({headless:false})
    const page = await browser.newPage()
    await page.goto(link)
    await page.waitForSelector('.listing__items')
    const rawElements = await page.evaluate(()=> {
        const products = Array.from(document.querySelectorAll('.listing__item'))
        return products.map((p: any)=> ({
            link: p.querySelector('a').getAttribute('href')
        })
        
        )
    })
    console.log("raw",rawElements)
    
    
    for(var i= 0 ; rawElements; i++){
        await page.goto(`https://www.argenprop.com${rawElements[i].link}`)
        await page.goBack()    
    }
    // await browser.close()
}catch(error) {
    console.log(error)
}}


scrap({propertyType:"terrenos",transactionType:"venta"})

export {scrap}
