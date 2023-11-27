
frappe.ui.form.on("Cannibalization request Form", {
    schedule_date_ec: function(frm) {
        if(frm.doc.schedule_date_ec){
            var date = convertDateTOGC(frm.doc.schedule_date_ec.toString());
            var dateObject = new Date(date);
    // Format the date as a string in a desired format
           var formattedDate = dateObject.toISOString().slice(0, 10);  // YYYY-MM-DD
            frm.set_value("date", formattedDate);
            frm.refresh_field("date")
        }
    },
});
