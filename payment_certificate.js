frappe.ui.form.on('Payment Certificate for Construction', {
	onload: function(frm) {
		console.log("abebe beso bela")
		addRowToCPT(frm);
		addRowToTSPC(frm);
		addRowToTDCPT(frm);
		addRowVORT(frm);
		addRowTST(frm);
	}
});
var mainContract=0;

 frappe.ui.form.on('Payment Certificate for Construction', {
	contractor: function(frm) {
	 frm.set_query("contract_no", function() {
        return {
            "filters": {
                "cn": frm.doc.contractor
            }
        }
     });	
	},
	 
	 contract_no:function(frm,cdt,cdn){
	  frappe.call({
	   method: 'frappe.client.get_list',
	   args: {
	    doctype: 'Appendices To Contract',
	    filters: { "name": frm.doc.contract_no},
	    fields: ['total_amount']
	   },
	   callback: function(response) {
	    var contract = response.message[0];
          if(contract)	{
            mainContract=contract.total_amount;
            addRowToCPT(frm);
               }   
	   }
	  });
	}
});

// frappe.ui.form.on('Payment Certificate for Construction', { 
//     contract_no: function(frm, cdt, cdn) {
// 		console.log("TESt 0")
//         frappe.call({
//             method: 'frappe.client.get_list',
//             args: {
//                 doctype: 'Timesheet',
//                 filters: {
//                     "appendicies_to_contract_no": frm.doc.contract_no
//                 },
//                 fieldname: ['cft']
//             },
//             callback: function(response) {
// 				console.log("TESt 1")
//                 var timesheets = response.message;
//                 if (timesheets && timesheets.length > 0) {
// 					console.log("TESt 2")
//                     var cftValues = [];
//                     timesheets.forEach(function(timesheet) {
//                         timesheet.cft.forEach(function(cftRow) {
//                             cftValues.push(cftRow.field_name); // Replace 'field_name' with the actual field name you want to fetch
//                         });
//                     });
//                     // Now 'cftValues' contains the list of values from the 'cft' table
//                     // You can do further processing with 'cftValues' here
//                     console.log(cftValues); // Example: Log the values to the console
//                 }
//             }
//         });
//     }
// });



function addRowToCPT(frm, cdt, cdn) {
	console.log(frm.doc.contract_payment_table)
	var contract_payment_table = frm.doc.contract_payment_table;
	frm.clear_table("contract_payment_table");
	// if (!contract_payment_table) {
	console.log("Test 1");
	frm.set_value("contract_payment_table", []);

	var tableRow1 = frappe.model.add_child(frm.doc, "Contract Payment Table", "contract_payment_table");
	var tableRow2 = frappe.model.add_child(frm.doc, "Contract Payment Table", "contract_payment_table");
	var tableRow3 = frappe.model.add_child(frm.doc, "Contract Payment Table", "contract_payment_table");
	var tableRow4 = frappe.model.add_child(frm.doc, "Contract Payment Table", "contract_payment_table");
	var tableRow5 = frappe.model.add_child(frm.doc, "Contract Payment Table", "contract_payment_table");
	var tableRow6 = frappe.model.add_child(frm.doc, "Contract Payment Table", "contract_payment_table");
	tableRow1.data_1 = "Main Contract";
	tableRow2.data_1 = "Main Contract (Inc VAT)";
	tableRow3.data_1 = "Amended Contract (Inc VAT)";
	tableRow4.data_1 = "Supplementary Contract (Inc VAT)";
	tableRow5.data_1 = "Variation Order";
	tableRow6.data_1 = "Total Sum (Inc VAT)";
    tableRow1.amount=mainContract;
	refresh_field("contract_payment_table");

	// }
}


function addRowToTDCPT(frm, cdt, cdn) {
	console.log(frm.doc.to_date_executed_table)
	var to_date_executed_table = frm.doc.to_date_executed_table;
	frm.clear_table("to_date_executed_table");
	console.log("Test 1");
	frm.set_value("to_date_executed_table", []);

	var tableRow1 = frappe.model.add_child(frm.doc, "Payment Certificate To Date Executed", "to_date_executed_table");
	var tableRow2 = frappe.model.add_child(frm.doc, "Payment Certificate To Date Executed", "to_date_executed_table");
	var tableRow3 = frappe.model.add_child(frm.doc, "Payment Certificate To Date Executed", "to_date_executed_table");
	var tableRow4 = frappe.model.add_child(frm.doc, "Payment Certificate To Date Executed", "to_date_executed_table");
	tableRow1.data_1 = "(A) Total Amount of work Executed to Date (Excl. VAT)";
	tableRow2.data_1 = "(B) Supplementary agreement Executed";
	tableRow3.data_1 = "(C) Material on Site";
	tableRow4.data_1 = "(D) Total Amount of Work Executed = A + B + C";
	refresh_field("to_date_executed_table");
}

function addRowVORT(frm, cdt, cdn) {
	console.log(frm.doc.vat_on_retantion)
	var vat_on_retantion = frm.doc.vat_on_retantion;
	frm.clear_table("vat_on_retantion");
	console.log("Test 1");
	frm.set_value("vat_on_retantion", []);

	var tableRow1 = frappe.model.add_child(frm.doc, "Payment Certificate To Date Executed", "vat_on_retantion");
	var tableRow2 = frappe.model.add_child(frm.doc, "Payment Certificate To Date Executed", "vat_on_retantion");
	var tableRow3 = frappe.model.add_child(frm.doc, "Payment Certificate To Date Executed", "vat_on_retantion");
	tableRow1.data_1 = "(K) VAT on Total Retention Todate = 15% * G";
	tableRow2.data_1 = "(L) Previous Collected VAT";
	tableRow3.data_1 = "(M) VAT on Retention at this payment = K - L";
	refresh_field("vat_on_retantion");
}

function addRowTST(frm, cdt, cdn) {
	console.log(frm.doc.total_table)
	var total_table = frm.doc.total_table;
	frm.clear_table("total_table");
	console.log("Test 1");
	frm.set_value("total_table", []);

	var tableRow1 = frappe.model.add_child(frm.doc, "Payment Certificate To Date Executed", "total_table");
	var tableRow2 = frappe.model.add_child(frm.doc, "Payment Certificate To Date Executed", "total_table");
	var tableRow3 = frappe.model.add_child(frm.doc, "Payment Certificate To Date Executed", "total_table");
	var tableRow4 = frappe.model.add_child(frm.doc, "Payment Certificate To Date Executed", "total_table");
	tableRow1.data_1 = "(N) Sum Due to The Contractor = J";
	tableRow2.data_1 = "(O) VAT on Sum Due to The Contractor = 15% * N";
	tableRow3.data_1 = "(P) VAT on Retention at this Payment = M";
	tableRow4.data_1 = "(Q) Total VAT Payable at this Payment = O + P";
	refresh_field("total_table");
}


function addRowToTSPC(frm, cdt, cdn) {
	// console.log(frm.doc.total_sum_of_payment_certificate)
	var total_sum_of_payment_certificate = frm.doc.total_sum_of_payment_certificate;

		console.log("Test 1");
		frm.set_value("total_sum_of_payment_certificate", []);

		var tableRow1 = frappe.model.add_child(frm.doc, "Total Sum of Payment Certificate", "total_sum_of_payment_certificate");
		var tableRow2 = frappe.model.add_child(frm.doc, "Total Sum of Payment Certificate", "total_sum_of_payment_certificate");
		var tableRow3 = frappe.model.add_child(frm.doc, "Total Sum of Payment Certificate", "total_sum_of_payment_certificate");
		var tableRow4 = frappe.model.add_child(frm.doc, "Total Sum of Payment Certificate", "total_sum_of_payment_certificate");
		var tableRow5 = frappe.model.add_child(frm.doc, "Total Sum of Payment Certificate", "total_sum_of_payment_certificate");
		tableRow1.deductions = "(E) Previous Payments";
		tableRow2.deductions = "(F) Adv.Recovery(100%)";
		tableRow3.deductions = "(G) Retantion 5%";
		tableRow4.deductions = "(H) Deduction for material on site";
		tableRow5.deductions = "(I) Total Deduction";
		refresh_field("total_sum_of_payment_certificate");

}


frappe.ui.form.on('Contract Payment Table', {
	amount: function(frm) {
		calculateTotalAmount(frm, 'contract_payment_table', "total_amount");
	}
});

frappe.ui.form.on('Previous Payment Certification', {
	amount: function(frm) {
		calculateTotalAmount(frm, 'previous_payment', "total_exe_vat");
	}
});

frappe.ui.form.on('Total Sum of Payment Certificate', {
	amount: function(frm) {
		var totalAmount = calculateTotalAmount(frm, 'total_sum_of_payment_certificate', "net_sum_due_to_contactor");
		var vat = totalAmount * 0.15;
		var totalAmountWithVat = totalAmount + vat;
		//set the values to the respective fields and refreshing them
		frm.set_value("15_vat", vat);
		frm.set_value("net_sum_including_vat", totalAmountWithVat);
		frm.refresh_field("15_vat");
		frm.refresh_field("net_sum_including_vat");
	}
});

function calculateTotalAmount(frm, childTable, valueField) {
	var totalAmount = 0;

	if (!frm || !frm.doc || !frm.doc[childTable]) {
		console.error("Invalid form or child table data.");
		return NaN;
	}

	frm.doc[childTable].forEach((row) => {
		if (typeof row.amount === 'number') {
			totalAmount += row.amount;
		} else if (typeof row.amount === 'string' && !isNaN(parseFloat(row.amount))) {
			totalAmount += parseFloat(row.amount);
		} else {
			console.error("Invalid amount value in the child table:", row.amount);
		}
	});

	frm.set_value(valueField, totalAmount);
	frm.refresh_field(valueField);

	frm.refresh_field(valueField, totalAmount);
	frm.setValue(valueField, totalAmount);
	console.log("abebe beso bela ena mote eko kezama ena min yishala tiyalesh ene min akalehu kezama abebe beso bela ena mote eko ene min akalehu kezama ene min akalehu sihed simeta kayehut")

	return parseFloat(totalAmount);
}


frappe.ui.form.on("Payment Certificate for Construction", {
	onload: function(frm) {
		var table = frm.doc.contract_payment_table;
		//hide the add row buttons for a child tables
		frm.set_df_property("contract_payment_table", "read_only", 1);
		frm.set_df_property("total_sum_of_payment_certificate", "read_only", 1);
		frm.set_df_property("to_date_executed_table", "read_only", 1);
		frm.set_df_property("vat_on_retantion", "read_only", 1);
		
	}
});

