const express = require("express");
const router = express.Router();

const pdfMake = require('../pdfmake/pdfmake');
const vfsFonts = require('../pdfmake/vfs_fonts');

pdfMake.vfs = vfsFonts.pdfMake.vfs;

router.post('/pdf',(req , res , next)=>{
    //res.send('PDF');
 
    const fname = req.body.fname;
    const lname = req.body.lname;


    // var documentDefinition = {
    //     content: [
    //        'UNIVERSITY OF COLOMBO SCHOOL OF COMPUTING (UCSC)',
    //         'Academic and Publications Branch',
    //         `${fname} ${lname}`,
            
    //     ]
    // };

    // playground requires you to assign document definition to a variable called dd

var documentDefinition = {
	content: [
		{
			text:  'UNIVERSITY OF COLOMBO SCHOOL OF COMPUTING (UCSC)',
			style: 'header'
		},
		
		{
			text: 'Academic and Publication Branch',
			style: 'subheader1'
		},
	
		{
			text: 'REQUEST FROM FOR HALL BOOKING',
			style: 'subheader2'
		},
        `${fname} ${lname}`,
		{
			text: '',
			style: ['quote', 'small']
		}
	],
	styles: {
		header: {
			fontSize: 18,
            bold: true,
            alignment: 'center'
           
		},
		subheader1: {
            fontSize: 15,
            alignment: 'center'
			
        },
        subheader2: {
			fontSize: 19,
            bold: true,
            alignment: 'center'
		},
		quote: {
			italics: true
		},
		small: {
			fontSize: 8
		}
	}
	
}
    
    const pdfDoc = pdfMake.createPdf(documentDefinition);
    pdfDoc.getBase64((data) => {
        res.writeHead(200 ,
            {
                'Content-Type': 'application/pdf',
                'Content-Disposition':'attachment; filename= "HallBookingForm.pdf"'
            });

            const download = Buffer.from(data.toString('utf-8'),'base64');
            res.end(download);
    });
});

module.exports = router;